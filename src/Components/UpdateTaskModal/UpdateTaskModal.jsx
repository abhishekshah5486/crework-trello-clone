import React, { useEffect, useRef, useState, useContext } from 'react';
import './UpdateTaskModal.css';
import closeBtn from '../../Assets/Images/close-button.svg';
import expandIcon from '../../Assets/Images/expand-button.svg';
import shareIcon from '../../Assets/Images/share-icon.svg';
import starIcon from '../../Assets/Images/star-icon.svg';
import statusIcon from '../../Assets/Images/status-icon.svg';
import priorityIcon from '../../Assets/Images/priority-icon.svg';
import dueDateIcon from '../../Assets/Images/calender-icon.svg';
import descriptionIcom from '../../Assets/Images/description-icon.svg';
import { updateTaskById, retrieveTaskById } from '../../APICalls/tasks';
import DateComponent from '../DateComponent';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import UserContext from '../../Context/UserContext';

const UpdateTaskModal = () => {
    const location = useLocation();
    const taskId = location.state?.taskId;
    const taskTitleTextAreaRef = useRef(null);
    const taskDescriptionTextAreaRef = useRef(null);
    const overlayRef = useRef(null);
    const modalRef = useRef(null);
    const updateTaskBtnRef = useRef(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('');
    const [priority, setPriority] = useState('');
    const [deadline, setDeadline] = useState('');
    const [isDateValid, setIsDateValid] = useState(false);
    const [descriptionCharCount, setDescriptionCharCount] = useState(0);
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    
    // Retrieve task details by taskId from backend server
    useEffect(() => {
        console.log(taskId);
        const fetchTaskDetails = async () => {
            try {
                if (taskId) {
                    const response = await retrieveTaskById(taskId);
                    if (response.success)
                    {
                        const taskDetails = response.task;
                        setTitle(taskDetails.title);
                        setDescription(taskDetails.description);
                        setStatus(taskDetails.status);
                        setPriority(taskDetails.priority);
                        setDeadline(taskDetails.deadline);
                        setDescriptionCharCount(taskDetails.description.length);
                        setIsDateValid(true);
                    }
                }
            } catch (error) {
                console.error('Failed to fetch task details:', error);
            }
        };

        fetchTaskDetails();
    }, [taskId]);

    const isUpdateButtonDisabled = !(title && status && priority && isDateValid && descriptionCharCount <= 300);
    useEffect(() => {
        if (updateTaskBtnRef.current) {
            if (!isUpdateButtonDisabled) {
                updateTaskBtnRef.current.classList.remove('disabled');
            } else {
                updateTaskBtnRef.current.classList.add('disabled');
            }
        }
    }, [title, status, priority, isDateValid, descriptionCharCount]);

    const handleStatusChange = (e) => {
        setStatus(e.target.value);
    }
    const handlePriorityChange = (e) => {
        setPriority(e.target.value);
    }
    const handleSubmit = async () => {
        if (isUpdateButtonDisabled){
            return;
        }
        const taskModalData = {
           title,
           status,
           priority,
           deadline,
           description,
        }
        console.log(taskModalData);
        try {
            const response = await updateTaskById(taskId, taskModalData);
            console.log(response);
            if (response.success){
                alert("Task updated successfully");
                navigate('/home');
            }
        } catch (err) {
            console.log(err);
        }
    }
    const handleCancel = () => {
        navigate('/home');
    }
    const handleInput = () => {
        const taskTitleTextArea = taskTitleTextAreaRef.current;
        const taskDescriptionTextArea = taskDescriptionTextAreaRef.current;
        
        if (taskTitleTextArea) {
        taskTitleTextArea.style.height = 'auto';
        taskTitleTextArea.style.height = taskTitleTextArea.scrollHeight + 'px';
        }
        
        if (taskDescriptionTextArea) {
        taskDescriptionTextArea.style.height = 'auto';
        taskDescriptionTextArea.style.height = taskDescriptionTextArea.scrollHeight + 'px';
        }
    };
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
        event.preventDefault();
        }
    };
    useEffect(() => {
        const taskTitleTextArea = taskTitleTextAreaRef.current;
        const taskDescriptionTextArea = taskDescriptionTextAreaRef.current;
        handleInput();
        if (taskTitleTextArea) {
            taskTitleTextArea.addEventListener('input', handleInput);
            taskTitleTextArea.addEventListener('keydown', handleKeyDown);
        }
        if (taskDescriptionTextArea) {
            taskDescriptionTextArea.addEventListener('input', handleInput);
            taskDescriptionTextArea.addEventListener('keydown', handleKeyDown);
        }
        return () => {
            if (taskTitleTextArea) {
                taskTitleTextArea.removeEventListener('input', handleInput);
                taskTitleTextArea.removeEventListener('keydown', handleKeyDown);
            }
            if (taskDescriptionTextArea) {
                taskDescriptionTextArea.removeEventListener('input', handleInput);
                taskDescriptionTextArea.removeEventListener('keydown', handleKeyDown);
            }
        }
    }, [])
    return (
        <div className="overlay" ref={overlayRef}>
            <div className='task-modal'  ref={modalRef}>
                <div className="task-modal-header">
                    <div className="left-header-items">
                        <img src={closeBtn} alt="" />
                        <img src={expandIcon} alt="" />
                    </div>
                    <div className="right-header-items task-actions">
                        <button>Share <img src={shareIcon} alt="" /></button>
                        <button>Favorite <img src={starIcon} alt="" /></button>
                    </div>
                </div>
                <div className="task-modal-main">
                    <textarea 
                    className="task-title" 
                    placeholder="Title"
                    ref={taskTitleTextAreaRef}
                    rows={1}
                    onChange={(e) => setTitle(e.target.value)}
                    maxLength={100}
                    value={title}
                    ></textarea>
                    <div className="task-properties">
                        <div className="label-groups">
                            <div className="property-label-group">
                                <img src={statusIcon} alt="" className='property-icon'/>
                                <h2 className='property-label'>Status</h2>
                            </div>
                            <div className="property-label-group">
                                <img src={priorityIcon} alt="" className='property-icon'/>
                                <h2 className='property-label'>Priority</h2>
                            </div>
                            <div className="property-label-group">
                                <img src={dueDateIcon} alt="" className='property-icon'/>
                                <h2 className='property-label'>Deadline</h2>
                            </div>
                            <div className="property-label-group">
                                <img src={descriptionIcom} alt="" className='property-icon'/>
                                <h2 className='property-label'>Description</h2>
                            </div>
                        </div>
                        <div className="property-values">
                            <div className="property-value status">
                                <select className="dropdown-content display-hidden custom-select" 
                                defaultValue="not-selected"
                                onChange={handleStatusChange}
                                value={status}
                                >   
                                    <option value="not-selected" disabled className="placeholder-option">
                                        Not Selected
                                    </option>
                                    <option value="to-do" className="option to-do">
                                        To do
                                    </option>
                                    <option value="in-progress" className="option in-progress">
                                        In progress
                                    </option>
                                    <option value="under-review" className="option under-review">
                                        Under review
                                    </option>
                                    <option value="finished" className="option finished">
                                        Finshed
                                    </option>
                                </select>
                            </div>
                            <div className="property-value priority">
                                <select className="dropdown-content display-hidden custom-select" 
                                defaultValue="not-selected"
                                onChange={handlePriorityChange}
                                value={priority}
                                >       
                                        <option value="not-selected" disabled className="placeholder-option">
                                            Not Selected
                                        </option>
                                        <option value="low" className="option low">
                                            Low
                                        </option>
                                        <option value="medium" className="option medium">
                                            Medium
                                        </option>
                                        <option value="urgent" className="option urgent">
                                            Urgent
                                        </option>
                                </select>
                            </div>
                            <div className="property-value deadline">
                                <DateComponent
                                deadline = {deadline}
                                setDeadline = {setDeadline}
                                setIsDateValid = {setIsDateValid}
                                />

                            </div>
                            <div className="property-value description">
                                <textarea 
                                className="task-description" 
                                placeholder="Add a more detailed description..."
                                ref={taskDescriptionTextAreaRef}
                                rows={2}
                                onChange={(e) => {
                                    setDescription(e.target.value);
                                    setDescriptionCharCount(e.target.value.length);
                                }}
                                // maxLength={300}
                                value={description}
                                ></textarea>
                                <div className="character-count">
                                    {descriptionCharCount > 300 && <p className="warning">Limit exceeded!</p>}
                                    <p className='description-char-count'>{descriptionCharCount}/300</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="add-custom-property">
                        <svg className='add-custom-property-icon' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 12H12M12 12H18M12 12V6M12 12V18" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <h2>Add custom property</h2>
                    </div>
                    <div className="update-task-actions">
                        <button 
                        className='cancel-task' 
                        onClick={handleCancel}
                        >
                            Cancel
                        </button>
                        <button 
                        className='update-task disabled' 
                        onClick={handleSubmit}
                        ref={updateTaskBtnRef}
                        >
                            Update
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UpdateTaskModal;
