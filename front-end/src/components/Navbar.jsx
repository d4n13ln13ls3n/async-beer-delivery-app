import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import GlobalContext from '../context/GlobalContext';
import { readStorage, clearStorage } from '../services/localStorageServices';
import GenericLink from './GenericLink';

export default function Navbar() {
  const { user, setUser } = useContext(GlobalContext);
  const history = useHistory();

  useEffect(() => {
    const userStorage = readStorage('user');
    setUser({ name: userStorage.name, role: userStorage.role });
  }, []);

  const logout = () => {
    clearStorage();
    setUser({ name: '', role: '' });
    history.push('/');
  };

  const link = user.role === 'seller' ? '/seller/orders' : '/customer/orders';
  const orderName = user.role === 'seller' ? 'Pedidos' : 'Meus Pedidos';
  const isCostumer = user.role === 'customer';
  return (
    <div>
      {isCostumer ? (
        <GenericLink
          route="/customer/products"
          name="Produtos"
          testid="customer_products__element-navbar-link-products"
        />
      ) : null}

      <GenericLink
        className="link"
        route={ link }
        name={ orderName }
        testid="customer_products__element-navbar-link-orders"
      />

      <h4 data-testid="customer_products__element-navbar-user-full-name">
        {user?.name}
      </h4>

      <button
        type="button"
        onClick={ () => {
          logout();
        } }
        data-testid="customer_products__element-navbar-link-logout"
      >
        Sair
      </button>
    </div>
  );
}
