import express from "express";
import {createUser,Login,loadUser} from "../controllers/user";
import { isAuthenticated } from "../middlewares/auth";
import userModel from "../models/userModel";
const router = express.Router();
router.post("/create-user",createUser);
router.post("/login",Login);
router.get("/loadUser",isAuthenticated,loadUser);
router.get("/users",async(req:any,res:any)=>{
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
});
export default router;