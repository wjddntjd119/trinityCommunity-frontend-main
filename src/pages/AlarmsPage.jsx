import React from "react";
import { useNavigate } from "react-router-dom";

const AlarmsPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>알람 확인 페이지</h1>
      <div className="alarmPage">
        <button className="custom-btn bw-btn" onClick={() => navigate('/newPost')}><span>글 작성하기</span></button>
      </div>
    </div>
  );
};

export default AlarmsPage;
