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
       return apiCLient.get('/api/v1/tasks/');
    },
    addTasks: (payload:any) => {
        const userToken = getToken();
        apiCLient.defaults.headers.common['Authorization'] = `Bearer ${userToken}`;
       return apiCLient.post('/api/v1/tasks', payload);
    },
    updateTask: (taskId:any, payload:any) => {
        const userToken = getToken();
        apiCLient.defaults.headers.common['Authorization'] = `Bearer ${userToken}`;
       return apiCLient.put('/api/v1/tasks/'+taskId, payload);
    },
    deleteTask: (taskId:any) => {
        const userToken = getToken();
        apiCLient.defaults.headers.common['Authorization'] = `Bearer ${userToken}`;
       return apiCLient.post('/api/v1/tasks/'+taskId);
    },
}

export default AppServices
