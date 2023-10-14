import { initializeApp } from "firebase/app";
import {
    getFirestore,
    collection,
    getDocs,
    addDoc,
    doc,
    deleteDoc,
    updateDoc,
} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAOugmwmLXdFo6bDSCLcNE_4wvUPVrEbDk",
    authDomain: "mdp-freedom.firebaseapp.com",
    projectId: "mdp-freedom",
    storageBucket: "mdp-freedom.appspot.com",
    messagingSenderId: "368750139198",
    appId: "1:368750139198:web:b579ca190775e8768cbe6f",
    measurementId: "G-R11FVYC8RW"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, getDocs, addDoc, doc, deleteDoc, updateDoc };