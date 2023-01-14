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
            <div className='d-flex flex-row align-items-center justify-content-center m-4'>
                {notes.map((note) => (
                    <Card key={note.id} style={{ maxWidth: '400px' }}>
                        <Card.Header className='text-center'>{note.Title}</Card.Header>
                        <Card.Body>{note.Note}</Card.Body>
                    </Card>
                ))}
            </div>
        </Page>
    );
};

export default Dashboard;
