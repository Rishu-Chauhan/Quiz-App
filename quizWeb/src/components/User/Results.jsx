import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getUserAttempts } from '../../services/api';
import './User.css';

function Results({ user }) {
  const location = useLocation();
  const [attempts, setAttempts] = useState([]);
  const [latestResult, setLatestResult] = useState(null);

  useEffect(() => {
    if (location.state?.result) {
      setLatestResult(location.state.result);
    }
    fetchAttempts();
  }, []);

  const fetchAttempts = async () => {
    try {
      const response = await getUserAttempts(user.userId);
      setAttempts(response.data);
    } catch (error) {
      console.error('Error fetching attempts:', error);
    }
  };

  const getGrade = (percentage) => {
    if (percentage >= 90) return { grade: 'A+', color: '#10b981' };
    if (percentage >= 80) return { grade: 'A', color: '#059669' };
    if (percentage >= 70) return { grade: 'B', color: '#3b82f6' };
    if (percentage >= 60) return { grade: 'C', color: '#f59e0b' };
    if (percentage >= 50) return { grade: 'D', color: '#f97316' };
    return { grade: 'F', color: '#ef4444' };
  };

  return (
    <div className="results-container">
      {latestResult && (
        <div className="latest-result">
          <div className="result-card">
            <div className="result-header">
              <h2>🎉 Quiz Completed!</h2>
              <p>Congratulations on completing the quiz</p>
            </div>
            
            <div className="score-display">
              <div className="score-circle" style={{ 
                borderColor: getGrade(latestResult.percentage).color 
              }}>
                <span className="score-value">{latestResult.score}</span>
                <span className="score-total">/ {latestResult.totalMarks}</span>
              </div>
              <div className="grade-display" style={{ 
                backgroundColor: getGrade(latestResult.percentage).color 
              }}>
                {getGrade(latestResult.percentage).grade}
              </div>
            </div>

            <div className="result-stats">
              <div className="stat-item">
                <span className="stat-label">Percentage</span>
                <span className="stat-value">{latestResult.percentage.toFixed(2)}%</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Correct Answers</span>
                <span className="stat-value text-success">{latestResult.correctAnswers}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Wrong Answers</span>
                <span className="stat-value text-danger">{latestResult.wrongAnswers}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Total Questions</span>
                <span className="stat-value">{latestResult.totalQuestions}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="all-attempts">
        <h2>Your Quiz History</h2>
        {attempts.length === 0 ? (
          <p className="no-attempts">You haven't attempted any quizzes yet.</p>
        ) : (
          <div className="attempts-grid">
            {attempts.map((attempt) => {
              const percentage = (attempt.score / attempt.quiz.totalMarks) * 100;
              const gradeInfo = getGrade(percentage);
              
              return (
                <div key={attempt.id} className="attempt-card">
                  <div className="attempt-header">
                    <h3>{attempt.quiz.title}</h3>
                    <span className="grade-badge" style={{ backgroundColor: gradeInfo.color }}>
                      {gradeInfo.grade}
                    </span>
                  </div>
                  
                  <div className="attempt-score">
                    <span className="score-big">{attempt.score}</span>
                    <span className="score-separator">/</span>
                    <span className="score-total-big">{attempt.quiz.totalMarks}</span>
                  </div>

                  <div className="attempt-details">
                    <div className="detail-row">
                      <span>✅ Correct:</span>
                      <span className="text-success">{attempt.correctAnswers}</span>
                    </div>
                    <div className="detail-row">
                      <span>❌ Wrong:</span>
                      <span className="text-danger">{attempt.wrongAnswers}</span>
                    </div>
                    <div className="detail-row">
                      <span>📊 Percentage:</span>
                      <span>{percentage.toFixed(2)}%</span>
                    </div>
                    <div className="detail-row">
                      <span>📅 Date:</span>
                      <span>{new Date(attempt.attemptedAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Results;