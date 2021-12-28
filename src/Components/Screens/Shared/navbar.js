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

export default function Navbar(props) {
    const navigate = useNavigate();

    return (
        <nav class="navbar navbar-light bg-light">
            <div class="container-fluid">
                {/* <a class="navbar-brand">{props.username}</a> */}

            </div>
        </nav>
    )
}