import React, { useEffect, useState } from 'react'
// import jwt from 'jsonwebtoken'
import Rat from '../../assets/rat.png'
import { useNavigate } from 'react-router-dom'
import Navbar from './Shared/navbar'
import Sidebar from './Shared/sidebar'
import Esther from '../../assets/lp_image.jpg'


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
            const user = (token)
            // if (!user) {
            //     localStorage.removeItem('token')
            //     navigate('/')
            // }
        } else {
            populateUser()
        }
    }, [])
    return (
        <>
        <Sidebar/>
        <Navbar/>
        {/* <img style={{ width: 1000, marginLeft: 500, zIndex: -9000}} src={Esther}></img> */}
        
        </>
    )
}