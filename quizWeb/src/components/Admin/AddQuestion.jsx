import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { addQuestion, getQuestionsByQuizId, getQuizById, deleteQuestion } from '../../services/api';

import './Admin.css';

function AddQuestion() {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [formData, setFormData] = useState({
    questionText: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    correctAnswer: '',
    marks: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchQuizDetails();
    fetchQuestions();
  }, [quizId]);

  const fetchQuizDetails = async () => {
    try {
      const response = await getQuizById(quizId);
      setQuiz(response.data);
    } catch (error) {
      console.error('Error fetching quiz:', error);
    }
  };

  const fetchQuestions = async () => {
    try {
      const response = await getQuestionsByQuizId(quizId);
      setQuestions(response.data);
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      await addQuestion(quizId, {
        ...formData,
        marks: parseInt(formData.marks),
      });
      
      setSuccess('Question added successfully!');
      setFormData({
        questionText: '',
        option1: '',
        option2: '',
        option3: '',
        option4: '',
        correctAnswer: '',
        marks: '',
      });
      
      fetchQuestions();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to add question. Please try again.');
    }
  };

  const handleDeleteQuestion = async (questionId) => {
    if (window.confirm('Are you sure you want to delete this question?')) {
      try {
        await deleteQuestion(questionId);
        fetchQuestions();
      } catch (error) {
        alert('Failed to delete question');
      }
    }
  };

  return (
    <div className="add-question-container">
      <div className="quiz-header">
        <h2>Add Questions to: {quiz?.title}</h2>
        <p>{quiz?.description}</p>
        <div className="quiz-info">
          <span>Total Questions: {questions.length}</span>
          <span>Total Marks: {quiz?.totalMarks}</span>
        </div>
      </div>

      

      <div className="content-wrapper">
        <div className="add-question-form">
          <h3>Add New Question</h3>
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Question *</label>
              <textarea
                name="questionText"
                value={formData.questionText}
                onChange={handleChange}
                required
                rows="3"
                placeholder="Enter your question"
              />
            </div>

            <div className="form-group">
              <label>Option 1 *</label>
              <input
                type="text"
                name="option1"
                value={formData.option1}
                onChange={handleChange}
                required
                placeholder="Enter option 1"
              />
            </div>

            <div className="form-group">
              <label>Option 2 *</label>
              <input
                type="text"
                name="option2"
                value={formData.option2}
                onChange={handleChange}
                required
                placeholder="Enter option 2"
              />
            </div>

            <div className="form-group">
              <label>Option 3 *</label>
              <input
                type="text"
                name="option3"
                value={formData.option3}
                onChange={handleChange}
                required
                placeholder="Enter option 3"
              />
            </div>

            <div className="form-group">
              <label>Option 4 *</label>
              <input
                type="text"
                name="option4"
                value={formData.option4}
                onChange={handleChange}
                required
                placeholder="Enter option 4"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Correct Answer *</label>
                <select
                  name="correctAnswer"
                  value={formData.correctAnswer}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select correct answer</option>
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                  <option value="option3">Option 3</option>
                  <option value="option4">Option 4</option>
                </select>
              </div>

              <div className="form-group">
                <label>Marks *</label>
                <input
                  type="number"
                  name="marks"
                  value={formData.marks}
                  onChange={handleChange}
                  required
                  min="1"
                  placeholder="e.g., 5"
                />
              </div>
            </div>

            <div className="button-group">
              <button type="submit" className="btn-primary">Add Question</button>
              <button type="button" onClick={() => navigate('/admin')} className="btn-secondary">
                Finish & Go to Dashboard
              </button>
            </div>
          </form>
        </div>

        <div className="questions-list">
          <h3>Added Questions ({questions.length})</h3>
          {questions.length === 0 ? (
            <p className="no-questions">No questions added yet.</p>
          ) : (
            questions.map((question, index) => (
              <div key={question.id} className="question-item">
                <div className="question-header">
                  <span className="question-number">Q{index + 1}</span>
                  <span className="question-marks">{question.marks} marks</span>
                  <button 
                    onClick={() => handleDeleteQuestion(question.id)}
                    className="btn-delete"
                  >
                    Delete
                  </button>
                </div>
                <p className="question-text">{question.questionText}</p>
                <div className="options-list">
                  <div className={question.correctAnswer === 'option1' ? 'option correct' : 'option'}>
                    A) {question.option1}
                  </div>
                  <div className={question.correctAnswer === 'option2' ? 'option correct' : 'option'}>
                    B) {question.option2}
                  </div>
                  <div className={question.correctAnswer === 'option3' ? 'option correct' : 'option'}>
                    C) {question.option3}
                  </div>
                  <div className={question.correctAnswer === 'option4' ? 'option correct' : 'option'}>
                    D) {question.option4}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default AddQuestion;