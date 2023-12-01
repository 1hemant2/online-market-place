import React from 'react'
import { Upload, Button, message } from 'antd'
import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { SetLoader } from '../../../redux/loaderSlice';
import { EditProduct, UploadProductImage } from '../../../apicalls/products';
const Images = (selectedProduct, setShowProductsForm, getData) => {
    const [counts, setCounts] = useState(2);
    const [showPreview, setShowPreview] = useState(true);
    const [images, setImages] = useState(selectedProduct.selectedProduct.images);
    const [file, setFile] = useState(null);
    const dispatch = useDispatch();
    const upload = async () => {
        try {
            dispatch(SetLoader(true));
            //upload image to cloudnary 
            const formData = new FormData();
            formData.append("file", file);
            formData.append("productId", selectedProduct.selectedProduct._id);
            const response = await UploadProductImage(formData);
            dispatch(SetLoader(false));
            if (response.success) {
                message.success(response.message);
                setImages([...images, response.data]);
                setShowPreview(false);
                setFile(null);
                selectedProduct.getData();
            } else {
                message.error(error.message);
            }
        } catch (error) {
            dispatch(SetLoader(false));
            message.error(error.message);
        }

    }
    const deleteImage = async (image) => {
        try {
            const updateImageArray = images.filter((img) => img !== image);
            const updateProduct = { ...selectedProduct.selectedProduct, images: updateImageArray }
            dispatch(SetLoader(true));
            const response = await EditProduct(selectedProduct.selectedProduct._id, updateProduct);
            dispatch(SetLoader(false))
            if (response.success) {
                message.success(response.message);
                setImages(updateImageArray);
                selectedProduct.getData();
            } else {
                throw new error(response.message);
            }
            dispatch(SetLoader(false));
        } catch (error) {
            dispatch(SetLoader(false));
            message.error(error.message);
        }
    }
    return (
        <div>
            <div className='flex gap-5 mb-5'>
                {
                    images.map((image) => {
                        return (
                            <div className='flex gap-2 border-solid border-gray-500 rounded p-2 items-end' key={counts + 1}>
                                <img
                                    className='h-20 w-20 object-fill'
                                    src={image} alt="" />
                                <i className="ri-delete-bin-line" onClick={() => deleteImage(image)}></i>
                            </div>
                        )
                    })
                }
            </div>
            <Upload
                listType='picture'
                beforeUpload={() => false}
                onChange={(info) => {
                    setFile(info.file)
                    setShowPreview(true)
                }}
                showUploadList={showPreview}
            >
                <Button type='dashed'>Upload Images</Button>
            </Upload>
            <div className='flex justify-end gap-5 mt-5'>
                <Button
                    type='default'
                    onClick={() => {
                        selectedProduct.setShowProductsForm(false)
                    }}
                >
                    cancel
                </Button>
                <Button type='primary' onClick={upload} disabled={!file} >upload</Button>
            </div>
        </div>
    )
}

export default Images