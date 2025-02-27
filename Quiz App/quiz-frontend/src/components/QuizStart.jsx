import React from "react";
import { motion } from "framer-motion";

function QuizStart({ startQuiz }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 text-gray-800">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-lg rounded-2xl p-8 max-w-md text-center"
      >
        <h2 className="text-3xl font-bold mb-4 text-blue-600">Welcome to the Quiz!</h2>
        <p className="text-lg mb-2">Test your knowledge with 10 interesting questions.</p>
        <p className="text-lg mb-6">Ready to begin?</p>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={startQuiz}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transition duration-300"
        >
          Start Quiz
        </motion.button>
      </motion.div>
    </div>
  );
}

export default QuizStart;