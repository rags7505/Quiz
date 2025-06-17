// client/src/pages/TakeQuiz.js
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import API from '../api';

export default function TakeQuiz() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [session, setSession] = useState(null);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(null);
  const [userName, setUserName] = useState('');
  const [started, setStarted] = useState(false);

  useEffect(() => {
    API.get(`/quizzes/${id}`).then(res => setQuiz(res.data));
  }, [id]);

  const startQuiz = async () => {
    const { data } = await API.post(`/quizzes/${id}/start`, { user_name: userName });
    setSession(data);
    setStarted(true);
    localStorage.setItem('guest_name', userName);
    const endTime = new Date(data.started_at).getTime() + quiz.time_limit * 60 * 1000;
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const remaining = endTime - now;
      if (remaining <= 0) {
        clearInterval(interval);
        handleSubmit();
      } else {
        const minutes = Math.floor(remaining / 60000);
        const seconds = Math.floor((remaining % 60000) / 1000);
        setTimeLeft(`${minutes}:${seconds.toString().padStart(2, '0')}`);
      }
    }, 1000);
    return () => clearInterval(interval);
  };

const handleSubmit = async () => {
  const submission = quiz.questions.map((q) => ({
    question_id: q._id,
    answer: answers[q._id] || ''
  }));
  await API.post(`/quizzes/${id}/submit`, {
  session_id: session._id,
  answers: submission
});

  localStorage.setItem(`session_${id}`, session._id);
// ✅ STORE IT!
  navigate(`/results/${id}/${session._id}`);
};

  if (!quiz) return <p className="p-4">Loading...</p>;
  if (!started) return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Enter Your Name to Start</h2>
      <input
        type="text"
        placeholder="Your name"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        className="border p-2 w-full rounded"
      />
      <button
        onClick={startQuiz}
        className="bg-blue-600 text-white px-4 py-2 mt-4 rounded w-full"
        disabled={!userName.trim()}
      >
        Start Quiz
      </button>
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-2">{quiz.title}</h2>
      {timeLeft && <p className="text-red-600 font-bold">⏱ Time Left: {timeLeft}</p>}
      <form className="space-y-4 mt-4">
        {quiz.questions.map((q) => (
          <div key={q._id} className="border p-4 rounded bg-white">
            <p className="font-semibold">{q.text}</p>
            {q.type === 'multiple_choice' && q.options.map((opt) => (
              <label key={opt} className="block">
                <input type="radio" name={q._id} value={opt} onChange={(e) => setAnswers({ ...answers, [q._id]: e.target.value })} className="mr-2" />
                {opt}
              </label>
            ))}
            {q.type === 'true_false' && ['true', 'false'].map((opt) => (
              <label key={opt} className="block">
                <input type="radio" name={q._id} value={opt} onChange={(e) => setAnswers({ ...answers, [q._id]: e.target.value })} className="mr-2" />
                {opt}
              </label>
            ))}
            {q.type === 'text' && (
              <input type="text" className="w-full border p-2 rounded mt-2" onChange={(e) => setAnswers({ ...answers, [q._id]: e.target.value })} />
            )}
          </div>
        ))}
      </form>
      <button onClick={handleSubmit} className="bg-green-600 text-white px-4 py-2 rounded mt-4">Submit</button>
    </div>
  );
}
