import React, { useEffect, useState } from 'react'
import './login.css'
import * as mdb from 'mdb-ui-kit';
window.mdb = mdb;



export default function Login() {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [register, setRegister] = useState('Login')

    useEffect(() => {
        document.querySelectorAll('.form-outline').forEach((formOutline) => {
            new mdb.Input(formOutline).init();
        });
    }, [])
    // https://mern-exer.herokuapp.com
    async function registerUser(event) {
        event.preventDefault()
        const response = await fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username, 
                email, 
                password,
            }),
        })

        const data = await response.json()

        alert("Register Success!")
        if (data.status = 'register successful') {
            setRegister('Login')
        }
    }

    async function loginUser(event) {
        event.preventDefault()
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password,
            }),
        })

        const data = await response.json()
        console.log(data.user)
        if(data.user) {
            
            localStorage.setItem('token', data.user)
            alert('Login Successful!')
            window.location.href = '/home'
        } else {
            alert('Please check your username and password')
        }
    }


    return (
        <section class="vh-100">
            <div class="container py-5 h-100">
                <div class="row d-flex align-items-center justify-content-center h-100">
                    <div class="col-md-8 col-lg-7 col-xl-6">
                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg" class="img-fluid" alt="Phone image" />
                    </div>
                    <div class="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
                        <div class='container py-3 text-nowrap text-center'>
                            <h2>MERN Exercise {register}</h2>
                        </div>
                        <form onSubmit={register === 'Register' ? registerUser : loginUser}>
                            <div class={register === 'Login' ? 'form-outline mb-4 displayNone' : "form-outline mb-4"}>
                                <input onChange={(e) => setUsername(e.target.value)} value={username} type="username" id="form12" class="form-control form-control-lg" />
                                <label class="form-label" for="form12">Username</label>
                            </div>
                            <div class="form-outline mb-4">
                                <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" id="form12" class="form-control form-control-lg" />
                                <label class="form-label" for="form12">Email address</label>
                            </div>

                            <div class="form-outline mb-4">
                                <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" id="form1Example23" class="form-control form-control-lg" />
                                <label class="form-label" for="form1Example23">Password</label>
                            </div>
                            <div class="d-flex justify-content-around align-items-center mb-4">

                                <div class="form-check">
                                    <input
                                        class="form-check-input"
                                        type="checkbox"
                                        value=""
                                        id="form1Example3"
                                        checked
                                    />
                                    <label class="form-check-label" for="form1Example3"> Remember me </label>
                                </div>
                                <a href="#!">Forgot password?</a>
                            </div>
                            <button type="submit" class="btn btn-primary btn-lg btn-block">{register === 'Register' ? 'Register' : 'Log In'}</button>

                            <div class="divider d-flex align-items-center my-4">
                                <p class="text-center fw-bold mx-3 mb-0 text-muted">OR</p>
                            </div>
                            <a onClick={() => setRegister('Register')} class={register === 'Register' ? 'displayNone' : "btn btn-primary btn-lg btn-block"} style={{ backgroundColor: '#3b5998' }} role="button">
                                <i class="fa fa-registered me-2" aria-hidden="true"></i>Register
                            </a>
                            <a onClick={() => setRegister('Login')} class={register === 'Login' ? 'displayNone' : "btn btn-primary btn-lg btn-block"} style={{ backgroundColor: '#3b5998' }} role="button">
                                Login
                            </a>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}




