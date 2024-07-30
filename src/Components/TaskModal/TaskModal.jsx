import React, { useEffect, useRef } from 'react';
import './TaskModal.css';
import closeBtn from '../../Assets/Images/close-button.svg';
import expandIcon from '../../Assets/Images/expand-button.svg';
import shareIcon from '../../Assets/Images/share-icon.svg';
import starIcon from '../../Assets/Images/star-icon.svg';
import statusIcon from '../../Assets/Images/status-icon.svg';
import priorityIcon from '../../Assets/Images/priority-icon.svg';
import dueDateIcon from '../../Assets/Images/calender-icon.svg';
import descriptionIcom from '../../Assets/Images/description-icon.svg';
import addIcon from '../../Assets/Images/add-icon.svg';
import dropdownIcon from '../../Assets/Images/dropdown-icon.svg';
import selectedOptionIcon from '../../Assets/Images/selectedOptionIcon.svg';
import QuillTextEditor from '../QuillTextEditor';

const TaskModal = () => {
  const textAreaRef = useRef(null);
  const handleInput = () => {
    const textarea = textAreaRef.current;
    textarea.style.height = 'auto'; // Reset height
    textarea.style.height = textarea.scrollHeight + 'px'; // Set new height based on scroll height
  };
  useEffect(() => {
    const textArea = textAreaRef.current;
    handleInput();
    textArea.addEventListener('input', handleInput);
    return () => {
        textArea.removeEventListener('input', handleInput);
    }
  }, [])
  return (
    <div className="overlay">
        <div className='task-modal'>
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
                ref={textAreaRef}
                rows={1}
                ></textarea>
                <div className="task-properties">
                    <div className="task-property-item">
                        <div className="property-label-group">
                            <img src={statusIcon} alt="" className='property-icon'/>
                            <h2 className='property-label'>Status</h2>
                        </div>
                        {/* <select name="" id="" className='property-value'>
                            <option value="" disabled selected>Not Selected</option>
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="urgent">Urgent</option>
                        </select> */}
                        <div className="property-value">
                            <button>Not selected <img src={dropdownIcon} alt="" /></button>
                            <div className="dropdown-content">
                                <div className="low">
                                    <img src={selectedOptionIcon} alt="" className='hidden'/>
                                    <p>Low</p>
                                </div>
                                <div className="medium">
                                    <div className="medium">
                                        <img src={selectedOptionIcon} alt=""/>
                                        <p>Medium</p>
                                    </div>
                                </div>
                                <div className="urgent">
                                    <div className="urgent">
                                        <img src={selectedOptionIcon} alt="" className='hidden'/>
                                        <p>Urgent</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="task-property-item">
                        <div className="property-label-group">
                                <img src={priorityIcon} alt="" className='property-icon'/>
                                <h2 className='property-label'>Priority</h2>
                        </div>
                        <div className="property-value">
                            {/* <button>Not selected <img src={dropdownIcon} alt="" /></button> */}
                            <input type='date' className='date-picker' placeholder=''/>
                            <div className="dropdown-content">
                                <div className="low">
                                    <img src={selectedOptionIcon} alt="" className='hidden'/>
                                    <p>Low</p>
                                </div>
                                <div className="medium">
                                    <div className="medium">
                                        <img src={selectedOptionIcon} alt=""/>
                                        <p>Medium</p>
                                    </div>
                                </div>
                                <div className="urgent">
                                    <div className="urgent">
                                        <img src={selectedOptionIcon} alt="" className='hidden'/>
                                        <p>Urgent</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="task-property-item">
                        <div className="property-label-group">
                                <img src={dueDateIcon} alt="" className='property-icon'/>
                                <h2 className='property-label'>Deadline</h2>
                        </div>
                    </div>
                    <div className="task-property-item description">
                        <div className="property-label-group">
                                <img src={descriptionIcom} alt="" className='property-icon'/>
                                <h2 className='property-label'>Description</h2>
                        </div>
                        <QuillTextEditor/>
                    </div>
                </div>
                <div className="add-custom-property">
                    <img src={addIcon} alt="" />
                    <h2>Add custom property</h2>
                </div>
            </div>
        </div>
    </div>
  )
}

export default TaskModal;
