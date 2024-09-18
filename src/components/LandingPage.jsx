import React, { useEffect, useState } from "react";
import Goals from "./Goals";
import { sendEmailLink, checkExistingUser, completeSignInWithEmailLink } from '../Backend/Auth';

const LandingPage = () => {
  const [userId, setUserId] = useState(null);
  const [email, setEmail] = useState('');
  const [statusMessage, setStatusMessage] = useState(''); // New state to store status messages

  useEffect(() => {
    // Check if there's an existing user (from localStorage)
    const existingUserId = checkExistingUser();
    if (existingUserId) {
      setUserId(existingUserId);
    }

    // Check if we need to complete an email sign-in (if they clicked the email link)
    completeSignInWithEmailLink().then((loggedInUserId) => {
      if (loggedInUserId) {
        setUserId(loggedInUserId);
      }
    });

  }, []);

  const handleLogin = async () => {
    if (email.trim()) {
      try {
        await sendEmailLink(email);
        setStatusMessage("A sign-in link has been sent to your email. Please check your inbox.");
      } catch (error) {
        setStatusMessage("Failed to send email link. Please try again.");
      }
    } else {
      setStatusMessage("Please enter a valid email address.");
    }
  };

  return (
    <div>
      { userId 
        ? <Goals/> 
        : <div>
            <h2>Welcome! Please enter your email</h2>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
            <button onClick={handleLogin}>Submit</button>

            {/* Render the status message on the page */}
            {statusMessage && <p>{statusMessage}</p>}
          </div>
      }
    </div>
  );
};

export default LandingPage;
