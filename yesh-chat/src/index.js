import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Login from './login';
import Reg from './register.js';
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {

  const handleReg = (data) => {
    localStorage.setItem(data.username, JSON.stringify({password: data.password}));
  };

  const handleLogin = (data) => {
    const userData = JSON.parse(localStorage.getItem(data.username));
    if (userData && userData.password === data.password) {
      alert("Logged in succesfully!")
    } else {
      alert("Wrong username or password")
    }
  };

  return (
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login handleLogin={handleLogin} />} />
          <Route path="/register" element={<Reg handleReg={handleReg} />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);