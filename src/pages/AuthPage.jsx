import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../style.module.css';

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
    userInfo.role = 1;//Фейк изменение роли, удалить перед релизом
    console.log(userInfo);
    if (userInfo.userId != -1) {
      let queryString = Object.keys(userInfo).map(key => key + '=' + encodeURIComponent(userInfo[key])).join('&');
      window.location.href = '/choice?' + queryString;
      navigate('/choice');
    }
  }, [userInfo]);
  return (
    <div className={styles.AuthPage}>
      <div className={styles.container}>
        <h1 className={styles.form_header}>Регистрация</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className={styles.form_label}>Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.form_input}
            />
          </div>
          <div>
            <label htmlFor="password" className={styles.form_label}>Пароль:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.form_input}
            />
          </div>
          <button type="submit" onClick={checkUser} className={styles.submit_button}>Зарегистрироваться</button>
        </form>
      </div>
    </div>
  );
}


export default AuthPage;