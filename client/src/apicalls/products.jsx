import { axiosInstance } from "./apiInstace";
export const AddProduct = async (payload) => {
    try {
        const response = await axiosInstance.post(
            "/api/products/add-product",
            payload
        );
        return response.data;
    } catch (error) {
        return error.message;
    }
}
//get all products 
export const GetProducts = async (filters) => {
    try {
        const response = await axiosInstance.post('/api/products/get-produts', filters);
        return response.data;
    } catch (error) {
        return error.message;
    }
}

//get Product By ID
export const GetProductByID = async (id) => {
    try {
        const response = await axiosInstance.get(`/api/products/get-product-by-id/${id}`);
        console.log('data' + response.data);
        return response.data;
    } catch (error) {
        return error.message;
    }
}

//edit products 
export const EditProduct = async (id, payload) => {
    try {
        const response = await axiosInstance.put(`/api/products/edit-product/${id}`, payload);
        return response.data;
    } catch (error) {
        return error.message;
    }
}

//delete product 
export const DeleteProduct = async (id) => {
    try {
        const response = await axiosInstance.delete(`/api/products/delete-product/${id}`);
        return response.data;
    } catch (error) {
        return error.message;
    }
}

//upload product image 
export const UploadProductImage = async (payload) => {
    try {
        console.log('apicall', 'calling upload')
        const response = await axiosInstance.post("/api/products/upload-image-to-product", payload);
        return response.data
    } catch (error) {
        return error.message;
    }
}



//update product status 
export const UpdateProductStatus = async (id, status) => {
    try {

        console.log('api products', id, status);
        const response = await axiosInstance.put(`/api/products/update-product-status/${id}`, { status: status });
        return response.data;
    } catch (error) {
        return error.message;
    }
}

//placed a new Bid 
export const PlaceNewBid = async (payload) => {
    try {
        const response = await axiosInstance.post("/api/bids/place-new-bid", payload);
        return response.data;
    } catch (error) {
        return error.message;
    }
}

//get all bids 
export const GetAllBids = async (filters) => {
    try {
        const response = await axiosInstance.post("/api/bids/get-all-bids", filters);
        return response.data;
    } catch (error) {
        return error.message;
    }
}