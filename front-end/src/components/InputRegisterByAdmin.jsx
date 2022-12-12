import React, { useState, useEffect } from 'react';
import { postData } from '../services/endPointRequest';
import { readStorage } from '../services/localStorageServices';

function InputRegisterByAdmin() {
  const [userFields, setUserFields] = useState({
    name: '',
    email: '',
    password: '',
    roleToRegister: '',
  });
  const [isDisabled, setIsDisabled] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [userToken, setUserToken] = useState('');

  useEffect(() => {
    const token = readStorage('token');
    setUserToken(token);
  }, []);

  useEffect(() => {
    const validateFields = () => {
      const { name, email, password, roleToRegister } = userFields;

      const minNameLength = 12;
      const emailValidate = /\S+@\S+\.\S+/;
      const minPasswordLength = 6;

      if (
        name.length >= minNameLength
        && email.match(emailValidate)
        && password.length >= minPasswordLength
        && roleToRegister !== ''
      ) {
        setIsDisabled(false);
      } else {
        setIsDisabled(true);
      }
    };

    validateFields();
  }, [userFields]);

  const handleInput = ({ target }) => {
    setUserFields({ ...userFields, [target.name]: target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await postData('/users', userFields, userToken);
    } catch ({ response }) {
      const {
        data: { message },
      } = response;
      setErrorMessage(message);
    }
  };

  return (
    <div>
      <h4>Cadastrar novo usuário</h4>
      <form onSubmit={ handleSubmit }>
        <label htmlFor="name">
          Nome:
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Digite o nome"
            value={ userFields.name }
            onChange={ handleInput }
            data-testid="admin_manage__input-name"
          />
        </label>

        <label htmlFor="email">
          Email:
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Digite o e-mail"
            value={ userFields.email }
            onChange={ handleInput }
            data-testid="admin_manage__input-email"
          />
        </label>

        <label htmlFor="password">
          Senha:
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Digite a senha"
            value={ userFields.password }
            onChange={ handleInput }
            data-testid="admin_manage__input-password"
          />
        </label>

        <label htmlFor="role">
          Tipo:
          <select
            id="role"
            name="roleToRegister"
            defaultValue=""
            onChange={ handleInput }
            data-testid="admin_manage__select-role"
          >
            <option value=""> </option>
            <option value="customer">Cliente</option>
            <option value="seller">Vendedor(a)</option>
          </select>
        </label>

        <button
          type="submit"
          disabled={ isDisabled }
          data-testid="admin_manage__button-register"
        >
          CADASTRAR
        </button>
        {errorMessage && (
          <h5 data-testid="admin_manage__element-invalid-register">
            {errorMessage}
          </h5>
        )}
      </form>
    </div>
  );
}
export default InputRegisterByAdmin;
