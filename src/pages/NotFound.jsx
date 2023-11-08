import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();


  useEffect(() => {
    navigate('/');
  })

  return(
    <div>
      <h1>404 NotFound</h1>
      <div>
        <p>이 페이지는 존재하지도, 존재해서도 안되는 페이지 입니다.</p>  
      </div>    
    </div>
  )
}
  
export default NotFound;