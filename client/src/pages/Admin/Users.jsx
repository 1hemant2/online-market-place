import React, { useState, useEffect } from 'react'
import { Button, Table, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { SetLoader } from '../../redux/loaderSlice';
import { GetAllUsers, UpdateUserStatus } from '../../apicalls/users';
const Users = () => {
    const dispatch = useDispatch();
    const [users, setUsers] = useState([]);
    const getData = async () => {
        console.log('getData is called in Products');
        try {
            const response = await GetAllUsers(null);
            // console.log(response);
            if (response.success) {
                setUsers(response.data);
            }
        } catch (error) {
            message.error(error.message);
        }
    }
    const onStatusUpdated = async (id, status) => {
        try {
            dispatch(SetLoader(true));
            console.log('admin products', id, status);
            const response = await UpdateUserStatus(id, status);
            dispatch(SetLoader(false));
            if (response.success) {
                message.success(response.message);
                getData();
            } else {
                throw new Error(response.message);
            }

        } catch (error) {
            dispatch(SetLoader(false));
            message.error(error.message);
        }
    };
    const columns = [
        {
            title: "Name",
            dataIndex: "name"      //dataIndex must match from mongoDB databases 
        },
        {
            title: "Email",
            dataIndex: "email"      //dataIndex must match from mongoDB databases 
        },
        {
            title: "Role",
            dataIndex: "role",      //dataIndex must match from mongoDB databases 
            render: (text, record) => {
                return record.role.toUpperCase();
            }
        },
        {
            title: "Created At",
            dataIndex: "createdAt",     //dataIndex must match from mongoDB databases 
            render: (text, record) => moment(record.createdAt).format('DD-MM-YYYY hh:mm A'),
        },
        {
            title: "Status",
            dataIndex: "status",
            render: (text, record) => {
                return record.status.toUpperCase();
            }
        },
        {
            title: "Action",
            dataIndex: "action",
            render: (text, record) => {
                // const { status, _id } = { record }
                const status = record.status;
                const _id = record._id;
                // console.log('admin', status, _id);
                return (
                    <div className='flex gap-3'>
                        {status === "active" && <span className='underline cursor-pointer' onClick={() => onStatusUpdated(_id, "blocked")}>block</span>}
                        {status === "blocked" && <span className='underline cursor-pointer' onClick={() => onStatusUpdated(_id, "active")}>unblock</span>}
                    </div>
                )
            }
        }
    ]
    useEffect(() => {
        getData();
    }, [])
    return (
        <div>
            <Table columns={columns} dataSource={users}></Table>
        </div>

    )
}

export default Users;