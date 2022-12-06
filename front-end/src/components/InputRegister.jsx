import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { signLogin } from '../services/endPointRequest';
import registerContext from '../context/RegisterContext';
import { SaveStorage } from '../services/localStorageServices';

function InputRegister() {
  const {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
  } = useContext(registerContext);
  const userFields = { name, email, password };
  const history = useHistory();
  const [isDisabled, setIsDisabled] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const handleSign = () => {
      const minNameLength = 12;
      const minLength = 6;
      const emailValidate = /\S+@\S+\.\S+/;
      if (password.length >= minLength
        && email.match(emailValidate)
        && name.length >= minNameLength) {
        setIsDisabled(false);
      } else {
        setIsDisabled(true);
      }
    };
    handleSign();
  }, [name, email, password]);

  const hadleRegister = async () => {
    try {
      // console.log(loginFields);
      const responseUser = await signLogin('register', userFields);
      SaveStorage('user', responseUser);
      history.push('/customer/products');
    } catch ({ response }) {
      const { data: { message } } = response;
      setErrorMessage(message);
    }
  };

  return (
    <div className="register-container">
      <label className="label-login" htmlFor="name">
        Nome:
        <input
          id="name"
          data-testid="common_register__input-name"
          type="text"
          placeholder="Digite o seu Nome"
          value={ name }
          onChange={ ({ target }) => setName(target.value) }
        />
      </label>

      <label className="label-login" htmlFor="email">
        Login:
        <input
          id="email"
          data-testid="common_register__input-email"
          type="email"
          placeholder="Digite o seu e-mail"
          value={ email }
          onChange={ ({ target }) => setEmail(target.value) }
        />
      </label>

      <label className="label-login" htmlFor="password">

        Senha:

        <input
          id="password"
          data-testid="common_register__input-password"
          type="password"
          value={ password }
          placeholder="Digite a sua senha"
          onChange={ ({ target }) => setPassword(target.value) }
        />
      </label>

      <button
        data-testid="common_register__button-register"
        type="button"
        disabled={ isDisabled }
        onClick={ hadleRegister }
      >
        CADASTRAR
      </button>
      {
        errorMessage === '' ? '' : (
          <span
            data-testid="common_register__element-invalid_register"
          >
            { errorMessage }
          </span>)
      }

    </div>
  );
}
export default InputRegister;
