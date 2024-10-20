import React, {useState, useEffect, useContext} from 'react';
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
import pencilIcon from '../../Assets/Images/pencil.png';
import deleteIcon from '../../Assets/Images/delete.png';
import { useNavigate } from 'react-router-dom';
import { retrieveTasksByStatus, deleteTaskById, updateTaskStatusById } from '../../APICalls/tasks';
import { getCurrentUser } from '../../APICalls/users';
import { retrieveAllTasksByUserIdAndStatus } from '../../APICalls/tasks';
import { LogoutUser } from '../../APICalls/users';
import { formatDistanceToNowStrict } from 'date-fns';
import { jwtDecode } from 'jwt-decode';
import UserContext from '../../Context/UserContext';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const HomePage = () => {
    const navigate = useNavigate();
    const {user, setUser, loading, setLoading} = useContext(UserContext);

    const [todoTasks, setTodoTasks] = useState([]);
    const [inProgressTasks, setInProgressTasks] = useState([]);
    const [underReviewTasks, setUnderReviewTasks] = useState([]);
    const [finishedTasks, setFinishedTasks] = useState([]);

    useEffect(() => {
        if (user){
          return navigate('/home');
        }
    }, [user, navigate]);

    useEffect(() => {
        const fetchTasks = async () => {
        try {
            const todo = await retrieveAllTasksByUserIdAndStatus(user.userId, 'to-do');
            const inProgress = await retrieveAllTasksByUserIdAndStatus(user.userId, 'in-progress');
            const underReview = await retrieveAllTasksByUserIdAndStatus(user.userId, 'under-review');
            const finished = await retrieveAllTasksByUserIdAndStatus(user.userId, 'finished');
            
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

    const handleUpdateTaskClick = (taskId) => {
        navigate('/home/edit-task', {state: {taskId}});
    }

    const handleTaskListClick = () => {
        navigate('/all-tasks');
    }

    const handleDeleteTaskClick = async (taskId) => {
        try {
            const deletedTask = await deleteTaskById(taskId);
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

    const renderTaskCard = (task, index) => (
        <Draggable draggableId={task.taskId} index={index} key={task.taskId}>
            {(provided) => (
                <div className="task-card"  
                {...provided.dragHandleProps} 
                {...provided.draggableProps} 
                ref={provided.innerRef}
                >
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
                    <div className="task-update-delete">
                        <div className="update-task" onClick={() => handleUpdateTaskClick(task.taskId)}>
                            <img src={pencilIcon} alt="" />
                        </div>
                        <div className="delete-task" onClick={() => handleDeleteTaskClick(task.taskId)}>
                            <img src={deleteIcon} alt="" />
                        </div>
                    </div>
                </div>
            )}
        </Draggable>
    );

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

    const handleDragDrop = async (results) => {
        const {source, destination} = results;
        if (!destination)
        {
            return;
        }
        if ((source.droppableId === destination.droppableId) && (source.index === destination.index))
        {
            return;
        }
        // Task being dragged
        const taskToMove = 
            source.droppableId === 'todo-tasks' 
            ? todoTasks[source.index] 
            : source.droppableId === 'in-progress-tasks'
            ? inProgressTasks[source.index]
            : source.droppableId === 'under-review-tasks'
            ? underReviewTasks[source.index]
            : finishedTasks[source.index];

        // Remove task from source
        let newSourceTasks = [];
        switch(source.droppableId)
        {
            case 'todo-tasks':
                newSourceTasks = [...todoTasks];
                newSourceTasks.splice(source.index, 1);
                setTodoTasks(newSourceTasks);
                break;
            case 'in-progress-tasks':
                newSourceTasks = [...inProgressTasks];
                newSourceTasks.splice(source.index, 1);
                setInProgressTasks(newSourceTasks);
                break;
            case 'under-review-tasks':
                newSourceTasks = [...underReviewTasks];
                newSourceTasks.splice(source.index, 1);
                setUnderReviewTasks(newSourceTasks);
                break;
            case 'finished-tasks':
                newSourceTasks = [...finishedTasks];
                newSourceTasks.splice(source.index, 1);
                setFinishedTasks(newSourceTasks);
                break;
            default:
                break;
        }

        // Add the task to the destination index
        const addTaskToDestination = (destinationId, destinationIndex) => {
            let newTasks = [];
            switch(destinationId)
            {
                case 'todo-tasks':
                    setTodoTasks((prev) => {
                        newTasks = [...prev];
                        newTasks.splice(destinationIndex, 0, taskToMove);
                        return newTasks;
                    })
                    break;
                case 'in-progress-tasks':
                    setInProgressTasks((prev) => {
                        newTasks = [...prev];
                        newTasks.splice(destinationIndex, 0, taskToMove);
                        return newTasks;
                    })
                    break;
                case 'under-review-tasks':
                    setUnderReviewTasks((prev) => {
                        newTasks = [...prev];
                        newTasks.splice(destinationIndex, 0, taskToMove);
                        return newTasks;
                    })
                    break;
                case 'finished-tasks':
                    setFinishedTasks((prev) => {
                        newTasks = [...prev];
                        newTasks.splice(destinationIndex, 0, taskToMove);
                        return newTasks;
                    })
                    break;
                default:
                    break;
            }
        }
        addTaskToDestination(destination.droppableId, destination.index);

        // Determine the new status based on destination droppableID
        let newStatus;
        switch (destination.droppableId) {
            case 'todo-tasks':
                newStatus = 'to-do';
                break;
            case 'in-progress-tasks':
                newStatus = 'in-progress';
                break;
            case 'under-review-tasks':
                newStatus = 'under-review';
                break;
            case 'finished-tasks':
                newStatus = 'finished';
                break;
            default:
                return;
        }
        // Update the new status of the dragged task
        try {
            const response = await updateTaskStatusById(taskToMove.taskId, {status: newStatus});
            console.log('Task status updated successfully:', response);
        } catch (err) {
            console.error('Failed to update task status:', err.message);
        }
    }
    // Return a loading page if user Id has not been fetched yet
    if(loading || !user?.userId)
    {
        return (
            <div>Loading...</div>
        )
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
            <header>
                <h1>Let’s make progress, {user.name.split(' ')[0]}!</h1>
                <div className="help-feedback">
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
                <button className='task-list-btn' onClick={handleTaskListClick}>View all tasks</button>
                <div className="controls">
                    <button className="calendar-view-btn">Calendar view <img src={calendarIcon} alt=""/></button>
                    <button className="automation-btn">Automation <img src={automationIcon} alt="" /></button>
                    <button className="filter-btn">Filter <img src={filterIcon} alt="" /></button>
                    <button className="share-btn">Share <img src={shareIcon} alt="" /></button>
                    <button className="create-new-btn" onClick={handleAddNewTaskClick}>Create new <img src={createIcon} alt="" /></button>
                </div>
            </div>
            <DragDropContext onDragEnd={(results) => handleDragDrop(results)}>
                <div className="task-columns">
                    <div className="task-column">
                        <div className="task-status">
                            <h2>To do</h2>
                            <img src={barFilterIcon} alt="" />
                        </div>
                        <Droppable droppableId='todo-tasks' type='group'>
                            {(provided) => (
                                <div {...provided.droppableProps} ref={provided.innerRef} className='task-status-all-tasks'>
                                {todoTasks.map((task, index) => renderTaskCard(task, index))}
                                {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                        <button className="add-new-task-btn" onClick={handleAddNewTaskClick}>Add new <img src={addIcon} alt="" /></button>
                    </div>
                    <div className="task-column">
                        <div className="task-status">
                            <h2>In progress</h2>
                            <img src={barFilterIcon} alt="" />
                        </div>
                        <Droppable droppableId='in-progress-tasks' type='group'>
                            {(provided) => (
                                <div {...provided.droppableProps} ref={provided.innerRef} className='task-status-all-tasks'>
                                {inProgressTasks.map((task, index) => renderTaskCard(task, index))}
                                {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                        <button className="add-new-task-btn" onClick={handleAddNewTaskClick}>Add new <img src={addIcon} alt="" /></button>
                    </div>
                    <div className="task-column">
                        <div className="task-status">
                            <h2>Under review</h2>
                            <img src={barFilterIcon} alt="" />
                        </div>
                        <Droppable droppableId='under-review-tasks' type='group'>
                            {(provided) => (
                                <div {...provided.droppableProps} ref={provided.innerRef} className='task-status-all-tasks'>
                                {underReviewTasks.map((task, index) => renderTaskCard(task, index))}
                                {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                        <button className="add-new-task-btn" onClick={handleAddNewTaskClick}>Add new <img src={addIcon} alt="" /></button>
                    </div>
                    <div className="task-column">
                        <div className="task-status">
                            <h2>Finished</h2>
                            <img src={barFilterIcon} alt="" />
                        </div>
                        <Droppable droppableId='finished-tasks' type='group'>
                            {(provided) => (
                                <div {...provided.droppableProps} ref={provided.innerRef} className='task-status-all-tasks'>
                                {finishedTasks.map((task, index) => renderTaskCard(task, index))}
                                {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                        <button className="add-new-task-btn" onClick={handleAddNewTaskClick}>Add new <img src={addIcon} alt="" /></button>
                    </div>
                </div>
            </DragDropContext>
        </div>
        </div>
    )
}

export default HomePage;
