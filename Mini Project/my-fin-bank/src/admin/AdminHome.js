import React, { useState, useEffect } from 'react';
import './AdminHome.css';
import Form from '../cuform'


export default function AdminHome() {
    const [users, setUsers] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        // Fetch data from JSON Server when the component mounts
        fetch('http://localhost:3030/users')
            .then(response => response.json())
            .then(data => setUsers(data))
            .catch(error => console.error('Error fetching data:', error));
    }, [users]);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleAskQuestion = () => {
        if (inputValue.trim() !== '') {
            setQuestions([...questions, inputValue]);
            setInputValue(''); // Clear the input field
        }
    };

    const deleteUser = (id) => {
        fetch(`http://localhost:3030/users/${id}`, { method: 'DELETE' });
        setUsers(users.filter(user => user.id !== id));
    }

    async function registerUser(values) {
        try {
            // const response = await fetch(`http://localhost:3030/users`);
            // const data = await response.json();
            const maxId = users.length > 0 ? Math.max(...users.map(user => user.id)) : 0;

            // Prepare the new user data
            const newUser = {
                email: values.email,
                password: values.password,
                balance: values.balance,
                id: (maxId + 1).toString() // Increment the maxId to get a new unique ID
            };
            // let alreadyAvailable = data.filter((person) => { return (person.email === values.email); })
            // if (alreadyAvailable.length > 0) {
            //     setAlready(true);
            //     return;
            // }
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

            } else {
                console.error('Failed to create user');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const updateAmount = async (values) => {
        try {
            // Fetch the user by email
            const response = await fetch(`http://localhost:3030/users?email=${values.email}`);
            const userData = await response.json();

            if (userData.length === 1) {
                // Extract the user id and existing user data
                const { id } = userData[0];

                // Convert id to string
                let idN = id.toString(); // or `${id}`

                console.log(idN);

                // Construct the updated user object with the new balance
                const updatedUser = {
                    id: id,
                    email: values.email,
                    password: values.password,
                    balance: values.balance
                };

                // Make a PUT request to update the user
                const putResponse = await fetch(`http://localhost:3030/users/${idN}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(updatedUser)
                });

                if (putResponse.ok) {
                    console.log("Balance updated successfully!");
                } else {
                    console.error('Failed to update balance');
                }
            } else {
                console.error('User not found or multiple users found with the same email');
            }
        } catch (error) {
            console.error('Error updating balance:', error);
        }
    };




    return (
        <div className='container'>
            <div className="row1 d-flex justify-content-around"><div style={{ width: '40%' }}>
                <h4>Create New User</h4>
                <Form onSubmit={registerUser} />
            </div>
                <div style={{ width: '40%' }}>
                    <h4>Update a User</h4><Form onSubmit={updateAmount} /></div></div>

            <div className='row'>
                <div className='col-md-6' style={{ width: '48%' }}>

                    <div className='datas' style={{ width: '100%' }} >
                        {users.map(user => (
                            <div className="user my-2" key={user.id}>
                                <ul className='list-unstyled'>
                                    <li>User Id : <strong>{user.id}</strong></li>
                                    <li>Email : <strong>{user.email}</strong></li>
                                    <li>Balance : <strong>{user.balance}</strong></li>
                                </ul>
                                <button className="btn btn-danger" onClick={() => deleteUser(user.id)}>Delete</button>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="chat">
                        <div className="chatInput">
                            <input type="textarea" className="form-control" placeholder="Ask Questions . . ." value={inputValue} onChange={handleInputChange} />
                            <button className="btn btn-primary mt-2" onClick={handleAskQuestion}>Ask</button>
                        </div>
                        <div className="chatMessages">
                            {questions.map((question, index) => (
                                <div key={index} className="message">{question}</div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}
