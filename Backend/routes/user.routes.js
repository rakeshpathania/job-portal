import { Router } from "express";
import {body} from 'express-validator';
import userController  from "../controllers/user.controller.js";
const router = Router();


router.post('/register',[
    body('fullName.firstName').isLength(3).withMessage('First name is must be of 3 characters'),
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
],userController.register);


export const userRouter = Router();