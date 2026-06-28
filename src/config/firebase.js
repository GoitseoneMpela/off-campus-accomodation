import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBldd_MifSg6F5SodCTbd8tjts1XxltW-w",
  authDomain: "accom-793e5.firebaseapp.com",
  projectId: "accom-793e5",
  storageBucket: "accom-793e5.firebasestorage.app",
  messagingSenderId: "1096528511155",
  appId: "1:1096528511155:web:53c157cb3bb89ca25df0c6",
  measurementId: "G-B45RFS5WHG"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth =getAuth(app);
export const db = getFirestore(app);