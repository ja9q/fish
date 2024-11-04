import { useState } from 'react';

import axios from 'axios';

function Login({setDisplay}) {

    const [isLogin, setLogin] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [confPassword, setConfPassword] = useState('');

    function resetFields() {
      setUsername('');
      setPassword('');
      setConfPassword('');
    }

    function handleLogin() {
      alert("login")
    }

    const handleRegister  = async () => {
      try {
          if (!username || !password || !confPassword) {
              setError("Please fill in all fields");
              return;
          }

          if (password !== confPassword) {
              throw new Error("Passwords are not matching");
          }

          // attempt signup
          const response = await axios.post('http://localhost:8080/api/auth/signup', { username, password });

          // signup success
          console.log(response.data);
          setDisplay(0);
      } catch (e) {
          // signup error
          console.error("Signup failed:", e.response ? e.response.data : e.message);
          setError(e.response ? e.response.data : e.message);
      }
  }

    return (
      <div className="nongame rounded noselect rel">
        
        
          <form className='form-container'>
            <h2>{(isLogin) ? 'log in' : 'register'}</h2>
            <span className='form-line'>
            <label for='username'>username:</label>
            <input type='text' id='username' onChange={(e) => {setUsername(e.target.value)}} spellCheck='false' className='text-field'/>
            </span>
            <span className='form-line'>
            <label for='password'>password:</label>
            <input type='password' id='password' onChange={(e) => {setPassword(e.target.value)}}  className='text-field'/>
            </span>
            {!isLogin &&
                <span className='form-line'>
                <label for='confirm-password'>confirm password:</label>
                <input type='password' id='confirm-password' onChange={(e) => {setConfPassword(e.target.value)}}  className='text-field'/>
                </span>
            }
            <span className='form-line'>
            <button className="settings-button" onClick={isLogin ? handleLogin : handleRegister}>{(isLogin) ? 'log in' : 'register'}</button>
            </span>
            
            <span>
            <input type='reset' onClick={() => {setLogin(!isLogin); resetFields();}} value={(isLogin) ? 'register a new account' : 'log into an old account'} />
            <span className='form-line'>{error}</span>
            <div/>
            </span>
          </form>
      </div>
    );
  }
  
  export default Login;