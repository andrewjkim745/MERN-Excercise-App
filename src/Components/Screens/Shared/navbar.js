import React from 'react'
import { useNavigate } from 'react-router-dom'

// const signOut = async => {
//     try {
//       await localStorage.clear()
//       return true
//     } catch (error) {
//       throw error
//     }
//   }

export default function Navbar() {
    const navigate = useNavigate();

    return (
        <nav class="navbar navbar-light bg-light">
            <div class="container-fluid">
                <a class="navbar-brand">MERN Exercise</a>
                <button type='button' class='btn btn-primary' onClick={()=> {
                    localStorage.clear()
                    navigate('/')
                }}>Sign Out</button>
            </div>
        </nav>
    )
}