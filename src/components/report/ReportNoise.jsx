import React, { useState, useEffect } from 'react';
import axios from '../../AxiosController'
import { useNavigate } from "react-router-dom";
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css';
import '../../App.css';

const ReportNoise = () => {
  const [textAreaValue, setTextAreaValue] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedCalendar, setSelctedCalender] = useState(null);
  const [isTextAreaFocused, setTextAreaFocus] = useState(false);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem('dorandoran-token')

  useEffect(() => {
    if (token === null) {
      alert("신고접수는 로그인 한 후에 가능합니다.")
      navigate('/');
    }
  }, [token, navigate])

  useEffect(() => {
    if (token !== null) {
      axios
        .get(`/api/users/info`,{
          headers: {
            'dorandoran-token': `${token}`,
          },
        })
        .then((res) => {
          setUserId(res.data.data.userId);
          console.log(res.data);
        })
    }
  }, [token]);

  const handleTextAreaChange = (event) => {
    setTextAreaValue(event.target.value);
  };

  const handleTextAreaFocus = () => {
    setTextAreaFocus(true);
  };

  const handleTextAreaBlur = () => {
    if (textAreaValue === '') {
      setTextAreaFocus(false);
    }
  };
  const handleDateChange = (props) => {
    console.log(props);
    setSelctedCalender(props);
    const year = props.getFullYear();
    const month = (props.getMonth() + 1);
    console.log(month);
    const day = props.getDate()
    console.log(day);
    const formattedDate = `${year}-${month}-${day}`;
    ///yyyy-MM-dd 형태로 date값 전환

    setSelectedDate(formattedDate);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (textAreaValue === '') {
      alert('내용을 입력해주세요');
    } else {
      const radio = document.querySelector('input[name="audio"]:checked');
      const hoursSelect = document.getElementById('hours');
      const minutesSelect = document.getElementById('minutes');
  
      const radioValue = radio.value === 'am' ? 0 : 12;
      const hoursValue = parseInt(hoursSelect.value, 10)+radioValue;
      const minutesValue = parseInt(minutesSelect.value, 10);
  
      const occurDate = selectedDate+"T"+hoursValue+":"+minutesValue;
  
      const detail = textAreaValue;
  
      const userdata = {
        userId: userId,
        occurDate: occurDate,
        detail: detail
      };
  
      axios
        .post('/api/Report/write', JSON.stringify(userdata), {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then((res) => {
          alert('신고접수 성공');
          console.log(res.data);
          setTextAreaValue('');
          radio.checked = false;
          hoursSelect.selectedIndex = 0;
          minutesSelect.selectedIndex = 0;
          navigate('/');
        })
        .catch((err) => {
          alert('에러가 발생했습니다');
          console.log(err.response.data.message);
        });
    }
  };

  return (
    <div className="reportNoise">
      <h1>층간소음 신고</h1>

      <div className="input-box">
        <div className="datepicker-container">
          <label className="label date-label" htmlFor="date">
            날짜선택
          </label>
          <DatePicker
            id="date"
            className="select"
            selected={selectedCalendar}
            onChange={handleDateChange}
            placeholderText="날짜를 선택해주세요"
            formattedDate="yyyy-MM-dd'T'HH:mm"
          />
        </div>
        <div className="radio-group">
          <label className="radio-label" htmlFor="am">
            <input type="radio" id="am" name="audio" value="am" />
            AM
          </label>
          <label className="radio-label" htmlFor="pm">
            <input type="radio" id="pm" name="audio" value="pm" />
            PM
          </label>
        </div>

        <div className="horizontal-labels">
          <select className="select" id="hours">
            {Array.from({ length: 12 }, (_, index) => (
              <option key={index} value={index + 1}>
                {String(index + 1).padStart(2, '0')}
              </option>
            ))}
          </select>
          <label className="label hour-label" htmlFor="hours">시</label>

          
          <select className="select" id="minutes">
            {Array.from({ length: 12 }, (_, index) => (
              <option key={index * 5} value={index * 5}>
                {String(index * 5).padStart(2, '0')}
              </option>
            ))}
          </select>
          <label className="label minute-label" htmlFor="minutes">분</label>
        </div>

        <label className="label" htmlFor="noise-type">신고 세부사항</label>
        <textarea
          id="noise-type"
          className="textarea"
          value={textAreaValue}
          onChange={handleTextAreaChange}
          onFocus={handleTextAreaFocus}
          onBlur={handleTextAreaBlur}
          placeholder=" 신고 전 단지 내 소음 예정 알림에서 
          이웃집 소음 예정일정을 확인 후 신고 부탁드립니다. 
          발생하는 소음이 층간 소음의 범위에 해당하는지 
          확인 후 신고 부탁드립니다."
        />
      </div>

      <div className="precautions">
        <h2>! 신고 전 주의사항</h2>
        <h4>예상처리 기간은 신고접수후 일주일 이내이며<br/>
          기타문의사항은 경비관리실로 연락 부탁드립니다<br/>
          (Tel. 032 - 0000 - 0000)
          
        </h4>
        
      </div>

      <div className="btn-container">
        <button className="btn_Report" onClick={handleSubmit}>신고 접수</button>
        <button className="btn_Back">뒤로가기</button>
      </div>
    </div>
  );
};

export default ReportNoise;
