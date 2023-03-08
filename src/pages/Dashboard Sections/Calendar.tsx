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
            <p className='text-4xl font-bold pb-4'>{getMonthById(today.getMonth())}</p>
            <div className='flex flex-row text-xl font-bold'>
                {Array.from({ length: 7 }).map((_, i) => (
                    <div className='w-1/6 flex flex-col'>
                        {getDayById(i)}
                        <CalendarDay date={1} />
                        <CalendarDay date={2} />
                        <CalendarDay date={3} />
                        <CalendarDay date={4} />
                        <CalendarDay date={5} />
                    </div>
                ))}
            </div>
        </Page>
    );
};
const CalendarDay: React.FC<{ date: number; empty?: boolean }> = ({ date, empty }) => {
    return (
        <div className={`w-full h-[150px] border-solid border-2 ${empty ? 'border-transparent' : 'border-gray-200'}`}>
            {!empty && <p className='text-xl font-bold'>{date}</p>}
            <div></div>
        </div>
    );
};
export default Calendar;
