import apiCLient from "../common/http-client"

const AppServices = {
    login: (payload:any) => {
        console.log(payload)
        return apiCLient.post('/auth/login', payload);
    }
}

export default AppServices
