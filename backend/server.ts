import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/dbConnect";
import cors from "cors";
import path from "path";
//import compression from "compression";
dotenv.config();
const app = express();
const Port = process.env.PORT;

//connect mongodb database
connectDB();
//middlewares
app.use(express.json());
app.use(cors({
    origin:"http://localhost:5173"
}));
//app.use(compression())

//routes imports
import authRoutes from "./routes/auth";
import estateRoutes from "./routes/estates";
import conversationRoutes from "./routes/conversation";
import messageRoutes from "./routes/messages";
//rest apis
app.use("/api/auth",authRoutes);
app.use("/api/estate",estateRoutes);
app.use("/api/conversation",conversationRoutes);
app.use("/api/message",messageRoutes);
app.use("/",express.static(path.join(__dirname,"uploads")))

app.listen(Port,()=>console.log(`Server run nicely on port ${Port}`))

