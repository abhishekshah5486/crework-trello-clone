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
import helpIcon from '../../Assets/Images/help-icon.svg';
import introducingTags from '../../Assets/Images/introducing-tags.svg';
import shareNotesInstantly from '../../Assets/Images/share-notes-instantly.svg';
import accessAnywhere from '../../Assets/Images/access-anywhere.svg';
import searchIcon from '../../Assets/Images/search-icon.svg';
import calendarIcon from '../../Assets/Images/calender-icon.svg';
import automationIcon from '../../Assets/Images/automation-icon.svg';
import filterIcon from '../../Assets/Images/filter-icon.svg';
import shareIcon from '../../Assets/Images/share-icon.svg';
import barFilterIcon from '../../Assets/Images/bar-filter-icon.svg';
import addIcon from '../../Assets/Images/add-icon.svg';
import clockIcon from '../../Assets/Images/clock-icon.svg';

const HomePage = () => {
  return (
    <div className='user-home-page'> 
      <div className="sidebar">
        <div className="profile-section">
            <div className="profile">
                <img src={dummyProfile} alt="" />
                <h2 className='profile-name'>Abhishek Kumar Shah</h2>
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
      <div className="main-content">
        <header>
            <h1>Good morning, Abhishek!</h1>
            <div class="help-feedback">
                <p>Help & feedback</p>
                <img src={helpIcon} alt="" />
            </div>
        </header>
        <div className="info-cards">
            <div className="info-cards-item">
                <img src={introducingTags} alt="" />
                <div className="info-card-content">
                    <h2>Introducing tags</h2>
                    <p>Easily categorize and find your notes by adding tags. Keep your workspace clutter-free and efficient.</p>
                </div>
            </div>
            <div className="info-cards-item">
                <img src={shareNotesInstantly} alt="" />
                <div className="info-card-content">
                    <h2>Share Notes Instantly</h2>
                    <p>Effortlessly share your notes with others via email or link. Enhance collaboration with quick sharing options.</p>
                </div>
            </div>
            <div className="info-cards-item">
                <img src={accessAnywhere} alt="" />
                <div className="info-card-content">
                    <h2>Access Anywhere</h2>
                    <p>Sync your notes across all devices. Stay productive whether you're on your phone, tablet, or computer.</p>
                </div>
            </div>
        </div>
        <div className="task-controls">
            <input type="text" className='search-bar' placeholder='Search'/>
            <img src={searchIcon} alt="" className='search-icon'/>
            <div class="controls">
                <button class="calendar-view-btn">Calendar view <img src={calendarIcon} alt=""/></button>
                <button class="automation-btn">Automation <img src={automationIcon} alt="" /></button>
                <button class="filter-btn">Filter <img src={filterIcon} alt="" /></button>
                <button class="share-btn">Share <img src={shareIcon} alt="" /></button>
                <button class="create-new-btn">Create new <img src={createIcon} alt="" /></button>
            </div>
        </div>
        <div className="task-columns">
            <div className="task-column">
                <div className="task-status">
                    <h2>To do</h2>
                    <img src={barFilterIcon} alt="" />
                </div>
                <div className="task-card">
                    <h3 className='task-card-title'>Implement User Authentication</h3>
                    <p className='task-card-description'>Develop and integrate user authentication using email and password.</p>
                    <button className='task-card-priority urgent'>Urgent</button>
                    <div className="task-card-deadline">
                        <img src={clockIcon} alt="" />
                        <h3>2024-08-15</h3>
                    </div>
                    <p className='task-card-timestamp'>1 min ago</p>
                </div>
                <button class="add-new-task-btn">Add new <img src={addIcon} alt="" /></button>
            </div>
            <div className="task-column">
                <div className="task-status">
                    <h2>In progress</h2>
                    <img src={barFilterIcon} alt="" />
                </div>
                <div className="task-card">
                    <h3 className='task-card-title'>Design Home Page UI</h3>
                    <p className='task-card-description'>Develop and integrate user authentication using email and password.</p>
                    <button className='task-card-priority medium'>Medium</button>
                    <div className="task-card-deadline">
                        <img src={clockIcon} alt="" />
                        <h3>2024-08-15</h3>
                    </div>
                    <p className='task-card-timestamp'>1 hr ago</p>
                </div>
                <div className="task-card">
                    <h3 className='task-card-title'>Conduct User Feedback Survey</h3>
                    <p className='task-card-description'>Collect and analyze user feedback to improve app features.</p>
                    <button className='task-card-priority low'>Low</button>
                    <div className="task-card-deadline">
                        <img src={clockIcon} alt="" />
                        <h3>2024-08-05</h3>
                    </div>
                    <p className='task-card-timestamp'>3 hr ago</p>
                </div>
                <button class="add-new-task-btn">Add new <img src={addIcon} alt="" /></button>
            </div>
            <div className="task-column">
                <div className="task-status">
                    <h2>Under review</h2>
                    <img src={barFilterIcon} alt="" />
                </div>
                <div className="task-card">
                    <h3 className='task-card-title'>Integrate Cloud Storage</h3>
                    <p className='task-card-description'>Enable cloud storage for note backup and synchronization.</p>
                    <button className='task-card-priority urgent'>Urgent</button>
                    <div className="task-card-deadline">
                        <img src={clockIcon} alt="" />
                        <h3>2024-08-20</h3>
                    </div>
                    <p className='task-card-timestamp'>2 days ago</p>
                </div>
                <button class="add-new-task-btn">Add new <img src={addIcon} alt="" /></button>
            </div>
            <div className="task-column">
                <div className="task-status">
                    <h2>Finished</h2>
                    <img src={barFilterIcon} alt="" />
                </div>
                <div className="task-card">
                    <h3 className='task-card-title'>Test Cross-browser Compatibility</h3>
                    <p className='task-card-description'>Ensure the app works seamlessly across different web browsers.</p>
                    <button className='task-card-priority medium'>Medium</button>
                    <div className="task-card-deadline">
                        <img src={clockIcon} alt="" />
                        <h3>2024-07-30</h3>
                    </div>
                    <p className='task-card-timestamp'>4 days ago</p>
                </div>
                <button class="add-new-task-btn">Add new <img src={addIcon} alt="" /></button>
            </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage;
