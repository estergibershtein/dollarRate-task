import React, { useState } from 'react';

const MonthScroll = () => {

    const [data, setData] = useState();

    const monthsInYear = Array.from({ length: 12 }, (_, i) => {
        const monthNumber = i + 1;
        return Intl.DateTimeFormat('en', { month: 'long' }).format(new Date(2024, monthNumber, 1));
    });
    const handleMonthClick = async (month) => {
        console.log(`Selected month: ${month}`);

        try {
            await fetch(`http://localhost:8080/dollarValue/${month}`)
                .then((res) => res.json())
                .then((data) => setData(data.average));

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <input color='black' type="text" defaultValue="select month" value={data} />

            <div style={{ overflowY: "scroll", height: "100px", border: "1px solid black" }}>

                <ul>
                    {monthsInYear.map((month, index) => {
                        return (
                            <li key={index} onClick={(e) => handleMonthClick(month)} style={{ cursor: "pointer", padding: "5px" }}>
                                {month}
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>

    );
};

export default MonthScroll;