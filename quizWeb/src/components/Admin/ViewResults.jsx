import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAttemptsByQuizId, getQuizById } from '../../services/api';
import './Admin.css';

function ViewResults() {
  const { quizId } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [attempts, setAttempts] = useState([]);

  useEffect(() => {
    fetchData();
  }, [quizId]);

  const fetchData = async () => {
    try {
      const [quizResponse, attemptsResponse] = await Promise.all([
        getQuizById(quizId),
        getAttemptsByQuizId(quizId),
      ]);
      
      setQuiz(quizResponse.data);
      setAttempts(attemptsResponse.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const calculateStats = () => {
    if (attempts.length === 0) return { avgScore: 0, highestScore: 0, lowestScore: 0 };
    
    const scores = attempts.map(a => a.score);
    return {
      avgScore: (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(2),
      highestScore: Math.max(...scores),
      lowestScore: Math.min(...scores),
    };
  };

  const stats = calculateStats();

  return (
    <div className="view-results-container">
      <div className="results-header">
        <h1>Quiz Results: {quiz?.title}</h1>
        <p>{quiz?.description}</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Attempts</h3>
          <p className="stat-number">{attempts.length}</p>
        </div>
        <div className="stat-card">
          <h3>Average Score</h3>
          <p className="stat-number">{stats.avgScore}</p>
        </div>
        <div className="stat-card">
          <h3>Highest Score</h3>
          <p className="stat-number">{stats.highestScore}</p>
        </div>
        <div className="stat-card">
          <h3>Lowest Score</h3>
          <p className="stat-number">{stats.lowestScore}</p>
        </div>
      </div>

      <div className="attempts-table">
        <h2>All Attempts</h2>
        {attempts.length === 0 ? (
          <p className="no-data">No attempts yet for this quiz.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Email</th>
                <th>Score</th>
                <th>Correct Answers</th>
                <th>Wrong Answers</th>
                <th>Percentage</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {attempts.map((attempt) => (
                <tr key={attempt.id}>
                  <td>{attempt.user.name}</td>
                  <td>{attempt.user.email}</td>
                  <td><strong>{attempt.score} / {quiz?.totalMarks}</strong></td>
                  <td className="text-success">{attempt.correctAnswers}</td>
                  <td className="text-danger">{attempt.wrongAnswers}</td>
                  <td>{((attempt.score / quiz?.totalMarks) * 100).toFixed(2)}%</td>
                  <td>{new Date(attempt.attemptedAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default ViewResults;