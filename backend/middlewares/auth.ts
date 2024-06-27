import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel";
import { AuthenticatedRequest, CustomJwtPayload } from "../types/types";

export const isAuthenticated = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization;

        if (!token) {
            return res.status(401).json({ message: 'Token is required' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as CustomJwtPayload;

        if (!decoded || !decoded._id) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        req.user = await userModel.findById(decoded._id);
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const isAdmin = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const user = req.user;

        if (user?.role !== 'Admin') {
            return res.status(403).json({ message: 'Unauthorized access' });
        } else {
            next();
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
