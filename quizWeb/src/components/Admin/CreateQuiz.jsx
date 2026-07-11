import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createQuiz } from '../../services/api';
import './Admin.css';

function CreateQuiz() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    timeLimit: '',
    totalMarks: '',
    isActive: true,
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await createQuiz({
        ...formData,
        timeLimit: parseInt(formData.timeLimit),
        totalMarks: parseInt(formData.totalMarks),
      });
      
      setSuccess('Quiz created successfully!');
      setTimeout(() => {
        navigate(`/admin/add-question/${response.data.id}`);
      }, 1500);
    } catch (err) {
      setError('Failed to create quiz. Please try again.');
    }
  };

  return (
    <div className="create-quiz-container">
      <div className="create-quiz-card">
        <h2>Create New Quiz</h2>
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Quiz Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="Enter quiz title"
            />
          </div>

          <div className="form-group">
            <label>Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="4"
              placeholder="Enter quiz description"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Time Limit (minutes) *</label>
              <input
                type="number"
                name="timeLimit"
                value={formData.timeLimit}
                onChange={handleChange}
                required
                min="1"
                placeholder="e.g., 30"
              />
            </div>

            <div className="form-group">
              <label>Total Marks *</label>
              <input
                type="number"
                name="totalMarks"
                value={formData.totalMarks}
                onChange={handleChange}
                required
                min="1"
                placeholder="e.g., 100"
              />
            </div>
          </div>

          <div className="form-group checkbox-group">
            <label>
              <input
                type="checkbox"
                name="isActive"
                checked={formData.isActive}
                onChange={handleChange}
              />
              <span>Make quiz active immediately</span>
            </label>
          </div>

          <div className="button-group">
            <button type="submit" className="btn-primary">Create Quiz</button>
            <button type="button" onClick={() => navigate('/admin')} className="btn-secondary">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateQuiz;