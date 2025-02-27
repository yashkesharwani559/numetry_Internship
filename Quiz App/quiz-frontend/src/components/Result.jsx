import React from 'react';
import { motion } from 'framer-motion';

function Result({ score, totalQuestions, restartQuiz, questions, userAnswers }) {
  const percentage = Math.round((score / totalQuestions) * 100);
  
  let message = '';
  if (percentage >= 90) {
    message = "Excellent! You're a genius!";
  } else if (percentage >= 70) {
    message = 'Great job! You know your stuff!';
  } else if (percentage >= 50) {
    message = 'Good effort! Room for improvement.';
  } else {
    message = "Keep practicing, you'll get better!";
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-100 to-blue-200 text-gray-800 p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-lg rounded-2xl p-8 max-w-lg w-full text-center"
      >
        <h2 className="text-3xl font-bold mb-4 text-green-600">Quiz Completed!</h2>
        <div className="flex flex-col items-center mb-6">
          <motion.div
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-24 h-24 bg-green-500 text-white flex flex-col items-center justify-center rounded-full shadow-lg"
          >
            <span className="text-2xl font-bold">{score}</span>
            <span className="text-sm">out of {totalQuestions}</span>
          </motion.div>
          <p className="text-lg mt-3 font-semibold text-gray-700">{percentage}%</p>
          <p className="text-md text-gray-600 italic">{message}</p>
        </div>
        
        <div className="text-left w-full">
          <h3 className="text-xl font-bold text-blue-600 mb-4">Review Your Answers</h3>
          {questions.map((question, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={`p-4 mb-3 rounded-lg shadow-md ${userAnswers[index] === question.correctAnswer ? 'bg-green-100' : 'bg-red-100'}`}
            >
              <p className="text-gray-800 font-semibold">Q{index + 1}: {question.question}</p>
              <p className="text-gray-700">Your answer: <span className="font-medium">{userAnswers[index]}</span></p>
              <p className="text-gray-700">Correct answer: <span className="font-medium">{question.correctAnswer}</span></p>
            </motion.div>
          ))}
        </div>
        
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={restartQuiz}
          className="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transition duration-300"
        >
          Take Quiz Again
        </motion.button>
      </motion.div>
    </div>
  );
}

export default Result;
