import React from 'react'
import Form from '../form'
import { useState } from 'react';
export default function UserRegister() {

    const [show, setShow] = useState(false);
    const [already, setAlready] = useState(false);

    async function registerUser(values) {
        try {
            const response = await fetch(`http://localhost:3030/users`);
            const data = await response.json();
            const maxId = data.length > 0 ? Math.max(...data.map(user => user.id)) : 0;

            // Prepare the new user data
            const newUser = {
                email: values.email,
                password: values.password,
                balance: 0,
                id: (maxId + 1).toString() // Increment the maxId to get a new unique ID
            };
            let alreadyAvailable = data.filter((person) => { return (person.email === values.email); })
            if (alreadyAvailable.length > 0) {
                setAlready(true);
                return;
            }
            // Make a POST request to create a new user
            const postResponse = await fetch(`http://localhost:3030/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newUser)
            });

            if (postResponse.ok) {
                console.log("User created successfully!");
                setShow(true);
            } else {
                console.error('Failed to create user');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }




    return (
        <>
            <div><h2>Register as a User</h2></div>
            <Form onSubmit={registerUser} />

            {already && <div> This email is already registered U can login now</div>}
            {show && <div> user is added successfully</div>}
        </>

    )
}
