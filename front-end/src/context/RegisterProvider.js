import React, { useMemo, useState } from 'react';
import proptypes from 'prop-types';
import RegisterContext from './RegisterContext';

function RegisterProvider({ children }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const userFields = useMemo(() => ({
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
  }), [name, email, password]);
  return (
    <RegisterContext.Provider value={ userFields }>
      {children}
    </RegisterContext.Provider>
  );
}

RegisterProvider.propTypes = {
  children: proptypes.node.isRequired,
};

export default RegisterProvider;
