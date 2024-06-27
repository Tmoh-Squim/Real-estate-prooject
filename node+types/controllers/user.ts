import { NextFunction ,Request,Response} from "express";
import expressAsyncHandler from "express-async-handler";
import { getUserByEmail, getUserByUsername } from "../models/userModel";
import userModel from "../models/userModel";
import { ComparePassword, HashPassword } from "../helpers/passwordEncryption";
import JWT  from "jsonwebtoken";

export const createUser = async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const {email,name,phone,idNum,password,username} = req.body;
        if(!email || !name || !phone || !idNum || !password || !username){
            return res.json({
                success:false,
                message:"All fields are required"
            })
        }

        const exists = await getUserByEmail(email,res,next);
        if(exists){
            return res.json({
                success:false,
                message:"Email is already registered!"
            })
        }
        const check = await getUserByUsername(username,res,next);
        if(check){
            return res.json({
                success:false,
                message:"Username is already taken"
            })
        }

        const Hash = await HashPassword(password);

        const newUser = {
            email:email,
            name:name,
            username:username,
            phone:phone,
            idNum:idNum,
            password:Hash
        }
        const user = await userModel.create(newUser);

        res.send({
            success:true,
            message:"Account created successfully",
            user
        })
    } catch (error) {
        return next(res.json({
            success:false,
            message:error
        }))
    }
}

export const Login = async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const {username,password} = req.body;
        if(!username || !password){
            return next(res.json({
                success:false,
                message:"All fields are required!"
            }))
        }
        const user = await getUserByUsername(username,res,next);
        if(!user){
            return res.json({
                success:false,
                message:"Incorrect username or password!"
            })
        }

        const match = await ComparePassword(password,user.password);
        if(!match){
            return res.json({
                success:false,
                message:"Incorrect username or password"
            })
        }

        const token = await JWT.sign({_id:user._id},process.env.JWT_SECRET!,{
            expiresIn:'7d'
        })

        res.json({
            success:true,
            message:"Logged in successfully",
            user,
            token
        })

    } catch (error) {
        return next(res.json({
            success:false,
            message:"Internal server error"
        }))
    }
}

export const loadUser = async(req:any,res:Response,next:NextFunction)=>{
    try {
        const user = await userModel.findById(req.user._id);
        if (!user) {
          return res.json({
            success: false,
            message: "User not found!",
          });
        }
        res.json({
          success: true,
          user,
        });

    } catch (error) {
        return console.log(error)
    }
}
export const getUsers = async(req:any,res:any)=>{
    try {
        const users = await userModel.find({})
  
        res.status(201).json({
          success: true,
          users,
        });
      } catch (error) {
        return res.json({
            success:false,
            message:"internal server error"
        })
      }
}
export const getUserById = async(req:any,res:any)=>{
    try {
        const id = req.params.id;
        const user = await userModel.findById(id);
        res.status(200).json({
            success:true,
            user
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}

module.exports = {createUser,Login,loadUser}