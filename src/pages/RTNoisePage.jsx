import axios from "../AxiosController";
import React, { useEffect, useState } from "react";

const RTNoisePage = () => {
  const [userId, setUserId] = useState('');
  const [warningMsg, setWarningMsg] = useState('');
  const token = localStorage.getItem('dorandoran-token');

  useEffect(() => {
    if (token !== null) {
      axios
        .get(`/api/users/info`,{
          headers: {
            'dorandoran-token': `${token}`,
          },
        })
        .then((res) => {
          setUserId(res.data.data.userId);
        })
        .catch((err) => {
         console.log(err.response.data.message);
        });
    }
  }, [token]);

  useEffect(() => {
    axios
    .get(`/warningMsg/${userId}`, {
      headers: {
        'dorandoran-token': `${token}`,
      },
    })
    .then((res) => {
      setWarningMsg(res.data)
    })
  }, [])
  
  return(
    <div>
      <h1>실시간 단지 소음</h1>   
      <div className="no-report-section">
        { warningMsg === null || undefined || "" ? <h2>소음 발생 중</h2> : <h2>소음 발생 건 없음</h2> }
        { warningMsg === null || undefined || "" ? <p>현재 자신은 : {warningMsg} 정도의 소음을 발생 중  </p> : <p>현재 소음 발생 건수가 없습니다.</p> }
      </div> 
    </div>
  )
}

export default RTNoisePage;