import React, { useEffect, useState } from 'react'
import Exercises from './Shared/exercises'
import { useNavigate } from 'react-router-dom'
import Sidebar from './Shared/sidebar'
import jwt_decode from "jwt-decode";
import CreateModal from './Shared/modal'
import UpdateModal from './Shared/updateModal'
import Card from './Shared/card'
import Hamburger from './Shared/hamburger'
import ReactLoading from 'react-loading';

export default function Home() {

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
        const req = await fetch('/users', {
            headers: {
                'x-access-token': localStorage.getItem('token'),
            },
        })
        const data = await req.json()
    }

    async function handleDestroy(exercise) {
        const response = await fetch(`https://mern-exer.herokuapp.com/api/exercises/${exercise._id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        const data = await response.json()
        setDeleted(!deleted)
        alert('delete sucessful')
    }

    async function handleUpdate(exercise) {
        const response = await fetch(`https://mern-exer.herokuapp.com/api/exercises/update/${exercise._id}`, {
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
        const response = await fetch(`https://mern-exer.herokuapp.com/api/users/${user.id}`, {
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
        
        if (data) {
            alert('Create exercise success')
            handleClose()
            setUpdated(!updated)
            
        } else {
            alert('Create exercise failed')
        }
    }

    async function getExercises(user) {
        const response = await fetch(`https://mern-exer.herokuapp.com/api/users/${user.id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        const data = await response.json()
        setExercises([...data.exercises])
    }

    useEffect(() => {
        const base_url = window.location.origin;
        const token = localStorage.getItem('token')
        if (token) {
            const user = jwt_decode(token)
            setUser(user)
            getExercises(user)
            setDone(true)
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
                <ReactLoading
                type={'spin'} color={'blue'} height={'20%'} width={'20%'}
                />
            }

        </>
    )
}