import React, { useEffect, useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { readStorage, clearStorage } from '../services/localStorageServices';
import GenericLink from './GenericLink';
import '../styles/Navbar.css';

export default function Navbar1() {
  const [userName, setUserName] = useState('');
  const [userRole, setUserRole] = useState('');

  const contentForEachRole = {
    customer: { text: 'MEUS PEDIDOS', url: '/customer/orders' },
    seller: { text: 'PEDIDOS', url: '/seller/orders' },
    administrator: { text: 'GERENCIAR USUÁRIOS', url: '/admin/manager' },
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
      testid="customer_products__element-navbar-link-orders"
    />
  );

  return (
    <Navbar variant="dark" sticky="top" className="navbar">
      <Nav className="nav-container-left">
        {userRole === 'customer' && (
          <GenericLink
            route="/customer/products"
            name="PRODUTOS"
            testid="customer_products__element-navbar-link-products"
          />
        )}
        {userRole && defineLink()}
      </Nav>
      <Nav className="nav-container-right">
        <div className="nav-container-username">
          <GenericLink
            route="/user"
            name={ userName }
            testid="customer_products__element-navbar-user-full-name"
          />
        </div>
        <div className="nav-container-logout">
          <GenericLink
            route="/"
            name="Sair"
            testid="customer_products__element-navbar-link-logout"
            onClick={ clearStorage }
          />
        </div>
      </Nav>
    </Navbar>
  );
}
