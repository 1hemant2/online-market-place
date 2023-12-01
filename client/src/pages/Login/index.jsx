import React, { useEffect, useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import Devider from '../../components/Devider';
import { LoginUser } from '../../apicalls/users';
import { useDispatch } from 'react-redux';
import { SetLoader } from '../../redux/loaderSlice';
import { SetUser } from '../../redux/usersSlice';
const rules = [
    {
        required: true,
        massage: "required",
    }
]  //it is used for validation
const Login = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const onFinish = async (values) => {
        try {
            dispatch(SetLoader(true));
            const response = await LoginUser(values);
            dispatch(SetLoader(false));
            if (response.success) {
                message.success(response.message);
                localStorage.setItem("token", response.data);
                setIsLoggedIn(true);
                navigate("/");
            } else {
                throw new Error(response.message);
            }
        } catch (error) {
            setIsLoggedIn(false);
            dispatch(SetLoader(false));
            message.error(error.message);
        }
    }
    useEffect(() => {
        if (localStorage.getItem("token") && isLoggedIn) {
            navigate("/")
        }
    }, [])
    return (
        <div className='h-screen bg-primary flex justify-center items-center'>
            <div className='bg-white p-5 rounded w-[450px]'>
                <h1 className='text-primary text-xl'>MARKEY <span className='text-gray-400'>Login</span></h1>
                <Devider></Devider>
                <Form layout='vertical' onFinish={onFinish}>
                    <Form.Item label="Email" name="email" rules={rules}>
                        <Input type='email' placeholder='email'></Input>
                    </Form.Item>
                    <Form.Item label="password" name="password" rules={rules}>
                        <Input type='password' placeholder='password'></Input>
                    </Form.Item>
                    <Button type='primary' htmlType='submit' className='mt-2' block>Login</Button>
                    <div className='mt-5 text-center'>
                        <span className='text-gray-500'>
                            Don't have an account?{" "}
                            <Link to="/register" className="text-primary">Register</Link>
                        </span>
                    </div>
                </Form>
            </div>
        </div>
    );
}

export default Login;
