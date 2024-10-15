import { io, Socket } from 'socket.io-client';
import { create } from 'zustand';

interface SocketStore {
  socket: Socket | null;
  roomId: string | null;
  connectSocket: (id: string) => void;
  disconnectSocket: () => void;
}

const socketStore = create<SocketStore>(set => ({
  socket: null,
  roomId: null,
  connectSocket: id => {
    const socketConnection = io('http://localhost:4000');
    socketConnection.emit('joinRoom', id);
    set({ socket: socketConnection, roomId: id });
  },
  disconnectSocket: () => {
    set(state => {
      if (state.socket) {
        state.socket.disconnect();
      }
      return { socket: null, roomId: null };
    });
  },
}));

export default socketStore;
