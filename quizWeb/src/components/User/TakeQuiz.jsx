import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getQuizById, getQuestionsByQuizId, submitQuiz } from '../../services/api';
import './User.css';

function TakeQuiz({ user }) {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchQuizData();
  }, [quizId]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && quiz) {
      handleSubmit();
    }
  }, [timeLeft]);

  const fetchQuizData = async () => {
    try {
      const [quizResponse, questionsResponse] = await Promise.all([
        getQuizById(quizId),
        getQuestionsByQuizId(quizId),
      ]);
      
      setQuiz(quizResponse.data);
      setQuestions(questionsResponse.data);
      setTimeLeft(quizResponse.data.timeLimit * 60);
    } catch (error) {
      console.error('Error fetching quiz:', error);
      alert('Failed to load quiz');
      navigate('/user');
    }
  };

  const handleAnswerChange = (questionId, answer) => {
    setAnswers({
      ...answers,
      [questionId]: answer,
    });
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;
    
    if (Object.keys(answers).length < questions.length) {
      if (!window.confirm('You haven\'t answered all questions. Do you want to submit anyway?')) {
        return;
      }
    }

    setIsSubmitting(true);
    
    try {
      const submission = {
        userId: user.userId,
        quizId: parseInt(quizId),
        answers: answers,
      };
      
      const response = await submitQuiz(submission);
      navigate('/user/results', { state: { result: response.data } });
    } catch (error) {
      console.error('Error submitting quiz:', error);
      alert('Failed to submit quiz. Please try again.');
      setIsSubmitting(false);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!quiz || !questions.length) {
    return <div className="loading">Loading quiz...</div>;
  }

  return (
    <div className="take-quiz-container">
      <div className="quiz-header-section">
        <div className="quiz-info-box">
          <h1>{quiz.title}</h1>
          <p>{quiz.description}</p>
        </div>
        <div className="timer-box">
          <div className="timer">
            <span className="timer-icon">⏱️</span>
            <span className={timeLeft < 60 ? 'time-critical' : 'time-normal'}>
              {formatTime(timeLeft)}
            </span>
          </div>
          <div className="progress-info">
            <span>Answered: {Object.keys(answers).length} / {questions.length}</span>
          </div>
        </div>
      </div>

      <div className="questions-container">
        {questions.map((question, index) => (
          <div key={question.id} className="question-card">
            <div className="question-header">
              <span className="question-number">Question {index + 1}</span>
              <span className="question-marks">{question.marks} marks</span>
            </div>
            <p className="question-text">{question.questionText}</p>
            <div className="options-container">
              {['option1', 'option2', 'option3', 'option4'].map((optionKey) => (
                <label
                  key={optionKey}
                  className={`option-label ${answers[question.id] === optionKey ? 'selected' : ''}`}
                >
                  <input
                    type="radio"
                    name={`question-${question.id}`}
                    value={optionKey}
                    checked={answers[question.id] === optionKey}
                    onChange={() => handleAnswerChange(question.id, optionKey)}
                  />
                  <span className="option-text">
                    <span className="option-letter">
                      {optionKey === 'option1' ? 'A' : optionKey === 'option2' ? 'B' : optionKey === 'option3' ? 'C' : 'D'}
                    </span>
                    {question[optionKey]}
                  </span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="submit-section">
        <button 
          onClick={handleSubmit} 
          className="submit-btn"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Quiz'}
        </button>
      </div>
    </div>
  );
}

export default TakeQuiz;