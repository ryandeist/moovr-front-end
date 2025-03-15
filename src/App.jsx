import './App.css';
import JobList from './components/JobList/JobList';
import Landing from './components/Landing/Landing';
import NavBar from './components/NavBar/NavBar';
import LoginForm from './components/LoginForm/LoginForm';
import SignUpForm from './components/SignUpForm/SignUpForm';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import { Routes, Route, Navigate } from 'react-router';

const App = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/jobs' element={<ProtectedRoute><JobList /></ProtectedRoute>} />
        <Route path='/login' element={<LoginForm />} />
        <Route path='/signup' element={<SignUpForm />} />
        <Route path='*' element={<Landing />} />
      </Routes>
    </>
  )
}

export default App
