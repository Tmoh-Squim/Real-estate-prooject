export interface addUsertype{
    userId:String,
    socketId:String
}
export interface removeUsertype{
    socketId:String
}
export interface createMessagetype{
    text:String,
    senderId:String,
    receiverId:String,
    image:String
}
export interface User {
    active: boolean;
    userId: string;
    socketId: string;
    lastSeen?: Date;
  }
  