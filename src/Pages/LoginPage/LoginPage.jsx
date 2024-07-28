import React, { useState } from 'react';
import './LoginPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { Link } from 'react-router-dom';

const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);    const [formValues, setFormValues] = useState({
        email: '',
        password: ''
    });
    const isFormComplete = Object.values(formValues).every((value) => value != '');
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormValues({...formValues, [name]:value});
    }


    const togglePasswordVisibility = () => {
        setShowPassword(prev => !prev);
    }
    return (
        <div className="login-page">
        <div className="login-form login-page-container">
            <h2>Welcome to <span className='logo-name'>Workflo</span>!</h2>
            <form>
                <input
                type="email"
                placeholder="Email" 
                value={formValues.email}
                name='email'
                onChange={handleChange}
                />
                <input
                type="password"
                placeholder="Password"
                value={formValues.password}
                name='password'
                onChange={handleChange}
                />
            <button type="submit" className={isFormComplete ? "btn-enabled" : "btn-disabled"}>Login</button>
            <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} className="password-icon" onClick={togglePasswordVisibility}/>
            </form>
            <p>Don't have an account? Create a <Link style={{textDecoration: 'none'}} to="/signup">new account</Link>.</p>
        </div>
        </div>
    )
}

export default LoginPage;
