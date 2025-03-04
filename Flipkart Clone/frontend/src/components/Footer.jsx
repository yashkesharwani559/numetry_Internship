import React from "react";
import { FaFacebookF, FaXTwitter, FaYoutube, FaInstagram } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-black text-white text-xl">
      {/* Upper Footer Section */}
      <div className="max-w-[1200px] mx-auto px-4 py-6 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
        <div>
          <h3 className="font-semibold text-gray-400 mb-2">ABOUT</h3>
          <ul className="space-y-1">
            <li><a href="#" className="hover:underline">Contact Us</a></li>
            <li><a href="#" className="hover:underline">About Us</a></li>
            <li><a href="#" className="hover:underline">Careers</a></li>
            <li><a href="#" className="hover:underline">Flipkart Stories</a></li>
            <li><a href="#" className="hover:underline">Press</a></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-gray-400 mb-2">HELP</h3>
          <ul className="space-y-1">
            <li><a href="#" className="hover:underline">Payments</a></li>
            <li><a href="#" className="hover:underline">Shipping</a></li>
            <li><a href="#" className="hover:underline">Cancellation & Returns</a></li>
            <li><a href="#" className="hover:underline">FAQ</a></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-gray-400 mb-2">CONSUMER POLICY</h3>
          <ul className="space-y-1">
            <li><a href="#" className="hover:underline">Terms of Use</a></li>
            <li><a href="#" className="hover:underline">Security</a></li>
            <li><a href="#" className="hover:underline">Privacy</a></li>
            <li><a href="#" className="hover:underline">Sitemap</a></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-gray-400 mb-2">GROUP COMPANIES</h3>
          <ul className="space-y-1">
            <li><a href="#" className="hover:underline">Myntra</a></li>
            <li><a href="#" className="hover:underline">Cleartrip</a></li>
            <li><a href="#" className="hover:underline">Shopsy</a></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-gray-400 mb-2">Mail Us:</h3>
          <p className="text-gray-300 text-xs">
            Flipkart Internet Private Limited,<br />
            Buildings Alyssa, Begonia & Clove Embassy Tech Village,<br />
            Bengaluru, Karnataka, 560103, India
          </p>
        </div>
        <div>
          <h3 className="font-semibold text-gray-400 mb-2">Follow Us:</h3>
          <div className="flex space-x-4 text-lg">
            <a href="#" className="hover:text-gray-400"><FaFacebookF /></a>
            <a href="#" className="hover:text-gray-400"><FaXTwitter /></a>
            <a href="#" className="hover:text-gray-400"><FaYoutube /></a>
            <a href="#" className="hover:text-gray-400"><FaInstagram /></a>
          </div>
        </div>
      </div>

      {/* Lower Footer Section */}
      <div className="border-t border-gray-700 py-4 text-center text-xs text-gray-400">
        <div className="flex flex-col md:flex-row justify-between max-w-[1200px] mx-auto px-4">
          <div className="flex space-x-6">
            <a href="#" className="hover:underline">Become a Seller</a>
            <a href="#" className="hover:underline">Advertise</a>
            <a href="#" className="hover:underline">Gift Cards</a>
            <a href="#" className="hover:underline">Help Center</a>
          </div>
          <div className="mt-2 md:mt-0">
            © 2007-2025 Flipkart.com
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
