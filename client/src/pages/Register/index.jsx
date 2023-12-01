import { React, useEffect } from 'react';
import { Form, Input, Button, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import Devider from '../../components/Devider';
import { RegisterUser } from '../../apicalls/users';
import { useDispatch } from 'react-redux';
import { SetLoader } from '../../redux/loaderSlice';
const rules = [
    {
        required: true,
        massage: "required",
    }
]  //it is used for validation
const Register = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const onFinish = async (values) => {
        try {
            dispatch(SetLoader(true));
            const response = await RegisterUser(values);
            dispatch(SetLoader(false));
            if (response.success) {
                // console.log(res.message);
                navigate("/login");
                message.success(response.message);
            } else {
                throw new Error(response.message);
            }
        } catch (error) {
            message.error(error.message);
        }
    }
    useEffect(() => {
        if (localStorage.getItem("token")) {
            // window.location.href = "/";
            dispatch(SetLoader(false));
            navigate("/");
            //console.log("i have done it ");
        }
    }, [])
    return (
        <div className='h-screen bg-primary flex justify-center items-center'>
            <div className='bg-white p-5 rounded w-[450px]'>
                <h1 className='text-primary text-xl'>MARKEY <span className='text-gray-400'>Register</span></h1>
                <Devider></Devider>
                <Form layout='vertical' onFinish={onFinish}>
                    <Form.Item label="Name" name="name" rules={rules}>
                        <Input type="text" placeholder='Name' />
                    </Form.Item>
                    <Form.Item label="Email" name="email" rules={rules}>
                        <Input type='email' placeholder='email'></Input>
                    </Form.Item>
                    <Form.Item label="password" name="password" rules={rules}>
                        <Input type='password' placeholder='password'></Input>
                    </Form.Item>
                    <Button type='primary' htmlType='submit' className='mt-2' block>Register</Button>
                    <div className='mt-5 text-center'>
                        <span className='text-gray 500'>
                            Already have an account?{" "}
                            <Link to="/login" className="text-primary">Login</Link>
                        </span>
                    </div>
                </Form>
            </div>
        </div>
    );
}

export default Register; 
