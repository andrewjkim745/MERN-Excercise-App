import React, { useEffect, useState } from 'react'
// import JsCrypto from "jscrypto/es6"

// import SHA256 from "jscrypto/es6/SHA256"
import Rat from '../../assets/rat.png'
import { useNavigate } from 'react-router-dom'
import Navbar from './Shared/navbar'
import Sidebar from './Shared/sidebar'
import Esther from '../../assets/lp_image.jpg'
import crypto from "crypto-js";


export default function Home() {
    // console.log(JsCrypto.SHA256.hash("test").toString());

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
            // const user = JsCrypto.AES.decrypt(token, "secret123")
            // const cryptoInfo = crypto.AES.encrypt(JSON.stringify(token), "secret123")
            // console.log(cryptoInfo)
            // const info2 = crypto.AES.decrypt(cryptoInfo.toString(), "secret123").toString(crypto.enc.Utf8)
            // console.log({ info2 })
            const userData = JSON.parse(token)
            setUser(userData)
            console.log(user)
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
        <Sidebar/>
        <Navbar
        username={user.username}
        />
        
        </>
    )
}