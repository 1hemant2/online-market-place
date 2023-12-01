import { axiosInstance } from "./apiInstace";

export const RegisterUser = async (payload) => {
    try {
        const response = await axiosInstance.post("/api/users/register", payload);
        // console.log(response);
        return response.data;
    } catch (error) {
        //console.log('error');
        return error.message;
    }
}
//login user 
export const LoginUser = async (payload) => {
    try {
        const response = await axiosInstance.post("/api/users/login", payload);
        // console.log(response);
        return response.data;
    } catch (error) {
        return error.message;
    }
}

//get current-user 
export const GetCurrentUser = async () => {
    try {
        const response = await axiosInstance.get("/api/users/get-current-user");
        return response.data;
    } catch (error) {
        return error.message;
    }
}

//get all users 
export const GetAllUsers = async () => {
    try {
        const response = await axiosInstance.get("/api/users/get-all-users");
        return response.data;
    } catch (error) {
        return error.message;
    }
}

//update user status 
export const UpdateUserStatus = async (id, payload) => {
    try {
        const response = await axiosInstance.put(`/api/users/update-user-status/${id}`, { status: payload });
        return response.data;
    } catch (error) {
        return error.message;
    }
}