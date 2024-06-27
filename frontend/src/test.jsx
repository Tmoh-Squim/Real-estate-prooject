import React, { useContext, useEffect } from "react";
import { SocketContext } from "./socketContext"; // Adjust the import path accordingly

const SomeComponent = () => {
  const socket = useContext(SocketContext);

  useEffect(() => {
    // Listen for messages from the server
    socket.on("message", (data) => {
      console.log("Message from server:", data);
    });

    // Clean up on unmount
    return () => {
      socket.off("message");
    };
  }, [socket]);

  const sendMessage = () => {
    // Emit a message to the server
    socket.emit("message", "Hello from the client!");
  };

  return (
    <div>
      <button onClick={sendMessage}>Send Message</button>
    </div>
  );
};

export default SomeComponent;
