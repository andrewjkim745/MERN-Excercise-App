import React from 'react'

export default function Card(props) {
    return (
        <div class="card text-center mb-4">
            <div class="card-body">
                <h5 class="card-title">{props.duration} Minutes</h5>
                <p class="card-text">
                    {props.description}
                </p>
                <div class='container'>
                    <div class="row justify-content-center">
                        <div class='col-lg-8 col-md-6 mt-2'>
                            <a onClick={props.delete}class="btn btn-danger"><i class="fas fa-trash fa-fw me-3"></i>Delete</a>
                        </div>
                        <div class='col-lg-8 col-md-6 mt-2'>
                            {props.children}
                        </div>

                    </div>
                </div>
            </div>
            <div class="card-footer text-muted">{props.date}</div>
        </div>
    )
}