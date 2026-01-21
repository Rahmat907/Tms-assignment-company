import AuthServices from "../../services/auth.service.js"
import type { Request, Response } from "express";
class AuthController{
    static signup = async (req:Request ,res : Response)=>{
        try {
            const {username,email,password} = req.body
        const existingUser = await AuthServices.findUserbyEmail(email);
        if(existingUser) res.status(400).json({
            success: false,
            message : "user already exists"
        })
        const user = await AuthServices.ragisterUser(username,email,password);
        res.status(201).json({
            success: true,
            message : "user created successfully",
            data : user
        })
        } catch (error:any) {
          res.status(500).json({
            success: false,
            message : error.message
          })  
        }
    }
}

export default AuthController;