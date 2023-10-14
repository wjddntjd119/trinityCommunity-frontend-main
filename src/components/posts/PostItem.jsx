import { useNavigate } from "react-router-dom";

const PostItem = ({ postId, title, writeDate, isPost }) => {
  const navigate = useNavigate();
  const strDate = new Date(parseInt(writeDate)).toLocaleDateString();

  const toPostng = () => {
    navigate(`/post/${postId}`)
    if (isPost) {
      window.location.reload();
    }
  }

  return (
  <div className="postItem">
    <div className="postItem_box">
      <div className="postItem_List" onClick={toPostng}>
        <div className="postNum">{postId}</div>
        <div className="postTitles">{title}</div>
        <div className="postDate">{strDate}</div>
      </div>
    </div>
  </div>
  );
};

export default PostItem;