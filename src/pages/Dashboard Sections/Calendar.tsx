import React, { useState } from 'react';
import Page from '..';

const getWeeksInMonth = (date: Date) => {
    const firstDay = new Date(date.setDate(1)).getDay();
    const totalDays = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    return Math.ceil((firstDay + totalDays) / 7);
};
const getDaysInWeek = (date: Date) => {
    const dayOfWeek = date.getDay();

    const datesOfWeek: Date[] = [];
    for (let i = dayOfWeek; i >= 0; i--) {
        const newDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - i);
        if (date.getMonth() + 1 === newDate.getMonth()) datesOfWeek.push(newDate);
    }
    for (let i = 1; i < 7 - dayOfWeek; i++) {
        const newDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() + i);
        if (date.getMonth() + 1 === newDate.getMonth()) datesOfWeek.push(newDate);
    }

    return datesOfWeek;
};
const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
};
const getMonth = (date: Date) => {
    switch (date.getMonth()) {
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
    console.log(getDaysInWeek(today));

    return (
        <Page className='w-full'>
            <p className='text-4xl font-bold pb-4'>{getMonth(today)}</p>
            <table className='text-xl'>
                <thead>
                    <tr>
                        {Array.from({ length: 7 }).map((_, i) => (
                            <th className='text-center'>{getDayById(i)}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {Array.from({ length: getWeeksInMonth(today) }).map((_, i) => {
                        console.log('outer');
                        return (
                            <tr>
                                {Array.from({ length: 7 }).map((_, j) => {
                                    console.log('inner');
                                    return (
                                        <td className='w-[219px]'>
                                            <CalendarDay date={i * 7 + j + 1} />
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
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
