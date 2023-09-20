import React from 'react';
import { HashLink } from 'react-router-hash-link';
import '../styles/navStyles.css';
import logo from '../assets/codex_dark.png';

function Navbar() {
  return (
    <nav>
      <img src={logo} alt="Logo" />
      <main>
        <HashLink to="/#home">Home</HashLink>
        <HashLink to="/#about">About</HashLink>
      </main>
    </nav>
  );
}

export default Navbar;
