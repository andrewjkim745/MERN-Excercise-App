import React from 'react' 
import './sidebar.css'
import { useNavigate } from 'react-router-dom'

const icons = ['fas fa-font', 'fas fa-bold', 'fab fa-cuttlefish', 'fab fa-dyalog',  ]
export default function Sidebar(props) {
  const navigate = useNavigate();
    return (
        <nav id="sidebarMenu" class="collapse d-lg-block sidebar collapse bg-white">
        <div class="position-sticky">
          <div class="list-group list-group-flush mx-3 mt-4">
          <h1 class='text-center'>Hello {props.username}</h1>
            <a href="#" class="list-group-item list-group-item-action py-2 ripple"
              ><i class="fas fa-running fa-fw me-3"></i><span>Exercises</span></a
            >
            <a href="#" class="list-group-item list-group-item-action py-2 ripple"
              ><i class="fas fa-book fa-fw me-3"></i><span>Log</span></a>
                            <button type='button' class='btn btn-primary' onClick={()=> {
                    localStorage.clear()
                    navigate('/')
                }}>Sign Out</button>  
          </div>
        </div>
      </nav>
    )
}