import React, { useEffect, useState } from 'react';
import { onValue } from 'firebase/database';
import { deleteNote, getCurrentEditingNoteId, readNotes, setCurrentEditingNoteId } from '../firebase';
import { Card, CardBody, CardHeader } from '../components/Card';
import Page from '.';
import CreateNotePopup from '../components/CreateNotePopup';
import EditNotePopup from '../components/EditNotePopup';

const Dashboard: React.FC = () => {
    const [notes, setNotes] = useState([] as any);
    const [showCreateNotePopup, setShowCreateNotePopup] = useState(false);
    const [showEditNotePopup, setShowEditNotePopup] = useState(false);

    //const notesCollection = collection(db, 'Notes');

    useEffect(() => {
        onValue(readNotes(), (snapshot) => {
            const data = snapshot.val();

            if (!snapshot.exists()) {
                setNotes([]);
                return;
            }

            const noteArr: any = [];

            Object.entries(data).map((note: any) => {
                noteArr.push(note);
            });

            setNotes(noteArr);
        });
    }, []);

    const handleShowCreateModal = () => {
        setShowCreateNotePopup(!showCreateNotePopup);
    };

    const handleShowEditModal = (id: string) => {
        setCurrentEditingNoteId(id);
        setShowEditNotePopup(!showEditNotePopup);
    };

    return (
        <Page>
            <div className='flex flex-row flex-wrap p-4'>
                {notes.map((note) => (
                    <Card key={note[0]} className='mb-4 w-[400px] h-[200px]'>
                        <CardHeader className='text-center flex flex-row justify-between items-center'>
                            {note[1].title}

                            <div className='flex flex-row gap-2'>
                                <button
                                    className='py-2 px-3 rounded-full bg-orange-600 hover:bg-orange-700 hover:shadow-md transition text-white text-sm'
                                    onClick={() => handleShowEditModal(note[0])}
                                >
                                    Edit
                                </button>
                                <button
                                    className='py-2 px-3 rounded-full bg-red-600 hover:bg-red-700 hover:shadow-md transition text-white text-sm'
                                    onClick={() => deleteNote(note[0])}
                                >
                                    Delete
                                </button>
                            </div>
                        </CardHeader>
                        <CardBody className='h-[100px] overflow-y-scroll'>{note[1].note}</CardBody>
                    </Card>
                ))}
            </div>

            <button
                className='fixed right-6 bottom-6 py-3 px-4 bg-blue-500 hover:bg-blue-600 transition rounded-full text-white'
                onClick={handleShowCreateModal}
            >
                Create Note
            </button>

            <CreateNotePopup show={showCreateNotePopup} handleClose={handleShowCreateModal} />
            <EditNotePopup show={showEditNotePopup} handleClose={() => handleShowEditModal(getCurrentEditingNoteId())} />
        </Page>
    );
};

export default Dashboard;
