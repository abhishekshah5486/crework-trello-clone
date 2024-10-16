import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUpPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { Link } from 'react-router-dom';
import UserContext from '../../Context/UserContext';
import { RegisterUser } from '../../APICalls/users';


const SignUpPage = () => {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const [showPassword, setShowPassword] = useState(false);    
    const [formValues, setFormValues] = useState({
        name: '',
        email: user?.email || '',
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

        try {
            const response = await RegisterUser(userDetails);
            if (response.success){
                alert("You have successfully signed up.");
                navigate('/login');
            }else{
                alert(response.message);
            }
        } catch (err) {
            console.log(err.message);
            alert("Something went wrong, please try again later.");
        }
    }
    return (
        <div className="signup-page">
            <div className="signup-form signup-page-container">
                <h2>Welcome to <span className='logo-name'>Workflo</span>!</h2>
                <form onSubmit={onFinish}>
                    <input
                        type="text"
                        placeholder="Full Name" 
                        value={formValues.name}
                        name='name'
                        onChange={handleChange}
                        />
                        <input
                        type="email"
                        placeholder="Your Email" 
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
                    <button type="submit" className={isFormComplete ? "btn-enabled" : "btn-disabled"}>Sign up</button>
                    <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} className="password-icon" onClick={togglePasswordVisibility}/>
                </form>
                <p>Already have an account? <Link style={{textDecoration: 'none'}} to="/login">Log in</Link>.</p>
            </div>
        </div>
    )
}

export default SignUpPage;
