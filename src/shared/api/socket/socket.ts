import { io, Socket } from "socket.io-client";

export const chatSocket: Socket = io(`${import.meta.env.VITE_API_URL}/chat`, {
  transports: ["websocket"],
});

export const videoSocket: Socket = io(`${import.meta.env.VITE_API_URL}/video`, {
  transports: ["websocket"],
});
