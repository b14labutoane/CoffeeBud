import React from "react";
import Login from "./components/login.jsx"
import Register from "./components/register.jsx"
import { useState } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'

function App() {
    return (
    <BrowserRouter>
        <Routes>
            <Route path='/register' element={<Register/>}/>
            <Route path='/login' element={<Login/>}/>
            </Routes>
    </BrowserRouter>,
    <div className="App">
        Hello World
     </div>
    )
}

export default App;