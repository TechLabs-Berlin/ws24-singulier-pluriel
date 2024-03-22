import { useState,useContext } from "react";
import axios from "axios";
import AuthApi from "../AuthApi";
import { useMutation } from "react-query";

function Login() {
//getting global state using use Context
const Auth=useContext(AuthApi);

  // destructuring Props
  const [userType, setUserType] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  // Creating Api Url to be used as a base in case if wanted to have more than one request then we can 
  // avoid typing the url every time
  const Api = axios.create({
    baseURL: 'https://ws24-singulier-pluriel.onrender.com/api/auth',
    timeout: 10000,
    headers: {
      "Accept": "application/json",
    },
  });

// select change method
  const handleUserTypeChange = (type) => {
    setUserType(type);
    
  };

  // handle login post request method
  const mutation = useMutation(async(userData) =>
    await Api.post("/login", userData)
    .then((res)=>{
      if(res.data.loggedIn){
        Auth.setAuth(true);
      }
    })
    
    ,
  );
 /// submitting Data using mutate method of react-query
  const submitData = () => {
    mutation.mutate({'email':userEmail, 'password':password,userType });
  };

  
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!userEmail || !password) {
      setError('Please enter both email and password.');
      return;
    }

    if (error === '') {


      submitData();
      
    
      if (mutation.isLoading) {
        return <span>Loading...</span>;
      }
    
      if (mutation.isError) {
        return <span>Error...</span>;
      }
    
     if(mutation.isSuccess) {
      return <span>Success...</span>;
     }

      // setTimeout(() => {
      //   if (password === 'correctPassword' && userEmail === 'correctEmail') {
      //     alert('Login successful!');
      //   } else {
      //     setError('Incorrect email or password.');
      //   }
      // }, 1000);
    }
  };
  return (
    
    <div className="login">
      {/* <a href='./singin.js'>If there need t be sing in Don't Have an Account?</a> */}
      <br />
      {/* To be deleted if no select option needed */}
      <label>Log in as a</label>
      <select value={userType} onChange={(e) => handleUserTypeChange(e.target.value)}>
        <option value="student">Student</option>
        <option value="teacher">Teacher</option>
      </select>
      <br />
      <form onSubmit={handleLogin}>
        <label>Email:</label>
        <input type="email" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} />
        <br />
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <br/>
        <button type="submit">Login</button>

      </form>
      <br />
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>

  );
  }

  
export default Login;
