import axios, { AxiosInstance } from "axios";
import { toast } from "react-toastify";

const getCurrentURL = () => {
    return "http://localhost:8080"
}

const apiCLient: AxiosInstance = axios.create({
    baseURL: getCurrentURL(),
    headers: {
        "Content-Type": "application/json",
    },
});

const createAxiosResponseInterceptor = (axiosInstance: AxiosInstance) => {
    axiosInstance.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {
            if(axios.isAxiosError(error)){
                toast.error(error.response?.data, {
                    position: "bottom-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    theme: "colored"
                })
            }
            return Promise.reject(error);
        }
    );
};

createAxiosResponseInterceptor(apiCLient)

export default apiCLient
