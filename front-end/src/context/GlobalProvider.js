import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import GlobalContext from './GlobalContext';

function GlobalProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [login, setLogin] = useState(true);
  const [navbar, setNavbar] = useState({
    role: 'customer',
    name: '',
    pageOrder: false,
  });

  const context = useMemo(() => ({
    loading,
    setLoading,
    login,
    setLogin,
    navbar,
    setNavbar,
  }), [loading, login, navbar]);

  return (
    <GlobalContext.Provider value={ context }>
      {children}
    </GlobalContext.Provider>
  );
}

GlobalProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default GlobalProvider;
