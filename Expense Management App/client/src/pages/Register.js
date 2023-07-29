import React, { useState, useEffect } from 'react'
// import Layout from '../components/Layout/Layout'
import { Form, Input, message } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Spinner from '../components/Spinner'

const Register = () => {
    // navigate
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)

    // Form submit
    const submitHandler = async (values) => {
        try {
            setLoading(true);
            await axios.post('/api/v1/users/register', values)
            message.success('Registration Successful');
            setLoading(false)
            navigate('/login')
        } catch (error) {
            setLoading(false);
            message.error('Something went wrong')
            console.log(error);
        }
    }
    // Prevent from Login User
    useEffect(() => {
        if (localStorage.getItem('users')) navigate('/')
    }, [navigate])



    return (
        <>
            <div className='container'>
                <div className='register-form'>
                    <div className='heading'>Expense-Management App</div>
                    {loading && <Spinner />}
                    <Form layout='vertical' onFinish={submitHandler}>
                        <h1>Register Form</h1>
                        <Form.Item label="Name" name={"name"}>
                            <Input type='text' required />
                        </Form.Item>
                        <Form.Item label="Email" name={"email"}>
                            <Input type='email' required />
                        </Form.Item>
                        <Form.Item label="Password" name={"password"}>
                            <Input type='password' required />
                        </Form.Item>
                        <div className='d-flex'>
                            <Link to='/login'>Login</Link>
                            <button className='btn btn-primary'>Register</button>
                        </div>
                    </Form>
                </div>
            </div>
        </>
    )
}

export default Register