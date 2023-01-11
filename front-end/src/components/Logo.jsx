import React from 'react';
import logoImg from '../Logo/Logo.svg';
import '../styles/Logo.css';

export default function Logo() {
  return (
    <div>
      <img src={ logoImg } alt="Logo" width="300px" />
    </div>
  );
}
