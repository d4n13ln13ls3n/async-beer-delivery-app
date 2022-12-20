import React from 'react';
import { Container } from 'react-bootstrap';
import InputLogin from '../components/InputLogin';
import './Login.css';

function Login() {
  return (
    <section
      className="d-flex align-items-center justify-content-center
   min-vh-100 bg-light"
    >
      <Container className="border p-4 rounded-sm login-container shadow-lg">
        <InputLogin />
      </Container>
    </section>
  );
}

export default Login;
