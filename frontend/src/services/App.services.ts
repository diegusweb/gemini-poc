import apiCLient from "../common/http-client"
import { getToken } from "../utils/HelperFucntions";

const AppServices = {
    login: (payload: any) => {
        return apiCLient.post('/auth/login', payload);
    },
    singup: (payload: any) => {
        return apiCLient.post('/auth/signup', payload);
    },
    getTasks: () => {
        const userToken = getToken();
        apiCLient.defaults.headers.common['Authorization'] = `Bearer ${userToken}`;
       return apiCLient.get('/api/v1/tasks');
        // return apiCLient.get('/api/v1/tasks', {
        //     headers: {
        //         "Content-Type": "application/json",
        //         ...(userToken && { 'Authorization': `Bearer ${userToken}` })
        //     }
        // });
    },
}

export default AppServices
