import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase, onValue, push, ref, remove, set } from 'firebase/database';

//#region Firebase Config
const app = initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
});

export const auth = getAuth(app);
export const db = getDatabase(app);
export default app;
//#endregion

const getDate = (date: string, time: string) => {
    const [month, day, year] = date.split('/');
    const [hours, minutes] = time.split(':');
    return new Date(+year, +month - 1, +day, +hours, +minutes.slice(0, 2), 0, 0);
};
export const dateEquals = (date1: Date, date2: Date) => {
    return date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth() && date1.getDate() === date2.getDate();
};

const getTimeString = (date: Date) => {
    return `${date.getHours() % 12 || 12}:${date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()}${date.getHours() < 12 ? 'am' : 'pm'}`;
};
const getDateString = (date: Date) => {
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
};

const getNoteDateString = (date: Date) => {
    return `${getDateString(date)} at ${getTimeString(date)}`;
};

// #region Notes
export const refNotes = (path?: string) => {
    return ref(db, `users/${auth.currentUser?.uid}/notes${path ? `/${path}` : ''}`);
};
export const createNote = (title: string, note: string) => {
    push(refNotes(), {
        title,
        note,
        dateCreated: getNoteDateString(new Date()),
    });
};
export const getNoteById: (id: string) => NoteType = (id: string) => {
    let foundNote: any = null;

    onValue(refNotes(), (snapshot) => {
        const data = snapshot.val();

        if (!snapshot.exists()) return;

        Object.entries(data).forEach((note: any) => {
            if (note[0] === id) {
                foundNote = {
                    id: note[0],
                    title: note[1].title,
                    note: note[1].note,
                    dateCreated: note[1].dateCreated,
                    dateUpdated: note[1].dateUpdated,
                };
            }
        });
    });

    return foundNote;
};
export const setNoteById = (id: string, title: string, note: string) => {
    const dateCreated = getNoteById(id).dateCreated;

    set(refNotes(id), {
        title,
        note,
        dateCreated,
        dateUpdated: getNoteDateString(new Date()),
    });
};
export const deleteNote = (id: string) => {
    remove(refNotes(id));
};

let currentEditingNoteId: string = '';
export const setCurrentEditingNoteId = (id: string) => {
    currentEditingNoteId = id;
};
export const getCurrentEditingNote: () => NoteType = () => {
    const note = getNoteById(currentEditingNoteId);
    return note || ({} as NoteType);
};
// #endregion

//#region Calendar
export const refCalendarEvents = (path?: string) => {
    return ref(db, `users/${auth.currentUser?.uid}/calendar${path ? `/${path}` : ''}`);
};
export const createCalendarEvent = (title: string, date: Date) => {
    push(refCalendarEvents(), {
        title,
        date: getDateString(date),
        time: getTimeString(date),
    });
};
export const getAllCalendarEvents: () => CalendarEventType[] = () => {
    const events: CalendarEventType[] = [];

    onValue(refCalendarEvents(), (snapshot) => {
        const data = snapshot.val();

        if (!snapshot.exists()) return;

        Object.entries(data).forEach((event: any) => {
            const date = getDate(event[1].date, event[1].time);

            events.push({
                id: event[0],
                title: event[1].title,
                date: getDateString(date),
                time: getTimeString(date),
            });
        });
    });

    return events;
};
export const getCalendarEventById: (id: string) => CalendarEventType = (id: string) => {
    let foundEvent: any = null;

    onValue(refCalendarEvents(), (snapshot) => {
        const data = snapshot.val();

        if (!snapshot.exists()) return;

        Object.entries(data).forEach((event: any) => {
            if (event[0] === id) {
                const date = getDate(event[1].date, event[1].time);

                foundEvent = {
                    id: event[0],
                    title: event[1].title,
                    date: getDateString(date),
                    time: getTimeString(date),
                };
            }
        });
    });

    return foundEvent;
};
export const getCalendarEventsByDate: (date: Date) => CalendarEventType[] = (date: Date) => {
    const events: CalendarEventType[] = [];

    onValue(refCalendarEvents(), (snapshot) => {
        const data = snapshot.val();

        if (!snapshot.exists()) return;

        Object.entries(data).forEach((event: any) => {
            const eventDate = getDate(event[1].date, event[1].time);

            if (dateEquals(date, eventDate)) {
                events.push({
                    id: event[0],
                    title: event[1].title,
                    date: getDateString(eventDate),
                    time: getTimeString(eventDate),
                });
            }
        });
    });

    return events;
};
export const setCalendarEventById = (id: string, title: string, date: Date) => {
    set(refCalendarEvents(id), {
        title,
        date: getDateString(date),
        time: getTimeString(date),
    });
};
export const deleteCalendarEvent = (id: string) => {
    remove(refCalendarEvents(id));
};

let currentEditingCalendarEventId: string = '';
export const setCurrentEditingCalendarEventId = (id: string) => {
    currentEditingCalendarEventId = id;
};
export const getCurrentEditingCalendarEvent: () => CalendarEventType = () => {
    const event = getCalendarEventById(currentEditingCalendarEventId);
    return event || ({} as CalendarEventType);
};
//#endregion

//#region Type Interfaces
export interface NoteType {
    id: string;
    title: string;
    note: string;
    dateCreated: string;
    dateUpdated: string | undefined;
}
export interface CalendarEventType {
    id: string;
    title: string;
    date: string;
    time: string;
}
//#endregion
