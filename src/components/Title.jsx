import React from "react";
import { useLocation } from "react-router-dom";

const Title = (props) => {

  const titles = useLocation();
  let pageTitle = ' ';

  if (titles.pathname === '/') {
    pageTitle = '| 메인 화면';
  } else if (titles.pathname === '/rtnoise') {
    pageTitle = '| 실시간 단지 소음';
  } else if (titles.pathname === '/mcnoise') {
    pageTitle = '| 소음 확인·관리';
  } else if (titles.pathname === '/rhnoise') {
    pageTitle = '| 소음 신고 내역';
  } else if (titles.pathname === '/sghnoise') {
    pageTitle = '| 소음 발생 예정 내역';
  } else if (titles.pathname === '/manages') {
    pageTitle = '| 입주민 관리';
  } else if (titles.pathname === '/oamenu') {
    pageTitle = '| 기타 추가 매뉴';
  }

  return(
    <div className="titleBar">
      <div className="titleName">
      {/*  <h2>{pageTitle}</h2> */}
      </div>
      {titles.pathname === '/mcnoise' ? (
        <div className="listControl">
         {/*  <select className="Control"></select>*/}
        </div>
      ) : null }    
    </div>
  )
  
}

export default Title;