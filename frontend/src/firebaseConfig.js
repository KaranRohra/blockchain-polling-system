import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCUCN994bwQlXNl-6_FR8w228Ju57XszjU",
    authDomain: "react-firebase-demo-dbaa6.firebaseapp.com",
    projectId: "react-firebase-demo-dbaa6",
    storageBucket: "react-firebase-demo-dbaa6.appspot.com",
    messagingSenderId: "495435131590",
    appId: "1:495435131590:web:b723577c84bb2af60b05c7",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
