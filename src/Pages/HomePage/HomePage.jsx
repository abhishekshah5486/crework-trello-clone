import React from 'react';
import dummyProfile from '../../Assets/Images/dummy-profile.png';
import './HomePage.css';
import notificationIcon from '../../Assets/Images/notification-icon.svg';
import doubleChevronIcon from '../../Assets/Images/double-chevron-icon.svg';
import lightThemeIcon from '../../Assets/Images/light-theme-icon.svg';
import homeIcon from '../../Assets/Images/home-icon.svg';
import boardsIcon from '../../Assets/Images/boards-icon.svg';
import settingsIcon from '../../Assets/Images/settings-icon.svg';
import teamsIcon from '../../Assets/Images/teams-icon.svg';
import analyticsIcon from '../../Assets/Images/analytics-icon.svg';
import createIcon from '../../Assets/Images/create-icon.svg';
import downloadIcon from '../../Assets/Images/download-icon.svg';

const HomePage = () => {
  return (
    <div className='user-home-page'> 
      <div className="sidebar">
        <div className="profile-section">
            <div className="profile">
                <img src={dummyProfile} alt="" />
                <h2 className='profile-name'>John Gardner</h2>
            </div>
            <div className="profile-actions">
                <div className="icon-container">
                    <img src={notificationIcon} alt="" />
                    <img src={lightThemeIcon} alt="" />
                    <img src={doubleChevronIcon} alt="" />
                </div>
                <button className='logout-btn'>Logout</button>
            </div>
            <nav className="nav-container">
                <div className="nav-container-item">
                    <img src={homeIcon} alt="" />
                    <h2>Home</h2>
                </div>
                <div className="nav-container-item">
                    <img src={boardsIcon} alt="" />
                    <h2>Boards</h2>
                </div>
                <div className="nav-container-item">
                    <img src={settingsIcon} alt="" />
                    <h2>Settings</h2>
                </div>
                <div className="nav-container-item">
                    <img src={teamsIcon} alt="" />
                    <h2>Teams</h2>
                </div>
                <div className="nav-container-item">
                    <img src={analyticsIcon} alt="" />
                    <h2>Analytics</h2>
                </div>
            </nav>
            <div className="create-task-btn">
                <button>Create new task <img src={createIcon} alt=""/></button>
            </div>
        </div>
        <div className="download-workflo-app">
            <img src={downloadIcon} alt="" />
            <div className="download-text">
                <h2>Download the app</h2>
                <p>Get the full experience</p>
            </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage;
