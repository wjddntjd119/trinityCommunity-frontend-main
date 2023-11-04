import axios from "../AxiosController";
import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();


const AuthProvider = ({ children }) => {
//로그인하면 처음으로 저장하는 유저토큰
// localStorage.getItem('dorandoran-token');

//아래 코드는 토큰으로 서버에서 가져오고 싶은 값을 불러올때 사용
// axios
//   .get(`/api/users/쓰고싶은 api주소`,{
//     headers: {
//       'dorandoran-token': `${token}`,
//     },
//   })
//   .then((res) => {
//     console.log(res.data);
//   })
//   .catch((err) => {
//     console.log(err.response.data.message);
//   });
// }

  const [ isLoggedIn, setIsLoggedIn ] = useState(false);
  const [ isResdata, setResdata ] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = () => {
    axios.get("/api/users/isLogin")
      .then(res => {
        setResdata(res.data.data);
        console.log(res.data.error + "에러 부분")
        console.log(res.data.data + "데이터 부분");
        if (res.data.error === null || res.data.data === null) {
          setIsLoggedIn(false);
        } else {
          setIsLoggedIn(true);
        }
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  };


  const login = (authInfo) => {
    navigate('/');
  };

  const logout = () => {
    navigate('/');
  }

  const setCookie = (name, value, days) => {
    const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
  };

  return(
    <AuthContext.Provider value={{ isResdata, isLoggedIn, login, logout}}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };