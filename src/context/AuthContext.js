import React, { createContext } from "react";
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

  const navigate = useNavigate();

  const login = (authInfo) => {
    navigate('/');
  };

  return(
    <AuthContext.Provider value={{ login }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };