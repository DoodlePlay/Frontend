import { io, Socket } from 'socket.io-client';
import { create } from 'zustand';

interface Participant {
  nickname: string;
  score: number;
  clickedAvatarIndex: number;
  isVideoOn: boolean;
  isFlipped: boolean;
}

interface GameState {
  host: string;
  gameStatus: 'waiting' | 'choosing' | 'drawing';
  currentDrawer: string | null;
  currentWord: string | null;
  totalWords: string[];
  selectedWords: string[];
  isWordSelected: boolean;
  selectionDeadline: number | null;
  maxRound: number;
  round: number;
  turn: number;
  turnDeadline: number | null;
  correctAnswerCount: number;
  isItemsEnabled: boolean;
  items: Record<string, { user: string | null; status: boolean }>;
  order: string[];
  participants: Record<string, Participant>;
}

interface SocketStore {
  socket: Socket | null;
  roomId: string | null;
  gameState: GameState | null;
  connectSocket: (
    roomId: string,
    userInfo: Participant,
    mode: 'joinRoom' | 'createRoom',
    roomInfo?: { rounds: number; topic: string; isItemsEnabled: boolean }
  ) => void;
  disconnectSocket: () => void;
}

const useSocketStore = create<SocketStore>((set, get) => ({
  socket: null,
  roomId: null,
  gameState: null,

  connectSocket: (roomId, userInfo, mode, roomInfo) => {
    const socket = io('http://localhost:4000');

    if (mode === 'createRoom') {
      socket.emit('createRoom', roomId, userInfo, roomInfo);
    } else {
      socket.emit('joinRoom', roomId, userInfo);
    }

    socket.on('gameStateUpdate', (gameState: GameState) => {
      set({ gameState });
    });

    set({ socket });
    set({ roomId });
  },

  disconnectSocket: () => {
    const { socket } = get();

    if (socket) {
      socket.disconnect();
      set({ socket: null, roomId: null, gameState: null });
    }
  },
}));

export default useSocketStore;
