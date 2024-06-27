import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema(
  {
    groupTitle:{
        type: String,
    },
    members: {
      type: Array,
    },
    lastMessage: {
      type: String,
    },
    lastMessageId: {
      type: String,
    },
    deleted:{
      type:Array
    }
  },
  { timestamps: true }
);
export default  mongoose.model("Conversation", conversationSchema);