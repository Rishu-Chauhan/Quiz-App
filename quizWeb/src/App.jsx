// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { useState, useEffect } from 'react';
// import Login from './components/Auth/Login';
// import Signup from './components/Auth/Signup';
// import AdminDashboard from './components/Admin/AdminDashboard';
// import UserDashboard from './components/User/UserDashboard';
// import CreateQuiz from './components/Admin/CreateQuiz';
// import AddQuestion from './components/Admin/AddQuestion';
// import QuizList from './components/Admin/QuizList';
// import ViewResults from './components/Admin/ViewResults';
// import TakeQuiz from './components/User/TakeQuiz';
// import Results from './components/User/Results';
// import Navbar from './components/Navbar';
// import './App.css';

// function App() {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const storedUser = localStorage.getItem('user');
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     }
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem('user');
//     setUser(null);
//   };

//   return (
//     <Router>
//       <div className="App">
//         {user && <Navbar user={user} onLogout={handleLogout} />}
//         <Routes>
//           <Route path="/login" element={!user ? <Login setUser={setUser} /> : <Navigate to={user.role === 'ADMIN' ? '/admin' : '/user'} />} />
//           <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/login" />} />
          
//           {/* Admin Routes */}
//           <Route path="/admin" element={user?.role === 'ADMIN' ? <AdminDashboard /> : <Navigate to="/login" />} />
//           <Route path="/admin/create-quiz" element={user?.role === 'ADMIN' ? <CreateQuiz /> : <Navigate to="/login" />} />
//           <Route path="/admin/add-question/:quizId" element={user?.role === 'ADMIN' ? <AddQuestion /> : <Navigate to="/login" />} />
//           <Route path="/admin/quizzes" element={user?.role === 'ADMIN' ? <QuizList /> : <Navigate to="/login" />} />
//           <Route path="/admin/results/:quizId" element={user?.role === 'ADMIN' ? <ViewResults /> : <Navigate to="/login" />} />
          
//           {/* User Routes */}
//           <Route path="/user" element={user?.role === 'USER' ? <UserDashboard user={user} /> : <Navigate to="/login" />} />
//           <Route path="/user/take-quiz/:quizId" element={user?.role === 'USER' ? <TakeQuiz user={user} /> : <Navigate to="/login" />} />
//           <Route path="/user/results" element={user?.role === 'USER' ? <Results user={user} /> : <Navigate to="/login" />} />
          
//           <Route path="/" element={<Navigate to="/login" />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;


import { Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';

import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';

import AdminDashboard from './components/Admin/AdminDashboard';
import UserDashboard from './components/User/UserDashboard';
import CreateQuiz from './components/Admin/CreateQuiz';
import AddQuestion from './components/Admin/AddQuestion';
import QuizList from './components/Admin/QuizList';
import ViewResults from './components/Admin/ViewResults';
import TakeQuiz from './components/User/TakeQuiz';
import Results from './components/User/Results';

import Navbar from './components/Navbar';
import './App.css';

function getStoredUser() {
  try {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  } catch (error) {
    localStorage.removeItem('user');
    return null;
  }
}

function App() {
  const [user, setUser] = useState(getStoredUser);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  const dashboardPath =
    user?.role === 'ADMIN' ? '/admin' : '/user';

  return (
    <div className="App">
      {user && <Navbar user={user} onLogout={handleLogout} />}

      <Routes>
        {/* Authentication */}
        <Route
          path="/login"
          element={
            !user ? (
              <Login setUser={setUser} />
            ) : (
              <Navigate to={dashboardPath} replace />
            )
          }
        />

        <Route
          path="/signup"
          element={
            !user ? (
              <Signup />
            ) : (
              <Navigate to={dashboardPath} replace />
            )
          }
        />

        {/* Optional: /register redirects to /signup */}
        <Route path="/register" element={<Navigate to="/signup" replace />} />

        {/* Admin routes */}
        <Route
          path="/admin"
          element={
            user?.role === 'ADMIN' ? (
              <AdminDashboard />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route
          path="/admin/create-quiz"
          element={
            user?.role === 'ADMIN' ? (
              <CreateQuiz />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route
          path="/admin/add-question/:quizId"
          element={
            user?.role === 'ADMIN' ? (
              <AddQuestion />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route
          path="/admin/quizzes"
          element={
            user?.role === 'ADMIN' ? (
              <QuizList />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route
          path="/admin/results/:quizId"
          element={
            user?.role === 'ADMIN' ? (
              <ViewResults />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* User routes */}
        <Route
          path="/user"
          element={
            user?.role === 'USER' ? (
              <UserDashboard user={user} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route
          path="/user/take-quiz/:quizId"
          element={
            user?.role === 'USER' ? (
              <TakeQuiz user={user} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route
          path="/user/results"
          element={
            user?.role === 'USER' ? (
              <Results user={user} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Default route */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </div>
  );
}

export default App;