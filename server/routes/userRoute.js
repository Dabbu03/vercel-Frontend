
import express from 'express';
import { loginUser, registerUser, userCredits } from '../controllers/userController.js';
import userAuth from '../middleware/auth.js';

const router = express.Router();

router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/credits', userAuth, userCredits)

export default router;