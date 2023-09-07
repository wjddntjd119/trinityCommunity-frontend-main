import React, { useState } from "react";

const AlarmsPage = () => {
  const [isWriting, setIsWriting] = useState(false);
  const [newText, setNewText] = useState("");
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);

  const getRandomDate = () => {
    const startDate = new Date("2023-05-01").getTime();
    const endDate = new Date("2023-06-15").getTime();
    const randomTime = startDate + Math.random() * (endDate - startDate);
    const randomDate = new Date(randomTime);
    const year = randomDate.getFullYear();
    const month = (randomDate.getMonth() + 1).toString().padStart(2, "0");
    const day = randomDate.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleWriting = () => {
    setIsWriting(true);
  };

  const handleComplete = () => {
    if (newText.trim() !== "") {
      const newPost = {
        text: newText,
        date: getRandomDate(),
      };
      setPosts([...posts, newPost]);
      setNewText("");
      setIsWriting(false);
    }
  };

  const handleItemClick = (index) => {
    setSelectedPost(posts[index]);
  };

  return (
    <div>
      <h1>알람 확인 페이지</h1>
      <div className="alarmPage">
        <button onClick={handleWriting}>글 작성하기</button>
        {isWriting ? (
          <div className="writing-form">
            <textarea
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
              placeholder="글을 작성하세요..."
            />
            <button onClick={handleComplete}>완료</button>
          </div>
        ) : null}
        <div className="form-list">
          {posts.map((post, index) => (
            <div
              className="form-item"
              key={index}
              onClick={() => handleItemClick(index)}
            >
              <div className="form-number">{index + 1}</div>
              <h2 className="form-input">{post.text}</h2>
              <div className="form-date">{post.date}</div>
            </div>
          ))}
        </div>
        {selectedPost && (
          <div className="selected-post">
            <h2>선택한 글 내용</h2>
            <p>{selectedPost.text}</p>
            <p>작성일: {selectedPost.date}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AlarmsPage;
