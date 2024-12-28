import React, { useState } from 'react';
import './UserHome.css';
import { useLocation } from 'react-router-dom';
import TransferForm from './transferForm';

export default function UserHome() {
    const location = useLocation();
    const user = location.state?.user;
    const [amount, setAmount] = useState(user.balance);
    const [inputValue, setInputValue] = useState('');
    const [questions, setQuestions] = useState([]);

    const handleUpdate = () => {
        const parsedValue = parseInt(inputValue);
        setAmount(amount + parsedValue);
        setInputValue(''); // Clear the input field
    };

    const handleWithdrawal = () => {
        const parsedValue = parseInt(inputValue);
        if (amount >= parsedValue) {
            setAmount(amount - parsedValue);
            setInputValue(''); // Clear the input field
        } else {
            alert("Insufficient balance!");
        }
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleAskQuestion = () => {
        if (inputValue.trim() !== '') {
            setQuestions([...questions, inputValue]);
            setInputValue(''); // Clear the input field
        }
    };


    const updateAmount = async () => {
        try {
            const response = await fetch(`http://localhost:3030/users/${user.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: user.email, password: user.password, balance: amount })
            });

            if (response.ok) {
                console.log("Balance updated successfully!");
            } else {
                console.error('Failed to update balance');
            }
        } catch (error) {
            console.error('Error updating balance:', error);
        }
    };

    const transfer = async (values) => {
        try {
            // Fetch the user by email
            const response = await fetch(`http://localhost:3030/users?email=${values.email}`);
            const userData = await response.json();

            if (userData.length === 1) {
                //     // Extract the user id and existing user data
                const { id } = userData[0];

                // Construct the updated user object with the new balance
                const given = parseInt(values.balance);
                let newBalance = userData[0].balance + given;
                const updatedUser = {
                    id: userData.id,
                    email: userData[0].email,
                    password: userData[0].password,
                    balance: newBalance
                };

                setAmount(amount - given);
                // Make a PUT request to update the user
                const putResponse = await fetch(`http://localhost:3030/users/${id}`, {
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
    }

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-md-6">

                        <div className="functions">
                            <div className="balance">Balance Left: <h3>{amount}</h3></div>
                            <div className="input">
                                <input type="number" className="form-control" value={inputValue} onChange={handleInputChange} placeholder="Enter Amount to Deposit or Withdrawl" />
                            </div>
                            <div className="do">
                                <div className="deposit"><button className="btn btn-primary" onClick={handleUpdate}>Deposit</button></div>
                                <div className="withdrawl"><button className="btn btn-primary" onClick={handleWithdrawal}>Withdraw</button></div>

                                <div className="deposit"><button className="btn btn-primary" onClick={updateAmount} >All Done</button></div>
                            </div>
                            <div className="fundtransfer functions  my-2"><TransferForm onSubmit={transfer} /></div>
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
            </div>
        </>
    );
}
