import axios from "axios";

axios.defaults.withCredentials = true; //axios

axios.defaults.baseURL = 'http://dorandoran-alb-2141553575.ap-northeast-2.elb.amazonaws.com';

export default axios;