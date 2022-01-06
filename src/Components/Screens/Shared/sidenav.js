import React from 'react'


export default function SideNav(props) {
    return (
        <>
            <nav class="navbar navbar-light bg-light">
                <div class="container-fluid">
                </div>
            </nav>
            <div class="collapse" id="navbarToggleExternalContent">
                <div class="bg-light shadow-3 p-4">
                    <button class="btn btn-link btn-block border-bottom m-0">Link 1</button>
                    <button class="btn btn-link btn-block border-bottom m-0">Link 2</button>
                    <button class="btn btn-link btn-block m-0">Link 3</button>
                </div>
            </div>
            
        </>
    )
}