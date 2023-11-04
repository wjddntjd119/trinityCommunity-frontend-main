import React, { useEffect, useState, useRef } from "react";
import axios from '../../AxiosController';
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import ApartModal from '../../components/modal/ApartModal';

export default function Register () {
  const userIdRef = useRef(null);
  const userNameRef = useRef(null);
  const passwordFormRef = useRef(null);
  const rePasswordFormRef = useRef(null);
  const telNumFormRef = useRef(null);
  const apartIdxFormRef = useRef(null);
  const token = localStorage.getItem('dorandoran-token');

  const navigate = useNavigate();
  const [ isUserId, setUserId ] = useState("");
  const [userIdTk, setUserIdTk] = useState(null);
  const [userIdError, setUserIdError] = useState("");
  const [userNameError, setUserNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [rePasswordError, setRePasswordError] = useState("");
  const [telNumError, setTelNumError] = useState("");
  const [apartIdxError, setApartIdxError] = useState("");
  const [isUserIdAvailable, setUserIdAvailable] = useState(false); // 아이디 사용 가능 여부 상태 추가
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedApartment, setSelectedApartment] = useState(null); // 선택한 아파트 정보 상태 추가

  useEffect(() => {
    if (token !== null) {
      axios
        .get(`/api/users/info`,{
          headers: {
            'dorandoran-token': `${token}`,
          },
        })
        .then((res) => {
          console.log(res.data.data.userId)
          setUserIdTk(res.data.data.userId);
        })
    }
  }, [token]);

  useEffect(() => {
    if (userIdTk !== null) {
      navigate('/');
    }
  }, [userIdTk, navigate])

  const [inputs, setInputs] = useState({
    userId: '',
    userName: '',
    password: '',
    rePassword: '',
    telNum: '',
    apartIdx: '',
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    const nextInputs = { ...inputs, [name]: value };
    setInputs(nextInputs);
    setUserIdError("");
    setUserNameError("");
    setPasswordError("");
    setRePasswordError("");
    setTelNumError("");
    setApartIdxError("");
  }

  function CheckPass(str) {
    let reg1 = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{6,}$/;
    return (reg1.test(str));
  }

  function CheckTelNum(str) {
    let reg2 = /^01(?:0|1|[6-9])(?:\d{3}|\d{4})\d{4}$/;
    return (reg2.test(str));
  }

  useEffect(() => {
    if (inputs.userId !== "") {
      axios.get(`/api/users/isIdDup/${inputs.userId}`)
        .then((res) => {
          setUserId(res.data.data);
        })
        .catch((err) => {
          console.log(err.response.data.message);
        })
    }
  }, [inputs.userId]);

  console.log(isUserId);

  const onClick = () => {
    if (isUserId === true) {
      setUserIdAvailable(false);
      setUserIdError("이미 사용중인 아이디입니다.");
      userIdRef.current.focus();
    } else if (inputs.userId === "") {
      setUserIdAvailable(false);
      setUserIdError("아이디를 입력해주세요!!");
    } else {
      setUserIdAvailable(true);
      setUserIdError("사용 가능한 아이디입니다.");
    }
  }

  function handleRegistration() {
    if (inputs.userId === "") {
      setUserIdError("아이디를 입력해주세요!");
      userIdRef.current.focus();
      return;
    } else if (isUserId === true) {
      setUserIdAvailable(false);
      setUserIdError("이미 사용중인 아이디입니다.");
    } else if (inputs.userName === "") {
      setUserNameError("유저 이름을 입력해주세요!");
      userNameRef.current.focus();
      return;
    } else if (inputs.password === "") {
      setPasswordError("비밀번호를 입력해주세요!");
      passwordFormRef.current.focus();
      return;
    } else if (inputs.rePassword === "") {
      setRePasswordError("비밀번호 중복 확인을 입력해주세요!");
      rePasswordFormRef.current.focus();
      return;
    } else if (CheckPass(inputs.password) === false) {
      setPasswordError("비밀번호는 영문+숫자 6자를 조합하여 입력해주세요!");
      passwordFormRef.current.focus();
      return;
    } else if (inputs.rePassword !== inputs.password) {
      setRePasswordError("비밀번호가 동일하지 않습니다!");
      rePasswordFormRef.current.focus();
      return;
    } else if(inputs.telNum === "") {
      setTelNumError("전화번호를 입력해주세요!");
      telNumFormRef.current.focus();
    } else if(CheckTelNum(inputs.telNum) === false) {
      setTelNumError("-를 제외한 전화번호(숫자)만 입력해주세요!");
      telNumFormRef.current.focus();
    } 
    else {
      const userdata = {
        userId: inputs.userId,
        userName: inputs.userName,
        password: inputs.password,
        telNum: inputs.telNum,
        apartIdx: 7,
      };
      axios
      .post("/api/users/signup", 
      JSON.stringify(userdata), {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        // Handle successful registration
        alert("회원가입 성공");
        // Perform additional actions (e.g., display success message, redirect)
        navigate("/login");
      })
      .catch((err) => {
        // Handle registration error
        alert("에러가 발생했습니다");
        console.log(err.response.data.message);
      });

    }
  }
  
  function LoginPage() {
    navigate('/login');
  }

  function OpenApartModal() {
    setIsModalOpen(true);
  }
  
  return (
    <div className="RegisterBox">
      <div className="title">회원가입 페이지</div>
      <div className="sign_Content">
        <div className="form-Row">
          <div className="form-Item">
            <div className="form-Input">
              <div className="idInput">
                <input 
                  className="inputId"
                  type="text"
                  id="userId"
                  name="userId"
                  placeholder="아이디"
                  onChange={onChange}
                  ref={userIdRef}
                />
                <input
                  className="buttonId" 
                  type="button" 
                  onClick={onClick} 
                  id="btnUserId" 
                  value="중복체크" 
                />
              </div>
              {userIdError && <p className="error">{userIdError}</p>}
            </div>
          </div>
        </div>
        <div className="form-Row">
          <div className="form-Item">
            <div className="form-Input">
              <input 
                className="inputUser" 
                type="text" id="userName" 
                name="userName" 
                placeholder="유저이름" 
                onChange={onChange} 
                ref={userNameRef} 
              />
              {userNameError && <p className="error">{userNameError}</p>}
            </div>
          </div>
        </div>
        <div className="form-Row">
          <div className="form-Item">
            <div className="form-Input">
              <input 
                className="inputPassword" 
                type="password" 
                id="password" 
                name="password" 
                placeholder="비밀번호" 
                onChange={onChange} 
                ref={passwordFormRef} 
              />
              {passwordError && <p className="error">{passwordError}</p>}
            </div>
          </div>
        </div>
        <div className="form-Row">
          <div className="form-Item">
            <div className="form-Input">
              <input 
                className="inputRePassword" 
                type="password" 
                id="rePassword" 
                name="rePassword" 
                placeholder="비밀번호 재입력" 
                onChange={onChange} 
                ref={rePasswordFormRef} 
              />
              {rePasswordError && <p className="error">{rePasswordError}</p>}
            </div>
          </div>
        </div>
        <div className="form-Row">
          <div className="form-Item">
            <div className="form-Input">
              <input 
                className="inputTelNum" 
                type="text" 
                id="telNum" 
                name="telNum" 
                placeholder="-제외한 전화번호 입력" 
                onChange={onChange} 
                ref={telNumFormRef} 
              />
              {telNumError && <p className="error">{telNumError}</p>}
            </div>
          </div>
        </div>
        {/*
        <div className="form-Row">
          <div className="form-Item">
            <div className="form-Input">
              <input 
                className="inputApartIdx" 
                type="text" 
                id="apartIdx" 
                name="apartIdx"
                placeholder="아파트 이름 검색" 
                onChange={onChange} 
                ref={apartIdxFormRef}
                readOnly
              />
              <button onClick={OpenApartModal}>아파트 검색</button>
              {apartIdxError && <p className="error">{apartIdxError}</p>}
              {isModalOpen && (<ApartModal setIsModalOpen={setIsModalOpen} />)}
            </div>
          </div>
        </div>
        */}
        <div className="form-Row">
          <input 
            className="btn_Register" 
            type="button" 
            onClick={handleRegistration} 
            id="loginBtn" 
            value="회원가입" 
            disabled={!isUserIdAvailable} 
          />
          <input 
            className="btn_Login" 
            type="button" 
            onClick={LoginPage} 
            id="getLoginBtn" 
            value="로그인 하러가기"
          />
        </div>
      </div>
    </div>
  )
};
