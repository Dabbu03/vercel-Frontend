import express from 'express'
import { generateImage } from '../controllers/imageController.js'
import userAuth from '../middleware/auth.js';


const imgaeRouter = express.Router()

imgaeRouter.post('/generate', userAuth, generateImage)

export default imgaeRouter