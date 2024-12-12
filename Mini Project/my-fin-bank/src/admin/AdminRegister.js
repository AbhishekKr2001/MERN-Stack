import React from 'react'
import Form from '../form'
import { useState } from 'react';
export default function AdminRegister() {
    const [show, setShow] = useState(false);
    function registerAdmin(values) {
        console.log("admin registered" + values)
        if (true) {
            setShow(true);
        }
    }

    return (<>
        <div><h2>Register as an Admin</h2></div>
        <Form onSubmit={registerAdmin} />
        {show && <div> admin is added successfully </div>}</>
    )
}
