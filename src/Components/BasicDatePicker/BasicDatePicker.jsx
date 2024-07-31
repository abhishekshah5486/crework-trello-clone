import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

export default function BasicDatePicker({setDeadline}) {
    const handleDateChange = (e) => {
        setDeadline(e.target.value);
    }

    const currentDate = new Date;
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DatePicker']}>
            <DatePicker 
            defaultValue={dayjs(currentDate)}
            onChange={handleDateChange}
            value={dayjs.Dayjs}
            slotProps={{
                
            }}
            />
        </DemoContainer>
        </LocalizationProvider>
    );
}