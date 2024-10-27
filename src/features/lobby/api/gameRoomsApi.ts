import {
  collection,
  addDoc,
  updateDoc,
  getDocs,
  getDoc,
  doc,
  Timestamp,
  increment,
  QueryDocumentSnapshot,
  DocumentData,
} from 'firebase/firestore';

import { db } from '../../../../firebase';

export interface Room {
  id: string;
  name: string;
  maxPlayers: number;
  currentPlayers: number;
  gameStatus: 'waiting' | 'playing';
  rounds: number;
  topic: string;
  isItemsEnabled: boolean;
  isPublic: boolean;
  password?: string;
  createdAt: number;
}

export const serializeFirebaseData = (
  doc: QueryDocumentSnapshot<DocumentData>
): Room => {
  const data = doc.data();

  return {
    id: doc.id,
    ...data,
    createdAt: data.createdAt ? data.createdAt.toMillis() : null,
  } as Room;
};

export const createRoom = async (
  roomData: Omit<Room, 'id' | 'currentPlayers' | 'gameStatus' | 'createdAt'>
): Promise<string> => {
  const docRef = await addDoc(collection(db, 'GameRooms'), {
    ...roomData,
    currentPlayers: 1,
    gameStatus: 'waiting',
    createdAt: Timestamp.now(),
  });
  return docRef.id;
};

export const getRooms = async (): Promise<Room[]> => {
  const querySnapshot = await getDocs(collection(db, 'GameRooms'));
  const rooms = querySnapshot.docs.map(serializeFirebaseData);

  rooms.sort((a, b) => {
    if (a.gameStatus === 'waiting' && b.gameStatus === 'playing') return -1;
    if (a.gameStatus === 'playing' && b.gameStatus === 'waiting') return 1;

    return b.createdAt - a.createdAt;
  });

  return rooms;
};

export const getRoomById = async (roomId: string): Promise<Room | null> => {
  const roomRef = doc(db, 'GameRooms', roomId);
  const roomSnap = await getDoc(roomRef);

  if (roomSnap.exists()) {
    return { id: roomSnap.id, ...roomSnap.data() } as Room;
  }

  return null;
};

export const joinRoom = async (roomId: string): Promise<void> => {
  const roomRef = doc(db, 'GameRooms', roomId);

  return await updateDoc(roomRef, {
    currentPlayers: increment(1),
  });
};

export const updateGameStatus = async (
  roomId: string,
  status: 'waiting' | 'playing'
) => {
  const roomRef = doc(db, 'GameRooms', roomId);
  await updateDoc(roomRef, { gameStatus: status });
};
