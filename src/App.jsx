import './App.css';
import JobList from './components/JobList';
import { Routes, Route } from 'react-router';

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/jobs' element={<JobList />} />
      </Routes>
    </>
  )
}

export default App
