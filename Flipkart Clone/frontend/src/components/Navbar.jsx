import React, { useState } from "react";
import { ShoppingCart, Search, User, Store, MoreVertical, X } from "lucide-react";
import Login from "./Login"; // Import the Login component

const Navbar = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      {/* Navbar */}
      <nav className="bg-white px-8 py-4 flex justify-between mb-3 items-center shadow-md">
        {/* Left Section: Logo */}
        <div className="flex flex-col leading-tight">
          <span className="text-[#2874F0] text-4xl font-bold">Flipkart</span>
          <span className="text-gray-500 text-sm">
            Explore <span className="text-yellow-500 font-semibold">Plus</span> ✨
          </span>
        </div>

        {/* Middle Section: Search Bar */}
        <div className="flex items-center bg-gray-100 px-4 py-3 rounded-lg w-2/5">
          <Search className="text-gray-500" size={24} />
          <input
            type="text"
            placeholder="Search for Products, Brands and More"
            className="ml-3 w-full bg-transparent outline-none text-lg text-gray-700 placeholder-gray-500"
          />
        </div>

        {/* Right Section: Navbar Options */}
        <div className="flex items-center gap-8 text-lg">
          <div
            className="flex items-center gap-2 cursor-pointer hover:text-gray-600"
            onClick={() => setShowLogin(true)} // Open login modal
          >
            <User size={24} />
            <span className="font-medium">Login</span>
          </div>
          <div className="flex items-center gap-2 cursor-pointer hover:text-gray-600">
            <ShoppingCart size={24} />
            <span className="font-medium">Cart</span>
          </div>
          <div className="flex items-center gap-2 cursor-pointer hover:text-gray-600">
            <Store size={24} />
            <span className="font-medium">Become a Seller</span>
          </div>
          <div className="cursor-pointer hover:text-gray-600">
            <MoreVertical size={24} />
          </div>
        </div>
      </nav>

      {/* Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="relative bg-white p-6 rounded-lg shadow-lg w-[750px]">
            {/* Close Button */}
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={() => setShowLogin(false)}
            >
              <X size={24} />
            </button>
            {/* Render the Login Component */}
            <Login />
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
