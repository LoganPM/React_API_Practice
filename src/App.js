import logo from './logo.svg';
import './App.css';
import * as React from "react";
import axios from "axios";

const {useEffect, useState} = React;


const fetchData = (pageNumber) => {
  
  return axios
    .get(`https://randomuser.me/api?page=${pageNumber}`)
    .then(({data}) => {
      // handle success
      console.log(data);
      return data
    })
    .catch(err => {
      // handle error
      console.error(err);
    });
};

const getFullUserName = (userInfo) => {
  const {name: {first, last}} = userInfo;
  return `${first} ${last}`;
}

export default function App() {
  const [counter, setCounter] = useState(0);
  const [nextPageNumber, setPageNumber] = useState(1);
  const [userDataJSON, setUserDataJSON] = useState('');
  const [userInfos, setUserInfos] = useState([]);
  
  const fetchNextUser = () => {
    fetchData(nextPageNumber).then((userData) => {
      if (userData === undefined) return;

      const newUserInfos = [
        ...userInfos,
        ...userData.results,
      ]
      setUserInfos(newUserInfos); //newUserInfos
      setPageNumber(userData.info.page + 1);
    });
  }

  useEffect(() => {
    fetchNextUser();
  }, []);

  return (
    <div className="App">
        <h1>Logan Practice React stuff</h1>
        <p>
          {counter}
        </p>
        <button onClick={() => {
          setCounter(counter + 1);
        }}>Increase Counter</button>
        <button onClick={() => {
          fetchNextUser();
        }}>Fetch Next User</button>
        {
          userInfos.map((userInfo, idx) => (
          <div key={idx}>
            <p>{getFullUserName(userInfo)}</p>
            <img src={userInfo.picture.thumbnail}></img>
          </div>
          ))
        }
        <pre>
          {userDataJSON}
        </pre>
    </div>
  );
}

