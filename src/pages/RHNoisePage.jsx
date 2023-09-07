import React from "react";
import ReportHistory_List from "../components/reportHistory/ReportHistory_List";

const RHNoisePage = () => {
  return(
    <div>
      <h1>소음 신고 내역</h1>
      <div className="no-report-section">
        <ReportHistory_List />
      </div>
    </div>
  )
}

export default RHNoisePage;