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

// create note method
export const createNote = (title: string, note: string) => {
    push(ref(db, `users/${auth.currentUser?.uid}/notes`), {
        title,
        note,
    });
};

export const readNotes = () => {
    return ref(db, `users/${auth.currentUser?.uid}/notes`);
};

export const getNoteById: any = (id: string) => {
    let returnVal = null;

    onValue(readNotes(), (snapshot) => {
        const data = snapshot.val();

        if (!snapshot.exists()) return;

        Object.entries(data).map((note: any) => {
            if (note[0] === id) returnVal = note[1];
        });
    });

    return returnVal;
};

export const setNoteById = (id: string, title: string, note: string) => {
    set(ref(db, `users/${auth.currentUser?.uid}/notes/${id}`), {
        title,
        note,
    });
};

export const deleteNote = (id: string) => {
    remove(ref(db, `users/${auth.currentUser?.uid}/notes/${id}`));
};

let currentEditingNoteId: string = '';

export const setCurrentEditingNoteId = (id: string) => {
    currentEditingNoteId = id;
};

export const getCurrentEditingNoteId = () => {
    return currentEditingNoteId;
};
