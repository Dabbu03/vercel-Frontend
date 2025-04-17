
import jwt from 'jsonwebtoken'

const userAuth = async (req, res, next) => {

    const { token } = req.headers;

    if (!token) {
        return res.json({ message: "Unauthorized Login Again", success: false });
    }

    try {
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET)

        if (tokenDecode.id) {
            req.user = { id: tokenDecode.id };
        } else {
            return res.json({ message: "Not authorized Login Again", success: false });
        }

        next()
    } catch (error) {
        console.log(error.message)
        return res.json({ message: "Token Not Verified", success: false })
    }
}

export default userAuth