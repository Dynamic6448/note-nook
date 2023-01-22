import React, { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { collection, getDocs, deleteDoc } from 'firebase/firestore';
import CreateNotePopup from '../components/CreateNotePopup';
import { db } from '../firebase';
import Page from '.';

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
        };

        getNotes();
    }, []);

    const handleShowPopup = () => {
        setShowCreateNotePopup(!showCreateNotePopup);
    };

    const handleDeleteNote = async (id: string) => {
        const data = await getDocs(notesCollection);
        const doc = data.docs.find((d) => d.id === id);

        if (!doc) return;

        deleteDoc(doc.ref);
    };

    return (
        <Page>
            <div className='d-flex flex-row mt-4' style={{ flexWrap: 'wrap' }}>
                {notes.map((note) => (
                    <Card key={note.id} className='mb-4' style={{ width: '400px' }}>
                        <Card.Header className='text-center d-flex flex-row justify-content-between align-items-center'>
                            {note.Title}

                            <Button variant='danger' onClick={() => handleDeleteNote(note.id)}>
                                Delete
                            </Button>
                        </Card.Header>
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
