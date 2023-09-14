import React,{useState, useEffect} from "react";
import axios from "../../AxiosController";

function Management_Item (props){

  const { data } = props;
  const [noiseLevel, setNoiseLevel] = useState("");
  const [situationStatus, setSituationStatus] = useState("");
  const [situationClass, setSituationClass] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  
  useEffect(() =>{
    //어드민 값 보유 확인
    axios.get(`/api/현재 로그인한 사람의 admin 값을 토큰으로 불러옴`)
      .then((res)=>{
        console.log(res.data);
        if(res.data.isAdmin === 1){
          setIsAdmin(true);
        }else{
          setIsAdmin(false);
        }
      }).catch((err) => {
        console.log(err);
      })
  }, []);

  useEffect(() => {
    //데시벨 값을 가져옴
    axios
    .get(`/api/sensor/noiseLevel/${data.apartIdx}`)
      .then((res) => {
        console.log(res.data.data);
        setNoiseLevel(res.data.data);
        updateSituationStatus(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //소음 시간 감지
  const updateSituationStatus = (noiseLevel) => {
    const now = new Date();
    const hour = now.getHours();

    if (hour >= 6 && hour < 22) {
      if (noiseLevel >= 57) {
        setSituationStatus("나쁨");
        setSituationClass("bad");
      } else if(noiseLevel >= 39 && noiseLevel <57) {
        setSituationStatus("주의");
        setSituationClass("caution");
      }
      else{
        setSituationStatus("쾌적");
        setSituationClass("clear");
      }
    } else {
      if (noiseLevel >= 34) {
        setSituationStatus("나쁨");
        setSituationClass("bad");
      } else if(noiseLevel >= 30 && noiseLevel <34) {
        setSituationStatus("주의");
        setSituationClass("caution");
      }else{
        setSituationStatus("쾌적");
        setSituationClass("clear");
      }
    }
  };

  return isAdmin ?(
      <div className="Management_Item">
      <div className="room_number">{data.ho}호</div>
      <div className="right">
        <div className="top">
          <div className="schedule">소음 예정 일정</div>
          <div className="schedule_status">없음</div>
        </div>
        <div className="bottom">
          <div className="situation">소음·진동상황</div>
          <div className="situation_status"style={
            { backgroundColor: situationClass === "clear" ? "rgb(21, 196, 50)" : 
            situationClass === "caution" ? " rgb(221, 210, 58)" : 
            situationClass === "bad" ? "red" : "" }}>{situationStatus || "공백"}</div>
        </div>
      </div>
  </div>
    
  ):(
    <div className="Management_Item">

    </div>
  )
};

export default Management_Item;