import React from 'react'





export default function Card(props) {
    return (
        <div class="card text-center mb-4">
            <div class="card-body">
                <h5 class="card-title">{props.duration}</h5>
                <p class="card-text">
                    {props.description}
                </p>
                <a href="#" class="btn btn-primary">Delete</a>
            </div>
            <div class="card-footer text-muted">{props.date}</div>
        </div>
    )
}