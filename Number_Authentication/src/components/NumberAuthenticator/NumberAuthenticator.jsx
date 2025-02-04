import React, { useState, useEffect } from "react";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { motion } from "framer-motion";
import { auth } from "../../FirebaseConfig";

const PhoneAuth = () => {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [showOTPField, setShowOTPField] = useState(false);
  const [recaptchaVerified, setRecaptchaVerified] = useState(false);

  useEffect(() => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
        size: "normal",
        callback: () => setRecaptchaVerified(true),
        "expired-callback": () => setRecaptchaVerified(false),
      });
      window.recaptchaVerifier.render();
    }
  }, []);

  const sendOTP = async () => {
    if (!recaptchaVerified) {
      alert("Please complete the reCAPTCHA first.");
      return;
    }
    try {
      const confirmationResult = await signInWithPhoneNumber(auth, phone, window.recaptchaVerifier);
      window.confirmationResult = confirmationResult;
      setShowOTPField(true);
      alert("OTP Sent!");
    } catch (error) {
      console.error("Error sending OTP:", error);
    }
  };

  const verifyOTP = async () => {
    try {
      await window.confirmationResult.confirm(otp);
      alert("User verified successfully!");
    } catch (error) {
      console.error("OTP verification failed:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 to-pink-500 p-6 text-white">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}
        className="w-full max-w-md bg-white rounded-lg shadow-xl p-6 text-black">
        <h2 className="text-2xl font-bold text-center mb-4 bg-gradient-to-r from-indigo-500 to-blue-500 text-transparent bg-clip-text">Phone Authentication</h2>
        <input
          type="text"
          placeholder="Enter Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="p-3 border border-gray-300 rounded w-full mb-3"
        />
        <div id="recaptcha-container" className="flex justify-center mb-3"></div>
        <button onClick={sendOTP} className="bg-gradient-to-r from-green-400 to-teal-500 text-white px-4 py-2 rounded w-full font-bold hover:scale-105 transition transform duration-300">Send OTP</button>

        {showOTPField && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="mt-4">
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="p-3 border border-gray-300 rounded w-full mb-3"
            />
            <button onClick={verifyOTP} className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-4 py-2 rounded w-full font-bold hover:scale-105 transition transform duration-300">Verify OTP</button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default PhoneAuth;
