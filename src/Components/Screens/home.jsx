import React, { useEffect, useState } from 'react'
import Exercises from './Shared/exercises'
import { useNavigate } from 'react-router-dom'
import Navbar from './Shared/navbar'
import Sidebar from './Shared/sidebar'
import Esther from '../../assets/lp_image.jpg'
import crypto from "crypto-js";
import jwt_decode from "jwt-decode";

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
        console.log(data)
        // if (data.status === 'ok') {
        //     console.log(data)
        // } else {
        //     alert(data.error)
        // }
    }


    useEffect(() => {

        const token = localStorage.getItem('token')
        if (token) {
            const user = jwt_decode(token)
            // console.log(user.email)
            console.log(user)
            // const user = JsCrypto.AES.decrypt(token, "secret123")
            // const cryptoInfo = crypto.AES.encrypt(JSON.stringify(token), "secret123")
            // console.log(cryptoInfo)
            // const info2 = crypto.AES.decrypt(cryptoInfo.toString(), "secret123").toString(crypto.enc.Utf8)
            // console.log({ info2 })
            // const userData = JSON.parse(token)
            setUser(user)
            // console.log(user)
            // console.log(JSON.parse(user.token))

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
        <div class='d-flex'>
        <Sidebar/>
        <Exercises
        userId={user.id}
        />
        </div>
        <Navbar 
         username={user.username}
         />
        
        </>
    )
}