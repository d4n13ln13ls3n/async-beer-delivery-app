import React from 'react';
// import './App.css';
// import rockGlass from './images/rockGlass.svg';
// import Login from './pages/Login';
import { Redirect, Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Products from './pages/Products';
import Checkout from './pages/Checkout';
import Order from './pages/Order';
import Orders from './pages/Orders';
import Seller from './pages/Seller';
import SellerOrderId from './pages/SellerOrderId';
import AdminPage from './pages/AdminPage';
import LoginProvider from './context/LoginProvider';
import RegisterProvider from './context/RegisterProvider';
import CartProvider from './context/CartProvider';

function App() {
  return (
    <LoginProvider>
      <RegisterProvider>
        <Switch>
          <Redirect exact from="/" to="/login" />
          <Route path="/login" component={ Login } />
          <Route exact path="/register" component={ Register } />
          <Route exact path="/customer/orders/:id" component={ Order } />
          <Route exact path="/customer/orders" component={ Orders } />
          <Route exact path="/seller/orders" component={ Seller } />
          <Route exact path="/seller/orders/:id" component={ SellerOrderId } />
          <Route exact path="/admin/manage" component={ AdminPage } />
          <CartProvider>
            <Route exact path="/customer/products" component={ Products } />
            <Route exact path="/customer/checkout" component={ Checkout } />
          </CartProvider>
        </Switch>
      </RegisterProvider>
    </LoginProvider>
  );
}

export default App;
