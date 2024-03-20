import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const URL = process.env.REACT_APP_URL;

const DatePickerComponent = () => {
    const [startDate, setStartDate] = useState();
    const [avgChoosed, setavgChoosed] = useState();
    let minDate = new Date('2023-01-01')
    let maxData = new Date()
    const handleChange = async (selectedDate) => {
        let month = selectedDate.getMonth() + 1;
        month < 10 ? month = '0' + month : month = month + 1;
        let year = selectedDate.getFullYear();
        setStartDate(selectedDate)

        const url = `${URL}/dollarValue/${month}-${year}`

        try {
            await fetch(url)
                .then((res) => res.json())
                .then((data) => setavgChoosed(data.average));

        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div>

            <h3>Get values for a specific month <p > {avgChoosed}</p></h3>
            <DatePicker
                selected={startDate}
                onChange={handleChange}
                dateFormat="MM/yyyy"
                showMonthYearPicker
                minDate={minDate}
                maxDate={maxData}
            /></div>
    );
};

export default DatePickerComponent;
