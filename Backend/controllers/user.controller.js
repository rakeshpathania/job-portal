import { userModel } from "../db/models/user.model.js";
import { validationResult } from "express-validator";
import { createUser } from "../services/user.service.js";


const register = async(req, res, next) => {
   const errors = validationResult(req);
   if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array()})
   }
   const {firstName, lastName, email,password} = req.body;
   const hashedPassword = await userModel.hashPassword(password);
   const user = await createUser(firstName, lastName, email, hashedPassword);

   const token = await user.generateAuthToken();
   res.status(201).json({user, token});
};

export default {
    register
};
