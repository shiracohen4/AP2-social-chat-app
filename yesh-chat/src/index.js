import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Login from './login';
import Reg from './register.js';
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  const [users, setUsers] = useState([{username: "yeela", password: "12345"}]);

  const addUser = (user) => {
    setUsers([...users, user]);
  };

  return (
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login users={users} />} />
          <Route path="/register" element={<Reg addUser={addUser} />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);