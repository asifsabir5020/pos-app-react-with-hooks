import axios from 'axios';
import { getAuthToken } from '../../containers/Auth/utils';

const server = 'localhost';
// const server = '192.168.0.104';
let baseURL = `http://${server}:8080/api/v1`; // development mode
if (process.env.NODE_ENV === 'production') {
    baseURL = `http://${server}:8000/api/v1`; // production mode
}
export { baseURL };
const token = getAuthToken() || '';

axios.defaults.baseURL = baseURL;
axios.defaults.headers['Authorization'] = `Bearer ${token}`;

