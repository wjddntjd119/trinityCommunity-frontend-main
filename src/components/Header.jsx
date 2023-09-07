import "../App.css";
import axios from "../AxiosController"
import { useContext,useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Logout from "../pages/signPages/Logout";

const Header = (props) => {
  //const { isResdata } = useContext(AuthContext);
  const navigate = useNavigate();
  const [userName, setUserName] = useState(null);
  const token = localStorage.getItem('dorandoran-token')

  useEffect(() => {
    if (token !== null) {
      axios
        .get(`/api/users/info`,{
          headers: {
            'dorandoran-token': `${token}`,
          },
        })
        .then((res) => {
          console.log(res.data);
          console.log(res.data.data.userId);
          console.log(res.data.data.userName);
          setUserName(res.data.data.userName);
        })
        //.catch((err) => {
        //  console.log(err.response.data.message);
        //});
    }
  }, [token]);



  const Login = () => {
    navigate('/login');
  };

  const handleLogout = () => {
    localStorage.removeItem('dorandoran-token');
    alert("로그아웃했습니다.");
    window.location.reload();
  };

  const Center = () => {
    // 시험용 코드입니다.
    window.location.replace("http://www.naver.com");
  };

  return(
    <div className="header">
      <div className="topBar">
        { userName !== null ?
          <p>[{userName}]</p>: <p>[로그인을 해주세용]</p>  
        }
        
        { token !== null ? 
          <div className="status">접속중</div> : <div className="status">비활성화</div>
        }
        <p>·</p>
        { token !== null ?
          <div className="loginControl" onClick={handleLogout}>로그아웃</div> : <div className="loginControl" onClick={Login}>로그인</div>
        }
        <p>·</p>
        <div className="customerCenter" onClick={Center}>고객센터</div>
      </div>
    </div>
  )
};

export default Header;
