import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAw03PxUy6CPEZpk7AIL8RMMDXrOijTPaE",
    authDomain: "anon-2caa8.firebaseapp.com",
    projectId: "anon-2caa8",
    storageBucket: "anon-2caa8.appspot.com",
    messagingSenderId: "916385749421",
    appId: "1:916385749421:web:6df27b61a138da112e2924"
};


const app = initializeApp(firebaseConfig);
const fireDB=getFirestore(app);
const auth=getAuth(app);

export {fireDB, auth};