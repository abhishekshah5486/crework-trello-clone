import React, {useState, useEffect, useContext} from 'react';
import dummyProfile from '../../Assets/Images/dummy-profile.png';
import './TaskListPage.scss'
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
import searchIcon from '../../Assets/Images/search-icon.svg';
import { useNavigate } from 'react-router-dom';
import { deleteTaskById } from '../../APICalls/tasks';
import { LogoutUser } from '../../APICalls/users';
import { jwtDecode } from 'jwt-decode';
import UserContext from '../../Context/UserContext';
import pencilIcon from '../../Assets/Images/pencil.png';
import deleteIcon from '../../Assets/Images/delete.png';
import { retrieveAllTasksByUserId } from '../../APICalls/tasks';
const HomePage = () => {
    const navigate = useNavigate();
    const {user, setUser} = useContext(UserContext);
    const [allTasks, setAllTasks] = useState([]);
    const [typingTimeout, setTypingTimeout] = useState(null);
    const [searchQueryFilter, setSearchQueryFilter] = useState('');
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [selectedFilters, setSelectedFilters] = useState({
        selectedTaskPrioritiesSet: new Set(),
        selectedTaskStatusesSet: new Set(),
        selectedTaskDeadlineSet: new Set(),
        sortingFilter: null,
    });

    const taskStatus = ['To Do', 'Finished', 'Under Review', 'In Progress', ];
    const taskStatusMap = {
        'to-do': 'To Do',
        'finished': 'Finished',
        'under-review': 'Under Review',
        'in-progress': 'In Progress'
    };
    const taskPriorities = [
        'Low',
        'Medium',
        'Urgent'
    ];
    const taskPrioritiesMap = {
        'low': 'Low',
        'medium': 'Medium',
        'urgent': 'Urgent'
    }
    const taskDeadlines = [
        'Overdue',
        'Today',
        'This Week',
        'This Month',
        'Upcoming'
    ]
    const taskSorting = [
        'Last Updated',
        'Recently Updated',
        'Sort by Title (A-Z)',
        'Sort by Title (Z-A)'
    ]
    // Call the apply filter method whenever there's a change in the state of the selectedFilters
    useEffect(() => 
    {
        applyTaskFilter(selectedFilters, searchQueryFilter);
    }, [selectedFilters, searchQueryFilter])

    useEffect(() => {
        const fetchTasks = async () => {
        try {
            const allTasks = await retrieveAllTasksByUserId(user.userId);
 
            setAllTasks(allTasks.tasks);
            setFilteredTasks(allTasks.tasks);
        } catch (err) {
            console.error('Failed to fetch tasks:', err.message);
        }
        };
        fetchTasks();
    }, [user.userId]);
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
    function parseDate(dateString) {
        const [day, month, year] = dateString.split('-').map(Number);
        return new Date(year, month - 1, day);
    }
    const renderTaskList = (task, index) => {
        const deadline = parseDate(task.deadline);
        const lastUpdated = new Date(task.updatedAt);
        const currTime = new Date();
        const timeDiff = (deadline - currTime);

        const statusIndicators = new Map();
        const generateDeadlineTags = () =>  
        {
            const daysUntilDue = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
            const isToday = deadline.toDateString() === currTime.toDateString();

            if (daysUntilDue < 0)
            {
                statusIndicators.set('overdue', 'Overdue');
            }
            else{
                if (isToday)
                {
                    statusIndicators.set('due-today', 'Due Today');
                }
                else if (daysUntilDue <= 3)
                {
                    statusIndicators.set('due-soon', 'Due Soon');
                    if (daysUntilDue === 1)
                    {
                        statusIndicators.set('days-left', `${daysUntilDue} day left`);
                    }
                    else statusIndicators.set('days-left', `${daysUntilDue} days left`);
                }
                else if (daysUntilDue <= 7)
                {
                    statusIndicators.set('due-this-week', 'Due This Week');
                }
                else if (deadline.getMonth() === currTime.getMonth())
                {
                    statusIndicators.set('due-this-month', 'Due This Month');
                }
                else statusIndicators.set('upcoming', 'Upcoming');
            }
        }   
        const generateUpdatedTags = () => 
        {   
            const updatedTimeDiff = (currTime - lastUpdated);
            const daysAfterLastUpdated = Math.ceil(updatedTimeDiff / (1000 * 60 * 60 * 24));
            const isToday = deadline.toDateString() === currTime.toDateString();

            if (daysAfterLastUpdated <= 3)
            {
                statusIndicators.set('updated-recently', 'Updated Recently');
            }
        }
        generateDeadlineTags();
        generateUpdatedTags();
        return (
            <div className="task-card" key={index}>
                    <div className="task-content">
                        <div className="task-header">
                            <h2 className="task-title">{task.title}</h2>
                            <div className="tags">
                                <span className={`tag task-card-priority ${task.priority}`}>{task.priority}</span>
                                <span className={`tag task-card-status ${task.status}`}>{task.status}</span>
                                {
                                    Array.from(statusIndicators.keys()).map((key) => 
                                    {
                                        return (
                                            <span  key={key} className={`tag ${key}`}>{statusIndicators.get(key)}</span>
                                        )
                                    })
                                }
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

    const handleSearchChange = (e) => {
        if (typingTimeout)
        {
            clearTimeout(typingTimeout);
        }
        const searchQueryFilter = e.target.value;
        setSearchQueryFilter(searchQueryFilter);
        setTypingTimeout(
            setTimeout(() => {
                applyTaskFilter(searchQueryFilter);
            }, 500)
        );
    }

    const handleFilterChange = (e, filterType, value) => 
    {
        setSelectedFilters((prevFilters) => {
            const newFilters = {...prevFilters};
            if (filterType.trim() === 'sortingFilter')
            {   
                if (newFilters.sortingFilter === value)
                {
                    newFilters.sortingFilter = null;
                    e.target.classList.remove('clickedSortFilter');
                }
                else 
                {
                    document.querySelectorAll('.clickedSortFilter').forEach((el) => {
                        el.classList.remove('clickedSortFilter');
                    });
                    newFilters.sortingFilter = value;
                    e.target.classList.add('clickedSortFilter');
                }
            }
            else{
                if (newFilters[filterType].has(value)) {
                    newFilters[filterType].delete(value);
                    if (filterType.trim() === 'selectedTaskPrioritiesSet') e.target.classList.remove('clickedPriorityFilter');
                    else if (filterType.trim() === 'selectedTaskStatusesSet') e.target.classList.remove('clickedStatusFilter');
                    else if (filterType.trim() === 'selectedTaskDeadlineSet') e.target.classList.remove('clickedDueDateFilter');
                }
                else {
                    newFilters[filterType].add(value);
                    if (filterType.trim() === 'selectedTaskPrioritiesSet') e.target.classList.add('clickedPriorityFilter');
                    else if (filterType.trim() === 'selectedTaskStatusesSet') e.target.classList.add('clickedStatusFilter');
                    else if (filterType.trim() === 'selectedTaskDeadlineSet') e.target.classList.add('clickedDueDateFilter');
                }
            }
            return newFilters;
        })
    }

    const applyTaskFilter = (selectedFilters, searchQueryFilter) => {
        let filteredTasks = allTasks;
        // Search filter logic
        if (searchQueryFilter)
        {   
            filteredTasks = allTasks.filter((task) => {
                const taskTitle = task.title.toLowerCase();
                const taskDescription = task.description.toLowerCase();
    
                return (
                    taskTitle.includes(searchQueryFilter.toLowerCase()) ||
                    taskDescription.includes(searchQueryFilter.toLowerCase())
                )
            });
        }

        // Filter tasks based on due date tags
        if (selectedFilters.selectedTaskDeadlineSet?.size > 0)
        {
            filteredTasks = filteredTasks.filter((task) => 
            {
                const taskDeadline = parseDate(task.deadline);
                const currentDate = new Date();
                const daysUntilDue = Math.ceil((taskDeadline - currentDate) / (1000 * 60 * 60 * 24));
                const isToday = taskDeadline.toDateString() === currentDate.toDateString();

                for (let deadlineFilter of selectedFilters.selectedTaskDeadlineSet)
                {
                    if (deadlineFilter === 'Overdue' && daysUntilDue < 0) return true;
                    else if (deadlineFilter === 'Today' && isToday) return true;
                    else if (deadlineFilter === 'This Week' && (daysUntilDue <= 7 && daysUntilDue >= 1)) return true;
                    else if (deadlineFilter === 'This Month' && taskDeadline.getMonth() === currentDate.getMonth()) return true;
                    else if (deadlineFilter ===  'Upcoming')
                    {
                        return true;
                    }
                }
            })
        }

        // Filter tasks based on priority
        if (selectedFilters.selectedTaskPrioritiesSet?.size > 0)
        {
            filteredTasks = filteredTasks.filter((task) => 
            {
                const taskPriorityEnum = task.priority;
                const priorityString = taskPrioritiesMap[taskPriorityEnum];
                return selectedFilters.selectedTaskPrioritiesSet.has(priorityString);
            })
        }

        // Filter tasks based on status
        if (selectedFilters.selectedTaskStatusesSet?.size > 0)
        {
            filteredTasks = filteredTasks.filter((task) => 
            {
                const taskStatusEnum = task.status;
                const taskStatusString = taskStatusMap[taskStatusEnum];
                return selectedFilters.selectedTaskStatusesSet.has(taskStatusString);
            })
        }

        // Sort tasks based on sorting filters
        const taskSortingFilter = selectedFilters.sortingFilter;
        switch(taskSortingFilter)
        {   
            case 'Last Updated':
                filteredTasks = [...filteredTasks].sort((a, b) => 
                {
                    return new Date(b.updatedAt) - new Date(a.updatedAt);
                })
                break;

            case 'Sort by Title (A-Z)':
                filteredTasks = [...filteredTasks].sort((a, b) => a.title.localeCompare(b.title));
                break;
            
            case 'Sort by Title (Z-A)':
                filteredTasks = [...filteredTasks].sort((a, b) => b.title.localeCompare(a.title));
                break;

            default:
                break;
        }
        setFilteredTasks(filteredTasks);
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
                <input type="text" 
                placeholder='Search tasks by title or description...' 
                onChange={(e) => setSearchQueryFilter(e.target.value)}
                value={searchQueryFilter}
                />
                <button className="create-new-btn" onClick={handleAddNewTaskClick}>Create new <img src={createIcon} alt="" /></button>
            </div>
            <div className="task-list">
                <div className="apply-filter-container">
                    <div className="filter-by-priority">
                        <h2>Priority</h2>
                        <div className="priorities-tags">
                        {
                            taskPriorities.map((taskPriority, index) => (
                                <button 
                                key={index}
                                onClick={(e) => handleFilterChange(e, 'selectedTaskPrioritiesSet', taskPriority)}
                                >{taskPriority}</button>
                            ))
                        }
                        </div>
                    </div>
                    <div className="filter-by-status">
                        <h2>Task Status</h2>
                        <div className="status-tags">
                        {
                            taskStatus.map((taskStatus, index) => (
                                <button 
                                key={index}
                                onClick={(e) => handleFilterChange(e, 'selectedTaskStatusesSet', taskStatus)}
                                >{taskStatus}</button>
                            ))
                        }
                        </div>
                    </div>
                    <div className="filter-by-due-date">
                        <h2>Deadline</h2>
                        <div className="due-date-tags">
                        {
                            taskDeadlines.map((taskDueDate, index) => (
                                <button 
                                key={index}
                                onClick={(e) => handleFilterChange(e, 'selectedTaskDeadlineSet', taskDueDate)}
                                >{taskDueDate}</button>
                            ))
                        }
                        </div>
                    </div>
                    <div className="task-sorting">
                        <h2>Sort Tasks</h2>
                        <div className="sort-tags">
                        {
                            taskSorting.map((taskSortFilter, index) => (
                                <button 
                                key={index}
                                onClick={(e) => handleFilterChange(e, 'sortingFilter', taskSortFilter)}
                                >{taskSortFilter}</button>
                            ))
                        }
                        </div>
                    </div>
                </div>
                <div className="all-task-cards">
                    {   filteredTasks.length > 0 ? (
                        filteredTasks.map((task, index) => renderTaskList(task, index))
                        ) : (
                            <p>No tasks found matching your filters.</p>
                        )
                    }
                </div>
            </div>
        </div>
    </div>
    )
}
export default HomePage;