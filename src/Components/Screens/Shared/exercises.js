import React, { useEffect, useState } from 'react'





export default function Exercises() {

    const [exercises, setExercises ] = useState('')
    const [ empty , setEmpty ] = useState(false)
    
    async function getExercises(event) {
        event.preventDefault()
        const response = await fetch(`http://localhost:5000/users${user.id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                description, 
                duration, 
                date,
            }),
        })
        

        const data = await response.json()
        console.log(data)
        if (data) {
            setExercises(data)
        } else {
            setEmpty(true)
        }
    }


    useEffect(() => {
        getExercises()
    },[])
    return (
        <>
        {empty ? <h1>You have not logged any exercises!</h1> : <h1>There are exercises</h1>}
        </>
    )
}