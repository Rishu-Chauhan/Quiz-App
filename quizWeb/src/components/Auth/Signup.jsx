// import { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { signup } from '../../services/api';
// import './Auth.css';

// function Signup() {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//   });
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setSuccess('');

//     try {
//       await signup(formData);
//       setSuccess('Account created successfully! Redirecting to login...');
//       setTimeout(() => {
//         navigate('/login');
//       }, 2000);
//     } catch (err) {
//       setError(err.response?.data || 'Signup failed. Please try again.');
//     }
//   };

//   return (
//     <div className="auth-container">
//       <div className="auth-card">
//         <h2>Sign Up</h2>
//         {error && <div className="error-message">{error}</div>}
//         {success && <div className="success-message">{success}</div>}
//         <form onSubmit={handleSubmit}>
//           <div className="form-group">
//             <label>Name</label>
//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label>Email</label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label>Password</label>
//             <input
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <button type="submit" className="btn-primary">Sign Up</button>
//         </form>
//         <p className="auth-link">
//           Already have an account? <Link to="/login">Login</Link>
//         </p>
//       </div>
//     </div>
//   );
// }

// export default Signup;





import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signup } from '../../services/api';
import './Auth.css';

function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((previousData) => ({
      ...previousData,
      [e.target.name]: e.target.value,
    }));
  };

  const getErrorMessage = (err, fallbackMessage) => {
    const responseData = err.response?.data;

    if (typeof responseData === 'string') {
      return responseData;
    }

    if (responseData?.message) {
      return responseData.message;
    }

    return fallbackMessage;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError('');
    setSuccess('');

    try {
      await signup(formData);

      setSuccess('Account created successfully! Redirecting to login...');

      setTimeout(() => {
        navigate('/login');
      }, 1500);
    } catch (err) {
      setError(getErrorMessage(err, 'Signup failed. Please try again.'));
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Sign Up</h2>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn-primary">
            Sign Up
          </button>
        </form>

        <p className="auth-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;


