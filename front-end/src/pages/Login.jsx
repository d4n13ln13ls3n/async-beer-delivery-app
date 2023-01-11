import React from 'react';
import { Container } from 'react-bootstrap';
import InputLogin from '../components/InputLogin';
import Logo from '../components/Logo';
import './Login.css';

function Login() {
  return (
    <section
      className="d-flex align-items-center justify-content-center
   min-vh-100 bg-light container-login"
    >
      <Logo />
      <Container className="border p-5 rounded-sm login-container shadow-lg">
        <InputLogin />
      </Container>
    </section>
  );
}

export default Login;
