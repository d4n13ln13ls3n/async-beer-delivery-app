import React, { useContext } from 'react';
import Context from '../context/GlobalContext';
import Navbar from './Navbar';

export default function Header() {
  const { login } = useContext(Context);
  return (
    <header>
      {login ? <Navbar /> : null}
    </header>
  );
}
