import React, { useEffect } from 'react'
// import jwt from 'jsonwebtoken'
import { useNavigate } from 'react-router-dom'




export default function Home() {

    // const navigate = useNavigate();

    // async function populateUser() {
    //      const req = await fetch('http://localhost:5000/users', {
    //         headers: {
    //             'x-access-token': localStorage.getItem('token'),
    //         },
    //     })

    //     const data = req.json()
    //     console.log(data)
    // }


    // useEffect(() => {
    //     const token = localStorage.getItem('token')
    //     if (token) {
    //         const user = (token)
    //         if (!user) {
    //             localStorage.removeItem('token')
    //             navigate('/login')
    //         }
    //     } else {
    //         populateUser()
    //     }
    // }, [])
    return (
        <>
        <p>this is home</p>
        </>
    )
}