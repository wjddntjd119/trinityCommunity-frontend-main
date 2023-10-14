import Axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import EditPost from './EditPost';

const Edit = () => {

  Axios.defaults.withCredentials = true; //axios
  const postId = useParams().id;
  const [data, setData] = useState([]);

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

  return (
    <div>
      <EditPost isEdit={true} />
    </div>
  );
};
  
export default Edit;