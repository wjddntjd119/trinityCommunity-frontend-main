import React, { useState, useEffect } from "react";
import axios from "../../AxiosController";
import Management_Item from "./Management_Item";
import { AuthContext } from "../../context/AuthContext";
import Management_Item_Private from "./Management_Item_private";

const Management_List = () => {
  const [dongList, setDongList] = useState([]);
  const [selectedDong, setSelectedDong] = useState("");
  const [hoList, setHoList] = useState([]);
  const token = localStorage.getItem('dorandoran-token');
  const [isAdmin, setIsAdmin] = useState("");


  useEffect(() => {
    if (token !== null) {
      axios
        .get(`/api/users/info`,{
          headers: {
            'dorandoran-token': `${token}`,
          },
        })
        .then((res) => {
          console.log(res.data);
          console.log(res.data.data.userId);
          console.log(res.data.data.isAmdin);
          setIsAdmin(res.data.data.isAmdin);
        })
        //.catch((err) => {
        //  console.log(err.response.data.message);
        //});
    }
  }, [token]);

  useEffect(() => {
    //해당 아파트에 있는 동들을 가져옴
    axios
      .get("/api/apart/dong/1")
      .then((res) => {
        console.log(res.data.data);
        setDongList(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    //그 동에 있는 호들을 가져옴
    if (selectedDong !== "") {
      axios
        .get(`/api/apart/ho/1/${selectedDong}`)
        .then((res) => {
          console.log(res.data.data);
          setHoList(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [selectedDong]);

  const handleDongChange = (event) => {
    setSelectedDong(event.target.value);
  };

  return !isAdmin ?(
    <div className="managementList">
      <select className="dongSelect" value={selectedDong} onChange={handleDongChange}>
        <option value="">동을 선택해주세요</option>
        {dongList.map((dong) => (
          <option key={dong} value={dong}>
            {dong}동
          </option>
        ))}
      </select>
      {hoList === null ?
        <div>
          로딩 중...
        </div> :
        <div className="managementList_Item">
          {hoList.map((item, index) => (
            <Management_Item key={index} data={item} />
          ))}
        </div>
      }
    </div>
  ):(
    <div>
      <Management_Item_Private/>
    </div>
  )
};

export default Management_List;
