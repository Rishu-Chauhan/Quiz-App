import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllQuizzes, deleteQuiz, updateQuiz } from '../../services/api';
import './Admin.css';

function QuizList() {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      const response = await getAllQuizzes();
      setQuizzes(response.data);
    } catch (error) {
      console.error('Error fetching quizzes:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this quiz?')) {
      try {
        await deleteQuiz(id);
        fetchQuizzes();
      } catch (error) {
        alert('Failed to delete quiz');
      }
    }
  };

  const toggleActive = async (quiz) => {
    try {
      await updateQuiz(quiz.id, {
        ...quiz,
        isActive: !quiz.isActive,
      });
      fetchQuizzes();
    } catch (error) {
      alert('Failed to update quiz');
    }
  };

  return (
    <div className="quiz-list-container">
      <div className="page-header">
        <h1>Manage Quizzes</h1>
        <Link to="/admin/create-quiz" className="btn-primary">Create New Quiz</Link>
      </div>

      <div className="quizzes-table">
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Questions</th>
              <th>Time Limit</th>
              <th>Total Marks</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {quizzes.map((quiz) => (
              <tr key={quiz.id}>
                <td><strong>{quiz.title}</strong></td>
                <td>{quiz.description.substring(0, 50)}...</td>
                <td>{quiz.questions?.length || 0}</td>
                <td>{quiz.timeLimit} mins</td>
                <td>{quiz.totalMarks}</td>
                <td>
                  <span className={`status-badge ${quiz.isActive ? 'active' : 'inactive'}`}>
                    {quiz.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td>
                  <div className="action-buttons-table">
                    <Link to={`/admin/add-question/${quiz.id}`} className="btn-icon" title="Add Question">
                      ➕
                    </Link>
                    <Link to={`/admin/results/${quiz.id}`} className="btn-icon" title="View Results">
                      📊
                    </Link>
                    <button 
                      onClick={() => toggleActive(quiz)} 
                      className="btn-icon" 
                      title={quiz.isActive ? 'Deactivate' : 'Activate'}
                    >
                      {quiz.isActive ? '🔒' : '🔓'}
                    </button>
                    <button 
                      onClick={() => handleDelete(quiz.id)} 
                      className="btn-icon btn-delete" 
                      title="Delete"
                    >
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default QuizList;