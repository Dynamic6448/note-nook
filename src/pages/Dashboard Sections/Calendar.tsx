import React, { useEffect, useState } from 'react';
import Page from '..';
import { Button } from '../../components/Button';
import { Modal } from '../../components/Modal';

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

    const [showCreateEventModal, setShowCreateEventModal] = useState(false);
    const [createEventDate, setCreateEventDate] = useState(today);

    const openCreateEventModal = (date: Date) => {
        setCreateEventDate(date);
        setShowCreateEventModal(true);
    };
    const closeCreateEventModal = () => {
        setShowCreateEventModal(false);
    };

    return (
        <Page>
            <div className='pb-2'>
                <p className='text-4xl font-bold pb-2'>{`${getMonth(selectedMonth)} ${selectedMonth.getFullYear()}`}</p>
                <div className='w-full flex flex-row gap-4'>
                    <Button
                        className='bg-violet-600 hover:bg-violet-700 text-[1rem] px-2'
                        onClick={() => setSelectedMonth(new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() - 1, 1))}
                    >
                        Prev
                    </Button>
                    <Button
                        className='bg-violet-600 hover:bg-violet-700 text-[1rem] px-2'
                        onClick={() => setSelectedMonth(new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() + 1, 1))}
                    >
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
                                        <td className='w-[13.7rem]'>
                                            <CalendarDay date={day} subtle={day.getMonth() !== selectedMonth.getMonth()} handleClickAdd={() => openCreateEventModal(day)} />
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            <CreateCalendarEventModal show={showCreateEventModal} handleClose={closeCreateEventModal} date={createEventDate} />
        </Page>
    );
};
const CalendarDay: React.FC<{ date: Date; subtle?: boolean; handleClickAdd: () => any }> = ({ date, subtle, handleClickAdd }) => {
    const [isToday, setIsToday] = useState(false);

    useEffect(() => {
        const today = new Date();
        setIsToday(date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear());
    }, [date]);

    return (
        <div
            className={`w-full h-[8.7rem] border-solid border-2 rounded-md ${
                subtle ? `${isToday ? 'border-violet-200 bg-violet-50' : 'border-gray-100'} text-gray-400` : `${isToday ? 'border-violet-400 bg-violet-100' : 'border-gray-300'}`
            }`}
        >
            <div className='flex flex-row justify-between px-1 py-1'>
                <p className='text-xl font-bold'>{date.getDate()}</p>
                <div className=''>
                    <Button className={`${subtle ? 'bg-blue-100 hover:bg-blue-200' : 'bg-blue-300 hover:bg-blue-400'} text-lg px-2 py-0`} onClick={handleClickAdd}>
                        +
                    </Button>
                </div>
            </div>
            <div className='flex flex-col gap-1 text-sm px-1 pb-1'>
                <div className={`flex justify-between ${subtle ? 'border-blue-200' : 'border-blue-400'} border-2 rounded-md px-1`}>
                    <p>Example Event</p>
                    <p>12:00am</p>
                </div>
            </div>
        </div>
    );
};
const CreateCalendarEventModal: React.FC<{ show: boolean; handleClose: () => any; date: Date }> = ({ show, handleClose, date }) => {
    const [title, setTitle] = useState('');
    const [dateTime, setDateTime] = useState(date);

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    return (
        <Modal title={`Create Event - ${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`} show={show}>
            <div className='mb-6'>
                <input type='text' placeholder='Title' className='w-full p-2 border-2 border-gray-300 rounded-lg' onChange={handleTitleChange} />
            </div>
            <div className='flex flex-row w-full items-center justify-between'>
                <Button className='bg-slate-600 hover:bg-slate-700 text-[1rem]' onClick={handleClose}>
                    Cancel
                </Button>
                <Button className='bg-blue-600 hover:bg-blue-700 text-[1rem]' onClick={() => console.log('created event')}>
                    Create
                </Button>
            </div>
        </Modal>
    );
};
export default Calendar;
