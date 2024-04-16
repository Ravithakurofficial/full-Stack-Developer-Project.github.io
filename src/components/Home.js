import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import CloudinaryImage from "./CloudinaryImage";
import axios from "axios";

function Home() {
  const location = useLocation();
  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (location.state && location.state.email) {
      setEmail(location.state.email);
    }
  }, [location.state]);

  const handleResendEmail = async () => {
    const apiUrl = "http://localhost:3000/api/resend-email"; // Update with your backend API URL

    try {
      const response = await axios.post(apiUrl, { email });
      console.log("Verification email sent:", response.data);
      setEmailSent(true);
      alert("Verification email has been sent. Check your inbox!");
    } catch (error) {
      console.error("Error resending verification email:", error.message);
      alert("Failed to resend verification email. Please try again.");
    }
  };

  return (
    <div>
      <h1>Welcome to Home!</h1>
      {email && <p>Your email: {email}</p>}
      {!emailSent && (
        <button onClick={handleResendEmail}>Resend Verification Email</button>
      )}
      {emailSent && <p>Verification email has been sent. Check your inbox!</p>}
      {email && (
        <div>
          <p>Your profile image:</p>
          <CloudinaryImage email={email} />
        </div>
      )}
    </div>
  );
}

export default Home;
