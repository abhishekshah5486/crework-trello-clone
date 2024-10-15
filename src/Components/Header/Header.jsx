import React, { useContext, useState } from 'react';
import './Header.css';
import headerImage from '../../Assets/Images/header-image.webp';
import { Link } from 'react-router-dom';
import UserContext from '../../Context/UserContext';

const Header = () => {
    const { setUser } = useContext(UserContext);
    const [email, setEmail] = useState('');

    const handleSubmit = () => {
        if (email.trim())
        {
            setUser({email});
        }
    }
    return (
        <>
        <div className="atlassian-ai-learn-more">
            <p>Accelerate your teams' work with Atlassian Intelligence (AI) features 🤖 now available for all Premium and Enterprise! Learn more.</p>
        </div>
        <div className='header-section'>
            <div className="left-header-section">
                <h1>Workflo brings all your tasks, teammates, and tools together</h1>
                <p>Keep everything in the same place—even if your team isn't.</p>

                <div className="sign-up">
                    <input 
                    type="email" 
                    placeholder='Email' 
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    />
                    <Link to="/signup" style={{textDecoration: 'none'}}><button type='submit' onClick={handleSubmit}>Sign up - it's free!</button></Link>
                </div>
            </div>
            <div className="right-header-section">
                <img src={headerImage} alt="" />
            </div>
        </div>
        </>
    )
}

export default Header;
