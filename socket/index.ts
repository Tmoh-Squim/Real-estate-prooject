import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import { User, addUsertype, createMessagetype, removeUsertype } from "./type";

dotenv.config();

const Port = process.env.PORT || 3000;
const app = express();

// Create HTTP server
const httpServer = createServer(app);

// Initialize Socket.IO server
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});



let users: User[] = [];

const addUser = (userId: string, socketId: string) => {
  const existingUser = users.find((user) => user.userId === userId);
  if (existingUser) {
    existingUser.socketId = socketId;
    existingUser.lastSeen = undefined;
    existingUser.active = true;
  } else {
    users.push({
      userId,
      socketId,
      active: true
    });
  }
};

const updateUserStatus = (socketId: string) => {
  const user = users.find((user) => user.socketId === socketId);
  if (user) {
    user.lastSeen = new Date();
    user.active = false;
    user.userId = user.userId;
    io.emit("getUsers",users)
  }
};

const createMessage = ({ text, image, senderId, receiverId }: createMessagetype) => ({
  text,
  image,
  senderId,
  receiverId
});

const getUser = (receiverId: string) => {
  return users.find((user) => user.userId === receiverId);
};

// Handle Socket.IO connections
io.on("connection", (socket) => {
  
  socket.on('addUser', (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });
  
  const messages: any = {};

  socket.on("sendMessage", ({ senderId, receiverId, text, image }) => {
    const message = createMessage({ senderId, receiverId, text, image });
    const user = getUser(receiverId);

    if (!messages[receiverId]) {
      messages[receiverId] = [message];
    } else {
      messages[receiverId].push(message);
    }

    if (user) {
      io.to(user.socketId).emit("getMessage", message);
    }
  });

  socket.on("message", (data) => {
    console.log("Message received: ", data);
    io.emit("message", data);
  });

  socket.on("disconnect", () => {
    updateUserStatus(socket.id);
  });
});

// Start the server
httpServer.listen(Port, () => {
  console.log(`Socket server listening on port ${Port}`);
});
