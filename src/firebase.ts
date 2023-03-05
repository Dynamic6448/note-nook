import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase, onValue, push, ref, remove, set } from 'firebase/database';

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

const getDateString = (date: Date) => {
    const hour = date.getHours() > 12 ? date.getHours() - 12 : date.getHours() === 0 ? 12 : date.getHours();
    const minute = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
    const ampm = date.getHours() >= 12 ? 'pm' : 'am';
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()} at ${hour}:${minute}${ampm}`;
};

export const refNotes = (path?: string) => {
    return ref(db, `users/${auth.currentUser?.uid}/notes${path ? `/${path}` : ''}`);
};

export const createNote = (title: string, note: string) => {
    push(refNotes(), {
        title,
        note,
        dateCreated: getDateString(new Date()),
    });
};

export const getNoteById = (id: string) => {
    let foundNote: any = null;

    onValue(refNotes(), (snapshot) => {
        const data = snapshot.val();

        if (!snapshot.exists()) return;

        Object.entries(data).map((note: any) => {
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
        dateUpdated: getDateString(new Date()),
    });
};

export const deleteNote = (id: string) => {
    remove(refNotes(id));
};

let currentEditingNoteId: string = '';

export const setCurrentEditingNoteId = (id: string) => {
    currentEditingNoteId = id;
};

export const getCurrentEditingNote = () => {
    return getNoteById(currentEditingNoteId);
};

export interface NoteType {
    id: string;
    title: string;
    note: string;
    dateCreated: string;
    dateUpdated: string | undefined;
}
