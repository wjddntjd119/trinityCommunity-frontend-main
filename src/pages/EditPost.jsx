import React from "react";
import { useNavigate } from "react-router";

const EditPost = ({ isEdit }) => {
  const navigate = useNavigate();

  // 신규 작성인지 수정인지 확인하는 if문
  if(!isEdit) {
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
              />
            </div>
            <div className="EditBox">
              <textarea
                className="ContentSpace"
                placeholder="내용을 작성해 주세요" 
              />
            </div>
          </section>
          <section>
            <div className="EditBtnSpace">
              <button onClick={() => navigate(-1)}>취소하기</button>
              <button>작성완료</button>
            </div>
            {isEdit ? <button>삭제하기</button> : ''}
          </section>
        </div>
      </div>
    )
  }
}

export default EditPost;
