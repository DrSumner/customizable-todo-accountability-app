import { sendSignInLinkToEmail, isSignInWithEmailLink, signInWithEmailLink, onAuthStateChanged, signOut } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from './firebase'; 

const actionCodeSettings = {
  url: 'http://localhost:3000/finishSignUp', // Change this to your actual URL
  handleCodeInApp: true,
};

// Function to initiate the email link sign-in
export async function sendEmailLink(email) {
  try {
    // Send the sign-in email link
    await sendSignInLinkToEmail(auth, email, actionCodeSettings);

    // Save the email to localStorage for later retrieval
    window.localStorage.setItem('emailForSignIn', email);
    console.log('Email sign-in link sent!');
  } catch (error) {
    console.error('Error sending email sign-in link:', error);
  }
}

// Function to complete the email link sign-in
export async function completeSignInWithEmailLink() {
  // Check if the current URL contains the email link
  if (isSignInWithEmailLink(auth, window.location.href)) {
    let email = window.localStorage.getItem('emailForSignIn');

    // if (!email) {
    //   // If the email isn't in localStorage, prompt the user to enter it
    //   email = window.prompt('Please provide your email for confirmation');
    // }

    try {
      // Sign in the user using the email link
      const userCredential = await signInWithEmailLink(auth, email, window.location.href);
      const user = userCredential.user;

      // If it's a new user, store their info in Firestore
      const isNewUser = userCredential.additionalUserInfo?.isNewUser;
      if (isNewUser) {
        await addDoc(collection(db, "users"), {
          uid: user.uid,
          email: email,
          createdAt: new Date(),
        });
      }

      // Store the UID in localStorage for future sessions
      localStorage.setItem('userId', user.uid);
      window.localStorage.removeItem('emailForSignIn');
      console.log('User signed in with email link:', user.uid);
    } catch (error) {
      console.error('Error signing in with email link:', error);
    }
  }
}

// Function to check if a user is already logged in (e.g., stored in localStorage)
export function checkExistingUser() {
  const userId = localStorage.getItem('userId');
  if (userId) {
    return userId;
  }
  return null;
}

// Listener to automatically detect auth state changes
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log('User is logged in:', user.uid);
  } else {
    console.log('No user logged in');
  }
});

export async function signOutUser() {
  try {
    await signOut(auth);
    console.log('User signed out.');
  } catch (error) {
    console.error('Error signing out:', error);
  }
}