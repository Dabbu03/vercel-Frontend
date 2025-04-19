
import userModel from "../model/userModel.js";
import transactionModel from "../model/transactionModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import razorpay from "razorpay";

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Please fill all the fields", success: false })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const userData = {
            name,
            email,
            password: hashedPassword
        }
        const newUser = new userModel(userData)
        const user = await newUser.save()

        // Generating Token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

        res.json({ success: true, token, user: { name: user.name } })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "Error in registering user" })
    }
}

const loginUser = async (req, res) => {

    try {

        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({ message: "Please fill all the fields", success: false })
        }

        const user = await userModel.findOne({ email })
        if (!user) {
            return res.json({ message: "User not found", success: false })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.json({ message: "Invalid credentials", success: false })
        }

        // Generating Token
        if (isMatch) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

            res.json({ success: true, token, user: { name: user.name } })
        }
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "Error in Login user" })
    }
}

const userCredits = async (req, res) => {
    try {
        const userId = req.user.id;

        const user = await userModel.findById(userId)

        res.json({ success: true, credit: user.creditBalance, user: { name: user.name } })

    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: "Error in Credits user" })
    }
}

const razorpayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
})
const paymentRazorpay = async (req, res) => {
    try {
        const userId = req.user.id;
        const { planId } = req.body;
        const userData = await userModel.findById(userId);

        if (!userData || !planId) {
            return res.status(400).json({ message: "Please fill all the fields", success: false });
        }

        let credits, plan, amount, date;

        switch (planId) {
            case 'Basic':
                plan = "Basic";
                credits = 100;
                amount = 10;
                break;
            case 'Advanced':
                plan = "Advanced";
                credits = 500;
                amount = 50;
                break;
            case 'Business':
                plan = "Business";
                credits = 5000;
                amount = 250;
                break;
            default:
                return res.status(400).json({ message: "Invalid plan", success: false });
        }
        date = Date.now();

        const transactionData = {
            userId,
            plan,
            credits,
            amount,
            date,
        };

        const newTransaction = await transactionModel.create(transactionData);

        const options = {
            amount: amount * 100,
            currency: process.env.CURRENCY,
            receipt: newTransaction._id,
        };

        // Use promise version instead of callback
        const order = await razorpayInstance.orders.create(options);
        res.json({ success: true, order });

    } catch (error) {
        console.log("Payment Error:", error);  // Log the actual error
        res.status(500).json({
            success: false,
            message: "Error in payment",
            error: error.message  // Send error message for debugging
        });
    }
};


const verifyRazorpay = async (req, res) => {
    try {
        const { razorpay_order_id } = req.body

        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)

        if (orderInfo.status === 'paid') {
            const transactionData = await transactionModel.findById(orderInfo.receipt)

            if (transactionData.payment) {
                return res.status(400).json({ message: "Payment already verified", success: false })
            }

            const userData = await userModel.findById(transactionData.userId)

            const creditBalance = userData.creditBalance + transactionData.credits
            await userModel.findByIdAndUpdate(userData._id, { creditBalance }, { new: true })

            await transactionModel.findByIdAndUpdate(transactionData._id , {payment: true}, {new: true})

            res.json({ success: true, message: "Payment verified successfully" })
        } else {
            res.json({ success: false, message: "Payment not verified" })
        }


    } catch (error) {
        console.log("Verify Razorpay Error:", error);
        res.json({ success: false, message: "Error in verifying payment" })
    }
}


export { registerUser, loginUser, userCredits, paymentRazorpay,  verifyRazorpay };