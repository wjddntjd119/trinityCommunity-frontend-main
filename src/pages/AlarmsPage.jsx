import React from "react";

const AlarmsPage = () => {

  
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


  return (
    <div>
      <h1>알람 확인 페이지</h1>
      <div className="alarmPage">
        <div className="form-list">
          <div className="form-item">
            <div className="form-number">1</div>
            <h2 className="form-input">안녕하세요 6월 15일 저희 집에...</h2>
            <div className="form-date">{getRandomDate()}</div>
          </div>
          <div className="form-item">
            <div className="form-number">2</div>
            <h2 className="form-input">금일 알려드립니다. 근처에 상가...</h2>
            <div className="form-date">{getRandomDate()}</div>
          </div>
          <div className="form-item">
            <div className="form-number">3</div>
            <h2 className="form-input">7월 14일에 이사가 예정되어있습...</h2>
            <div className="form-date">{getRandomDate()}</div>
          </div>
          <div className="form-item">
            <div className="form-number">4</div>
            <h2 className="form-input">7월 1일, 서버 임시점검이 예정...</h2>
            <div className="form-date">{getRandomDate()}</div>
          </div>
          <div className="form-item">
            <div className="form-number">5</div>
            <h2 className="form-input">8월 초반에 OO건설의 공사가 진...</h2>
            <div className="form-date">{getRandomDate()}</div>
          </div>
          <div className="form-item">
            <div className="form-number">6</div>
            <h2 className="form-input">안녕하십니까. 7월 20일에 이사를...</h2>
            <div className="form-date">{getRandomDate()}</div>
          </div>
          <div className="form-item">
            <div className="form-number">7</div>
            <h2 className="form-input">6월 1일, 서버 임시점검이 예정...</h2>
            <div className="form-date">{getRandomDate()}</div>
          </div>
          <div className="form-item">
            <div className="form-number">8</div>
            <h2 className="form-input">안녕하세요. 6월 17일부로 이사를...</h2>
            <div className="form-date">{getRandomDate()}</div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default AlarmsPage;
