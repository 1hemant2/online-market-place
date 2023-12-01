import { Modal, Table, message } from 'antd';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { SetLoader } from '../../../redux/loaderSlice';
import { GetAllBids } from '../../../apicalls/products';
import moment from 'moment';
import Devider from '../../../components/Devider';
const Bids = ({ showBidsModal, setShowBidsModal, selectedProducts }) => {
    const [bidsData, setBidsData] = useState([]);
    const dispatch = useDispatch();
    const getData = async () => {
        try {
            dispatch(SetLoader(true));
            const response = await GetAllBids({
                product: selectedProducts._id
            }
            )
            dispatch(SetLoader(true));
            if (response.success) {
                setBidsData(response.data);
                dispatch(SetLoader(false));
            } else {
                throw new error(error.message);
            }
        } catch (error) {
            dispatch(SetLoader(false));
            message.error(error.message);
        }
    }
    const columns = [
        {
            title: "Name",
            dataIndex: "name",      //dataIndex must match from mongoDB databases 
            render: (text, record) => {
                return (
                    record.buyer.name
                )
            }

        }, {
            title: "Bid Amount",
            dataIndex: "bidAmount"
        },
        {
            title: "Bid Date",
            dataIndex: "createdAt",
            render: (text, record) => moment(record.createdAt).format('DD-MM-YYYY hh:mm A')
        },
        {
            title: "message",
            dataIndex: "message"
        },
        {
            title: "Contact Details",
            dataIndex: "contactDetails",
            render: (text, record) => {
                return (
                    <div>
                        <p>phone:{record.mobile}</p>
                        <p>Email:{record.buyer.email}</p >
                    </div>
                )
            }
        }
    ]
    useEffect(() => {
        getData();
    }, [])
    return (
        <Modal
            title=""
            open={showBidsModal}
            onCancel={() => setShowBidsModal(false)}
            centered
            width={1200}
            footer={false}
        >
            <div className="flex gap-5 flex-col">
                <h1 className='text-2xl text-primary'>Bids</h1>
                <Devider />
                <h1 className='text-2xl text-gray-500'>{selectedProducts.name} - Bids</h1>
                <Table columns={columns} dataSource={bidsData}></Table>
            </div>
        </Modal>
    )
}

export default Bids;