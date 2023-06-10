import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyDDG944DhXASLIbL_EaEAUQSVrPLGjt__U",
  authDomain: "cigritous.firebaseapp.com",
  projectId: "cigritous",
  storageBucket: "cigritous.appspot.com",
  messagingSenderId: "765609795512",
  appId: "1:765609795512:web:9a2872e4b13de75100794d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
