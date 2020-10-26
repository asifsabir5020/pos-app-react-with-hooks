import { message } from 'antd';

export const throwServerError = error => {
    console.log('error', error.response);
    if (error.response && error.response.status === 401) {
        message.error('Unauthorized error');
    } else if (error.response && error.response.data) {
        try {
            Object.entries(error.response.data).forEach(([key, value]) => {
                if(value.message){
                    message.error(value.message);
                }else{
                    message.error('Something went wrong!');
                }
            });
        } catch (e) {
            message.error('Something went wrong!');
        }
    } else if (error.message) {
        message.error(error.message);
    } else {
        message.error('Something went wrong!');
    }
};