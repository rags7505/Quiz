const mongoose = require('mongoose');

const AnswerSchema = new mongoose.Schema({
  question_id: String,
  answer: mongoose.Schema.Types.Mixed
});

const QuizSessionSchema = new mongoose.Schema({
  quiz_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' },
  user_name: String,
  started_at: Date,
  completed_at: Date,
  score: Number,
  answers: [AnswerSchema]
});

module.exports = mongoose.model('QuizSession', QuizSessionSchema);
