export default function authHeader(){
    const userToken = sessionStorage.get("auth-token");

    if(userToken){
        return {Authorization: `Bearer ${userToken}`}
    }else{
        return {}
    }
    
}