import axios from 'axios';

let baseURL = 'http://localhost:3006/api';
if (process.env.NODE_ENV === 'production') {
    baseURL = 'http://localhost:3006/api';
}
export { baseURL };

axios.defaults.baseURL = baseURL;
axios.defaults.headers["content-type"] = "application/json";