
// client/src/pages/Result.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api';

export default function Result() {
  const { id, session_id } = useParams();
  const navigate = useNavigate();
  const [result, setResult] = useState(null);

  useEffect(() => {
    API.get(`/quizzes/${id}/results/${session_id}`).then(res => {
      const guest = localStorage.getItem('guest_name');
      if (res.data.user_name !== guest && guest !== 'Raghava') {
        alert('You are not authorized to view this result');
        navigate('/');
      } else {
        setResult(res.data);
      }
    });
  }, [id, session_id, navigate]);

  if (!result) return <p className="p-4">Loading...</p>;

  return (
  <div className="max-w-md mx-auto p-6 bg-white rounded shadow">
    <h2 className="text-xl font-bold mb-4">Quiz Result</h2>
    <p><strong>User:</strong> {result.user_name}</p>
    <p><strong>Score:</strong> {result.score}</p>
    <button
      onClick={() => navigate('/')}
      className="bg-blue-600 text-white px-4 py-2 mt-4 rounded"
    >
      ✅ Done
    </button>
  </div>
);

}
