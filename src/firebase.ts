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

export const refNotes = (path?: string) => {
    return ref(db, `users/${auth.currentUser?.uid}/notes${path ? `/${path}` : ''}`);
};

export const createNote = (title: string, note: string) => {
    const dateCreated = new Date();
    const dateCreatedString = `${dateCreated.getMonth()}/${dateCreated.getDate()}/${dateCreated.getFullYear()}`;

    const pushed = push(refNotes(), {
        title,
        note,
        dateCreated: dateCreatedString,
    });

    console.log(pushed);
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
    const dateUpdated = new Date();
    const dateUpdatedString = `${dateUpdated.getMonth()}/${dateUpdated.getDate()}/${dateUpdated.getFullYear()}`;

    set(refNotes(id), {
        title,
        note,
        dateCreated,
        dateUpdated: dateUpdatedString,
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
    dateCreated: Date;
    dateUpdated: Date;
}
