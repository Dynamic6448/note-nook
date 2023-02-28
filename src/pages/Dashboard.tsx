import React, { useEffect, useState } from 'react';
import { onValue } from 'firebase/database';
import { refNotes, deleteNote, setCurrentEditingNoteId, NoteType } from '../firebase';
import { Card, CardBody, CardFooter, CardHeader } from '../components/Card';
import Page from '.';
import CreateNotePopup from '../components/CreateNotePopup';
import EditNotePopup from '../components/EditNotePopup';
import { Button } from '../components/Button';

const Dashboard: React.FC = () => {
    const [notes, setNotes] = useState<NoteType[]>([]);
    const [showCreateNotePopup, setShowCreateNotePopup] = useState(false);
    const [showEditNotePopup, setShowEditNotePopup] = useState(false);

    const [noteToDelete, setNoteToDelete] = useState(-1);

    useEffect(() => {
        onValue(refNotes(), (snapshot) => {
            const data = snapshot.val();

            if (!snapshot.exists()) {
                setNotes([]);
                return;
            }

            const noteArr: NoteType[] = [];

            Object.entries(data).map((note: any) => {
                noteArr.push({
                    id: note[0],
                    title: note[1].title,
                    note: note[1].note,
                    dateCreated: note[1].dateCreated,
                    dateUpdated: note[1].dateUpdated,
                });
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

    const handleDeleteNote = (id: string) => {
        deleteNote(id);
        setNoteToDelete(-1);
    };

    return (
        <Page>
            <div className='flex flex-row flex-wrap p-4'>
                {notes.map((note, i) => (
                    <Card key={note.id} className='mb-4 w-[400px] h-[200px]'>
                        <CardHeader className='text-center flex flex-row justify-between items-center'>
                            {note.title}

                            <div className='flex flex-row gap-2'>
                                {noteToDelete !== i && (
                                    <Button className='bg-red-600 hover:bg-red-700' onClick={() => setNoteToDelete(i)}>
                                        Delete
                                    </Button>
                                )}
                                {noteToDelete === i && (
                                    <div className='flex flex-row gap-1'>
                                        <Button className='bg-red-600 hover:bg-red-700' onClick={() => setNoteToDelete(-1)}>
                                            X
                                        </Button>
                                        <Button className='bg-green-600 hover:bg-green-700' onClick={() => handleDeleteNote(note.id)}>
                                            ✓
                                        </Button>
                                    </div>
                                )}

                                <Button className='bg-orange-600 hover:bg-orange-700  ' onClick={() => handleShowEditModal(note.id)}>
                                    Edit
                                </Button>
                            </div>
                        </CardHeader>
                        <CardBody className='h-[80px] overflow-y-scroll'>{note.note}</CardBody>
                        <CardFooter className='flex flex-row gap-4 h-[100px]'>
                            <div className='text-xs'>{`Created: ${note.dateCreated}`}</div>
                            {note.dateUpdated && <div className='text-xs'>{`Updated: ${note.dateUpdated}`}</div>}
                        </CardFooter>
                    </Card>
                ))}
            </div>

            <Button className='fixed right-6 bottom-6 bg-blue-500 hover:bg-blue-600 text-sm' onClick={handleShowCreateModal}>
                Create Note
            </Button>

            <CreateNotePopup show={showCreateNotePopup} handleClose={handleShowCreateModal} />
            <EditNotePopup show={showEditNotePopup} handleClose={() => handleShowEditModal('')} />
        </Page>
    );
};

export default Dashboard;
