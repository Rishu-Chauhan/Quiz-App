import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllQuizzes } from '../../services/api';
import './Admin.css';

function AdminDashboard() {
  const [quizzes, setQuizzes] = useState([]);
  const [stats, setStats] = useState({
    totalQuizzes: 0,
    activeQuizzes: 0,
    totalQuestions: 0,
  });

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      const response = await getAllQuizzes();
      const quizzesData = response.data;
      setQuizzes(quizzesData);
      
      const activeCount = quizzesData.filter(q => q.isActive).length;
      const questionCount = quizzesData.reduce((acc, q) => acc + (q.questions?.length || 0), 0);
      
      setStats({
        totalQuizzes: quizzesData.length,
        activeQuizzes: activeCount,
        totalQuestions: questionCount,
      });
    } catch (error) {
      console.error('Error fetching quizzes:', error);
    }
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      
      <div className="stats-container">
        <div className="stat-card">
          <h3>Total Quizzes</h3>
          <p className="stat-number">{stats.totalQuizzes}</p>
        </div>
        <div className="stat-card">
          <h3>Active Quizzes</h3>
          <p className="stat-number">{stats.activeQuizzes}</p>
        </div>
        <div className="stat-card">
          <h3>Total Questions</h3>
          <p className="stat-number">{stats.totalQuestions}</p>
        </div>
      </div>

      <div className="quick-actions">
        <h2>Quick Actions</h2>
        <div className="action-buttons">
          <Link to="/admin/create-quiz" className="action-btn">
            <span>➕</span> Create New Quiz
          </Link>
          <Link to="/admin/quizzes" className="action-btn">
            <span>📋</span> Manage Quizzes
          </Link>
        </div>
      </div>

      <div className="recent-quizzes">
        <h2>Recent Quizzes</h2>
        <div className="quiz-grid">
          {quizzes.slice(0, 6).map((quiz) => (
            <div key={quiz.id} className="quiz-card-admin">
              <h3>{quiz.title}</h3>
              <p>{quiz.description}</p>
              <div className="quiz-meta">
                <span>📝 {quiz.questions?.length || 0} questions</span>
                <span>⏱️ {quiz.timeLimit} mins</span>
                <span className={quiz.isActive ? 'status-active' : 'status-inactive'}>
                  {quiz.isActive ? '✅ Active' : '❌ Inactive'}
                </span>
              </div>
              <div className="quiz-actions">
                <Link to={`/admin/add-question/${quiz.id}`} className="btn-small">Add Question</Link>
                <Link to={`/admin/results/${quiz.id}`} className="btn-small">View Results</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;