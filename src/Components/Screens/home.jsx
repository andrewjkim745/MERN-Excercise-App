import React, { useEffect } from 'react'
import jwt from 'jsonwebtoken'
import { useHistory } from 'react-router-dom'





export default function Home() {

    const history = useHistory()

    async function populateUser() {
        const data = await fetch('http://localhost:5000/users', {
            headers: {
                'x-access-token': localStorage.getItem('token'),
            },
        })

        const data = req.json()
        console.log(data)
    }


    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            const user = jwt.decode(token)
            if (!user) {
                localStorage.removeItem('token')
                history.replace('/login')
            }
        } else {
            populateUser()
        }
    }, [])
    return (
        <>
        <p>this is home</p>
        </>
    )
}