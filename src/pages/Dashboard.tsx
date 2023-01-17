import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import Page from '.';
import CreateNotePopup from '../components/CreateNotePopup';

const Dashboard: React.FC = () => {
    const [notes, setNotes] = useState([] as any);
    const [showCreateNotePopup, setShowCreateNotePopup] = useState(false);

    const notesCollection = collection(db, 'Notes');

    useEffect(() => {
        const getNotes = async () => {
            let data = await getDocs(notesCollection);
            //filter data by most recent
            //data = data.sort((a, b) => b.data().createdAt - a.data().createdAt);
            setNotes(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
            console.log(notes);
        };

        getNotes();
    }, [notes]);

    const handleShowPopup = () => {
        setShowCreateNotePopup(!showCreateNotePopup);
    };

    return (
        <Page>
            <div className='d-flex flex-row mt-4'>
                {notes.map((note) => (
                    <Card key={note.id} style={{ maxWidth: '400px' }}>
                        <Card.Header className='text-center'>{note.Title}</Card.Header>
                        <Card.Body>{note.Note}</Card.Body>
                    </Card>
                ))}
            </div>

            {/* button to create a note */}
            <div className='absolute top-100'>
                <button className='btn btn-primary' onClick={handleShowPopup}>
                    Create Note
                </button>
            </div>

            <CreateNotePopup show={showCreateNotePopup} handleClose={handleShowPopup} />
        </Page>
    );
};

export default Dashboard;
