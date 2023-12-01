import React, { useRef } from 'react'
import { Modal, Form, Input, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { SetLoader } from '../../redux/loaderSlice';
import { PlaceNewBid } from '../../apicalls/products';
import { AddNotification } from '../../apicalls/notification';
import { Await } from 'react-router-dom';
const BidModal = ({ showBidModal, setShowBidModal, product, reloadData }) => {
    const { user } = useSelector(state => state.users);
    const formRef = useRef(null);
    const rules = [{ required: true, message: "Required" }];
    const dispatch = useDispatch();
    const onFinish = async (values) => {
        try {
            dispatch(SetLoader(true));
            const response = await PlaceNewBid({
                ...values,
                product: product._id,
                seller: product.seller._id,
                buyer: user._id
            })
            dispatch(SetLoader(false));
            if (response.success) {
                message.success("Bid added successfully");

                //send notifications to user 
                await AddNotification({
                    "title": "A new Bid has been placed ",
                    "message": `A new Bid has been placed on you product ${product.title} by ${user.name} for ${values.bidAmount}`,
                    "user": product.seller.id,
                    "onClick": '/profile',
                    read: false
                })
                reloadData();
                setShowBidModal(false);
            } else {
                throw new error(response.message);
            }
        } catch (error) {
            message.error(error.message);
            dispatch(SetLoader(false));
        }
    }
    return (
        <Modal
            onCancel={() => setShowBidModal(false)}
            open={showBidModal}
            centered
            width={800}
            onOk={() => formRef.current.submit()}
        >
            <div className='flex flex-col gap-5 mb-5'>
                <h1 className='text-2xl font-semibold text-orange-900 text-center'>New Bid</h1>
                <Form layout='vertical' ref={formRef}
                    onFinish={onFinish}
                >
                    <Form.Item label='Bid Amount' name="bidAmount" rules={rules}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="message" name="message" rules={rules}>
                        <Input.TextArea></Input.TextArea>
                    </Form.Item>
                    <Form.Item label="Mobile" name="mobile" rules={rules}>
                        <Input type='number' />
                    </Form.Item>

                </Form>
            </div>
        </Modal>
    )
}

export default BidModal;