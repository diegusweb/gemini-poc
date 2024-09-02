import axios, { AxiosInstance } from "axios";

const getCurrentURL = () => {
    return "http://localhost:8080"
}

const apiCLient: AxiosInstance = axios.create({
    baseURL: getCurrentURL(),
    headers: {
        "Content-Type": "application/json",
    },
});

export default apiCLient
