// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAQ7GuZurjRvtFfeyi5ybhM7x_IbuF0m-Y",
  authDomain: "accountability-todo-app.firebaseapp.com",
  projectId: "accountability-todo-app",
  storageBucket: "accountability-todo-app.appspot.com",
  messagingSenderId: "523900591939",
  appId: "1:523900591939:web:350daa323301bf8aa4d9f6",
  measurementId: "G-NM6H6X2E0T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);