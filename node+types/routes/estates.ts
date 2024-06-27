import express from "express";
import {createEstate,getEstates,getEstateById} from "../controllers/estates";
import upload from "../utils/multer";
import estateModel from "../models/estates";
const router = express.Router();
router.post("/create-post/:id",upload.array("images"),createEstate)
router.get("/get-estates",getEstates)
router.get("/estate/:id", async(req:any,res:any)=>{
    try {
        const id = req.params.id;
        const estate = await estateModel.findById(id);

        res.json({
            success:true,
            estate
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
})
export default router;