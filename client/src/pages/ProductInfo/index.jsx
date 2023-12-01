import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { GetAllBids, GetProductByID } from '../../apicalls/products';
import { SetLoader } from '../../redux/loaderSlice';
import { message } from 'antd';
import { Button } from 'antd';
import Devider from '../../components/Devider'
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
import BidModal from './BidModal';
const ProductInfo = () => {
    const [showAddBid, setShowAddBid] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [product, setProduct] = useState(null);
    const { user } = useSelector((state) => state.users);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();
    const getData = async () => {
        try {
            dispatch(SetLoader(true));
            const response = await GetProductByID(id);
            dispatch(SetLoader(false));
            if (response.success) {
                const bidsResponse = await GetAllBids({ product: id });
                setProduct(
                    {
                        ...response.data,
                        bids: bidsResponse.data
                    });
            }
        } catch (error) {
            dispatch(SetLoader(false));
            message.error(error.message);
        }
    }
    useEffect(() => {
        getData();
    }, [])
    return (
        <div className='mt-5'>
            {product && (
                <div>
                    <div className="grid grid-cols-2 gap-6">
                        {/* images */}
                        <div className="flex flex-col gap-5">
                            <img src={product.images[selectedImageIndex]} alt="" className='hw-full h-96 object-cover rounded-md' />
                            <div className='flex gap-5'>
                                {
                                    product.images.map((images, index) => {
                                        return (
                                            <img
                                                className={'w-20 h-20 object-cover rounded-md cursor-pointer' +
                                                    (selectedImageIndex === index ? "border-2 border-green-700 border-dashed -2" : "")

                                                }
                                                onClick={() => setSelectedImageIndex(index)}
                                                src={images} alt="" />
                                        )
                                    })
                                }

                            </div>
                            <Devider />
                            <div>
                                <h1 className='text-gray-600'>Added on</h1>
                                <span>
                                    {moment(product.createdAt).format("MMM D , YYYY hh:mm A")}
                                </span>
                            </div>
                        </div>
                        {/* product details */}
                        <div className="flex flex-col gap-5">
                            <div className="flex flex-col gap-5">
                                <h1 className='text-2xl font-semibo text-red-800'>{product.name}</h1>
                                <span>{product.description}</span>
                            </div>
                            <Devider />
                            <div className="flex flex-col">
                                <h1 className='text-2xl font-semibold text-orange-900'>
                                    Product Details
                                </h1>
                                <div className="flex justify-between mt-2">
                                    <span>Price</span>
                                    <span>${product.price}</span>
                                </div>
                                <div className="flex justify-between mt-2">
                                    <span>Category</span>
                                    <span>{product.category}</span>
                                </div>
                                <div className="flex justify-between mt-2">
                                    <span>Category</span>
                                    <span>{product.category}</span>
                                </div>
                                <div className="flex justify-between mt-2">
                                    <span>Bill Avilable</span>
                                    <span>{product.billAvailable ? "yes" : "no"}</span>
                                </div>
                                <div className="flex justify-between mt-2">
                                    <span>Accessories Avilable</span>
                                    <span>{product.accessoriesAvailable ? "yes" : "no"}</span>
                                </div>
                                <div className="flex justify-between mt-2">
                                    <span>Waranty Avilable</span>
                                    <span>{product.warantyAvailable ? "yes" : "no"}</span>
                                </div>
                                <div className="flex justify-between mt-2">
                                    <span>Purcased Year</span>
                                    {moment().subtract(product.age, 'year').format("YYYY")} ({product.age} year ago)
                                </div>


                            </div>
                            <Devider />
                            <div className="flex flex-col">
                                <h1 className='text-2xl font-semibold text-orange-900'>
                                    Seller Details
                                </h1>
                                <div className="flex justify-between mt-2">
                                    <span>Name</span>
                                    <span>{product.seller.name}</span>
                                </div>
                                <div className="flex justify-between mt-2">
                                    <span>Email</span>
                                    <span>{product.seller.email}</span>
                                </div>
                            </div>

                            <Devider />
                            <div className="flex flex-col">
                                <div className="flex justify-between">
                                    <h1 className='text-2xl font-semibold text-orange-900'>bids</h1>
                                    <Button
                                        onClick={() => setShowAddBid(!showAddBid)}
                                        // get user from redux
                                        disabled={user._id === product.seller._id}
                                    >New Bid</Button>
                                </div>
                            </div>
                            {
                                product.showBidsOnProductPage &&
                                product.bids.map((bid) => {
                                    return (
                                        <div className="border border-gray-300 border-solid p-3 rounded">
                                            <div className="flex justify-between text-gray-600">
                                                <span>Name</span>
                                                <span>{bid.buyer.name}</span>
                                            </div>
                                            <div className="flex justify-between text-gray-600">
                                                <span>Bid Amount</span>
                                                <span>${bid.bidAmount}</span>
                                            </div>
                                            <div className="flex justify-between text-gray-600">
                                                <span>Bid palced on</span>
                                                <span>{""}{moment(bid.createdAt).format("MMM D , YYYY hh:mm A")}</span>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    {showAddBid && <BidModal
                        product={product}
                        reloadData={getData}
                        showBidModal={showAddBid}
                        setShowBidModal={setShowAddBid}
                    />}
                </div>
            )}
        </div>
    )
}

export default ProductInfo;




