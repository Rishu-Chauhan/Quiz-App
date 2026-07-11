import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getActiveQuizzes, getUserAttempts } from '../../services/api';
import QuizCard from './QuizCard';
import './User.css';

function UserDashboard({ user }) {
  const [quizzes, setQuizzes] = useState([]);
  const [attempts, setAttempts] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [quizzesResponse, attemptsResponse] = await Promise.all([
        getActiveQuizzes(),
        getUserAttempts(user.userId),
      ]);
      
      setQuizzes(quizzesResponse.data);
      setAttempts(attemptsResponse.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const hasAttempted = (quizId) => {
    return attempts.some(attempt => attempt.quiz.id === quizId);
  };

  return (
    <div className="user-dashboard">
      <div className="welcome-section">
        <h1>Welcome, {user.name}!</h1>
        <p>Take quizzes and test your knowledge</p>
      </div>

      <div className="stats-container">
        <div className="stat-card">
          <h3>Available Quizzes</h3>
          <p className="stat-number">{quizzes.length}</p>
        </div>
        <div className="stat-card">
          <h3>Quizzes Attempted</h3>
          <p className="stat-number">{attempts.length}</p>
        </div>
        <div className="stat-card">
          <h3>Average Score</h3>
          <p className="stat-number">
            {attempts.length > 0
              ? (attempts.reduce((acc, a) => acc + (a.score / a.quiz.totalMarks) * 100, 0) / attempts.length).toFixed(1) + '%'
              : '0%'}
          </p>
        </div>
      </div>

      <div className="quizzes-section">
        <div className="section-header">
          <h2>Available Quizzes</h2>
          <Link to="/user/results" className="view-results-link">View All Results →</Link>
        </div>
        
        {quizzes.length === 0 ? (
          <p className="no-quizzes">No active quizzes available at the moment.</p>
        ) : (
          <div className="quiz-grid">
            {quizzes.map((quiz) => (
              <QuizCard 
                key={quiz.id} 
                quiz={quiz} 
                hasAttempted={hasAttempted(quiz.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default UserDashboard;