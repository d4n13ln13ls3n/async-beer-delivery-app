import React, { useEffect, useState } from 'react';
import { readStorage, clearStorage } from '../services/localStorageServices';
import GenericLink from './GenericLink';

export default function Navbar() {
  const [userName, setUserName] = useState('');
  const [userRole, setUserRole] = useState('');

  const contentForEachRole = {
    customer: { text: 'Meus pedidos', url: '/customer/orders' },
    seller: { text: 'Pedidos', url: '/seller/orders' },
    administrator: { text: 'Gerenciar usuários', url: '/admin/manager' },
  };

  useEffect(() => {
    const user = readStorage('user');
    setUserName(user.name);
    setUserRole(user.role);
  }, []);

  const defineLink = () => (
    <GenericLink
      route={ `${contentForEachRole[userRole].url}` }
      name={ `${contentForEachRole[userRole].text}` }
      data-testid="customer_products__element-navbar-link-orders"
    />
  );

  return (
    <nav>
      {userRole === 'customer' && (
        <GenericLink
          route="/customer/products"
          name="Produtos"
          data-testid="customer_products__element-navbar-link-products"
        />
      )}
      {userRole && defineLink()}
      <GenericLink
        route="/user"
        name={ userName }
        data-testid="customer_products__element-navbar-user-full-name"
      />
      <GenericLink
        route="/"
        name="Sair"
        data-testid="customer_products__element-navbar-link-logout"
        onClick={ clearStorage }
      />
    </nav>
  );
}
