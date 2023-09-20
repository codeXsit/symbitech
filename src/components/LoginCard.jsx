import React, { useEffect, useState } from 'react';
import { BsFillPersonLinesFill } from 'react-icons/bs';
import { MdPassword } from 'react-icons/md';
import codexLight from '../assets/codex_light.png';
import axios from 'axios';

function LoginCard({ onAuthSuccess }) {
  useEffect(() => {
    function addFocusClass(event) {
      const parent = event.target.parentNode.parentNode;
      parent.classList.add('focus');
    }

    function removeFocusClass(event) {
      const parent = event.target.parentNode.parentNode;
      if (event.target.value === '') {
        parent.classList.remove('focus');
      }
    }

    document.querySelectorAll('.input').forEach((input) => {
      input.addEventListener('focus', addFocusClass);
      input.addEventListener('blur', removeFocusClass);

      return () => {
        input.removeEventListener('focus', addFocusClass);
        input.removeEventListener('blur', removeFocusClass);
      };
    });
  }, []);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('/api/v1/authenticate', {
        username: username,
        password: password,
      });

      const { message } = response.data;
      
      if (message === "Authentication Successful") {
        const validationResponse = await axios.get('/api/v1/validtoken');
        
        const { isValidToken } = validationResponse.data;

        if (isValidToken) {
          onAuthSuccess();
        } else {
            setLoginError("Authentication failed. Please try again");
        }
      } else {
        setLoginError("Authentication failed. Please try again."); 
      }
    } catch (error) {
      setLoginError("Internal error"); 
    }

  }

  return (
    <form method="POST" onSubmit={handleLogin} id="adminForm">
      <img src={codexLight} alt="codex logo" />
      <h2>Login</h2>
      <div className="input-div">
        <div className="icon">
          <BsFillPersonLinesFill />
        </div>
        <div className="details">
          <label htmlFor="username">Username</label>
          <input type="text" className="input" id="username" name="username" onChange={(e) => setUsername(e.target.value)} required />
        </div>
      </div>
      <div className="input-div">
        <div className="icon">
          <MdPassword />
        </div>
        <div className="details">
          <label htmlFor="password">Password</label>
          <input type="password" className="input" id="password" name="password" onChange={(e) => setPassword(e.target.value)} required />
        </div>
      </div>
      { loginError && <div className="error">{loginError}</div> }
      <button className="glowing-btn" type="submit">
        <span className="glowing-txt">
          LO
          <span className="faulty-letter">G</span>
          IN
        </span>
      </button>
    </form> 
  );
}

export default LoginCard;
