import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { signLogin } from '../services/endPointRequest';
import loginContext from '../context/LoginContext';
import { readStorage, SaveStorage } from '../services/localStorageServices';
import GlobalContext from '../context/GlobalContext';

function InputLogin() {
  const { email, setEmail, password, setPassword } = useContext(loginContext);
  const { setUser, setLogin } = useContext(GlobalContext);
  const [isDisabled, setIsDisabled] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const loginFields = { email, password };
  const history = useHistory();

  useEffect(() => {
    const handleSign = () => {
      const minLenght = 6;
      const emailValidate = /\S+@\S+\.\S+/;
      if (password.length >= minLenght && email.match(emailValidate)) {
        setIsDisabled(false);
      } else {
        setIsDisabled(true);
      }
    };
    handleSign();
  }, [email, password]);

  const defineRoute = (role) => {
    if (role === 'seller') return '/seller/orders';
    if (role === 'customer') return '/customer/products';
    if (role === 'administrator') return '/admin/manage';
    return null;
  };

  const handleAcess = async () => {
    try {
      const responseUser = await signLogin('login', loginFields);
      const { name, role } = responseUser;
      SaveStorage('user', responseUser);
      SaveStorage('token', responseUser.token);
      setUser(name, role);
      setLogin(true);
      const route = defineRoute(role);
      history.push(route);
    } catch ({ response }) {
      const { data: { message } } = response;
      setErrorMessage(message);
    }
  };

  const handleCreate = () => {
    history.push('/register');
  };

  if (readStorage('user')) {
    history.push('/customer/products');
  }

  return (
    <Form className="form-container">
      <Form.Label className="label-login label-login fs-4 ps-3" htmlFor="email">
        Login
      </Form.Label>
      <Form.Control
        className="shadow-sm p-2 border border-dark input-group-login"
        id="email"
        name="email"
        data-testid="common_login__input-email"
        type="email"
        placeholder="email@trybeer.com.br"
        value={ email }
        onChange={ ({ target }) => setEmail(target.value) }
      />
      <Form.Label className="label-login fs-4 ps-3" htmlFor="password">
        Senha
      </Form.Label>
      <Form.Control
        className="shadow-sm p-2 border border-dark input-group-login"
        id="password"
        data-testid="common_login__input-password"
        type="password"
        value={ password }
        placeholder="Digite a sua senha"
        onChange={ ({ target }) => setPassword(target.value) }
      />
      <div className="d-grid gap-2">
        <Button
          className="input-group-login"
          size="lg"
          variant="success"
          id="button"
          value="Login"
          data-testid="common_login__button-login"
          type="button"
          disabled={ isDisabled }
          onClick={ handleAcess }
        >
          LOGIN
        </Button>
        <Button
          className="input-group-login"
          size="lg"
          variant="outline-success"
          data-testid="common_login__button-register"
          type="button"
          onClick={ handleCreate }
        >
          Ainda não tenho conta
        </Button>
      </div>
      {errorMessage === '' ? '' : (
        <span
          data-testid="common_login__element-invalid-email"
        >
          {errorMessage}
        </span>)}
    </Form>
  );
}

export default InputLogin;
