import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const MyDatePickerComponent = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [avgChoosed, setavgChoosed] = useState();

    const handleChange = async (selectedDate) => {
        let month = selectedDate.getMonth() + 1;
        month < 10 ? month = '0' + month : month = month + 1;
        let year = selectedDate.getFullYear();
        setStartDate(selectedDate)
        try {
            await fetch(`http://localhost:8080/dollarValue/${month}-${year}`)
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
                selected={new Date()}
                onChange={handleChange}
                dateFormat="MM/yyyy"
                showMonthYearPicker
            /></div>
    );
};

export default MyDatePickerComponent;
