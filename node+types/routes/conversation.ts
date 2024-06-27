import express from "express";
import {createConversation, getUserConversation,updateLastMessage} from "../controllers/conversation";
import { isAuthenticated } from "../middlewares/auth";
const router = express.Router();
router.post("/create-conversation",createConversation);
router.get("/get-conversations/:id",isAuthenticated,getUserConversation);
router.put("/update-last-message/:id",updateLastMessage)
export default router;