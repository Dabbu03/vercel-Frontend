import userModel from "../model/userModel.js";
import FormData from "form-data";
import axios from "axios";

export const generateImage = async (req, res) => {
    try {
        const { prompt } = req.body;
        const userId = req.user.id;

        if (!prompt) {
            return res.status(400).json({ success: false, message: "Prompt is required" });
        }

        const user = await userModel.findById(userId);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        if (user.creditBalance <= 0) {
            return res.status(403).json({ success: false, message: "Insufficient credit balance", creditBalance: user.creditBalance });
        }

        const formData = new FormData();
        formData.append("prompt", prompt);

        const { data } = await axios.post("https://clipdrop-api.co/text-to-image/v1", formData, {
            headers: {
                ...formData.getHeaders(), // required by axios with FormData
                'x-api-key': process.env.CLIPDROP_API,
            },
            responseType: 'arraybuffer'
        });

        // convert Image to base64 (binary to base64)
        const base64Image = Buffer.from(data, "binary").toString("base64");
        const imageUrl = `data:image/png;base64,${base64Image}`;

        await userModel.findByIdAndUpdate(userId, {
            creditBalance: user.creditBalance - 1
        });

        res.status(200).json({
            success: true,
            message: "Image Generated",
            creditBalance: user.creditBalance - 1,
            imageUrl
        });

    } catch (error) {
        console.log("Generate Image Error:", error.message);
        res.status(500).json({ success: false, message: "Error in generating image" });
    }
};
