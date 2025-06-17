const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  text: String,
  type: { type: String, enum: ['multiple_choice', 'true_false', 'text'] },
  options: [String],
  correct_answer: mongoose.Schema.Types.Mixed,
  points: Number,
});

const QuizSchema = new mongoose.Schema({
  title: String,
  description: String,
  time_limit: Number,
  is_public: Boolean,
  created_by: String,
  questions: [QuestionSchema],
});

module.exports = mongoose.model('Quiz', QuizSchema);
