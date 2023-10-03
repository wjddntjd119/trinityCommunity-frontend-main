import React,{useState, useEffect} from "react";
import axios from "../../AxiosController";

function Management_Item_Private (props){

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


  return (
    <div className="Management_Private">
      <div className="rounded-rectangle">
        <div className="dong_ho">
          <strong className="larger-text">Building 101, Room 101</strong>
        </div>
        <div className="centered-text_schedule">
          Noise Schedule: <span className="bold-text">None</span>
        </div>
        <div className="centered-text_noise">
          Noise and Vibration Situation: <span className="bold-text">None</span>
        </div>
      </div>
      <div className="example-picture">
        그림 공간입니다
      </div>
    </div>
  );
    
};

export default Management_Item_Private;