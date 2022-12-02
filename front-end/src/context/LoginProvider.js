import React, { useMemo, useState } from 'react';
import proptypes from 'prop-types';
import LoginContext from './LoginContext';

function LoginProvider({ children }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const authContext = useMemo(() => ({
    email,
    setEmail,
    password,
    setPassword,
  }), [email, password]);
  return (
    <LoginContext.Provider value={ authContext }>
      {children}
    </LoginContext.Provider>
  );
}

LoginProvider.propTypes = {
  children: proptypes.node.isRequired,
};

export default LoginProvider;
