import React, { useState, useEffect } from 'react';
import { postData } from '../services/endPointRequest';

function InputRegisterByAdmin() {
  const [userFields, setUserFields] = useState({
    name: '',
    email: '',
    password: '',
    roleToRegister: '',
  });
  const [isDisabled, setIsDisabled] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

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
      await postData('/users', userFields);
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
          <span data-testid="admin_manage__element-invalid-register">
            {errorMessage}
          </span>
        )}
        {errorMessage === '' ? (
          ''
        ) : (
          <span data-testid="common_register__element-invalid_register">
            {errorMessage}
          </span>
        )}
      </form>
    </div>
  );
}
export default InputRegisterByAdmin;
