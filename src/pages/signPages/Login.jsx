import React, { useContext, useEffect, useState } from "react";
import axios from '../../AxiosController';
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login () {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [userIdError, setUserIdError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const { login, isResdata } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if(isResdata !== undefined && null && ''){
      navigate('/');
    }
  },[isResdata, navigate])

  function handleUserIdChange(e) {
    setUserId(e.target.value);
    setUserIdError("");
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
    setPasswordError("");
  }

  function handleLogin() {
    let isValid = true;

    if (userId.trim() === "") {
      setUserIdError("아이디를 입력해주세요");
      isValid = false;
    }

    if (password.trim() === "") {
      setPasswordError("비밀번호를 입력해주세요.");
      isValid = false;
    }

    if(isValid) {
      axios.post("/api/users/login", { userId, password })
      .then((res) => {
        if (res && res.data) {
          if (res.data.error === null || res.data.data !== null) {
            // 서버에서 가져온 토큰을 저장
            const tokenFromBackend = res.data.data;

            localStorage.setItem('dorandoran-token', tokenFromBackend);

            login();
            window.location.reload();
            alert("로그인 되었습니다.");
          } else {
            console.log(res.data.error.errorId);
            alert("입력한 정보가 올바르지 않습니다.");
          }
        } else {
          // 응답이나 데이터가 정의되지 않은 경우 처리
          alert("로그인 중 오류가 발생했습니다.");
        }
      })
      .catch((err) => {
        // 에러가 발생한 경우 처리
        alert("로그인 중 오류가 발생했습니다.");
        console.log(err.response.data.message);
      });
    }
  }

  function Register () {
    navigate('/register');
  };

  const EnterKeyDown = (e) => {
    if(e.key === "Enter") {
      handleLogin();
    }
  }

  return(
    <div className="loginBox">
      <div className="title">로그인 페이지</div>
      <div className="sign_Content">        
        <div className="form-Row">
          <div className="form-Item">
            <div className="form-Input">
              <input 
                className="inputId"
                type="text"
                id="userId"
                name="userId"
                placeholder="아이디"
                onChange={handleUserIdChange}
                onKeyDown={(e) => EnterKeyDown(e)}
              />
              {userIdError && <p className="error">{userIdError}</p>}
            </div>
          </div>
        </div>
        <div className="form-Row">
          <div className="form-Item">
            <div className="form-Input">
              <input 
                className="inputId" 
                type="password" 
                id="password" 
                name="password" 
                placeholder="비밀번호" 
                onChange={handlePasswordChange}
                onKeyDown={(e) => EnterKeyDown(e)}
              />
              {passwordError && <p className="error">{passwordError}</p>}
            </div>
          </div>
        </div>
        <div className="form-Row">
          <input 
            className="btn_Login"
            type="button"
            onClick={handleLogin}
            id="loginBtn"
            value="로그인"
          />
          <input 
            className="btn_Register"
            type="button"
            onClick={Register}
            id="registerBtn"
            value="회원가입"
          />
        </div>
      </div>
    </div>
  )
};