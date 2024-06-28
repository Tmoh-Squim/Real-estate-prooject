import { Request, Response, NextFunction } from "express";
import estateModel from "../models/estates";
import cloudinary from "../utils/cloudinary";
export const createEstate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { title, bedroom, price, description, address,petPolicy,utilityPolicy, latitude, longitude, size, city, school, restrant, busStation, bathroom,type,property } = req.body;
        const id = req.params.id;

        // Validate the input
        if (!title || !bedroom || !price || !type) {
            return res.status(400).json({
                success: false,
                message: "Name, bedroom,type, and price are required fields."
            });
        }

        const files = req.files as { [fieldname: string]: Express.Multer.File[] } | Express.Multer.File[] | undefined | any;

        let imageUrls: string[] = [];
       /* if (files) {
            if (Array.isArray(files)) {
                imageUrls = files.map((file) => `${file.filename}`);
            } else {
                for (const fieldname in files) {
                    const fileArray = files[fieldname];
                    imageUrls = fileArray.map((file) => `${file.filename}`);
                }
            }
        } */

        // const imageUrls = [];
       if(files){
        for (const file of files) {
            const result = await cloudinary.v2.uploader.upload(file.path);
            const urls = result.secure_url
            imageUrls.push(urls);
          }
       }

        const places = {
            school,
            restrant,
            busStation
        };

        const newEstate = new estateModel({
            title,
            bedroom,
            city,
            latitude,
            longitude,
            petPolicy,
            utilityPolicy,
            size,
            price,
            bathroom,
            ownerId: id,
            address,
            property,
            type,
            nearbyPlaces: places,
            description,
            images: imageUrls
        });

        await newEstate.save();

        res.status(201).json({
            success: true,
            message: "Estate created successfully",
            estate: newEstate
        });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        } else {
            console.log('error',error)
            res.status(500).json({
                success: false,
                message: 'An unknown error occurred'
            });
        }
    }
};

export const getEstates = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const estates = await estateModel.find({});
        res.json({
            success: true,
            estates
        })
    } catch (error) {
        return res.json({
            success: false,
            message: "internal server error"
        })
    }
}
export const getEstateById = async (req: any, res: any) => {
    try {
        const id = req.params.id;
        const estate = await estateModel.findById(id);

        res.json({
            success: true,
            estate
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

module.exports = { createEstate, getEstates }