import Axios from "../../AxiosController";
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PostItem from "./PostItem";

function replaceNewlinesWithBreaks(text) {
  return text.split('\n').map((line, index) => (
    <div key={index}>{line}</div>
  ));
}

const Post = () => {
  const postId = useParams().id;
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [postList, setPostList] = useState([]);
  const [userId, setUserId] = useState(null);
  const [comment, setComment] = useState("");
  const [target, setTarget] = useState(null);
  const token = localStorage.getItem('daelim-token');

  const goEdit = () => {
    navigate(`/edit/${postId}`)
  }

  useEffect(() => {
    if (token !== null) {
      Axios
        .get(`/api/user/info`,{
          headers: {
            'daelim-token': `${token}`,
          },
        })
        .then((res) => {
          console.log(res.data.data.userId)
          setUserId(res.data.data.userId);
        })
    }
  }, [token]);

  useEffect(() => {
    Axios.get(`/api/post/list`)
    .then(res => {
      setPostList(res.data.data.content);
    })
    .catch(err => {
      alert("에러가 발생했습니다.");
    });
  }, [1]);

  useEffect(() => {
    const config = {
      headers:{
        "Content-Type": "application/json",
      },
    };
    Axios.get(`/api/post/${postId}`, config)
      .then(res => {
        setData([res.data.data, ...data]);
      })
      .catch(err => {
        alert("에라가 발생했습니다.");
        console.log(err);
      });
  },[0]);
  
  const handleSubmit = () => {
    const data = {
      "postId": postId,
      "target": target,
      "comment": comment
    }
    Axios.post(`/api/comment/write`,
      JSON.stringify(data), {
        headers: {
          "Content-Type": "application/json",
          'daelim-token': `${token}`,
        },
      })
    .then((res) => {
      alert("댓글 업로드")
      console.log(res.data)
    })
    .catch((err) => {
      alert("댓글 업로드 실패")
      console.log(err.response.data.message)
    })
  }

  
  

  return (
    <div className="postPg">
      <div className="post_Box">
        <div className="postPage">
          <article>
            <section className="titleSection">
              <div className="postL">
                <div className="postTitle">
                  <h4>
                    {data[0] && data[0].title}
                  </h4>
                </div>
              </div>
              <div className="postR">
                <div className="postUser">
                  <p>유저 아이디 : {data[0] && data[0].userId}</p>
                </div>
                <div className="postViewCount">
                  <p>
                    조회수 : {data[0] && data[0].viewCount}
                  </p>
                </div>
              </div>
            </section>
          </article>
          <article>
            <section className="contentSection">
              <div className="postContent">
                {data[0] && replaceNewlinesWithBreaks(data[0].content)}
              </div>
            </section>
          </article>
        </div>
      </div>
      <div className="editPost_box">
        <div className="btn_box">
         {data[0] && data[0].userId === userId ? <button className="custom-btn bw-btn" onClick={goEdit}><span>수정하기</span></button> : '' }
        </div>
      </div>
      <div className="comment">
        <div className="comment_box">
          <section>
            <div className="commentUser">유저 아이디: {userId}</div>
            <div className="comment_input">
              <input 
                type="text"
                className="commentSpace"
                placeholder="이쁜 댓글 부탁드리겠습니다."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </div>
          </section>
          <section>
            <div className="commentBtnSpace">
              <button onClick={handleSubmit}>등록</button>
            </div>
          </section>
        </div>
      </div>
      <div className="postList">
        <div className="postList_box">
          <div className="postLt_List">
            <div className="postLtNum">번호</div>
            <div className="postLTitles">제목</div>
            <div className="postLtDate">날짜</div>
          </div>
        </div>
      </div>
      <div className="list_box">
        {postList.map((it) => (<PostItem key={it.postId} {...it} isPost={true} />))}
      </div>
    </div>
  );
};

export default Post;
