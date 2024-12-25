import { Router } from "express";
import {body} from 'express-validator';
import userController  from "../controllers/user.controller.js";
import { authenticateUser } from "../middlewares/auth.middleware.js";
const router = Router();


router.post('/register',[
    body('fullName.firstName').isLength(3).withMessage('First name is must be of 3 characters'),
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
],userController.register);

router.post('/login',[
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
], userController.login);

router.get('/profile', authenticateUser ,userController.getProfile)

router.post('/logout', authenticateUser, userController.logout)

export const userRouter = router;