import { Router } from "express";
import {body} from 'express-validator';
import userController  from "../controllers/user.controller.js";
import authentication from "../middlewares/auth.middleware.js";
const router = Router();


router.post('/register',[
    body('fullName.firstName').isLength(3).withMessage('First name is must be of 3 characters'),
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body("phoneNumber")
    .isLength({ min: 10 })
    .withMessage("phoneNumber must be at least 10 characters long")
    .isMobilePhone("any")
    .withMessage("phoneNumber must be a valid phone number"),

],userController.register);

router.post('/login',[
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
], userController.login);

router.get('/profile', authentication.authenticateUser ,userController.getProfile)

router.post('/logout', authentication.authenticateUser, userController.logout)

export const userRouter = router;