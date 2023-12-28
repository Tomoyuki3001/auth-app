import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAlNzASiwBKJAhBk4We5QiG16j-kERU30E",
  authDomain: "auth-app-cdbba.firebaseapp.com",
  projectId: "auth-app-cdbba",
  storageBucket: "auth-app-cdbba.appspot.com",
  messagingSenderId: "692739972991",
  appId: "1:692739972991:web:a0bc0f9606c43d7b5d844a",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { auth, db };

export default app;
