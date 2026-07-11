// import axios from 'axios';

// const API_BASE_URL = 'http://localhost:8080/api';

// const api = axios.create({
//   baseURL: API_BASE_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// // Auth APIs
// export const signup = (userData) => api.post('/auth/sign-up', userData);
// export const login = (credentials) => api.post('/auth/login', credentials);

// // Quiz APIs
// export const createQuiz = (quizData) => api.post('/quiz/create', quizData);
// export const updateQuiz = (id, quizData) => api.put(`/quiz/update/${id}`, quizData);
// export const deleteQuiz = (id) => api.delete(`/quiz/delete/${id}`);
// export const getQuizById = (id) => api.get(`/quiz/${id}`);
// export const getAllQuizzes = () => api.get('/quiz/all');
// export const getActiveQuizzes = () => api.get('/quiz/active');

// // Question APIs
// export const addQuestion = (quizId, questionData) => 
//   api.post(`/quiz/${quizId}/question`, questionData);
// export const deleteQuestion = (questionId) => 
//   api.delete(`/quiz/question/${questionId}`);
// export const getQuestionsByQuizId = (quizId) => 
//   api.get(`/quiz/${quizId}/questions`);

// // Attempt APIs
// export const submitQuiz = (submission) => api.post('/attempt/submit', submission);
// export const getUserAttempts = (userId) => api.get(`/attempt/user/${userId}`);
// export const getAttemptById = (attemptId) => api.get(`/attempt/${attemptId}`);
// export const getAttemptsByQuizId = (quizId) => api.get(`/attempt/quiz/${quizId}`);

// export default api;



import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Auth APIs
export const signup = (userData) => api.post('/auth/sign-up', userData);
export const login = (credentials) => api.post('/auth/login', credentials);

// Quiz APIs
export const createQuiz = (quizData) => api.post('/quiz/create', quizData);
export const updateQuiz = (id, quizData) => api.put(`/quiz/update/${id}`, quizData);
export const deleteQuiz = (id) => api.delete(`/quiz/delete/${id}`);
export const getQuizById = (id) => api.get(`/quiz/${id}`);
export const getAllQuizzes = () => api.get('/quiz/all');
export const getActiveQuizzes = () => api.get('/quiz/active');

// Question APIs
export const addQuestion = (quizId, questionData) =>
  api.post(`/quiz/${quizId}/question`, questionData);

export const deleteQuestion = (questionId) =>
  api.delete(`/quiz/question/${questionId}`);

export const getQuestionsByQuizId = (quizId) =>
  api.get(`/quiz/${quizId}/questions`);

// Attempt APIs
export const submitQuiz = (submission) => api.post('/attempt/submit', submission);
export const getUserAttempts = (userId) => api.get(`/attempt/user/${userId}`);
export const getAttemptById = (attemptId) => api.get(`/attempt/${attemptId}`);
export const getAttemptsByQuizId = (quizId) => api.get(`/attempt/quiz/${quizId}`);


// AI API
export const generateAIQuestions = (topic, count) => 
    api.post('/ai/generate', { topic, count });
  
  export const generateAndSaveAIQuestions = (quizId, topic, count) => 
    api.post(`/ai/generate/${quizId}`, { topic, count });
  
export default api;