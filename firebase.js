import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyA0KCupGBP0r_UdwDh2TI8GYrDD4L570QA',
  authDomain: 'doodle-play.firebaseapp.com',
  projectId: 'doodle-play',
  storageBucket: 'doodle-play.appspot.com',
  messagingSenderId: '308324721454',
  appId: '1:308324721454:web:18c66a4a5756695aad50bf',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
