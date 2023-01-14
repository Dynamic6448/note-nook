import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import Page from '.';

const Dashboard: React.FC = () => {
    const [notes, setNotes] = useState([] as any);

    const notesCollection = collection(db, 'Notes');

    useEffect(() => {
        const getNotes = async () => {
            const data = await getDocs(notesCollection);
            setNotes(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
            console.log(notes);
        };

        getNotes();
    }, []);

    return (
        <Page>
            {notes.map((note) => (
                <Card key={note.id}>
                    <Card.Header className='text-center'>{note.Title}</Card.Header>
                    <Card.Body>{note.Note}</Card.Body>
                </Card>
            ))}
        </Page>
    );
};

export default Dashboard;
