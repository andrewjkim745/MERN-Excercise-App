import React from 'react' 
import './sidebar.css'


export default function Sidebar() {
    return (
        <nav id="sidebarMenu" class="collapse d-lg-block sidebar collapse bg-white">
        <div class="position-sticky">
          <div class="list-group list-group-flush mx-3 mt-4">
            <a
              href="#"
              class="list-group-item list-group-item-action py-2 ripple"
              aria-current="true"></a>
            <a href="#" class="list-group-item list-group-item-action py-2 ripple"
              ><i class="fas fa-running fa-fw me-3"></i><span>Exercises</span></a
            >
            <a href="#" class="list-group-item list-group-item-action py-2 ripple"
              ><i class="fas fa-book fa-fw me-3"></i><span>Log</span></a>
          </div>
        </div>
      </nav>
    )
}