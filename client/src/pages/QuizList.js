import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../api';

export default function QuizList() {
  const [quizzes, setQuizzes] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    API.get('/quizzes').then(res => setQuizzes(res.data));
    const token = localStorage.getItem('token');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      if (payload.username === 'Raghava') setIsAdmin(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };

  const handleDelete = async (quizId) => {
    if (window.confirm('Are you sure you want to delete this quiz?')) {
      try {
        await API.delete(`/quizzes/${quizId}`);
        setQuizzes(quizzes.filter(q => q._id !== quizId));
      } catch (err) {
        alert('Failed to delete quiz');
      }
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Quizzes</h1>
        {isAdmin ? (
          <div className="flex space-x-4 items-center">
            <span className="text-gray-600">Welcome, Raghava</span>
            <Link to="/create" className="bg-blue-600 text-white px-4 py-2 rounded">Create Quiz</Link>
            <button onClick={handleLogout} className="text-red-600 font-semibold">Logout</button>
          </div>
        ) : (
          <Link to="/login" className="bg-gray-800 text-white px-4 py-2 rounded">Login</Link>
        )}
      </div>

      <ul className="space-y-4">
        {quizzes.map((q) => (
          <li key={q._id} className="border p-4 rounded bg-white shadow">
            <h3 className="text-xl font-semibold">{q.title}</h3>
            <p>{q.description}</p>
            {isAdmin && (
              <div className="text-sm mt-2 text-gray-600">
                <p>Time: {q.time_limit} mins</p>
                <p>Created by: {q.created_by}</p>
              </div>
            )}
            <div className="flex flex-wrap gap-4 mt-4">
              {isAdmin ? (
                <>
                  <Link to={`/edit/${q._id}`} className="text-blue-600 hover:underline">✏️ Edit</Link>
                  <Link to={`/analytics/${q._id}`} className="text-purple-600 hover:underline">📊 Analytics</Link>
                  <button
                    onClick={() => handleDelete(q._id)}
                    className="text-red-600 hover:underline"
                  >
                    🗑️ Delete
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => navigate(`/take/${q._id}`)}
                    className="bg-blue-600 text-white px-3 py-1 rounded"
                  >
                    ▶ Start Quiz
                  </button>

                  {localStorage.getItem(`session_${q._id}`) && (
                    <button
                      onClick={() =>
                        navigate(`/results/${q._id}/${localStorage.getItem(`session_${q._id}`)}`)
                      }
                      className="text-green-600 hover:underline"
                    >
                      ✅ Check My Score
                    </button>
                  )}
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
