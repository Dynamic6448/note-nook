import React, { useState } from 'react';
import Page from '..';

const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month, 0).getDate();
};
const getMonthById = (id: number) => {
    switch (id) {
        case 0:
            return 'January';
        case 1:
            return 'February';
        case 2:
            return 'March';
        case 3:
            return 'April';
        case 4:
            return 'May';
        case 5:
            return 'June';
        case 6:
            return 'July';
        case 7:
            return 'August';
        case 8:
            return 'September';
        case 9:
            return 'October';
        case 10:
            return 'November';
        case 11:
            return 'December';
        default:
            return 'January';
    }
};
const getDayById = (id: number) => {
    switch (id) {
        case 0:
            return 'Sunday';
        case 1:
            return 'Monday';
        case 2:
            return 'Tuesday';
        case 3:
            return 'Wednesday';
        case 4:
            return 'Thursday';
        case 5:
            return 'Friday';
        case 6:
            return 'Saturday';
        default:
            return 'Sunday';
    }
};

const Calendar: React.FC = () => {
    const [today] = useState(new Date());

    return (
        <Page className='w-full'>
            {/* <p className='text-6xl font-bold'>{getMonthById(today.getMonth())}</p> */}
            <div className='w-full flex flex-row justify-between'>
                <div>Sunday</div>
                <div>Monday</div>
                <div>Tuesday</div>
                <div>Wednesday</div>
                <div>Thursday</div>
                <div>Friday</div>
                <div>Saturday</div>
            </div>
            <table className='w-full'>
                <thead className='w-full'>
                    <tr className='w-full flex flex-row justify-between'></tr>
                </thead>
                <tbody>
                    {/* {Array.from({ length: 6 }, (_, i) => (
                        <tr key={i}>
                            {Array.from({ length: 7 }, (_, j) => (
                                <td key={j}>
                                    {i === 0 && j < today.getDay() ? (
                                        <div className='text-gray-400'>{getDaysInMonth(today.getMonth(), today.getFullYear()) - (today.getDay() - j) + 1}</div>
                                    ) : (
                                        <div>
                                            {i === 0 && j === today.getDay() ? (
                                                <div className='text-blue-400'>{today.getDate()}</div>
                                            ) : (
                                                <div>{i === 0 ? getDaysInMonth(today.getMonth(), today.getFullYear()) - (today.getDay() - j) + 1 : i * 7 + j - today.getDay() + 1}</div>
                                            )}
                                        </div>
                                    )}
                                </td>
                            ))}
                        </tr>
                    ))} */}
                </tbody>
            </table>
        </Page>
    );
};

export default Calendar;
