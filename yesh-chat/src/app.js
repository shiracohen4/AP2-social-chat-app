import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import ReactDOM from 'react-dom/client';
import './index.css';
import { Login, Protected, Chats, Reg } from './components'

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(undefined);
    const [user, setUser] = useState(null);

    const checkLoggedIn = () => {
        const user = localStorage.getItem('user');
        setIsLoggedIn(!!user);
        setUser(JSON.parse(user));
    }
    const handleReg = (data) => {
        let users = JSON.parse(localStorage.getItem('users')) || [];
        users.push(data)
        localStorage.setItem('users', JSON.stringify(users));
    };
    const handleLogin = (data) => {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find((user) => user.username === data.username)
        const passwordMatches = user?.password === data.password;

        if (!user || !passwordMatches) { return alert('Wrong username or password') };
        alert('Logged in successfully!');
        localStorage.setItem('user', JSON.stringify(user))
        window.location.href = '/chats';
    }
    const usernameTaken = (data) => {
        const userData = JSON.parse(localStorage.getItem(data.username));
        if (userData) {
            return true;
        } else {
            return false;
        }
    }

    useEffect(() => {
        checkLoggedIn()
    }, [])

    return (
        <React.StrictMode>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login isLoggedIn={isLoggedIn} handleLogin={handleLogin} />} />
                    <Route path="/register" element={<Reg handleReg={handleReg} usernameTaken={usernameTaken} />} />
                    <Route path='/chats' element={
                        <Protected isLoggedIn={isLoggedIn}>
                            <Chats user={user} />
                        </Protected>
                    } />
                </Routes>
            </BrowserRouter>
        </React.StrictMode>
    );
}

export default App;