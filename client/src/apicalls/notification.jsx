import { axiosInstance } from "./apiInstace";

//add notifications 
export const AddNotification = async (data) => {
    try {
        const response = await axiosInstance.post("/api/notification/notify", data);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

//get all notifications by user 
export const GetAllNotificaitons = async () => {
    try {
        const response = await axiosInstance.get("/api/notification/get-all-notification");
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

//delete notification 
export const DeleteNotificaitons = async (id) => {
    try {
        const response = await axiosInstance.delete(`/api/notifcations/delete-notifications/${id}`);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

//read all notifications 
export const ReadAllNotificaitons = async () => {
    try {
        const response = await axiosInstance.get("/api/notifcations/read-all-notifications");
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}


