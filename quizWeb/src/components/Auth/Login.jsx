// import { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { login } from '../../services/api';
// import './Auth.css';

// function Login({ setUser }) {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//   });
//   const [error, setError] = useState('');
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

//     try {
//       const response = await login(formData);
//       const userData = response.data;
      
//       localStorage.setItem('user', JSON.stringify(userData));
//       setUser(userData);
      
//       if (userData.role === 'ADMIN') {
//         navigate('/admin');
//       } else {
//         navigate('/user');
//       }
//     } catch (err) {
//       setError(err.response?.data || 'Login failed. Please try again.');
//     }
//   };

//   return (
//     <div className="auth-container">
//       <div className="auth-card">
//         <h2>Login</h2>
//         {error && <div className="error-message">{error}</div>}
//         <form onSubmit={handleSubmit}>
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
//           <button type="submit" className="btn-primary">Login</button>
//         </form>
//         <p className="auth-link">
//           Don't have an account? <Link to="/signup">Sign Up</Link>
//         </p>
//         <div className="demo-credentials">
//           <p><strong>Demo Credentials:</strong></p>
//           <p>Admin: admin@gmail.com / admin</p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Login;




import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../../services/api';
import './Auth.css';

function Login({ setUser }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
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

    try {
      const response = await login(formData);
      const userData = response.data;

      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);

      if (userData.role === 'ADMIN') {
        navigate('/admin');
      } else {
        navigate('/user');
      }
    } catch (err) {
      setError(getErrorMessage(err, 'Login failed. Please try again.'));
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Login</h2>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
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
            Login
          </button>
        </form>

        <p className="auth-link">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
