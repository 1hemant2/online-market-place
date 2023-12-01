import React, { useEffect, useState } from 'react'
import { Avatar, Badge, message } from "antd"
import { GetCurrentUser } from '../apicalls/users'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { SetLoader } from '../redux/loaderSlice';
import { SetUser } from '../redux/usersSlice';
import Notifications from './Notifications';
import { GetAllNotificaitons } from '../apicalls/notification';

const ProtectedPage = ({ children }) => {
    const [notifications, setNotifications] = useState([]);
    const [showNotifications, setShowNotifications] = useState(false);
    const { user } = useSelector((state) => state.users);
    const navigete = useNavigate();
    const dispatch = useDispatch();
    const validateToken = async () => {
        try {
            dispatch(SetLoader(true));
            const response = await GetCurrentUser();
            dispatch(SetLoader(false));
            if (response.success) {
                dispatch(SetUser(response.data));
            } else {
                message.error(response.message);
            }
        } catch (error) {
            dispatch(SetLoader(false));
            navigete("/login");
        }
    }
    const getNotifications = async () => {
        try {
            dispatch(SetLoader(true));
            const response = await GetAllNotificaitons();
            dispatch(SetLoader(false));
            if (response.success) {
                setNotifications(response.data);
            } else {
                throw new Error(response.message);
            }
        } catch (error) {
            dispatch(SetLoader(false));
            message.error(error.message);
        }
    }
    useEffect(() => {
        if (localStorage.getItem("token")) {
            validateToken();
            getNotifications();
            //console.log(user);
        } else {
            message.error("please login to continue ")
            navigete("/login");
        }
    }, [])

    return (
        user &&
        (
            <div >
                {/* header */}
                <div className='flex  justify-between items-center bg-primary p-5'>
                    <h1 className='text-2xl text-white cursor-pointer' onClick={() => navigete("/")}>Market Place</h1>
                    <div className="bg-white py-2 px-5 rounded flex gap-1 items-center ">
                        <i className="ri-user-2-fill"></i>
                        <span className='uppercase underline cursor-pointer'
                            onClick={() => {
                                if (user.role === "user") {
                                    navigete("/Profile")
                                } else {
                                    navigete("/admin")
                                }
                            }}
                        >
                            {user.name}
                        </span>
                        <Badge className='ml-4'
                            count={notifications?.filter((notification) => !notification.read).length}
                            onClick={() => setShowNotifications(true)}
                        >
                            <Avatar shape="circle"
                                icon={<i class="ri-notification-2-line "></i>}
                            />
                        </Badge>
                        <i className="ri-logout-box-r-line ml-10"
                            onClick={() => {
                                localStorage.removeItem("token");
                                navigete("/login");
                            }}
                        ></i>
                    </div>
                </div>
                {/* showing child component */}
                <div className='p-5'>{children}</div>
                {
                    <Notifications
                        notifications={notifications}
                        reloadNotifications={setNotifications}
                        showNotifications={showNotifications}
                        setShowNotifications={setShowNotifications}
                    />
                }
            </div>
        )

    )
}

export default ProtectedPage;