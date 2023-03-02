import React, { useEffect, useRef, useState } from 'react';
import { onValue } from 'firebase/database';
import { refNotes, deleteNote, setCurrentEditingNoteId, NoteType } from '../firebase';
import { Card } from '../components/Card';
import Page from '.';
import CreateNotePopup from '../components/CreateNotePopup';
import EditNotePopup from '../components/EditNotePopup';
import { Button } from '../components/Button';
import { Note } from '../components/Note';

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
            <div className='flex flex-row flex-wrap'>
                {notes.map((note, i) => (
                    <Note
                        key={note.id}
                        title={note.title}
                        dateCreated={note.dateCreated}
                        dateUpdated={note.dateUpdated}
                        deleting={noteToDelete === i}
                        onTryDelete={() => setNoteToDelete(i)}
                        onDeleteCancel={() => setNoteToDelete(-1)}
                        onDeleteConfirm={() => handleDeleteNote(note.id)}
                        onEdit={() => handleShowEditModal(note.id)}
                    >
                        {note.note}
                    </Note>
                ))}
            </div>

            <Button className='fixed right-6 bottom-6 bg-blue-500 hover:bg-blue-600 text-lg' onClick={handleShowCreateModal}>
                Create Note
            </Button>

            <CreateNotePopup show={showCreateNotePopup} handleClose={handleShowCreateModal} />
            <EditNotePopup show={showEditNotePopup} handleClose={() => handleShowEditModal('')} />
        </Page>
    );
};

export default Dashboard;
