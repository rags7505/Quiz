const Quiz = require('../models/Quiz');
const QuizSession = require('../models/QuizSession');
const redisClient = require('../config/redis');

exports.createQuiz = async (req, res) => {
  const quiz = new Quiz(req.body);
  await quiz.save();
  res.status(201).json(quiz);
};

exports.getAllQuizzes = async (req, res) => {
  const quizzes = await Quiz.find();
  res.json(quizzes);
};

exports.getQuizById = async (req, res) => {
  const quiz = await Quiz.findById(req.params.id);
  res.json(quiz);
};

exports.updateQuiz = async (req, res) => {
  const quiz = await Quiz.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(quiz);
};

exports.deleteQuiz = async (req, res) => {
  await Quiz.findByIdAndDelete(req.params.id);
  res.json({ message: 'Quiz deleted' });
};

exports.startQuiz = async (req, res) => {
  const { user_name } = req.body;
  const quiz = await Quiz.findById(req.params.id);
  const session = new QuizSession({
    quiz_id: quiz._id,
    user_name,
    started_at: new Date(),
    score: 0,
    answers: [],
  });
  await session.save();
  await redisClient.set(`session:${session._id}`, 'active', {
    EX: quiz.time_limit * 60
  });
  res.status(201).json(session);
};

exports.submitQuiz = async (req, res) => {
  const { session_id, answers } = req.body;
  const redisKey = `session:${session_id}`;
  const exists = await redisClient.get(redisKey);
  if (!exists) return res.status(403).json({ error: 'Session expired or already submitted' });

  const session = await QuizSession.findById(session_id);
  const quiz = await Quiz.findById(session.quiz_id);

  let score = 0;
  answers.forEach(ans => {
    const q = quiz.questions.id(ans.question_id);
    if (q && String(q.correct_answer) === String(ans.answer)) {
      score += q.points;
    }
  });

  session.completed_at = new Date();
  session.answers = answers;
  session.score = score;
  await session.save();
  await redisClient.del(redisKey);

  res.json({ message: 'Submitted', score });
};

exports.getResult = async (req, res) => {
  const session = await QuizSession.findById(req.params.session_id);
  res.json(session);
};

exports.getAnalytics = async (req, res) => {
  const { id } = req.params;

  const allSessions = await QuizSession.find({ quiz_id: id }).sort({ started_at: -1 });

  // Filter latest score per user
  const latestByUser = {};
  for (const session of allSessions) {
    if (!latestByUser[session.user_name]) {
      latestByUser[session.user_name] = session;
    }
  }

  const uniqueAttempts = Object.values(latestByUser);

  const averageScore =
    uniqueAttempts.reduce((sum, s) => sum + (s.score || 0), 0) /
    (uniqueAttempts.length || 1);

  res.json({
    attempts: uniqueAttempts.length,
    averageScore,
    results: uniqueAttempts.map(s => ({
      name: s.user_name,
      score: s.score,
      submitted_at: s.submitted_at,
    })),
  });
};
exports.deleteQuiz = async (req, res) => {
  const { id } = req.params;
  try {
    await Quiz.findByIdAndDelete(id);
    await QuizSession.deleteMany({ quiz_id: id }); // optional: delete attempts too
    res.json({ message: 'Quiz deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete quiz' });
  }
};

