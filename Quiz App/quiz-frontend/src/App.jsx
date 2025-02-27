import React, { useState, useEffect } from 'react';
import './App.css';
import QuizStart from './components/QuizStart';
import Question from './components/Question';
import Result from './components/Result';
import axios from 'axios';

function App() {
  const [quizState, setQuizState] = useState('start'); // start, quiz, result
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (quizState === 'quiz') {
      fetchQuestions();
    }
  }, [quizState]);

  const fetchQuestions = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/questions');
      setQuestions(response.data);
      // Initialize answers array with null values
      setAnswers(new Array(response.data.length).fill(null));
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch questions. Please try again later.');
      setLoading(false);
    }
  };

  const startQuiz = () => {
    setQuizState('quiz');
    setScore(0);
    setCurrentQuestion(0);
  };

  const handleAnswer = (selectedOption) => {
    // Save the user's answer
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = selectedOption;
    setAnswers(newAnswers);

    // Check if answer is correct
    if (selectedOption === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    // Move to next question or end quiz
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Save quiz results to the database
      saveQuizResults();
      setQuizState('result');
    }
  };

  const saveQuizResults = async () => {
    try {
      await axios.post('http://localhost:5000/api/results', {
        score,
        totalQuestions: questions.length,
        answers,
        date: new Date()
      });
    } catch (err) {
      console.error('Failed to save quiz results:', err);
    }
  };

  const restartQuiz = () => {
    setQuizState('start');
    setScore(0);
    setCurrentQuestion(0);
    setAnswers([]);
  };

  if (loading) {
    return <div className="app">Loading questions...</div>;
  }

  if (error) {
    return <div className="app error">{error}</div>;
  }

  return (
    <div className="app">
      
      {quizState === 'start' && <QuizStart startQuiz={startQuiz} />}
      
      {quizState === 'quiz' && questions.length > 0 && (
        <Question 
          question={questions[currentQuestion]} 
          questionNumber={currentQuestion + 1} 
          totalQuestions={questions.length}
          onAnswerSelected={handleAnswer} 
        />
      )}
      
      {quizState === 'result' && (
        <Result 
          score={score} 
          totalQuestions={questions.length} 
          restartQuiz={restartQuiz} 
          questions={questions}
          userAnswers={answers}
        />
      )}
    </div>
  );
}

export default App;