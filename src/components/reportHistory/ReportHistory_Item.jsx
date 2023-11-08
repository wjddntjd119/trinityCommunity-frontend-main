import axios from "../../AxiosController";
import React, { useEffect, useState } from "react";

function ReportHistory_Item(props) {
  const { reportDate, occurDate, detail, isCheck } = props;
  const [dong, setDong] = useState("");
  const [ho, setHo] = useState("");

  const date = new Date(reportDate);
  const timeData = date.toLocaleString();
  const timesData = timeData.split(" ");
  
  useEffect(() => {
    //데시벨 값을 가져옴
    axios
    .get(`/api/apart/getInfo`)
      .then((res) => {
        console.log(res.data.data);
        setDong(res.data.data.dong);
        setHo(res.data.data.ho);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);


  const dates = new Date(occurDate);

  const formattedDate = `${dates.getFullYear().toString().substr(2)}.${(dates.getMonth() + 1).toString().padStart(2, "0")}.${date.getDate().toString().padStart(2, "0")}`;
  const formattedHours = dates.getHours() % 12 || 12;
  const formattedTime = `${(dates.getHours() < 12 ? "오전" : "오후")} ${formattedHours.toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;

  return (
    <tr>
      <td>
        {timesData[0] + timesData[1] + timesData[2]}
        <br />
        {timesData[3] + " " + timesData[4]}
      </td>
      <td>
        {formattedDate} 
        <br/> 
        {formattedTime}
      </td>
      <td>{dong + "동 " + ho + "호"}</td>
      <td>{detail}</td>
      { isCheck === "" ? <td>{isCheck}</td> : <td>미확인</td>}
      
    </tr>
  );
}

export default ReportHistory_Item;
