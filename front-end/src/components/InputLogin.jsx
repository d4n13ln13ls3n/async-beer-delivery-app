import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { signLogin } from '../services/endPointRequest';
import loginContext from '../context/LoginContext';

function InputLogin() {
  const { email, setEmail, password, setPassword } = useContext(loginContext);
  const [isDisabled, setIsDisabled] = useState(true);
  const loginFields = { email, password };
  const history = useHistory();

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

  const handleAcess = async () => {
    try {
      // console.log(loginFields);
      await signLogin('login', loginFields);
      // console.log('chegou aqui');
      history.push('/customer/products');
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreate = () => {
    history.push('/register');
  };

  return (
    <form className="login-container">
      <label className="label-login" htmlFor="email">
        Login:
        <br />
        <input
          id="email"
          name="email"
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
        id="button"
        value="Login"
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
    </form>
  );
}

export default InputLogin;