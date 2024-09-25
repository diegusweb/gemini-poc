import { getToken } from "../utils/HelperFucntions";

export default function authHeader(){
    const userToken = getToken();

    if(userToken){
        return {Authorization: `Bearer ${userToken}`}
    }else{
        return {}
    }
    
}