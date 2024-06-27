import express from "express";
import {createMessage,getMessages} from "../controllers/messages";

const router = express.Router();

router.post("/create-message/:id",createMessage);
router.get("/get-messages/:id",getMessages);
export default router;