import React, { useEffect, useState } from 'react'
import Exercises from './Shared/exercises'
import { useNavigate } from 'react-router-dom'
import Sidebar from './Shared/sidebar'
import jwt_decode from "jwt-decode";
import CreateModal from './Shared/modal'

export default function Home() {


    const navigate = useNavigate();
    const [numberValue, setNumberValue] = useState(0)
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [startDate, setStartDate] = useState(new Date());
    const [description, setDescription ] = useState('')
    const [user, setUser] = useState('')
    const [done, setDone] = useState(false)


    async function populateUser() {

        const req = await fetch('http://localhost:5000/users', {
            headers: {
                'x-access-token': localStorage.getItem('token'),
            },
        })

        const data = await req.json()
        console.log(data)
    }


    useEffect(() => {

        const token = localStorage.getItem('token')
        if (token) {
            const user = jwt_decode(token)
            setUser(user)
            console.log(user)
            setDone(true)
            
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
                                    numberValue={numberValue}
                                    onNumberChange={numberValue => setNumberValue(numberValue)}
                                    descriptionValue={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    onClick={handleClose}
                                    show={show}
                                    handleShow={handleShow}
                                    onHide={handleClose}
                                    startDate={startDate}
                                    changeDate={(date) => setStartDate(date)}
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