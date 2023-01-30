import React, { useEffect, useState } from 'react';
import CreateNotePopup from '../components/CreateNotePopup';
import { db } from '../firebase';
import Page from '.';
import { Card, CardBody, CardHeader } from '../components/Card';
import { onValue } from 'firebase/database';

const Dashboard: React.FC = () => {
    const [notes, setNotes] = useState([] as any);
    const [numNotes, setNumNotes] = useState(0);
    const [showCreateNotePopup, setShowCreateNotePopup] = useState(false);

    //const notesCollection = collection(db, 'Notes');

    useEffect(() => {
        const getNotes = async () => {
            //let data = await getDocs(notesCollection);
            //setNotes(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };

        getNotes();
    }, [numNotes]);

    const handleShowPopup = () => {
        setShowCreateNotePopup(!showCreateNotePopup);

        setNumNotes(numNotes + 1);
    };

    const handleDeleteNote = async (id: string) => {
        //const data = await getDocs(notesCollection);
        //const doc = data.docs.find((d) => d.id === id);

        //if (!doc) return;

        //deleteDoc(doc.ref);

        setNumNotes(numNotes + 1);
    };

    return (
        <Page>
            <div className='flex flex-row flex-wrap mt-4'>
                {notes.map((note) => (
                    <Card key={note.id} className='mb-4 w-[400px]'>
                        <CardHeader className='text-center flex flex-row justify-between items-center'>
                            {note.Title}

                            <button className='bg-red' onClick={() => handleDeleteNote(note.id)}>
                                Delete
                            </button>
                        </CardHeader>
                        <CardBody>{note.Note}</CardBody>
                    </Card>
                ))}
            </div>

            {/* button to create a note */}
            <div className=''>
                <button className='p-3 bg-blue-500 rounded-full text-white' onClick={handleShowPopup}>
                    Create Note
                </button>
            </div>

            <CreateNotePopup show={showCreateNotePopup} handleClose={handleShowPopup} />
        </Page>
    );
};

export default Dashboard;
