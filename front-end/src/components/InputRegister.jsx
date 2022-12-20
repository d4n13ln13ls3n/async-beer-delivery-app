import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import { signLogin } from '../services/endPointRequest';
import registerContext from '../context/RegisterContext';
import { SaveStorage } from '../services/localStorageServices';
import '../styles/Register.css';

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
    <Form className="register-container">
      <Form.Group controlId="formBasicName">
        <Form.Label className="fs-4 ps-3 pb-0 label-register" htmlFor="name">
          Nome
        </Form.Label>
        <Form.Control
          id="name"
          data-testid="common_register__input-name"
          type="text"
          placeholder="Digite o seu Nome"
          value={ name }
          onChange={ ({ target }) => setName(target.value) }
        />
      </Form.Group>
      <Form.Group controlId="formBasicEmail">
        <Form.Label className="fs-4 ps-3 label-register" htmlFor="email">
          Login
        </Form.Label>
        <Form.Control
          id="email"
          data-testid="common_register__input-email"
          type="email"
          placeholder="Digite o seu e-mail"
          value={ email }
          onChange={ ({ target }) => setEmail(target.value) }
        />
      </Form.Group>
      <Form.Group controlId="formBasicPassword">
        <Form.Label className="fs-4 ps-3 label-register" htmlFor="password">
          Senha
        </Form.Label>
        <Form.Control
          id="password"
          data-testid="common_register__input-password"
          type="password"
          value={ password }
          placeholder="Digite a sua senha"
          onChange={ ({ target }) => setPassword(target.value) }
        />
      </Form.Group>
      <div className="d-grid gap-2 pt-3">
        <Button
          className=""
          variant="success"
          size="lg"
          data-testid="common_register__button-register"
          type="button"
          disabled={ isDisabled }
          onClick={ hadleRegister }
        >
          CADASTRAR
        </Button>
      </div>
      {
        errorMessage === '' ? '' : (
          <span
            data-testid="common_register__element-invalid_register"
          >
            { errorMessage }
          </span>)
      }

    </Form>
  );
}
export default InputRegister;
