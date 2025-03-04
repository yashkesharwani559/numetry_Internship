import React, { useState } from "react";
import loginIllustration from "../assets/uploads/login-illustration.png";
import Signup from "./Signup";

const Login = () => {
  const [showSignup, setShowSignup] = useState(false);

  if (showSignup) {
    return <Signup />;
  }

  return (
    <div className="flex justify-center items-center w-full bg-gray-200">
      <div className="flex w-full max-w-[1200px] bg-white shadow-lg rounded-lg">
        {/* Left Section (Blue Side) */}
        <div className="w-2/5 bg-[#1976D2] p-8 text-white flex flex-col justify-center rounded-l-lg">
          <h1 className="text-2xl font-bold">Login</h1>
          <p className="mt-2 text-sm">
            Get access to your Orders, Wishlist, and Recommendations
          </p>
          <img
            src={loginIllustration}
            alt="Login Illustration"
            className="mt-8"
          />
        </div>

        {/* Right Section (Form) */}
        <div className="w-3/5 p-8">
          <label className="text-gray-600 text-sm">Enter Email/Mobile number</label>
          <input
            type="text"
            className="w-full border-b-2 border-gray-300 focus:border-blue-500 outline-none py-2 mt-1 text-lg"
          />
          <p className="text-xs text-gray-500 mt-4">
            By continuing, you agree to Flipkart's{" "}
            <span className="text-blue-500 cursor-pointer">Terms of Use</span> and{" "}
            <span className="text-blue-500 cursor-pointer">Privacy Policy</span>.
          </p>

          <button className="w-full bg-orange-500 text-white font-bold py-3 mt-6 rounded-sm hover:bg-orange-600">
            Request OTP
          </button>

          <div className="text-center mt-12">
            <p className="text-sm">New to Flipkart?</p>
            <button 
              className="text-blue-500 font-semibold cursor-pointer mt-2"
              onClick={() => setShowSignup(true)}
            >
              Create an account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
