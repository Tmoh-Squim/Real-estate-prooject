import React, { createContext, useEffect } from "react";
import socket from "./socket";

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  useEffect(() => {
    // Emit user connected event
    socket.emit("user connected", "A new user has connected");

    // Handle connection and disconnection
    socket.on("connect", () => {
      console.log(`Connected with socket id: ${socket.id}`);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from socket server");
    });

    // Clean up on unmount
    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};
