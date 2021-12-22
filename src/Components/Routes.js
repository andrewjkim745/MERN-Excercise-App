import React from 'react' 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './Screens/login'


export default function Routing() {

    return (
        <Router>
            <Routes>
            <Route exact path='/' element={<Login/>}/>
            </Routes>
        </Router>
    )
}