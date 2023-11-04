import axios from "../../AxiosController";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";

const EditPost = ({ isEdit }) => {
  const navigate = useNavigate();
  const userId = useParams().id;
  const token = localStorage.getItem('dorandoran-token');
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [apartId, setApartId] = useState("");
  const titleRef = useRef();
  const contentRef = useRef();

  useEffect(() => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
  
    if (userId !== undefined) {
      axios.get(`/api/post/${userId}`, config)
        .then((res) => {
          console.log(res.data.data.title);
          setTitle(res.data.data.title);
          setContent(res.data.data.content);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [userId]);
  
  useEffect(() => {
    if (token !== null) {
      axios
        .get(`/api/apart/getInfo`,{
          headers: {
            'dorandoran-token': `${token}`,
          },
        })
        .then((res) => {
          setApartId(res.data.data.apartId);
          console.log(res.data);
        })
    }
  }, [token]);

  const handleSubmit = () => {
    if(content.length < 1 && title.length < 1) {
      titleRef.current.focus();
      contentRef.current.focus();
      return;
    }

    if(window.confirm(isEdit? "게시물을 수정하시겠습니까?" : "새 게시물을 업로드 하시겠습니까?")) {
      if(!isEdit) {
        navigate('/sghnoise', { replace: true });
        window.location.replace("/sghnoise");

        // 새 게시물
        const data = {
          "apartId": apartId,
          "title": title,
          "content": content
        }
        axios
        .post(`/api/post/write`,
        JSON.stringify(data),{
          headers: {
            "Content-Type": "application/json",
            'dorandoran-token': `${token}`,
          },
        })
        .then((res) => {
          alert("게시물이 성공적으로 업로드 되었습니다.")
          console.log(res.data);
        })
        .catch((err) => {
          alert("게시물이 실패했습니다.");
          console.log(err.response.data.message);
        });
      } else {
        navigate('/sghnoise', { replace: true });
        window.location.replace("/sghnoise");

        // 게시물 수정하기
        const data = {
          "postId": userId,
          "title": title,
          "content": content
        }
        axios
        .put(`/api/post/update`,
        JSON.stringify(data),{
          headers: {
            "Content-Type": "application/json",
            'dorandoran-token': `${token}`,
          },
        })
        .then((res) => {
          alert("게시물이 성공적으로 수정 되었습니다.")
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err.response.data.message);
        });
      }
    }
  }

  // 신규 작성인지 수정인지 확인하는 if문
  return(
    <div className="Editor">
      <div className="TopText">
        {isEdit ? "게시물 수정" : "새 게시물 작성"}
      </div>
      <div className="EditSpace">
        <section>
          <div className="EditName">게시글 작성</div>
          <div className="EditBox">
            <input 
              type="text"
              className="Title_input"
              placeholder="글의 제목을 작성해주세요" 
              ref={titleRef}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="EditBox">
            <textarea
              className="ContentSpace"
              placeholder="내용을 작성해 주세요"
              ref={contentRef}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
        </section>
        <section>
          <div className="EditBtnSpace">
            <button onClick={() => navigate(-1)}>취소하기</button>
            {isEdit ? <button className="delete">삭제하기</button> : ''}
            {isEdit ? <button onClick={handleSubmit}>수정완료</button> : <button onClick={handleSubmit}>작성완료</button>}
          </div>
        </section>
      </div>
    </div>
  )
}

export default EditPost;
