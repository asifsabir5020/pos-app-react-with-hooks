import { message } from 'antd';

export const throwServerError = error => {
    if (error.response && error.response.status === 401) {
        message.error('unauthenticated user / login require');
        localStorage.clear();
        window.location.reload();
    } else if (error.response && error.response.data && error.response.data.code !== 11000) {
        try {
            Object.entries(error.response.data).forEach(([key, value]) => {
                if(value.message){
                    message.error(value.message);
                }else if(key === 'error'){
                    message.error(value);
                }else{
                    message.error('Something went wrong!1');
                }
            });
        } catch (e) {
            console.log(e.message);
        }
    } else if (error.response && error.response.data && error.response.data.code === 11000) {
        message.error('Duplicate Entry Not Allowed');
    } else if (error.message) {
        message.error(error.message);
    } else {
        message.error('Something went wrong!2');
    }
};