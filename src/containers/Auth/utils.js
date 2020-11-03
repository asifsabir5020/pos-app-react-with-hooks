export const setTokenAndUser = (token, user = {}) => {
    localStorage.setItem('auth_token', token);
    localStorage.setItem('user', JSON.stringify(user));
};

export const removeTokenAndUser = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
};

export const getAuthToken = () => localStorage.getItem('auth_token');

export const getUserRole = () => localStorage.getItem('user') && JSON.parse(localStorage.getItem('user')).role || null;

export const getUserEmail = () => localStorage.getItem('user') && JSON.parse(localStorage.getItem('user')).email || null;

export const isAuthenticatedUser = () => {
    try{
        const token = localStorage.getItem('auth_token');
        return !!token;
    }catch(e){
        console.error(e)
    }
};

export const landingRoute = user => {
    return '/dashboard';
};