import { useState } from 'react';

import axios from 'axios';

function Login({setDisplay, inventory, wallet, records, setUser, loadUserData}) {

    const [isLogin, setLogin] = useState(true);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [confPassword, setConfPassword] = useState('');

    function resetFields() {
      setEmail('');
      setUsername('');
      setPassword('');
      setConfPassword('');
      setError('');
    }


    const handleRegister  = async () => {
        
      try {
          if (!email || !username || !password || !confPassword) {
              setError("Please fill in all fields");
              return;
          }

          if (password !== confPassword) {
              throw new Error("Passwords are not matching");
          }

          // convert the current inventory/record into strings for the database
          let inventoryString = [];
          const temp = inventory.map((item) => {
            inventoryString.push(JSON.stringify(item))
            return JSON.stringify(item)});
          inventoryString = inventoryString.toString();

          const recordsString = JSON.stringify(records);

          // attempt signup
          const response = await axios.post('http://localhost:8080/api/auth/signup', { username, email, password, inventoryString, wallet, recordsString });

          // signup success
          console.log(response.data);
          setUser(username);
          setDisplay(0);
      } catch (e) {
          // signup error
          console.error("Signup failed:", e.response ? e.response.data : e.message);
          setError(e.response ? e.response.data : e.message);
      }
  }

  const handleLogin = async () => {
    try {
        if (!username || !password) {
            setError('Please enter both username and password.');
            return;
        }

        const response = await axios.post('http://localhost:8080/api/auth/login', { username, password }, {withCredentials: true});
        console.log('Login successful:', response.data);

        // set username to show the session has a log in + load user data
        setUser(username);
        loadUserData(response.data);
        setDisplay(0);
    } catch (error) {
        console.error('Login failed:', error.response ? error.response.data : error.message);
        setError(error.response ? error.response.data : error.message);
    }
};

    return (
      <div className="nongame rounded noselect rel">
        
        
          <form className='form-container'>
            <h2>{(isLogin) ? 'log in' : 'register'}</h2>
            <span className='form-line'>
            <label for='username'>username:</label>
            <input type='text' id='username' onChange={(e) => {setUsername(e.target.value)}} spellCheck='false' className='text-field'/>
            </span>
            {!isLogin &&
                <span className='form-line'>
                <label for='email'>email:</label>
                <input type='text' id='email' onChange={(e) => {setEmail(e.target.value)}}  className='text-field'/>
                </span>
            }
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
            <div className="settings-button" onClick={isLogin ? handleLogin : handleRegister}>{(isLogin) ? 'log in' : 'register'}</div>
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