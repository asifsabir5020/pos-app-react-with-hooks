import {throwServerError} from "../../Common/utiles/throwServerError";

export const setTokenAndUser = (token, user = {}) => {
    localStorage.setItem('auth_token', token);
    localStorage.setItem('user', JSON.stringify(user));
};

export const removeTokenAndUser = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
};

export const getAuthToken = () => localStorage.getItem('auth_token');

export const isAuthenticatedUser = () => {
    try{
        const token = localStorage.getItem('auth_token');
        return !!token;
    }catch(e){
        throwServerError(e)
    }
};

export const landingRoute = user => {
    return '/dashboard';
};