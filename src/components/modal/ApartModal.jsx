import React from "react";

function ApartModal(props) {
  
  const handleClose = () => {
    props.setIsModalOpen(false);
  };

  return (
    <div className="modelbox" onClick={handleClose}>
      <div className="modelContent" onClick={(e) => e.stopPropagation()}>
        <button className="closeModel" onClick={handleClose}>
          X
        </button>
        <div className="contents">
          <div>
            <h1>여기</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ApartModal;

