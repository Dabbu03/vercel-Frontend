

export const generateImage = async (req, res) => {
    try {
        const {prompt}
    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: "Error in generating image" })
    }
}