import React, { useContext, useEffect, useState } from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";
import axios from "../AxiosController";
import { AuthContext } from "../context/AuthContext";

const HeaderMenu = () => {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState('');
  const { isResdata } = useContext(AuthContext);
  const [userName, setUserName] = useState('');
  const [reportData, setReportData] = useState(0);

  useEffect(() => {
    cheackUserData();
    cheackUserReportData();
  });

  const cheackUserData = () => {
    if(isResdata !== "" && isResdata !== null) {
      axios.get(`/api/users/Info/${isResdata}`)
      .then((res) => {
        setUserName(res.data.data.userName);
      })
      .catch((err) => {
        console.log(err.response.data.message);
      })
    } else {
      setUserName("도란도란");
    }
  }

  const cheackUserReportData = () => {
    if(isResdata !== "" && isResdata !== null) {
      axios.get(`/api/Report/list/${isResdata}`)
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


  return(
    <div className="menu">
      <div className="login">
        <div className="sysUser">
          <div className="name-rectangle">
            {userName}
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
            {/*<div className="numscolor">{reportData}</div> 건 */}
            <div className="numscolor">0</div> 건
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
          <div className={`sgh ${activeMenu === 'sgNoise' ? 'active' : ''}`} onClick={sghNoise}>소음 발생 예정 내역</div>
          <div className={`manages ${activeMenu === 'manages' ? 'active' : ''}`} onClick={manages}>입주민 관리</div>
          <div className={`oa ${activeMenu === 'oamenu' ? 'active' : ''}`} onClick={oaMenu}>기타 추가 메뉴</div>
        </div>
      </div>
    </div>
  )
};

export default HeaderMenu;