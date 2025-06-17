import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api';

export default function Analytics() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const isAdmin = token && JSON.parse(atob(token.split('.')[1])).username === 'Raghava';
    if (!isAdmin) {
      alert('Only admin can view analytics');
      navigate('/');
    } else {
      API.get(`/quizzes/${id}/analytics`).then(res => setData(res.data));
    }
  }, [id, navigate]);

  if (!data) return <p className="p-4">Loading analytics...</p>;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Quiz Analytics</h2>
      <p><strong>Total Attempts:</strong> {data.attempts}</p>
      <p><strong>Average Score:</strong> {data.averageScore.toFixed(2)}</p>

      <h3 className="text-lg font-semibold mt-6">Participants:</h3>
      <ul className="mt-2 space-y-2">
        {data.results.map((r, idx) => (
          <li key={idx} className="border-b pb-2">
            <strong>{r.name}</strong> – Score: {r.score}
          </li>
        ))}
      </ul>
    </div>
  );
}
