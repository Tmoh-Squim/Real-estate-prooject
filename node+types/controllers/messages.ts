import messageModel from "../models/messages";

export const createMessage = async(req:any,res:any)=>{
    try {
        const id = req.params.id;
        const {sender,text} = req.body;

        const newMessage = {
            text:text,
            sender:sender,
            conversationId:id
        }
        const message = await messageModel.create(newMessage);

        res.status(200).json({
            success:true,
            message
        })
    } catch (error) {
        return res.status(500).send({
            success:false,
            message:"Internal server error"
        })
    }
}

// get all messages with conversation id
export const getMessages = async (req:any, res:any) => {
      try {
        const messages = await messageModel.find({
          conversationId: req.params.id,
        });
  
        res.status(201).json({
          success: true,
          messages,
        });
      } catch (error) {
        return res.status(500).send({
            success:false,
            message:"Internal server error"
        })
      }
    }
  