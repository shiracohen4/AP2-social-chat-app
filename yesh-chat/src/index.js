import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Login from './login';
import Reg from './register.js';
import {BrowserRouter, Route, Switch, Routes,link} from "react-router-dom";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />}></Route>
      <Route path="/register" element={<Reg />}></Route>
    </Routes>
    </BrowserRouter>
  </React.StrictMode>
);


