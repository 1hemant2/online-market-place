import React, { useState, useEffect } from 'react'
import { Button, Table, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { GetProducts, UpdateProductStatus } from '../../apicalls/products';
import moment from 'moment';
import { SetLoader } from '../../redux/loaderSlice';

import { render } from 'react-dom';
const Products = () => {
    const dispatch = useDispatch();
    const [products, setProducts] = useState([]);
    const getData = async () => {
        console.log('getData is called in Products');
        try {
            const response = await GetProducts(null);
            // console.log(response);
            if (response.success) {
                setProducts(response.data);
            }
        } catch (error) {
            message.error(error.message);
        }
    }

    const onStatusUpdated = async (id, status) => {
        try {
            dispatch(SetLoader(true));
            console.log('admin products', id, status);
            const response = await UpdateProductStatus(id, status);
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
            title: "Product",
            dataIndex: "name"      //dataIndex must match from mongoDB databases 
        },
        {
            title: "Seller",
            //dataIndex: "name",  
            render: (text, record) => {
                return record.seller.name;
            }
        },
        {
            title: "Description",
            dataIndex: "description"
        }, {
            title: "Price",
            dataIndex: "price"
        },
        {
            title: "Category",
            dataIndex: "category"
        },
        {
            title: "Age",
            dataIndex: "age"
        },
        {
            title: "Status",
            dataIndex: "status",
            render: (text, record) => {
                return record.status.toUpperCase();
            }
        },
        {
            title: "Added On",
            dataIndex: "createdAt",
            render: (text, record) => moment(record.createdAt).format('DD-MM-YYYY hh:mm A'),
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
                        {status === "pending" && <span className='underline cursor-pointer' onClick={() => onStatusUpdated(_id, "approved")}>approve</span>}
                        {status === "pending" && <span className='underline cursor-pointer' onClick={() => onStatusUpdated(_id, "rejected")}>Reject</span>}
                        {status === "approved" && <span className='underline cursor-pointer' onClick={() => onStatusUpdated(_id, "blocked")}>block</span>}
                        {status === "blocked" && <span className='underline cursor-pointer' onClick={() => onStatusUpdated(_id, "approved")}>unblock</span>}
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
            <Table columns={columns} dataSource={products}></Table>
        </div>

    )
}

export default Products;