import React, { useState, useEffect } from 'react'
// import Layout from '../components/Layout/Layout'
import { Form, Input, message } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Spinner from '../components/Spinner'


const Login = () => {

    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    //  Prevent from login User
    useEffect(() => {
        if (localStorage.getItem("users")) {
            navigate("/");
        }
    }, [navigate])

    const submitHandler = async (values) => {
        try {
            setLoading(true);
            const { data } = await axios.post('/api/v1/users/login', values);
            setLoading(false);
            message.success('Login Successfully');
            localStorage.setItem('users', JSON.stringify({ ...data.user, password: '' }))
            navigate('/');
        } catch (error) {
            setLoading(false);
            message.error("Something went wrong");
            console.log(error);
        }
    }

    return (
        <>
            <div className='container'>
                <div className='register-form'>
                <div className='heading'>Expense-Management App</div>
                    {loading && <Spinner />}
                    <Form layout='vertical' onFinish={submitHandler}>
                        <h1>Login Form</h1>
                        <Form.Item label="Email" name='email'>
                            <Input type='email' required />
                        </Form.Item>
                        <Form.Item label="Password" name='password'>
                            <Input type='password' required />
                        </Form.Item>
                        <div className='d-flex'>
                            <Link to='/register'>Register</Link>
                            <button className='btn btn-primary'>Login</button>
                        </div>
                    </Form>
                </div>
            </div>
        </>
    )
}

export default Login