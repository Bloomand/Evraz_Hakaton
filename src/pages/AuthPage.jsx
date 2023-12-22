import React, { useState } from 'react';

const AuthPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setEmail('');
    setPassword('');

  };

  function checkUser(){
    //отправка запроса на проверку
    //1. Отправляем почту, проверяем есть ли такой пользователь и сверяем пароль,
    // если неверен, возвращаем False
    var userAccess = 1;
    if(userAccess){
      window.open("/main");
    }
  }

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
