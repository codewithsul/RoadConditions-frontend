import { initializeApp, getApps } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
};

//KEYS

// const firebaseConfig = {
//   apiKey: "AIzaSyCooj-obyxipzAjr74KSB1ryws79l7X3Mk",
//   authDomain: "realtimecongestionsystem.firebaseapp.com",
//   projectId: "realtimecongestionsystem",
//   storageBucket: "realtimecongestionsystem.appspot.com",
//   messagingSenderId: "1056763868419",
//   appId: "1:1056763868419:web:b9a4b5199b375e9e7e2536",
// };

if (!getApps().length) {
  initializeApp(firebaseConfig);
}

export const auth = getAuth();
export const googleAuthProvider = new GoogleAuthProvider();
