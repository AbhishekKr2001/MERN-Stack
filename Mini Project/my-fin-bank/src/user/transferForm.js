import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

export default function TransferForm({ onSubmit }) {
    return (
        <Formik
            initialValues={{ email: '', balance: 0 }}

            validationSchema={
                Yup.object({

                    email: Yup.string().email('Invalid Email Address').required('Email is required'),
                    balance: Yup.string().min(1, 'Minimum  1 digit required')

                })
            }



            onSubmit={(values, { resetForm }) => {
                onSubmit(values);
                resetForm();
            }}
        >
            <Form>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label" >Email address</label>
                    <Field type="email" className="form-control" id="email" placeholder="Whom to Transfer" name="email" />
                    <ErrorMessage name='email' component="div" />
                </div>

                <div className="mb-3">
                    <label htmlFor="balance" className="form-label">Balance</label>
                    <Field type="number" className="form-control" id="balance" placeholder="Amount to transfer" name="balance" />
                    <ErrorMessage name='balance' component="div" />
                </div>

                <button type="submit" className="btn btn-primary my-2">Update</button>
            </Form>
        </Formik>
    );
}
