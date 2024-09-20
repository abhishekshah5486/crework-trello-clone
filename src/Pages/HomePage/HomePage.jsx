import React, {useState, useEffect} from 'react';
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
import { useNavigate } from 'react-router-dom';
import { retrieveTasksByStatus } from '../../APICalls/tasks';
import { formatDistanceToNowStrict } from 'date-fns';

const HomePage = () => {
  const navigate = useNavigate();

  const [todoTasks, setTodoTasks] = useState([]);
  const [inProgressTasks, setInProgressTasks] = useState([]);
  const [underReviewTasks, setUnderReviewTasks] = useState([]);
  const [finishedTasks, setFinishedTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const todo = await retrieveTasksByStatus('to-do');
        const inProgress = await retrieveTasksByStatus('in-progress');
        const underReview = await retrieveTasksByStatus('under-review');
        const finished = await retrieveTasksByStatus('finished');
        
        setTodoTasks(todo.tasks);
        setInProgressTasks(inProgress.tasks);
        setUnderReviewTasks(underReview.tasks);
        setFinishedTasks(finished.tasks);
      } catch (err) {
        console.error('Failed to fetch tasks:', err.message);
      }
    };
    fetchTasks();
  }, []);

  const renderTaskCard = (task) => (
    <div className="task-card" key={task.id}>
      <h3 className='task-card-title'>{task.title}</h3>
      <p className='task-card-description'>{task.description}</p>
      <button className={`task-card-priority ${task.priority.toLowerCase()}`}>{task.priority}</button>
      <div className="task-card-deadline">
        <img src={clockIcon} alt="" />
        <h3>{task.deadline}</h3>
      </div>
      <p className='task-card-timestamp'>
      {formatDistanceToNowStrict(new Date(task.updatedAt), { addSuffix: true })}
      </p>
    </div>
  );

  const handleAddNewTaskClick = () => {
    console.log("Hi");
    navigate('/home/create-task');
  }

  const handleLogout = () => {
    
  }

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
                <button className='logout-btn' onClick={handleLogout}>Logout</button>
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
                <button onClick={handleAddNewTaskClick}>Create new task <img src={createIcon} alt=""/></button>
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
                <button class="create-new-btn" onClick={handleAddNewTaskClick}>Create new <img src={createIcon} alt="" /></button>
            </div>
        </div>
        <div className="task-columns">
            <div className="task-column">
                <div className="task-status">
                    <h2>To do</h2>
                    <img src={barFilterIcon} alt="" />
                </div>
                {todoTasks.map(task => renderTaskCard(task))}
                <button class="add-new-task-btn" onClick={handleAddNewTaskClick}>Add new <img src={addIcon} alt="" /></button>
            </div>
            <div className="task-column">
                <div className="task-status">
                    <h2>In progress</h2>
                    <img src={barFilterIcon} alt="" />
                </div>
                {inProgressTasks.map(task => renderTaskCard(task))}
                <button class="add-new-task-btn" onClick={handleAddNewTaskClick}>Add new <img src={addIcon} alt="" /></button>
            </div>
            <div className="task-column">
                <div className="task-status">
                    <h2>Under review</h2>
                    <img src={barFilterIcon} alt="" />
                </div>
                {underReviewTasks.map(task => renderTaskCard(task))}
                <button className="add-new-task-btn" onClick={handleAddNewTaskClick}>Add new <img src={addIcon} alt="" /></button>
            </div>
            <div className="task-column">
                <div className="task-status">
                    <h2>Finished</h2>
                    <img src={barFilterIcon} alt="" />
                </div>
                {finishedTasks.map(task => renderTaskCard(task))}
                <button className="add-new-task-btn" onClick={handleAddNewTaskClick}>Add new <img src={addIcon} alt="" /></button>
            </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage;
