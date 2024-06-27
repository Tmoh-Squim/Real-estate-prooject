import Conversation from "../models/conversation";


export const createConversation = async (req:any, res:any) => {
      try {
        const { groupTitle, senderId, receiverId } = req.body;
  
        const isConversationExist = await Conversation.findOne({ groupTitle });
  
        if (isConversationExist) {
          const conversation = isConversationExist;
          res.status(200).json({
            success: true,
            conversation,
          });
        } else {
          const conversation = await Conversation.create({
            members: [senderId, receiverId],
            groupTitle: groupTitle,
          });
  
          res.status(200).json({
            success: true,
            conversation,
          });
        }
      } catch (error) {
        return res.status(500).json({
            success:false,
            message:"internal server error"
        })
      }
    }

    // get user conversations
export const getUserConversation = async (req:any, res:any) => {
      try {
        const conversations = await Conversation.find({
          members: {
            $in: [req.params.id],
          },
        }).sort({ updatedAt: -1, createdAt: -1 });
  
        res.status(201).json({
          success: true,
          conversations,
        });
      } catch (error) {
        return res.json({
            success:false,
            message:"internal server error"
        })
      }
    }

    // update the last message
export const updateLastMessage = async (req:any, res:any) => {
    try {
      const { lastMessage, lastMessageId } = req.body;

      const conversation = await Conversation.findByIdAndUpdate(req.params.id, {
        lastMessage,
        lastMessageId,
      });

      res.status(201).json({
        success: true,
        conversation,
      });
    } catch (error) {
      return res.status(500).json({
        success:false,
        messsage:"Internal server error"
      })
    }
  }

  