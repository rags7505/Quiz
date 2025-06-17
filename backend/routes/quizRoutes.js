const express = require('express');
const router = express.Router();
const quizCtrl = require('../controllers/quizController');
const { verifyAdmin } = require('../middleware/auth');

router.post('/quizzes', verifyAdmin, quizCtrl.createQuiz);
router.put('/quizzes/:id', verifyAdmin, quizCtrl.updateQuiz);
router.delete('/quizzes/:id', verifyAdmin, quizCtrl.deleteQuiz);

router.get('/quizzes', quizCtrl.getAllQuizzes);
router.get('/quizzes/:id', quizCtrl.getQuizById);
router.post('/quizzes/:id/start', quizCtrl.startQuiz);
router.post('/quizzes/:id/submit', quizCtrl.submitQuiz);
router.get('/quizzes/:id/results/:session_id', quizCtrl.getResult);
router.get('/quizzes/:id/analytics', verifyAdmin, quizCtrl.getAnalytics);
router.delete('/quizzes/:id', verifyAdmin, quizCtrl.deleteQuiz);

module.exports = router;
