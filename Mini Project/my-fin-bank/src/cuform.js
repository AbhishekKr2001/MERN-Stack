
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

export default function LoginForm({ onSubmit }) {
    return (
        <Formik
            initialValues={{ email: '', password: '', balance: 0 }}

            validationSchema={
                Yup.object({

                    email: Yup.string().email('Invalid Email Address').required('Email is required'),
                    password: Yup.string().required("Bewakoof hai kya yaar").min(5, 'Minimum five character required')

                })
            }



            onSubmit={(values, { resetForm }) => {
                onSubmit(values);
                resetForm();
            }}
        >
            <Form>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <Field type="email" className="form-control" id="email" name="email" />
                    <ErrorMessage name='email' component="div" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <Field type="password" className="form-control" id="password" name="password" />
                    <ErrorMessage name='password' component="div" />
                </div>
                <div className="mb-3">
                    <label htmlFor="balance" className="form-label">Balance</label>
                    <Field type="number" className="form-control" id="balance" name="balance" />
                    <ErrorMessage name='balance' component="div" />
                </div>

                <button type="submit" className="btn btn-primary my-2">Update</button>
            </Form>
        </Formik>
    );
}
