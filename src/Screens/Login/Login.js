import React, { useEffect, useState } from 'react';
import Axios from "axios";
import { useNavigation } from '../../ContextProvider/NavigationContext';
import './Login.css'; // Import the CSS file

function Login() {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const token = localStorage.getItem('authToken');
    const navigate = useNavigation();

    const login = async () => {
        try {
            var response = await Axios.get('https://anidexapi-production.up.railway.app/login?username='+userName+'&password='+password)
            localStorage.setItem('authToken',response.data.data)
            navigate("/Home")
        } catch (error){
            console.error(error)
        }
    }
        
    const handleLogin = () => {
        login()
    };

    useEffect(()=>{
        if (token) {
            navigate("/Home")
        } else {
            console.log("no token")
        }
    },[navigate,token])

    return (
        <div>
            <div className='HomeTitle'>
          <h1>Anidex</h1>
        </div>
        <div className="login-container">
        <h2>Login</h2>
        <form>
            <label htmlFor="userName">Username:</label>
            <input
            type="text"
            id="userName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            />
            <label htmlFor="password">Password:</label>
            <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
            <button type="button" onClick={handleLogin}>
            Log In
            </button>
        </form>
        </div>
        </div>
    );
}

export default Login;