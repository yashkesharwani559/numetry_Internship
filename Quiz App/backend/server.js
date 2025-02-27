const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Initialize Express
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI ,{
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('MongoDB connection error:', err));

// Define MongoDB schemas and models
const questionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  options: {
    type: [String],
    required: true,
    validate: v => Array.isArray(v) && v.length === 4 // Ensure 4 options
  },
  correctAnswer: {
    type: String,
    required: true,
    validate: function(v) {
      return this.options.includes(v); // Ensure correctAnswer is one of the options
    }
  },
  category: {
    type: String,
    default: 'General Knowledge'
  }
});

const resultSchema = new mongoose.Schema({
  score: {
    type: Number,
    required: true
  },
  totalQuestions: {
    type: Number,
    required: true
  },
  answers: {
    type: [String],
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Question = mongoose.model('Question', questionSchema);
const Result = mongoose.model('Result', resultSchema);

// API Routes
// Get 10 random questions
app.get('/api/questions', async (req, res) => {
  try {
    const questions = await Question.aggregate([
      { $sample: { size: 10 } } // Get 10 random questions
    ]);
    
    // If we don't have enough questions, add some default ones
    if (questions.length < 10) {
      await seedQuestionsIfEmpty();
      const newQuestions = await Question.aggregate([
        { $sample: { size: 10 } }
      ]);
      return res.json(newQuestions);
    }
    
    res.json(questions);
  } catch (err) {
    console.error('Error fetching questions:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Save quiz result
app.post('/api/results', async (req, res) => {
  try {
    const { score, totalQuestions, answers, date } = req.body;
    
    const newResult = new Result({
      score,
      totalQuestions,
      answers,
      date
    });
    
    await newResult.save();
    res.status(201).json({ message: 'Result saved successfully' });
  } catch (err) {
    console.error('Error saving result:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get all results (could be used for an admin page or leaderboard)
app.get('/api/results', async (req, res) => {
  try {
    const results = await Result.find().sort({ date: -1 });
    res.json(results);
  } catch (err) {
    console.error('Error fetching results:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Function to seed default questions if DB is empty
async function seedQuestionsIfEmpty() {
  const count = await Question.countDocuments();
  
  if (count === 0) {
    const defaultQuestions = [
      {
        text: "What is the capital of France?",
        options: ["London", "Berlin", "Paris", "Madrid"],
        correctAnswer: "Paris",
        category: "Geography"
      },
      {
        text: "Which planet is known as the Red Planet?",
        options: ["Mars", "Venus", "Jupiter", "Mercury"],
        correctAnswer: "Mars",
        category: "Science"
      },
      {
        text: "Who painted the Mona Lisa?",
        options: ["Vincent van Gogh", "Leonardo da Vinci", "Pablo Picasso", "Michelangelo"],
        correctAnswer: "Leonardo da Vinci",
        category: "Art"
      },
      {
        text: "What is the largest ocean on Earth?",
        options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
        correctAnswer: "Pacific Ocean",
        category: "Geography"
      },
      {
        text: "Which element has the chemical symbol 'O'?",
        options: ["Gold", "Oxygen", "Osmium", "Oganesson"],
        correctAnswer: "Oxygen",
        category: "Science"
      },
      {
        text: "In which year did World War II end?",
        options: ["1943", "1945", "1947", "1950"],
        correctAnswer: "1945",
        category: "History"
      },
      {
        text: "Which programming language is often used for web development?",
        options: ["Java", "C++", "JavaScript", "Swift"],
        correctAnswer: "JavaScript",
        category: "Technology"
      },
      {
        text: "What is the square root of 144?",
        options: ["12", "14", "10", "16"],
        correctAnswer: "12",
        category: "Mathematics"
      },
      {
        text: "Who wrote 'Romeo and Juliet'?",
        options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
        correctAnswer: "William Shakespeare",
        category: "Literature"
      },
      {
        text: "Which country is known as the Land of the Rising Sun?",
        options: ["China", "Thailand", "Japan", "South Korea"],
        correctAnswer: "Japan",
        category: "Geography"
      },
      {
        text: "What is the currency of Australia?",
        options: ["Euro", "Dollar", "Pound", "Australian Dollar"],
        correctAnswer: "Australian Dollar",
        category: "Finance"
      },
      {
        text: "Who discovered penicillin?",
        options: ["Marie Curie", "Alexander Fleming", "Louis Pasteur", "Robert Koch"],
        correctAnswer: "Alexander Fleming",
        category: "Science"
      }
    ];
    
    await Question.insertMany(defaultQuestions);
    console.log('Database seeded with default questions');
  }
}

// Call the seed function when the server starts
seedQuestionsIfEmpty().catch(err => console.error('Seeding error:', err));

// Set port and start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});