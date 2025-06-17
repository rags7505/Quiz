import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import API from '../api';

export default function QuizForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [quiz, setQuiz] = useState({
    title: '',
    description: '',
    time_limit: 5,
    is_public: true,
    created_by: '',
    questions: [],
  });

useEffect(() => {
  const token = localStorage.getItem('token');
  const payload = token ? JSON.parse(atob(token.split('.')[1])) : null;
  if (!payload || payload.username !== 'Raghava') {
    alert('Only Raghava can access quiz creation');
    navigate('/');
  }
  if (id) API.get(`/quizzes/${id}`).then(res => setQuiz(res.data));
}, [id]);


  const handleChange = (e) => setQuiz({ ...quiz, [e.target.name]: e.target.value });

  const handleQuestionChange = (index, field, value) => {
    const questions = [...quiz.questions];
    questions[index][field] = value;
    setQuiz({ ...quiz, questions });
  };

  const handleOptionChange = (qIndex, oIndex, value) => {
    const questions = [...quiz.questions];
    questions[qIndex].options[oIndex] = value;
    setQuiz({ ...quiz, questions });
  };

  const addQuestion = () => {
    setQuiz({
      ...quiz,
      questions: [...quiz.questions, {
        text: '',
        type: 'multiple_choice',
        options: ['', '', '', ''],
        correct_answer: '',
        points: 1,
      }],
    });
  };

  const removeQuestion = (index) => {
    const questions = quiz.questions.filter((_, i) => i !== index);
    setQuiz({ ...quiz, questions });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) await API.put(`/quizzes/${id}`, quiz);
      else await API.post('/quizzes', quiz);
      navigate('/');
    } catch (err) {
      alert('You are not authorized. Please log in again.');
      localStorage.removeItem('token');
      navigate('/login');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">{id ? 'Edit' : 'Create'} Quiz</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="title" value={quiz.title} onChange={handleChange} placeholder="Title" className="w-full border p-2 rounded" required />
        <input name="description" value={quiz.description} onChange={handleChange} placeholder="Description" className="w-full border p-2 rounded" required />
        <input name="created_by" value={quiz.created_by} onChange={handleChange} placeholder="Created by" className="w-full border p-2 rounded" required />
        <input name="time_limit" type="number" value={quiz.time_limit} onChange={handleChange} placeholder="Time (min)" className="w-full border p-2 rounded" required />

        <div>
          <h3 className="text-lg font-semibold">Questions</h3>
          {quiz.questions.map((q, index) => (
            <div key={index} className="border p-4 rounded bg-gray-50 mt-2">
              <input value={q.text} onChange={e => handleQuestionChange(index, 'text', e.target.value)} placeholder="Question text" className="w-full border p-2 mb-2" />
              <select value={q.type} onChange={e => handleQuestionChange(index, 'type', e.target.value)} className="w-full border p-2 mb-2">
                <option value="multiple_choice">Multiple Choice</option>
                <option value="true_false">True / False</option>
                <option value="text">Text</option>
              </select>
              {q.type === 'multiple_choice' && q.options.map((opt, i) => (
                <input key={i} value={opt} onChange={e => handleOptionChange(index, i, e.target.value)} placeholder={`Option ${i + 1}`} className="w-full border p-2 mb-1" />
              ))}
              <input value={q.correct_answer} onChange={e => handleQuestionChange(index, 'correct_answer', e.target.value)} placeholder="Correct Answer" className="w-full border p-2 mb-2" />
              <input type="number" value={q.points} onChange={e => handleQuestionChange(index, 'points', e.target.value)} placeholder="Points" className="w-full border p-2 mb-2" />
              <button type="button" onClick={() => removeQuestion(index)} className="text-red-600 text-sm">Remove Question</button>
            </div>
          ))}
          <button type="button" onClick={addQuestion} className="bg-blue-600 text-white px-4 py-2 mt-2 rounded">Add Question</button>
        </div>
        <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded">Save Quiz</button>
      </form>
    </div>
  );
}
