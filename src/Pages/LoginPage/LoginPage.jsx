import React, { useContext, useEffect, useState } from 'react';
import './LoginPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { Link } from 'react-router-dom';
import { LoginUser } from '../../APICalls/users';
import UserContext from '../../Context/UserContext';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);  
    const { user, setUser } = useContext(UserContext);  
    const [formValues, setFormValues] = useState({
        email: '',
        password: ''
    });
    const isFormComplete = Object.values(formValues).every((value) => value !== '');
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormValues({...formValues, [name]:value});
    }
    const togglePasswordVisibility = () => {
        setShowPassword(prev => !prev);
    }
    const onFinish = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const userDetails = Object.fromEntries(formData);
        console.log(userDetails);

        try {
            const response = await LoginUser(userDetails);

            if (response.success){
                alert("Logged in successfully");
                const user = response.user;
                setUser({
                    name: user.name,
                    email: user.email,
                });
                // Set the jwt token received from the server in local storage
                localStorage.setItem('token', response.token);
                navigate('/home');
            }else{
                alert(response.message);
            }
        } catch (err) {
            alert('Something went wrong, please try again later.');
        }
    }

    useEffect(() => {
        if (user){
            return navigate('/home');
        }
    }, [user, navigate]);
    return (
        <div className="login-page">
        <div className="login-form login-page-container">
            <h2>Welcome to <span className='logo-name'>Workflo</span>!</h2>
            <form onSubmit={onFinish}>
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
