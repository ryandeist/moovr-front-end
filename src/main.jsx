import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router';
import { UserProvider } from './contexts/UserContext.jsx';
import { JobsProvider } from './contexts/JobsContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
      <BrowserRouter>
        <JobsProvider>
          <App />
        </JobsProvider>
      </BrowserRouter>
    </UserProvider>
  </StrictMode>
)
