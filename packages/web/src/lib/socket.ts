import { io, Socket } from 'socket.io-client';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

// Socket.IO connects to the server root, not to the REST base path (/api/v1)
const SOCKET_URL = API_URL.replace(/\/api\/v1\/?$/, '');

let socket: Socket | null = null;

export const connectSocket = (token: string): Socket => {
  if (socket?.connected) {
    return socket;
  }

  socket = io(SOCKET_URL, {
    auth: { token },
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionAttempts: 5,
  });

  socket.on('connect', () => {
    console.log('✅ Connected to Socket.IO');
  });

  socket.on('disconnect', () => {
    console.log('❌ Disconnected from Socket.IO');
  });

  socket.on('connect_error', (error) => {
    console.error('Socket connection error:', error);
  });

  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

export const getSocket = (): Socket | null => {
  return socket;
};

export const joinConversation = (conversationId: string) => {
  socket?.emit('join_conversation', conversationId);
};

export const leaveConversation = (conversationId: string) => {
  socket?.emit('leave_conversation', conversationId);
};

export const sendTyping = (conversationId: string) => {
  socket?.emit('typing', { conversationId });
};

export const sendStopTyping = (conversationId: string) => {
  socket?.emit('stop_typing', { conversationId });
};

export default socket;
