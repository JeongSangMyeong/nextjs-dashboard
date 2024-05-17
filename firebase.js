// firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCTsj5BpPz2E8FFscXxlv3GUjLUrLmXjqc",
    authDomain: "itsmart-7f641.firebaseapp.com",
    projectId: "itsmart-7f641",
    storageBucket: "itsmart-7f641.appspot.com",
    messagingSenderId: "703465201162",
    appId: "1:703465201162:web:6c577bec2aacaf99c009f3",
    measurementId: "G-RY2HQV8Q0C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
