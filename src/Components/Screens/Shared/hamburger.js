import React, { useState } from 'react'
// import 'bootstrap/dist/css/bootstrap.min.css';
import './hamburger.css'
import { useNavigate } from 'react-router-dom'

export default function Hamburger(props) {

    const navigate = useNavigate();

    return (
        <>
            <div class="container mt-4">
                <div class="container-fluid">
                    <button class="navbar-toggler collapsed d-flex d-lg-none flex-column justify-content-around" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="toggler-icon top-bar"></span>
                        <span class="toggler-icon middle-bar"></span>
                        <span class="toggler-icon bottom-bar"></span>
                    </button>
                    <div class="mt-2 collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav">
                            <li class="nav-item mt-2">
                                {props.children}
                            </li>
                            <li class="nav-item">
                                <button type='button' onClick={props.create} class='btn btn-primary mt-4' onClick={() => {
                                    localStorage.clear()
                                    navigate('/')
                                }}>Sign Out</button>
                            </li>
                        </ul>


                    </div>
                </div>

            </div>
        </>
    )
}