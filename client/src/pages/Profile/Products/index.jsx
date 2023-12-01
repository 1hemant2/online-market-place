import React, { useState, useEffect } from 'react'
import { Button, Table, message } from 'antd';
import ProductsForm from './ProductsForm';
import { useDispatch, useSelector } from 'react-redux';
import { SetLoader } from '../../../redux/loaderSlice';
import { DeleteProduct, GetProducts } from '../../../apicalls/products';
import moment from 'moment';
import Bids from './Bids';
const Products = () => {
    const [showBids, setShowBids] = useState(false);

    const [showProdutsForm, setShowProductsForm] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const dispatch = useDispatch();
    const [products, setProducts] = useState([]);
    const { user } = useSelector((state) => state.users)
    const getData = async () => {
        //console.log('getData is called in Products');
        try {
            dispatch(SetLoader(true));
            const response = await GetProducts(
                { seller: user._id }
            );
            console.log(response);
            dispatch(SetLoader(false));
            if (response.success) {
                setProducts(response.data);
            }
        } catch (error) {
            dispatch(SetLoader(false));
            message.error(error.message);
        }
    }
    const deleteProduct = async (id) => {
        try {
            dispatch(SetLoader(true));
            const response = await DeleteProduct(id);
            dispatch(SetLoader(false));
            if (response.success) {
                message.success(response.message);
                getData();
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
        }, {
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
            dataIndex: "status"
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
                return (
                    <div className='flex gap-5'>
                        <i className="ri-delete-bin-line" onClick={() => {
                            //  console.log('delete clicked');
                            deleteProduct(record._id);
                        }}></i>
                        <i className="ri-pencil-line" onClick={() => {
                            setSelectedProduct(record);
                            setShowProductsForm(true);
                        }}></i>
                        <span className='underline cursor-pointer'
                            onClick={() => {
                                setSelectedProduct(record);
                                setShowBids(true);
                            }}
                        >show Bids</span>
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
            <div className='flex justify-end mb-2 items-center'>
                <Button type='default'
                    onClick={() => {
                        setSelectedProduct(null);
                        setShowProductsForm(true)
                    }}
                >Add Product</Button>
            </div>

            <Table columns={columns} dataSource={products}></Table>
            {showProdutsForm && <ProductsForm showProductsForm={showProdutsForm} setShowProductsForm={setShowProductsForm} selectedProduct={selectedProduct} getData={getData}></ProductsForm>}
            {showBids && <Bids showBidsModal={showBids} setShowBidsModal={setShowBids} selectedProducts={selectedProduct}></Bids>}
        </div>

    )
}

export default Products;