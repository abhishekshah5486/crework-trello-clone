import React, { useState } from 'react';
import './Header.css';
import headerImage from '../../Assets/Images/header-image.webp';
import { Link } from 'react-router-dom';

const Header = () => {

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
                    <input type="email" placeholder='Email'/>
                    <Link to="/signup" style={{textDecoration: 'none'}}><button type='submit'>Sign up - it's free!</button></Link>
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
