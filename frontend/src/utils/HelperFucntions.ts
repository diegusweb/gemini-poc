export const getToken = () => {
    return sessionStorage.getItem('token');
}

export const removeToken = () => {
    sessionStorage.removeItem('token');
}

export const setToken = (val:any) => {
    sessionStorage.setItem('token', val);
}