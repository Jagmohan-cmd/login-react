import React, { useState } from 'react';
import Profile from './Profile';
import "./Login.css";


const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [done , setDone] = useState(false);

  const handleLogin = () => {
    setDone(true);
    fetch('https://dummyjson.com/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error('Invalid username or password');
        }
      })
      .then(data => {
        localStorage.setItem('token', data.token);
        localStorage.setItem('id', data.id);
        // Redirect to profile page
      })
      .catch(error => setError(error.message));
  };

  return (
    <div>
    {!done && (<div className='login'>
        <center>Login Page</center>
      <input placeholder='Enter Your Name' type="text" value={username} onChange={e => setUsername(e.target.value)} />
      <input placeholder='Enter Your Password' type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
      {error && <p>{error}</p>}
    </div>)
    }

    {
        done && (<Profile/>)
    }
    </div>
  );
};

export default Login;
