import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Form from '../form';

export default function UserLogin() {
    const navigate = useNavigate();
    const [user, setUser] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:3030/users`)
            .then(response => response.json())
            .then(data => setUser(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    function loginUser(values) {
        // console.log("Logging in with:", values);

        let filteredUser = user.find((user1) => user1.email === values.email);
        console.log(user);
        console.log(filteredUser);

        if (filteredUser) {
            if (values.email === filteredUser.email && values.password === filteredUser.password) {
                console.log("Congratulations, logged in as a user");
                navigate("/user/home", { state: { user: filteredUser } });
            } else {
                console.log("Username or password is wrong");
            }
        } else {
            console.log("You need to register first");
        }
    }

    return (
        <>  <div><h2>Login as a User</h2></div>
            <Form onSubmit={loginUser} />
            <Link to="/user/register"><button className="btn btn-primary ">Register</button></Link>
        </>
    );
}
