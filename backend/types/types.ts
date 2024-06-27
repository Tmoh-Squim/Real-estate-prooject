import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

export interface AuthenticatedRequest extends Request {
    user?: any;
}

export interface CustomJwtPayload extends JwtPayload {
    id: string;
}
