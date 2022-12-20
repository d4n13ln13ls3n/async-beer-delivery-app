import React from 'react';
import { Container } from 'react-bootstrap';
import InputRegister from '../components/InputRegister';
import '../styles/Register.css';

function Login() {
  return (
    <section
      className="d-flex align-items-center justify-content-center
 min-vh-100 bg-light"
    >
      <Container className="border p-4 shadow-lg register-container">
        <InputRegister />
      </Container>
    </section>
  );
}

export default Login;
