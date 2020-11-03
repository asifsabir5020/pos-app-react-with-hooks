import axios from 'axios';
import { getAuthToken } from '../../containers/Auth/utils';
import {SERVER} from "./globleConstants";
import {getServerPort} from "./globleUtils";


const baseURL = `http://${SERVER}:${getServerPort()}/api/v1`;
export { baseURL };
const token = getAuthToken() || '';

axios.defaults.baseURL = baseURL;
axios.defaults.headers['Authorization'] = `Bearer ${token}`;

