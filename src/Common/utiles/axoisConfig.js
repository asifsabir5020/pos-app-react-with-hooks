import axios from 'axios';

let baseURL = 'http://localhost:8080/api/v1'; // development mode
if (process.env.NODE_ENV === 'production') {
    baseURL = 'http://localhost:8000/api/v1'; // production mode
}
export { baseURL };

axios.defaults.baseURL = baseURL;
axios.defaults.headers["content-type"] = "application/json";