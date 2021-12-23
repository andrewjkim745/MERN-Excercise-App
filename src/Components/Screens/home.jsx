import React, { useEffect, useState } from 'react'
// import jwt from 'jsonwebtoken'

import { useNavigate } from 'react-router-dom'
import Navbar from './Shared/navbar'




export default function Home() {

    const navigate = useNavigate();
    const [user, setUser ] = useState('')

    async function populateUser() {

         const req = await fetch('http://localhost:5000/users', {
            headers: {
                'x-access-token': localStorage.getItem('token'),
            },
        })

        const data = await req.json()
        if (data.status === 'ok') {
            console.log(data)
        } else {
            alert(data.error)
        }
    }


    useEffect(() => {

        const token = localStorage.getItem('token')
        if (token) {
            // const user = jwt.decode(token)
            if (!user) {
                localStorage.removeItem('token')
                navigate('/login')
            }
        } else {
            populateUser()
        }
    }, [])
    return (
        <>
        <Navbar/>
        </>
    )
}