import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar({ user, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h2>Quiz App</h2>
      </div>
      <div className="navbar-menu">
        <span className="user-info">Welcome, {user.name}</span>
        {user.role === 'ADMIN' ? (
          <>
            <Link to="/admin">Dashboard</Link>
            <Link to="/admin/create-quiz">Create Quiz</Link>
            <Link to="/admin/quizzes">All Quizzes</Link>
          </>
        ) : (
          <>
            <Link to="/user">Dashboard</Link>
            <Link to="/user/results">My Results</Link>
          </>
        )}
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </div>
    </nav>
  );
}

export default Navbar;