import './App.css';
import JobList from './components/JobList/JobList';
import Landing from './components/Landing/Landing';
import NavBar from './components/NavBar/NavBar';
import SignUpForm from './components/SignUpForm/SignUpForm';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import { Routes, Route, Navigate } from 'react-router';
import JobDetail from './components/JobDetail/JobDetail';

const App = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/jobs' element={<ProtectedRoute><JobList /></ProtectedRoute>} />
        <Route path='/jobs/:id' element={<ProtectedRoute><JobDetail /></ProtectedRoute>} />
        <Route path='/signup' element={<SignUpForm />} />
        <Route path='*' element={<Landing />} />
      </Routes>
    </>
  )
}

export default App
