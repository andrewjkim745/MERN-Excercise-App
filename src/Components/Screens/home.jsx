import React, { useEffect, useState } from 'react'
import Exercises from './Shared/exercises'
import { useNavigate } from 'react-router-dom'
import Sidebar from './Shared/sidebar'
import jwt_decode from "jwt-decode";
import CreateModal from './Shared/modal'
import UpdateModal from './Shared/updateModal'
import Card from './Shared/card'
import Hamburger from './Shared/hamburger'

export default function Home() {


    const navigate = useNavigate();
    const [updateShow, setUpdateShow] = useState(false);
    const handleUpdateClose = () => setUpdateShow(false);
    const handleUpdateShow = () => setUpdateShow(true);
    const [deleted, setDeleted] = useState(false)
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
    }

    async function handleDestroy(exercise) {
        const response = await fetch(`http://localhost:5000/exercises/${exercise._id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        const data = await response.json()
        console.log(data)
        setDeleted(!deleted)
        alert('delete sucessful')
    }

    async function handleUpdate(exercise) {
        const response = await fetch(`http://localhost:5000/exercises/update/${exercise._id}`, {
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
        setUpdated(!updated)
        alert('update successful')
        handleUpdateClose()
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

    async function getExercises(user) {
        console.log('in getExercises', user.id)

        const response = await fetch(`http://localhost:5000/users/${user.id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        console.log('waiting')
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
            getExercises(user)
            setDone(true)
            console.log('user state', user)
            console.log('exercises state in useEffect', exercises)


        } else {
            populateUser()
        }
    }, [updated, deleted])
    return (
        <>
            {done ?
                <>
                    <Hamburger>
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
                    </Hamburger>
                    <div class='row justify-content-center'>
                        <h1 class='text-center my-5'>Your Exercises</h1>
                        <div class='col-md-6 col-sm-12 align-self-end d-flex-column justify-content-center align-items-center' style={{ height: '100vh' }}>
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
                                    exercises.map(exercise => {
                                        console.log(exercise)
                                        return (
                                            <>
                                                <Card
                                                    delete={() => handleDestroy(exercise)}
                                                    description={exercise.description}
                                                    duration={exercise.duration}
                                                    date={exercise.date}
                                                >
                                                    <UpdateModal
                                                        defaultValue={0}
                                                        duration={duration}
                                                        onNumberChange={duration => setDuration(duration)}
                                                        descriptionValue={description}
                                                        onChange={(e) => setDescription(e.target.value)}
                                                        onClick={handleUpdateClose}
                                                        show={updateShow}
                                                        handleShow={handleUpdateShow}
                                                        onHide={handleUpdateClose}
                                                        startDate={date}
                                                        changeDate={(date) => setDate(date)}
                                                        onSubmit={() => handleUpdate(exercise)} />
                                                </Card>
                                            </>
                                        )
                                    })
                                }
                            />
                            <Sidebar
                                username={user.username.charAt(0).toUpperCase() + user.username.slice(1)}
                            >
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
                            </Sidebar>
                        </div>
                    </div>
                </>
                :
                <><h1>Not done rendering</h1></>
            }

        </>
    )
}