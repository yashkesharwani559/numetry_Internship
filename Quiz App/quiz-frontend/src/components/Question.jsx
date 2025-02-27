import React from 'react';
import { motion } from 'framer-motion';

function Question({ question, questionNumber, totalQuestions, onAnswerSelected }) {

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 text-gray-800 p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-lg rounded-2xl p-8 max-w-lg w-full text-center"
      >
        <div className="text-lg font-medium text-blue-600 mb-4">
          Question {questionNumber} of {totalQuestions}
        </div>
        <h2 className="text-2xl font-bold mb-6 text-gray-900">{question.question}</h2>
        <div className="grid grid-cols-1 gap-4">
          {question.options.map((option, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onAnswerSelected(option)}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300"
            >
              {option}
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default Question;