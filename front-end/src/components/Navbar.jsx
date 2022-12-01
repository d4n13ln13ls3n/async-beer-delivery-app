import React, { useContext, useEffect } from 'react';
import GlobalContext from '../context/GlobalContext';
import { readStorage, clearStorage } from '../services/localStorageServices';
import GenericLink from './GenericLink';

export default function Navbar() {
  const { navbar, setNavbar } = useContext(GlobalContext);

  useEffect(() => {
    const user = readStorage('user');
    if (user.name && user.role) {
      setNavbar({ ...navbar, name: user.name, role: user.role });
    }
  }, []);

  const logout = () => {
    clearStorage();
    window.location.reload();
  };

  const link = navbar.role === 'seller' ? '/seller/orders' : '/customer/orders';
  const orderName = navbar.role === 'seller' ? 'Pedidos' : 'Meus Pedidos';
  const isCostumer = navbar.role === 'customer';
  return (
    <div>
      {isCostumer ? (
        <GenericLink
          route="/customer/products"
          name="Produtos"
          data-testid="customer_products__element-navbar-link-products"
        />
      ) : null}

      <GenericLink
        className="link"
        route={ link }
        name={ orderName }
        data-testid="customer_products__element-navbar-link-orders"
      />

      <h4 data-testid="customer_products__element-navbar-user-full-name">
        {navbar.name}
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
