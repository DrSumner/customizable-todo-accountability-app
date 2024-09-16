// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInAnonymously } from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyAQ7GuZurjRvtFfeyi5ybhM7x_IbuF0m-Y",
  authDomain: "accountability-todo-app.firebaseapp.com",
  projectId: "accountability-todo-app",
  storageBucket: "accountability-todo-app.appspot.com",
  messagingSenderId: "523900591939",
  appId: "1:523900591939:web:350daa323301bf8aa4d9f6",
  measurementId: "G-NM6H6X2E0T"
};

// Initialize Firebase
  
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
 
export async function signIn() {
  try {
    const userCredential = await signInAnonymously(auth);
    console.log("User signed in:", userCredential.user);
  } catch (error) {
    console.error("Error signing in:", error);
  }
}

export async function addGoal(goal) {
  try {
    const docRef = await addDoc(collection(db, "goals"), {
      goal,
      userId: auth.currentUser.uid
    });
    console.log("Document written with ID:", docRef.id);
  } catch (e) {
    console.error("Error adding document:", e);
  }
}

export async function getGoals() {
  try {
    const querySnapshot = await getDocs(collection(db, "goals"));
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
    });
  } catch (e) {
    console.error("Error getting documents:", e);
  }
}