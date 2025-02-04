import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDK5iLmLeJViQ-5nvomNK_Diix9hcrZFUk",
  authDomain: "phoneauth-be977.firebaseapp.com",
  projectId: "phoneauth-be977",
  storageBucket: "phoneauth-be977.appspot.com", // ✅ Fixed storageBucket
  messagingSenderId: "242336055976",
  appId: "1:242336055976:web:9b64161a74b8b57e91789d",
  measurementId: "G-86ZVPREFTB"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
auth.useDeviceLanguage();

// ✅ Function to set up reCAPTCHA verifier (prevents multiple instances)
const setUpRecaptcha = (containerId) => {
  if (!window.recaptchaVerifier) { // Prevent multiple instances
    window.recaptchaVerifier = new RecaptchaVerifier(auth, containerId, {
      size: "invisible",
      callback: (response) => {
        console.log("✅ reCAPTCHA solved:", response);
      },
      "expired-callback": () => {
        console.log("⚠️ reCAPTCHA expired, resetting...");
        window.recaptchaVerifier.clear(); // Clear expired instance
      }
    });
  }
};

// ✅ Function to send OTP
const sendOTP = async (phoneNumber) => {
  try {
    setUpRecaptcha("recaptcha-container");
    const appVerifier = window.recaptchaVerifier;

    if (!appVerifier) {
      throw new Error("❌ reCAPTCHA not initialized properly.");
    }

    const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
    window.confirmationResult = confirmationResult;
    return confirmationResult;
  } catch (error) {
    console.error("❌ Error sending OTP:", error);
    if (window.recaptchaVerifier) {
      window.recaptchaVerifier.clear(); // Reset reCAPTCHA on failure
    }
    throw error;
  }
};

export { auth, sendOTP };



// import { initializeApp } from "firebase/app";
// import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

// const firebaseConfig = {
//   apiKey: "AIzaSyDK5iLmLeJViQ-5nvomNK_Diix9hcrZFUk",
//   authDomain: "phoneauth-be977.firebaseapp.com",
//   projectId: "phoneauth-be977",
//   storageBucket: "phoneauth-be977.firebasestorage.app",
//   messagingSenderId: "242336055976",
//   appId: "1:242336055976:web:9b64161a74b8b57e91789d",
//   measurementId: "G-86ZVPREFTB"
// };


// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// auth.useDeviceLanguage();

// // Function to set up reCAPTCHA verifier
// const setUpRecaptcha = (containerId) => {
//   window.recaptchaVerifier = new RecaptchaVerifier(containerId, {
//     size: "invisible",
//     callback: (response) => {
//       console.log("reCAPTCHA solved, ready for authentication", response);
//     },
//     "expired-callback": () => {
//       console.log("reCAPTCHA expired, reset required");
//     }
//   }, auth);
// };

// // Function to send OTP
// const sendOTP = async (phoneNumber) => {
//   try {
//     setUpRecaptcha("recaptcha-container");
//     const appVerifier = window.recaptchaVerifier;
//     const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
//     window.confirmationResult = confirmationResult;
//     return confirmationResult;
//   } catch (error) {
//     console.error("Error sending OTP:", error);
//     throw error;
//   }
// };

// export { auth, sendOTP };
