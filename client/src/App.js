import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import QuizList from './pages/QuizList';
import QuizForm from './pages/QuizForm';
import TakeQuiz from './pages/TakeQuiz';
import Result from './pages/Result';
import Analytics from './pages/Analytics';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<QuizList />} />
        <Route path="/create" element={<QuizForm />} />
        <Route path="/edit/:id" element={<QuizForm />} />
        <Route path="/take/:id" element={<TakeQuiz />} />
        <Route path="/results/:id/:session_id" element={<Result />} />
        <Route path="/analytics/:id" element={<Analytics />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
