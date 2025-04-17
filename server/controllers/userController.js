
import userModel from "../model/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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

export { registerUser, loginUser };