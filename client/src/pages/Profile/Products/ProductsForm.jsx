import React, { useEffect, useState } from 'react'
import { Col, Modal, Row, Tabs, message } from 'antd';
import { Form, Input } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useDispatch, useSelector } from 'react-redux'
import { SetLoader } from '../../../redux/loaderSlice';
import { AddProduct, EditProduct } from '../../../apicalls/products';
import Images from './Images';
const additionalthings = [
    {
        label: "Bill Available",
        name: "billAvailable"
    },
    {
        label: "Warranty Available",
        name: "warantyAvailable"
    },
    {
        label: "Accessories Available",
        name: "accessoriesAvailable"
    },
    {
        label: "Box Available",
        name: "boxAvailable"
    }
]
const rules = [
    {
        required: true,
        message: "Required"
    }
]
const ProductsForm = ({ showProductsForm, setShowProductsForm, selectedProduct, getData }) => {
    const [selectedTab = "1", setSelectedTab] = useState("1");
    const { user } = useSelector((state) => state.users);
    const formRef = React.useRef(null);
    const dispatch = useDispatch();
    const onFinish = async (values) => {
        try {
            dispatch(SetLoader(true));
            let response = null;
            if (selectedProduct) {
                response = await EditProduct(selectedProduct._id, values)
                console.log(response);
            } else {
                values.seller = user._id;
                values.status = "pending";
                response = await AddProduct(values);
            }
            dispatch(SetLoader(false));
            if (response.success) {
                getData();
                setShowProductsForm(false);
                message.success(response.message);
            } else {
                message.error(response.message);
            }
        } catch (error) {
            dispatch(SetLoader(false));
            message.error(error.message);
        }
    }
    useEffect(() => {
        if (selectedProduct) {
            formRef.current.setFieldsValue(selectedProduct);
        }
    }, [selectedProduct]);
    return (
        <div>

            <Modal
                title=""
                open={showProductsForm}
                onCancel={() => {
                    console.log('cancel clicked');
                    setShowProductsForm(false)
                }}
                centered
                width={800}
                okText="save"
                onOk={
                    () => {
                        formRef.current.submit();
                    }
                }
                {...(selectedTab === "2" && { footer: false })}
            >
                <h1 className="text-primary text-2xl text-center font-semibold uppercase">
                    {selectedProduct ? "Edit Product" : "Add Product"}
                </h1>
                <Tabs defaultActiveKey='1'
                    accessKey={setSelectedTab}
                    onChange={(key) => setSelectedTab(key)}
                >
                    <Tabs.TabPane tab="General" key="1">
                        <Form layout='vertical' ref={formRef} onFinish={onFinish}>
                            <Form.Item label="Name" name="name" rules={rules}>
                                <Input type="text" />
                            </Form.Item>
                            <Form.Item label="Description" name="description" rules={rules}>
                                <TextArea type="text" />
                            </Form.Item>
                            <Row gutter={[16, 16]}>
                                <Col span={8}>
                                    <Form.Item label="Price " name="price" rules={rules}>
                                        <Input type='number'></Input>
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item label="Category" name="category" rules={rules}>
                                        <select>
                                            <option value="">Select</option>
                                            <option value="electronics">Electronics</option>
                                            <option value="fashion">Fashion</option>
                                            <option value="home">Home</option>
                                            <option value="sports">Sports</option>
                                        </select>
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item label="Age" name="age" rules={rules} >
                                        <input type="number" />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <div className='flex gap-10'>
                                {
                                    // valuePropName=checked becuase in checkbox we have to write
                                    additionalthings.map((item) => {
                                        return <Form.Item label={item.label} name={item.name} key={item.name}
                                            valuePropName='checked'
                                        >
                                            <Input
                                                type='checkbox'
                                                value={item.name}
                                                onChange={(e) => {
                                                    formRef.current.setFieldsValue({
                                                        [item.name]: e.target.checked,
                                                    });
                                                }}
                                                checked={formRef.current?.getFieldValue(item.name)}
                                            />
                                        </Form.Item>
                                    })
                                }
                            </div>
                            <Form.Item
                                label="Show Bids On Product Page" name="showBidsOnProductPage"
                                valuePropName='checked'
                            >
                                <Input
                                    type='checkbox'
                                    onChange={(e) => {
                                        formRef.current.setFieldsValue({
                                            showBidsOnProductPage: e.target.checked
                                        });
                                    }}
                                    checked={formRef.current?.getFieldValue("showBidsOnProductPage")}
                                    style={{ width: 50, marginLeft: 20 }}
                                />
                            </Form.Item>
                        </Form>
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Images" key="2" disabled={!selectedProduct}>
                        <Images
                            selectedProduct={selectedProduct}
                            getData={getData}
                            setShowProductsForm={setShowProductsForm}
                        ></Images>
                    </Tabs.TabPane>
                </Tabs>
            </Modal>
        </div>
    )
}

export default ProductsForm