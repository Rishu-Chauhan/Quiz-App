import { Link } from 'react-router-dom';
import './User.css';

function QuizCard({ quiz, hasAttempted }) {
  return (
    <div className="quiz-card">
      <div className="quiz-card-header">
        <h3>{quiz.title}</h3>
        {hasAttempted && <span className="attempted-badge">✓ Attempted</span>}
      </div>
      <p className="quiz-description">{quiz.description}</p>
      <div className="quiz-details">
        <div className="detail-item">
          <span className="detail-icon">📝</span>
          <span>{quiz.questions?.length || 0} Questions</span>
        </div>
        <div className="detail-item">
          <span className="detail-icon">⏱️</span>
          <span>{quiz.timeLimit} Minutes</span>
        </div>
        <div className="detail-item">
          <span className="detail-icon">🎯</span>
          <span>{quiz.totalMarks} Marks</span>
        </div>
      </div>
      <Link to={`/user/take-quiz/${quiz.id}`} className="take-quiz-btn">
        {hasAttempted ? 'Retake Quiz' : 'Take Quiz'}
      </Link>
    </div>
  );
}

export default QuizCard;