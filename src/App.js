import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './Components/LoginPage';
import RegisterPage from './Components/RegisterPage';
import HomePage from "./Components/HomePage";

function App() {
  return (
      <Router>
          <Routes>
              <Route path="/" element={<HomePage />}/>
              <Route path="/login" element={<LoginPage />}/>
              <Route path="/register" element={<RegisterPage />}/>
              {/* Add more routes for other pages */}
          </Routes>
      </Router>

  );
}

export default App;
