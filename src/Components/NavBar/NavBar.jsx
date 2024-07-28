import React from 'react';
import './NavBar.css';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <>
        <div className='navbar'>
            <div className="left-nav-section">
                <h2 className="logo-name">Workflo</h2>
                <ul>
                    <li>Features</li>
                    <li>Solutions</li>
                    <li>Plans</li>
                    <li>Pricing</li>
                    <li>Resources</li>
                </ul>
            </div>
            <div className="right-nav-section">
                <Link to="/login" style={{textDecoration: 'none', color: 'blue'}}><h2>Log in</h2></Link>
                <div>Get Workflo for free</div>
            </div>
        </div>
        <div className="dummy-div"></div>
    </>
  )
}

export default NavBar;
