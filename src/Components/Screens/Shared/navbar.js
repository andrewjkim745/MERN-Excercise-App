import React from 'react'


// const signOut = async => {
//     try {
//       await localStorage.clear()
//       return true
//     } catch (error) {
//       throw error
//     }
//   }

export default function Navbar() {


    return (
        <nav class="navbar navbar-light bg-light">
            <div class="container-fluid">
                <a class="navbar-brand">Mern</a>
                <button>Sign Out</button>
            </div>
        </nav>
    )
}