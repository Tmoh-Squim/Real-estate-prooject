import mongoose from "mongoose";

const messagesSchema = new mongoose.Schema(
  {
    conversationId: {
      type: String,
    },
    text:{
      type: String,
    },
    sender: {
      type: String,
    },
    images: {
      type: String,
    },
    deleted: {
      type:Array
    }
  },
  { timestamps: true }
);

export default mongoose.model("Messages", messagesSchema);
