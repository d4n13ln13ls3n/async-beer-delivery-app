import React, { useState, useEffect } from 'react';

function InputLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    const handleSign = () => {
      const minLenght = 6;
      const emailValidate = /\S+@\S+\.\S+/;
      if (password.length > minLenght && email.match(emailValidate)) {
        setIsDisabled(false);
      } else {
        setIsDisabled(true);
      }
    };
    handleSign();
  }, [email, password]);

  const handleAcess = () => {
    console.log('test');
  };

  const handleCreate = () => {
    // console.log('acess');
  };

  return (
    <div className="login-container">
      <label className="label-login" htmlFor="email">
        Login:
        <br />
        <input
          id="email"
          data-testid="common_login__input-email"
          type="email"
          placeholder="Digite o seu e-mail"
          value={ email }
          onChange={ ({ target }) => setEmail(target.value) }
        />
      </label>
      <label className="label-login" htmlFor="password">
        <br />
        Senha:
        <br />
        <input
          id="password"
          data-testid="common_login__input-password"
          type="password"
          value={ password }
          placeholder="Digite a sua senha"
          onChange={ ({ target }) => setPassword(target.value) }
        />
      </label>
      <br />
      <button
        data-testid="common_login__button-login"
        type="button"
        disabled={ isDisabled }
        onClick={ handleAcess }
      >
        LOGIN
      </button>
      <br />
      <button
        data-testid="common_login__button-register"
        type="button"
        onClick={ handleCreate }
      >
        Ainda não tenho conta
      </button>
    </div>
  );
}

export default InputLogin;
