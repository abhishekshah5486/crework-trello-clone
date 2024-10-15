import React, {useState, useEffect, useContext} from 'react';
import dummyProfile from '../../Assets/Images/dummy-profile.png';
import './TaskListPage.css'
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
import clockIcon from '../../Assets/Images/clock-icon.svg';
import searchIcon from '../../Assets/Images/search-icon.svg';
import { useNavigate } from 'react-router-dom';
import { retrieveTasksByStatus, deleteTaskById, updateTaskStatusById } from '../../APICalls/tasks';
import { LogoutUser } from '../../APICalls/users';
import { formatDistanceToNowStrict } from 'date-fns';
import { jwtDecode } from 'jwt-decode';
import UserContext from '../../Context/UserContext';
import pencilIcon from '../../Assets/Images/pencil.png';
import deleteIcon from '../../Assets/Images/delete.png';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { retrieveAllTasks } from '../../APICalls/tasks';
const HomePage = () => {
    const navigate = useNavigate();
    const {user, setUser} = useContext(UserContext);
    const [todoTasks, setTodoTasks] = useState([]);
    const [inProgressTasks, setInProgressTasks] = useState([]);
    const [underReviewTasks, setUnderReviewTasks] = useState([]);
    const [finishedTasks, setFinishedTasks] = useState([]);
    const [allTasks, setAllTasks] = useState([]);
    useEffect(() => {
        const fetchTasks = async () => {
        try {
            const todo = await retrieveTasksByStatus('to-do');
            const inProgress = await retrieveTasksByStatus('in-progress');
            const underReview = await retrieveTasksByStatus('under-review');
            const finished = await retrieveTasksByStatus('finished');
            const allTasks = await retrieveAllTasks();
            
            setTodoTasks(todo.tasks);
            setInProgressTasks(inProgress.tasks);
            setUnderReviewTasks(underReview.tasks);
            setFinishedTasks(finished.tasks);
            setAllTasks(allTasks.tasks);
        } catch (err) {
            console.error('Failed to fetch tasks:', err.message);
        }
        };
        fetchTasks();
    }, []);
    const handleUpdateTaskClick = (taskId) => {
        navigate('/home/edit-task', {state: {taskId}});
    }
    const handleDeleteTaskClick = async (taskId) => {
        try {
            const deletedTask = await deleteTaskById(taskId);
            console.log(deletedTask);
            if (deletedTask.success) {
                alert('Task deleted successfully.');
                window.location.reload();
            }
            else {
                alert('Failed to delete task, please try again later.');
            }
        } catch (err) {
            alert('Something went wrong, please try again later.');
        }
    }
    const renderTaskList = (task, index) => {
        return (
            <div className="task-card" key={index}>
                    <div className="task-content">
                        <div className="task-header">
                            <h2 className="task-title">{task.title}</h2>
                            <div className="tags">
                                <span className="tag task-card-priority urgent">{task.priority}</span>
                                <span className="tag task-card-status">{task.status}</span>
                            </div>
                        </div>
                        <p className="description">
                            {task.description}
                        </p>
                    </div>
                    <div className="task-actions">
                        <div className="update-task">
                            <img src={pencilIcon} alt="" 
                            onClick={() => handleUpdateTaskClick(task.taskId)}
                            />
                        </div>
                        <div className="delete-task">
                            <img src={deleteIcon} alt="" 
                            onClick={() => handleDeleteTaskClick(task.taskId)}
                            />
                        </div>
                    </div>
            </div>
        )
    }
    const handleAddNewTaskClick = () => {
        navigate('/home/create-task');
    }
    const handleLogout = async () => {
        try {
            // userId to be passed not passed yet.
            const token = localStorage.getItem('token');
            const decodedToken = jwtDecode(token);
            const userId = decodedToken.userId;
            const loggedOutUser = await LogoutUser(userId);
            if (loggedOutUser.success)
            {
                localStorage.removeItem('token');
                setUser(null);
                alert('Logged out successfully.');
                navigate('/');
            }
            else 
            {
                alert('Failed to logout, please try again later.');
            }
        } catch (err) {
            alert('Something went wrong, please try again later.');    
        }
    }
    const handleKanbanViewClick = () => {
        navigate('/home');
    }
    return (
        <div className='user-home-page'> 
        <div className="sidebar">
            <div className="profile-section">
                <div className="profile">
                    <img src={dummyProfile} alt="" />
                    <h2 className='profile-name'>{user.name}</h2>
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
            <header className='kanban-view'>
                <h2>Tasks Overview</h2>
                <button className='kanban-view-btn' onClick={handleKanbanViewClick}>Kanban View</button>
            </header>
            <div className="tasks-search-bar">
                <img src={searchIcon} alt="" />
                <input type="text" placeholder='Search tasks by title or description...' />
                <button className="create-new-btn" onClick={handleAddNewTaskClick}>Create new <img src={createIcon} alt="" /></button>
            </div>
            <div className="task-list">
                {
                    allTasks.map((task, index) => renderTaskList(task, index))
                }
            </div>
        </div>
        </div>
    )
}
export default HomePage;