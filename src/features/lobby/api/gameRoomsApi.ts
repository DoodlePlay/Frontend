import {
  collection,
  addDoc,
  updateDoc,
  getDocs,
  getDoc,
  doc,
} from 'firebase/firestore';

import { db } from '../../../../firebase';

export const createRoom = async roomData => {
  const docRef = await addDoc(collection(db, 'GameRooms'), {
    ...roomData,
    currentPlayers: 1,
    gameStatus: 'waiting',
    createdAt: new Date(),
  });
  return docRef.id;
};
