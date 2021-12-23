import React from 'react' 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './Screens/login'
import * as mdb from 'mdb-ui-kit';
window.mdb = mdb;

document.querySelectorAll('.form-outline').forEach((formOutline) => {
    new mdb.Input(formOutline).init();
  });

export default function Routing() {

    return (
        <Router>
            <Routes>
            <Route exact path='/' element={<Login/>}/>
            </Routes>
        </Router>
    )
}