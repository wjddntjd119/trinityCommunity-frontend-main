import { useEffect, useState } from "react";
import Axios from "../../AxiosController";
import ReportHistory_Item from "./ReportHistory_Item";

const ReportHistory_List = () => {
  const [userId, setUserId] = useState(null);
  const [reportHistory, setReportHistory] = useState([]);
  const token = localStorage.getItem('dorandoran-token');

  useEffect(() => {
    if (token !== null) {
      Axios
        .get(`/api/users/info`,{
          headers: {
            'dorandoran-token': `${token}`,
          },
        })
        .then((res) => {
          setUserId(res.data.data.userId);
        })
    }
  }, [token]);

  useEffect(() => {
    if (userId !== "" && userId !== null) {
      ReportList();
    }
  }, [userId]);

  const ReportList = () => {
    Axios
      .get(`/api/Report/list/${userId}`)
      .then((res) => {
        setReportHistory(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (userId === null) {
    return <div>로그인 후 이용 가능한 서비스입니다.</div>;
  }

  if (reportHistory.length === 0) {
    return <div>신고 내역 없음</div>;
  } else if (reportHistory !== null) {
    return (
      <table className="RHL_table">
        <thead>
          <tr>
            <th>신고 시간</th>
            <th>소음 발생 시간</th>
            <th>신고 호수</th>
            <th>소음 종류</th>
            <th>확인 여부</th>
          </tr>
        </thead>
        <tbody>
          {reportHistory !== null && reportHistory.map((it) => (
            <ReportHistory_Item
              key={it.report.idx} // Add a unique key prop
              reportDate={it.report.reportDate}
              occurDate={it.report.occurDate}
              detail={it.report.detail}
              isCheck={it.report.isCheck}
            />
          ))}
        </tbody>
      </table>
    );
  }
};

export default ReportHistory_List;
