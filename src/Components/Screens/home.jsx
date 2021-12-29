import React, { useEffect, useState } from 'react'
import Exercises from './Shared/exercises'
import { useNavigate } from 'react-router-dom'
import Sidebar from './Shared/sidebar'
import jwt_decode from "jwt-decode";
import CreateModal from './Shared/modal'

export default function Home() {


    const navigate = useNavigate();
    const [updated, setUpdated] = useState(false)
    const [duration, setDuration] = useState(0)
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [date, setDate] = useState(new Date());
    const [description, setDescription] = useState('')
    const [user, setUser] = useState('')
    const [done, setDone] = useState(false)
    const [exercises, setExercises] = useState('')


    async function populateUser() {

        const req = await fetch('http://localhost:5000/users', {
            headers: {
                'x-access-token': localStorage.getItem('token'),
            },
        })

        const data = await req.json()
        // console.log(data)
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
        console.log(data.exercises)
        if (data) {
            alert('Create exercise success')
            handleClose()
            setUpdated(!updated)
            console.log('updated')
        } else {
            alert('Create exercise failed')
        }
    }

    async function getExercises() {

        const response = await fetch(`http://localhost:5000/users/${user.id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        const data = await response.json()
        console.log('data response from getExercises', data.exercises)
        setExercises([...data.exercises])
        console.log('exercises state', exercises)

    }


    useEffect(() => {

        const token = localStorage.getItem('token')
        if (token) {
            const user = jwt_decode(token)
            setUser(user)
            console.log('set user state')
            getExercises()
            setDone(true)
            console.log('user state', user)
            console.log('exercises state in useEffect', exercises)


        } else {
            populateUser()
        }
    }, [updated])
    return (
        <>
            {done ?
                <div class='d-flex justify-content-center align-items-center' style={{ height: '100vh' }}>
                    <Exercises
                        exercises={exercises.length === 0 ?
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
                            // <>hello</>
                            exercises.map(exercise => {
                                return (
                                    <div class='d-flex-column'>
                                        <h1>{exercise.description}</h1>
                                        <h1>{exercise.duration}</h1>
                                        <h1>{exercise.date}</h1>
                                    </div>
                                )
                            })
                        }
                    />
                    <Sidebar
                        username={user.username.charAt(0).toUpperCase() + user.username.slice(1)}
                    />

                </div>
                :
                <><h1>Not done rendering</h1></>
            }

        </>
    )
}