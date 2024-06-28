import { useEffect, useState } from "react";
import "./chat.scss";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import { Server_Url } from "../../server";
import socket from "../../socket";
import {AiFillCamera} from "react-icons/ai"
import {format} from "timeago.js";
function Chat() {
  const [chat, setChat] = useState(false);
  const { conversations } = useSelector((state) => state.conversations);
  const { user } = useSelector((state) => state.user);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [online, setOnline] = useState([]);

  useEffect(() => {
    socket.on("getUsers", (users) => setOnlineUsers(users));
  }, []);
  useEffect(()=>{
    user?.user && socket.emit('addUser',(user?.user?._id))
  },[user])
  useEffect(() => {
    setOnline(onlineUsers?.filter((user) => user?.userId !== me));
  }, [onlineUsers]);
  const { users } = useSelector((state) => state.users);
  const [messages, setMessages] = useState([]);
  const [active, setActive] = useState(false);
  const [lastSeen, setLastSeen] = useState(null);
  const [currentMessages, setCurrentMessages] = useState(messages);
  const [message, setMessage] = useState("");
  const [incoming,setIncomig] = useState(null);
  const [otherMember, setOtherMember] = useState("");
  const [receiver, setReceiver] = useState(null);
  const [conversation, setConversation] = useState(null);
  const me = user?.user?._id;

  useEffect(() => {
    socket.on("getMessage",(message) => setIncomig(message));
  },[]);
  useEffect(() => {
    if (incoming?.senderId === otherMember) {
      setCurrentMessages((prevMessages) => [
        ...prevMessages,
        {
          text: incoming?.text,
          createdAt: Date.now(),
          sender: incoming?.senderId,
        },
      ]);
    }
  }, [incoming])
  useEffect(() => {
    setOtherMember(conversation?.members?.find((member) => member !== me));
  }, [conversation]);
  useEffect(() => {
    setReceiver(users?.find((user) => user._id === otherMember));
  }, [otherMember]);

  const handleSendMessage = async () => {
    try {
      await axios.post(
        `${Server_Url}/message/create-message/${conversation?._id}`,
        { text: message, sender: me }
      );
      await axios.put(
        `${Server_Url}/conversation/update-last-message/${conversation?._id}`,
        { lastMessage: message, lastMessageId: me }
      );
      currentMessages.push({
        sender: me,
        text: message,
        createdAt: Date.now(),
      });
      emitMessage();
      setMessage("");
    } catch (error) {
      toast.error("something went wrong");
    }
  };
  async function getMessages() {
    try {
      const response = await axios.get(
        `${Server_Url}/message/get-messages/${conversation?._id}`
      );
      setMessages(response.data?.messages);
    } catch (error) {
      return
      //toast.error("something went wrong");
    }
  }
  function emitMessage() {
    const otherMember = conversation?.members?.find((member) => member !== me);
    socket.emit("sendMessage", {
      senderId: me,
      receiverId: otherMember,
      text: message,
    });
  }
  useEffect(() => {
    getMessages();
  }, [conversation]);
  useEffect(() => {
    setCurrentMessages(messages);
  }, [messages]);

  useEffect(() => {
    const otherMember = conversation?.members?.find((member) => member !== me);
    const receiver = users?.find((user) => user._id === otherMember);
    const isOnline = online.find((user) => user?.userId === receiver?._id);
    if (isOnline?.active === false) {
      setLastSeen(isOnline?.lastSeen);
    } else {
      setActive(isOnline?.active);
    }
  }, [conversation,online]);
  return (
    <div className="chat">
      <div className="messages">
        <h1>Messages</h1>
        {conversations?.map((conversation, index) => {
          const otherMember = conversation?.members?.find(
            (member) => member !== me
          );
         // const [lastMessage,setLastmessage] = useState(conversation?.lastMessage);
          //const [lastMessageId,setLastmessageId] = useState(conversation?.lastMessageId);
          const receiver = users?.find((user) => user._id === otherMember);
          const isOnline = online.find(
            (user) => user?.userId === receiver?._id && user?.active === true
          );
           /*   if (incoming && incoming?.senderId === otherMember) {
                setLastmessage(incoming?.text);
                setLastmessageId(incoming?.sender);
               } */

          return (
            <div
              className="message"
              key={index}
              onClick={() => {
                setChat(true);
                setConversation(conversation);
              }}
            >
              <div className="online-holder">
                <img
                  src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt=""
                />
                <div className={isOnline ? "online" : "notActive"}></div>
              </div>
              <div className="content">
                <span>{receiver?.name}</span>
                {conversation?.lastMessageId === me ? (
                  <p>You: {conversation?.lastMessage}</p>
                ) : (
                  <p>{conversation?.lastMessage}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
      {chat &&  (
        <div className="chatBox">
          <div className="top">
            <div className="user">
              <img
                src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt=""
              />
              <div className="active">
                {receiver?.name}
                <p>{active === true ? "online" : `active: ${format(lastSeen)}`}</p>
              </div>
            </div>
            <span className="close" onClick={() => setChat(null)}>
              X
            </span>
          </div>
          <div className="center">
            {currentMessages?.map((message, index) => {
              return (
                <div
                  className={
                    message?.sender === me ? "chatMessage own" : "chatMessage"
                  }
                  key={index}
                >
                  <p>{message?.text}</p>
                  <span>{format(message?.createdAt)}</span>
                </div>
              );
            })}
          </div>
          <div className="bottom">
            <div className="icon">
              <input type="file" name="image" id="image" />
             <label htmlFor="image">
             <AiFillCamera size={30} color="blue" cursor={'pointer'} />
             </label>
            </div>
            <textarea
              onChange={(e) => setMessage(e.target.value)}
              value={message}
              placeholder="Message"
            ></textarea>
           {
            message?.length >0 &&  <button onClick={handleSendMessage}>Send</button>
           }
          </div>
        </div>
      )
    }
    </div>
  );
}

export default Chat;
