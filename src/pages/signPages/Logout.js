import axios from '../../AxiosController';
import { useNavigate } from "react-router-dom";

const Logout = () =>{

  const navigate = useNavigate();

  axios.get("/api/users/logout")
  .then(res => {
    localStorage.removeItem('dorandoran-token');
    alert("로그아웃했습니다.");
    navigate('/');
  }).catch(err => {
    alert("에러가 발생했습니다.");
    console.log(err.response.data.message);
  });
}

export default Logout;