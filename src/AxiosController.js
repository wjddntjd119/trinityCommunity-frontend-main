import axios from "axios";

axios.defaults.withCredentials = true; //axios

axios.defaults.baseURL = 'http://localhost:8080';

export default axios;