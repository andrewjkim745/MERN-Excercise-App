import React from 'react' 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './Screens/login'
import Home from './Screens/home'


export default function Routing() {

    return (
        <Router>
            <Routes>
            <Route exact path='/' element={<Login/>}/>
            <Route exact path='/home' element={<Home/>}/>
            </Routes>
        </Router>
    )
}