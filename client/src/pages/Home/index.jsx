import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { GetProducts } from '../../apicalls/products';
import { SetLoader } from '../../redux/loaderSlice';
import { message, Form, Input, Button } from 'antd';
import Devider from '../../components/Devider'
import { useNavigate } from 'react-router-dom';
import Filters from './Filters';
import { SetUser } from '../../redux/usersSlice';
import Slider from './Slider';

const Home = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.users);
    const [products, setProducts] = useState([]);
    // console.log('home', user);
    dispatch(SetUser(user))
    const [filters, setFilters] = useState({
        status: "approved",
        category: [],
        age: [],
    })
    const [showFilters, setShowFilters] = useState(true);
    const navigate = useNavigate();
    const getData = async () => {
        try {

            dispatch(SetLoader(true));
            const response = await GetProducts(filters);
            dispatch(SetLoader(false));
            if (response.success) {
                setProducts(response.data);
            }
        } catch (error) {
            dispatch(SetLoader(false));
            message.error(error.message);
        }
    }
    const onFinish = (values) => {
        console.log('form value', values.search);
        setFilters({ ...filters, search: values.search });
    }
    useEffect(() => {
        getData();
    }, [filters, setFilters])
    return (
        <div>
            <div className='flex gap-5'>
                {showFilters && <Filters setFilters={setFilters} filters={filters} setShowFilters={setShowFilters} showFilters={showFilters}></Filters>}
                <div className='flex flex-col gap-5 w-full'>
                    <div className='flex gap-4 items-center'>
                        {!showFilters && <i class="ri-equalizer-line cursor-pointer"
                            onClick={() => setShowFilters(!showFilters)}
                        ></i>}

                        <div className='ml-40 mt-8'>
                            <Form onFinish={onFinish} layout='vertical' >
                                <div className="flex">
                                    <div className="">
                                        <Form.Item name="search">
                                            <Input placeholder='Search product here' style={{ width: '100vh' }} />
                                        </Form.Item>
                                    </div>
                                    <div className='ml-2'>
                                        <Form.Item>
                                            <Button type='primary' htmlType='submit' style={{}} >Search</Button>
                                        </Form.Item>
                                    </div>
                                </div>
                            </Form>
                        </div>
                    </div>
                    <Slider />
                    <div className={`grid gap-5 ${showFilters ? "grid-cols-4" : "grid-cols-5"}`}>
                        {
                            products.map((product) => (
                                <div className='border border-gray-300 rounded border-solid flex flex-col gap-2 cursor-pointer' key={product._id}
                                    onClick={() => navigate(`/product/${product._id}`)}
                                >
                                    <img src={product.images[0]} className='w-full h-52  p-2 rounded-md ' alt="" />
                                    <div className="px-2 flex flex-col gap-1">
                                        <h1 className='text-lg font-semibold'>{product.name}</h1>
                                        <p className='text text-gray-500'>{product.description
                                        }</p>
                                        <Devider></Devider>
                                        <span className='text-lg font-semibold text-green-500'>
                                            ${product.price}
                                        </span>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
            <div className='mt-5 h-8 bg-slate-900 text-white  flex justify-center items-center relative bottom-0 ' >@copyright 2023</div>
        </div>
    )
}

export default Home;

