import { useState } from "react";

function Login() {
  const [userType, setUserType] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleUserTypeChange = (type) => {
    setUserType(type);
    setUserEmail('');
    setPassword('');
    setError('');
  };

  const handleLogin = () => {
    if (!userEmail || !password) {
      setError('Please enter both email and password.');
      return;
    }

    if (error === '') {
      console.log(`Logging in as ${userType} with Email: ${userEmail} and password: ${password}`);

      setTimeout(() => {
        if (password === 'correctPassword' && userEmail === 'correctEmail') {
          alert('Login successful!');
        } else {
          setError('Incorrect email or password.');
        }
      }, 1000);
    }
  };
  return (
    <div className="login">
      {/* <a href='./singin.js'>If there need t be sing in Don't Have an Account?</a> */}
      <br />
      <label>Log in as a</label>
      <select value={userType} onChange={(e) => handleUserTypeChange(e.target.value)}>
        <option value="student">Student</option>
        <option value="teacher">Teacher</option>
      </select>
      <br />
      <form>
        <label>Email:</label>
        <input type="email" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} />
        <br />
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </form>
      <br />
      <button onClick={handleLogin}>Login</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>

  );
  }

  
export default Login;
