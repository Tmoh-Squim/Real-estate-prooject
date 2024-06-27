import { NextFunction, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    phone:{
        type:Number,
        required:true
    },
    idNum:{
        type:Number,
        required:true,
        unique:true
    },
    role:{
        type:String,
        default:"user"
    },
    password:{
        type:String,
        required:true,
    }
},{timestamps:true});


export const getUserByEmail =async(email:String,res:Response,next:NextFunction)=>{
    try {
     const exists = await mongoose.model('Users',userSchema).findOne({email:email});
     return exists
    } catch (error) {
        return next(res.json({
            success:false,
        }))
    }
}
export const getUserByUsername =async(username:String,res:Response,next:NextFunction)=>{
    try {
     const exists = await mongoose.model('Users',userSchema).findOne({username:username});
     return exists
    } catch (error) {
        return next(res.json({
            success:false,
        }))
    }
}
export const getUserById = async(id:String)=>{
    try {
        await mongoose.model('Users',userSchema).findById(id);
    } catch (error) {
        return console.log(error)
    }
}


export default mongoose.model('Users',userSchema);