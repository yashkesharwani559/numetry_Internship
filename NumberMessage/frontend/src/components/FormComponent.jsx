import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const FormComponent = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("");

    try {
      const response = await axios.post("http://localhost:5000/send-message", {
        phoneNumber,
        message,
      });
      setStatus(response.data.success);
    } catch (error) {
      setStatus(error.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <motion.div
      className="max-w-lg mx-auto p-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-2xl shadow-lg relative overflow-hidden"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Animated Background Effect */}
      <motion.div
        className="absolute -top-10 -left-10 w-40 h-40 bg-white opacity-20 rounded-full"
        animate={{ x: [0, 20, 0], y: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 3 }}
      />
      <motion.div
        className="absolute -bottom-10 -right-10 w-40 h-40 bg-white opacity-20 rounded-full"
        animate={{ x: [0, -20, 0], y: [0, -20, 0] }}
        transition={{ repeat: Infinity, duration: 3 }}
      />

      <h2 className="text-3xl font-bold text-center mb-4">Send a Message 📩</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <motion.input
          type="text"
          placeholder="Enter Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="w-full p-3 border-none rounded-lg text-black focus:ring-2 focus:ring-indigo-400"
          required
          whileFocus={{ scale: 1.05 }}
        />
        <motion.textarea
          placeholder="Enter Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full p-3 border-none rounded-lg text-black focus:ring-2 focus:ring-indigo-400"
          required
          whileFocus={{ scale: 1.05 }}
        />
        <motion.button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-lg shadow-lg"
          whileHover={{ scale: 1.05 }}
        >
          Send Message 🚀
        </motion.button>
        {status && <p className="text-center text-lg">{status}</p>}
      </form>
    </motion.div>
  );
};

export default FormComponent;
