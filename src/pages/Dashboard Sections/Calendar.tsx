import React, { useEffect, useState } from 'react';
import Page from '..';
import { Button } from '../../components/Button';

const getWeeksInMonth = (date: Date) => {
    const firstDay = new Date(date.setDate(1)).getDay();
    const totalDays = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    return Math.ceil((firstDay + totalDays) / 7);
};
const getDaysInWeek = (date: Date) => {
    const dayOfWeek = date.getDay();

    const datesOfWeek: Date[] = [];
    for (let i = dayOfWeek; i >= 0; i--) {
        datesOfWeek.push(new Date(date.getFullYear(), date.getMonth(), date.getDate() - i));
    }
    for (let i = 1; i < 7 - dayOfWeek; i++) {
        datesOfWeek.push(new Date(date.getFullYear(), date.getMonth(), date.getDate() + i));
    }

    return datesOfWeek;
};
const isDateInMonth = (date: Date, month: number) => {
    return date.getMonth() === month;
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
    const today = new Date();
    const [selectedMonth, setSelectedMonth] = useState(today);

    return (
        <Page className='w-full'>
            <div className='pb-2'>
                <p className='text-4xl font-bold pb-2'>{`${getMonth(selectedMonth)} ${selectedMonth.getFullYear()}`}</p>
                <div className='w-full flex flex-row gap-4'>
                    <Button className='bg-blue-600 hover:bg-blue-700 text-lg' onClick={() => setSelectedMonth(new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() - 1, 1))}>
                        Prev
                    </Button>
                    <Button className='bg-blue-600 hover:bg-blue-700 text-lg' onClick={() => setSelectedMonth(new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() + 1, 1))}>
                        Next
                    </Button>
                </div>
            </div>

            <table className='text-xl'>
                <thead>
                    <tr>
                        {Array.from({ length: 7 }).map((_, i) => (
                            <th className='text-start'>{getDayById(i)}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {Array.from({ length: getWeeksInMonth(selectedMonth) }).map((_, i) => {
                        const daysInWeek = getDaysInWeek(new Date(selectedMonth.getFullYear(), selectedMonth.getMonth(), 1 + 7 * i));
                        return (
                            <tr>
                                {daysInWeek.map((day, j) => {
                                    return (
                                        <td className='min-w-[219px]'>
                                            <CalendarDay date={day} subtle={!isDateInMonth(day, selectedMonth.getMonth())} />
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
const CalendarDay: React.FC<{ date: Date; subtle?: boolean }> = ({ date, subtle }) => {
    const [isToday, setIsToday] = useState(false);

    useEffect(() => {
        const today = new Date();
        setIsToday(date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear());
    }, [date]);

    return (
        <div
            className={`w-full h-[140px] border-solid border-2 ${
                subtle ? `${isToday ? 'border-blue-200 bg-blue-50' : 'border-gray-100'} text-gray-400` : `${isToday ? 'border-blue-400 bg-blue-100' : 'border-gray-300'}`
            }`}
        >
            <p className='pl-1 text-xl font-bold'>{date.getDate()}</p>
        </div>
    );
};
export default Calendar;
