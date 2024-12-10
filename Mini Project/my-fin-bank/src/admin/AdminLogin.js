import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Form from '../form'
export default function AdminLogin() {
    const navigate = useNavigate();
    const [user, setUser] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:3040/admins`)
            .then(response => response.json())
            .then(data => setUser(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);
    function loginAdmin(values) {

        let filteredAdmin = user.find((user1) => user1.email === values.email);
        console.log(user);
        console.log(filteredAdmin);

        if (filteredAdmin) {
            if (values.email === filteredAdmin.email && values.password === filteredAdmin.password) {
                console.log("Congratulations, logged in as a Admin");
                navigate("/admin/home", { state: { admin: filteredAdmin } });
            } else {
                console.log("Username or password is wrong");
            }
        } else {
            console.log("You need to register first as an Admin");
        }
    }


    return (
        <>  <div><h2>Login as an Admin</h2></div>
            <Form onSubmit={loginAdmin} />
            <Link to="/admin/register"> <button className="btn btn-primary">Register</button></Link>
        </>
    )
}
