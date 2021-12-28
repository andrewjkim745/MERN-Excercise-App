import React, { useEffect, useState } from 'react'
import Exercises from './Shared/exercises'
import { useNavigate } from 'react-router-dom'
import Sidebar from './Shared/sidebar'
import jwt_decode from "jwt-decode";
import CreateModal from './Shared/modal'

export default function Home() {


    const navigate = useNavigate();
    const [duration, setDuration] = useState(0)
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [date, setDate] = useState(new Date());
    const [description, setDescription ] = useState('')
    const [user, setUser] = useState('')
    const [done, setDone] = useState(false)
    const [exercises, setExercises ] = useState('')


    async function populateUser() {

        const req = await fetch('http://localhost:5000/users', {
            headers: {
                'x-access-token': localStorage.getItem('token'),
            },
        })

        const data = await req.json()
        console.log(data)
    }

        async function getExercises() {
        
        const response = await fetch(`http://localhost:5000/users/${user.id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        const data = await response.json()
        console.log(data)
        setExercises(data.exercises)
        console.log(exercises)
        
    }
    async function handleSubmit(event) {
        event.preventDefault()
        const response = await fetch(`http://localhost:5000/users/${user.id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                duration,
                date,
                description
            }),
        })

        const data = await response.json()
        console.log(data)
        if(data) {
            alert('Create exercise success')
        } else {
            alert('Create exercise failed')
        }
    }


    useEffect(() => {

        const token = localStorage.getItem('token')
        if (token) {
            const user = jwt_decode(token)
            setUser(user)
            console.log(user.exercises)
            setDone(true)
            getExercises()
        } else {
            populateUser()
        }
    }, [])
    return (
        <>
            {done ?
                <div class='d-flex justify-content-center align-items-center' style={{ height: '100vh' }}>
                    <Exercises
                        userId={user.id}
                        exercises={user.exercises.length === 0 ?
                            <div class='text-center'>
                                <h1>You have not logged any exercises!</h1>
                                <CreateModal 
                                    defaultValue={0}
                                    duration={duration}
                                    onNumberChange={duration => setDuration(duration)}
                                    descriptionValue={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    onClick={handleClose}
                                    show={show}
                                    handleShow={handleShow}
                                    onHide={handleClose}
                                    startDate={date}
                                    changeDate={(date) => setDate(date)}
                                    onSubmit={handleSubmit}
                                />
                            </div>

                            : 
                            <h1>You have exercises</h1>}
                    />
                    <Sidebar
                        username={user.username.charAt(0).toUpperCase() + user.username.slice(1)}
                    />
                    
                </div> 
                :
                <></>
            }
            
        </>
    )
}