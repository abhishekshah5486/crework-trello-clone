import React, {useRef} from "react";
import './DateComponent.css';

const DateComponent = ({deadline, setDeadline, setIsDateValid}) => {
    const errorRef = useRef();
    const handleDateChange = (e) => {
        const newValue = e.target.value;
        setDeadline(newValue);
        validateDateFormat(newValue);
    }
    const validateDateFormat = (date) => {
        const datePattern = /^([0-2][0-9]|(3)[0-1])-(0[1-9]|1[0-2])-\d{4}$/;
        if (datePattern.test(date)) {
            errorRef.current.style.display = 'none';
            setIsDateValid(true);
            
        } else {
            errorRef.current.style.display = 'block';
        }
    }
    return (
        <div className="date-picker">
            <input 
            type="text" 
            className="deadline"
            placeholder="DD-MM-YYYY"
            onChange={handleDateChange}
            value={deadline}
            />
            <p className="error" ref={errorRef}>Invalid date format.</p>
        </div>
    )
}
export default DateComponent;