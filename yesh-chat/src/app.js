import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
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

    const handleReg = async (data) => { //add the new user to the users array

        const res1 = await fetch( 'http://localhost:5000/api/Users', {
            'method' : 'POST',
            'headers' : {
                'Content-Type' : 'application/json',
            },
            'body' : JSON.stringify(data)
        })

        if (res1.status !== 200) {
            return false;
        } else {
            return true;
        }
    }

    const handleLogin = async (data) => {

        const res2 = await fetch('http://localhost:5000/api/Tokens', {
            'method' : 'POST',
            'headers':{
                'Content-Type' : 'application/json',
            },
            'body' : JSON.stringify(data)
        })
        if(res2.status !== 200) { return alert('Wrong username or password') };
        alert('Logged in successfully!');
        const token = await res2.text();
        localStorage.setItem('token', JSON.stringify(token));

        const res3 = await fetch('http://localhost:5000/api/Users/'+ data.username ,{
            'headers' : {
                'Content-Type' : 'application/json',
                'authorization': 'bearer ' + token // attach the token
            }
        })
        const user = await res3.json()
        setUser(user);
        localStorage.setItem('user', JSON.stringify(user))
        window.location.href = '/chats';
    }

    useEffect(() => {
        checkLoggedIn()
    }, [])

    return (
        <React.StrictMode>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login isLoggedIn={isLoggedIn} handleLogin={handleLogin} />} />
                    <Route path="/register" element={<Reg handleReg={handleReg} />} />
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


