import Axios from "../AxiosController";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PostItem from "../components/posts/PostItem";

const AlarmsPage = () => {
  const navigate = useNavigate();
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    Axios.get(`/api/post/list`)
    .then(res => {
      setPostList(res.data.data.content)
      console.log(res.data.data.content)
      })
    .catch(err => {
      alert("에러가 발생했습니다.")
    })
  }, [1])

  return (
    <div>
      <h1>아파트 게시물</h1>
      <div className="alarmPage">
        <div className="btn_box">
          <button className="custom-btn bw-btn" onClick={() => navigate('/newPost')}><span>글 작성하기</span></button>
        </div>
        <div className="list_box">
          <div className="postList">
            <div className="postList_box">
              <div className="postLt_List">
                <div className="postLtNum">번호</div>
                <div className="postLTitles">제목</div>
                <div className="postLtDate">날짜</div>
              </div>
            </div>
          </div>
          {postList.map((it) => (<PostItem key={it.postId} {...it} />))}
        </div>
      </div>
    </div>
  );
};

export default AlarmsPage;
