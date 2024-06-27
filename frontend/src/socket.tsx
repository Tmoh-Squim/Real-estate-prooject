import { io } from "socket.io-client";

// Replace this URL with your server's URL
const SERVER_URL = "http://localhost:2022";

const socket = io(SERVER_URL, {
  transports: ['websocket'], // Use WebSocket only
});

export default socket;
