import apiCLient from "../common/http-client"

const AppServices = {
    login: (payload: any) => {
        return apiCLient.post('/auth/login', payload);
    },
    singup: (payload: any) => {
        return apiCLient.post('/auth/signup', payload);
    },
}

export default AppServices
