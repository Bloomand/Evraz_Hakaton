import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const AuthPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userInfo, setUserInfo] = useState({
    userId: -1,
    role: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setEmail('');
    setPassword('');
  };


  function checkUser() {
    //Запрос на получения id и role
    //Пример заполнения объекта
    setUserInfo({
      userId: 1,
      role: 0
    });

    console.log(userInfo);
  }

  useEffect(() => {
    userInfo.role = 0;
    console.log(userInfo);
    if (userInfo.userId != -1) {
      let queryString = Object.keys(userInfo).map(key => key + '=' + encodeURIComponent(userInfo[key])).join('&');
      window.location.href = '/main?' + queryString;
      navigate('/main');
    }
  }, [userInfo]);

  return (
    <div>
      <h2>Регистрация</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Пароль:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button onClick={checkUser}>Зарегистрироваться</button>
      </form>
    </div>
  );
}

export default AuthPage;
