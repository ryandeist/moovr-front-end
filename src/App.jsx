import './App.css';
import JobList from './components/JobList/JobList';
import Landing from './components/Landing/Landing';
import { Routes, Route } from 'react-router';

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/jobs' element={<JobList />} />
      </Routes>
    </>
  )
}

export default App
