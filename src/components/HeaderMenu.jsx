import React, { useEffect, useState } from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";
import axios from "../AxiosController";

const HeaderMenu = () => {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState('');
  const [userName, setUserName] = useState('');
  const [reportData, setReportData] = useState(0);
  const [userId, setUserId] = useState(null);
  const token = localStorage.getItem('dorandoran-token');

  useEffect(() => {
    cheackUserData();
    cheackUserReportData();
  });

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
          setUserId(res.data.data.userId);
          setUserName(res.data.data.userName);
        })
    }
  }, [token]);

  const cheackUserData = () => {
    if(userId === "" && userId === null) {
      setUserName("도란도란");
    }
  }

  const cheackUserReportData = () => {
    if(userId !== "" && userId !== null) {
      axios.get(`/api/Report/list/${userId}`)
      .then((res) => {
        setReportData(res.data.length);
      })
      .catch((err) => {
        console.log(err.response.data.message);
      })
    }
  }

  const today = () => {
    let now = new Date();
    let year = now.getFullYear();
    let month = (now.getMonth() + 1) > 9 ? (now.getMonth() + 1) : '0' + (now.getMonth() + 1);
    let day = now.getDate() > 9 ? now.getDate() : '0' + now.getDate();

    return year + '년 ' + month + '월 ' + day + '일'; 
  }

  const dumidata = () => {
    let numberdatas = 8;
    return numberdatas;
  }

  const rtNoise = () => {
    navigate('/rtnoise');
    setActiveMenu('rtNoise');
  }
  const mcNoise = () => {
    navigate('/mcnoise');
    setActiveMenu('mcNoise');
  }
  const rhNoise = () => {
    navigate('/rhnoise');
    setActiveMenu('rhNoise');
  }
  const sghNoise = () => {
    navigate('/sghnoise');
    setActiveMenu('sgNoise');
  }
  const manages = () => {
    navigate('/manages');
    setActiveMenu('manages');
  }
  const oaMenu = () => {
    navigate('/oamenu');
    setActiveMenu('oamenu');
  }
  const alarm = () => {
    navigate('/alarms');
  }

  console.log(userName)

  return(
    <div className="menu">
      <div className="login">
        <div className="sysUser">
          <div className="name-rectangle">
            {userName === undefined || null || '' ? userName : '도란도란' }
          </div>
          <div className="date-rectangle">
            {today()}
          </div>
        </div>
        <div className="sysAlarm1">
          <div className="notice-rectangle">
            알림
          </div>
          <div className="uralarms" onClick={alarm}>
            <div>안읽은 알람</div> 
            <div className="numscolor">{dumidata()}</div> 건
          </div>
        </div>
        <div className="sysAlarm2">
          <div className="notice-rectangle2">
            신고
          </div>
          <div className="urreport" onClick={rhNoise}>
            <div>안읽은 신고</div> 
            <div className="numscolor">{reportData}</div> 건
          </div>
        </div>
      </div>
      <div className="suList">
        <div className="category-top">
          <div className={`rt ${activeMenu === 'rtNoise' ? 'active' : ''}`} onClick={rtNoise}>실시간 단지 소음</div>
          <div className={`mc ${activeMenu === 'mcNoise' ? 'active' : ''}`} onClick={mcNoise}>소음 확인·관리</div>
          <div className={`rh ${activeMenu === 'rhNoise' ? 'active' : ''}`} onClick={rhNoise}>소음 신고 내역</div>
        </div>
        <div className="category-bottom">
          <div className={`sgh ${activeMenu === 'sgNoise' ? 'active' : ''}`} onClick={sghNoise}>아파트 게시판</div>
          <div className={`oa ${activeMenu === 'oamenu' ? 'active' : ''}`} onClick={oaMenu}>기타 추가 메뉴</div>
          <div className={`manages ${activeMenu === 'manages' ? 'active' : ''}`} onClick={manages}>소음 신고 접수</div>
        </div>
      </div>
    </div>
  )
};

export default HeaderMenu;