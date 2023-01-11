import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Container } from 'react-bootstrap';
import { postData } from '../services/endPointRequest';
import { readStorage } from '../services/localStorageServices';

function InputRegisterByAdmin({ getUsers }) {
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
      setUserFields({
        name: '',
        email: '',
        password: '',
        roleToRegister: '',
      });
      getUsers();
    } catch ({ response }) {
      const {
        data: { message },
      } = response;
      setErrorMessage(message);
    }
  };

  return (
    <Container className="pb-2 mt-3">
      <h4>Cadastrar novo usuário</h4>
      <form
        onSubmit={ handleSubmit }
        className="formContainer rounded  border border-2 p-3 shadow-sm"
      >
        <label htmlFor="name" className="label-group">
          Nome
          <input
            className="d-inline-flex input-group form-control"
            id="name"
            name="name"
            type="text"
            placeholder="Digite o nome"
            value={ userFields.name }
            onChange={ handleInput }
            data-testid="admin_manage__input-name"
          />
        </label>
        <label htmlFor="email" className="label-group">
          Email
          <input
            className="d-inline-flex input-group form-control"
            id="email"
            name="email"
            type="email"
            placeholder="Digite o e-mail"
            value={ userFields.email }
            onChange={ handleInput }
            data-testid="admin_manage__input-email"
          />
        </label>
        <label htmlFor="password" className="label-group">
          Senha
          <input
            className="d-inline-flex input-group form-control"
            id="password"
            name="password"
            type="password"
            placeholder="Digite a senha"
            value={ userFields.password }
            onChange={ handleInput }
            data-testid="admin_manage__input-password"
          />
        </label>
        <label htmlFor="role" className="label-group">
          Tipo
          <select
            className="d-inline-flex input-select form-select"
            id="role"
            name="roleToRegister"
            value={ userFields.roleToRegister }
            onChange={ handleInput }
            data-testid="admin_manage__select-role"
          >
            <option value=""> </option>
            <option value="customer">Cliente</option>
            <option value="seller">Vendedor(a)</option>
          </select>
        </label>
        <div className="btnContainer">
          <button
            className="BtnClient"
            type="submit"
            disabled={ isDisabled }
            data-testid="admin_manage__button-register"
          >
            CADASTRAR
          </button>
        </div>
        {errorMessage && (
          <h5 data-testid="admin_manage__element-invalid-register">
            {errorMessage}
          </h5>
        )}
      </form>
    </Container>
  );
}
export default InputRegisterByAdmin;

InputRegisterByAdmin.propTypes = {
  getUsers: PropTypes.func.isRequired,
};
