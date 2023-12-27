import { initializeApp , getApps } from "firebase/app";
import { collection, doc, setDoc  , getDocs , getFirestore , where , query , deleteDoc  , updateDoc , increment  , getDoc  , orderBy , limit , or } from "firebase/firestore";
import { signInWithEmailAndPassword , getAuth , signOut , updatePassword  , createUserWithEmailAndPassword , onAuthStateChanged , updateProfile  , fetchSignInMethodsForEmail   } from 'firebase/auth';
import { getStorage, ref, uploadBytes, getDownloadURL  , refFromURL, deleteObject } from 'firebase/storage';



const firebaseConfig = {
  apiKey: "AIzaSyBAgw62YHq8wQMb3f9C2baYoyo8aCfTTus",
  authDomain: "ju-health-reminder.firebaseapp.com",
  projectId: "ju-health-reminder",
  storageBucket: "ju-health-reminder.appspot.com",
  messagingSenderId: "440671774416",
  appId: "1:440671774416:web:58bfed44382981257da0d5",
  measurementId: "G-C6Q7DFMGYE"
};



  
   const FIREBASE_APP = initializeApp(firebaseConfig);
   const auth = getAuth(FIREBASE_APP);
   const db = getFirestore(FIREBASE_APP);
   const storage = getStorage(FIREBASE_APP);




   export { FIREBASE_APP , auth , db ,
    createUserWithEmailAndPassword, signInWithEmailAndPassword,
    onAuthStateChanged , setDoc , doc , where , query , collection , getDocs   , deleteDoc , updateDoc , increment , getDoc  , signOut , orderBy ,limit , updatePassword  , updateProfile , fetchSignInMethodsForEmail , storage , ref , getDownloadURL , uploadBytes , refFromURL, deleteObject , or  }