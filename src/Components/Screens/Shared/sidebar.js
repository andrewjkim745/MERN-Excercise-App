import React, { useEffect, useState } from 'react'
import './sidebar.css'
import { useNavigate } from 'react-router-dom'

// const icons = ['fas fa-font', 'fas fa-bold', 'fab fa-cuttlefish', 'fab fa-dyalog',  ]
export default function Sidebar(props) {
  const navigate = useNavigate();

  return (
    <>
        <nav id="sidebarMenu" class="collapse d-lg-block sidebar collapse bg-white">
          <div class="position-sticky">
            <div class="list-group list-group-flush mx-3">
              <h5 class='text-center'>Hello {props.username}</h5>
              <a href="#" class="list-group-item list-group-item-action py-2 ripple"
              ><i class="fas fa-running fa-fw me-3"></i><span>Exercises</span></a
              >
              <a href="#" class="list-group-item list-group-item-action py-2 ripple"
              ><i class="fas fa-book fa-fw me-3"></i><span>Log</span></a>
              {props.children}
              <button type='button' onClick={props.create} class='btn btn-primary mt-4' onClick={() => {
                localStorage.clear()
                navigate('/')
              }}>Sign Out</button>
            </div>
          </div>
        </nav>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    </>
  )
}