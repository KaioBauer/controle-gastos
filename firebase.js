import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp, getApps } from 'firebase/app';
import {
    getAuth,
    createUserWithEmailAndPassword,
    signOut,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
} from 'firebase/auth';
import {
    getFirestore,
    doc,
    setDoc,
    getDoc,
    addDoc,
    collection,
    getDocs,
    query,
    where,
    orderBy,
    deleteDoc,
    updateDoc
} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBjylCeZQP7BcY9sL7O0tyGNVrThwFO5VA",
    authDomain: "controle-gastos-85b7d.firebaseapp.com",
    projectId: "controle-gastos-85b7d",
    storageBucket: "controle-gastos-85b7d.firebasestorage.app",
    messagingSenderId: "474375724474",
    appId: "1:474375724474:web:63d078f75a8f006547d183"
};

// evita erro de duplicação de app
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

const auth = getAuth(app);
const db = getFirestore(app);

export {
    auth,
    db,
    createUserWithEmailAndPassword,
    signOut,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    doc,
    setDoc,
    getDoc,
    addDoc,
    collection,
    getDocs,
    query,
    where,
    orderBy,
    deleteDoc,
    updateDoc
};
