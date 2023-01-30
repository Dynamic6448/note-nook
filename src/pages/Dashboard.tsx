import React, { useEffect, useState } from 'react';
import CreateNotePopup from '../components/CreateNotePopup';
import { deleteNote, readNotes } from '../firebase';
import Page from '.';
import { Card, CardBody, CardHeader } from '../components/Card';
import { onValue } from 'firebase/database';

const Dashboard: React.FC = () => {
    const [notes, setNotes] = useState([] as any);
    const [numNotes, setNumNotes] = useState(0);
    const [showCreateNotePopup, setShowCreateNotePopup] = useState(false);

    //const notesCollection = collection(db, 'Notes');

    useEffect(() => {
        onValue(readNotes(), (snapshot) => {
            const data = snapshot.val();

            if (!snapshot.exists()) return;

            const noteArr: any = [];

            Object.entries(data).map((note: any) => {
                noteArr.push(note);
            });

            setNotes(noteArr);
        });
    }, []);

    const handleShowPopup = () => {
        setShowCreateNotePopup(!showCreateNotePopup);

        setNumNotes(numNotes + 1);
    };

    return (
        <Page>
            <div className='flex flex-row flex-wrap mt-4'>
                {notes.map((note) => (
                    <Card key={note[0]} className='mb-4 w-[400px]'>
                        <CardHeader className='text-center flex flex-row justify-between items-center'>
                            {note[1].title}

                            <button
                                className='py-2 px-3 rounded-full bg-red-600 hover:bg-red-700 hover:shadow-md transition text-white text-sm'
                                onClick={() => deleteNote(note[0])}
                            >
                                Delete
                            </button>
                        </CardHeader>
                        <CardBody>{note[1].note}</CardBody>
                    </Card>
                ))}
            </div>

            <button
                className='fixed right-6 bottom-6 py-3 px-4 bg-blue-500 hover:bg-blue-600 transition rounded-full text-white'
                onClick={handleShowPopup}
            >
                Create Note
            </button>

            <CreateNotePopup show={showCreateNotePopup} handleClose={handleShowPopup} />
        </Page>
    );
};

export default Dashboard;
