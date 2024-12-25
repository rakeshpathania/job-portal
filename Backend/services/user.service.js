import { userModel } from "../db/models/user.model.js";


const createUser = async(fullName, email, password, phoneNumber) =>{
    const {firstName, lastName} = fullName
    if(!firstName  || !email || !password || !phoneNumber){
        throw new Error("All fields are required")
    }
    const user =  await userModel.create({
        fullName:{
            firstName,
            lastName
        },
        email,
        password,
        phoneNumber
    });


    return user;
}

export { createUser}