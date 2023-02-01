import React, { useEffect, useState } from 'react';
import { getCurrentEditingNoteId, getNoteById, setNoteById } from '../firebase';
import { Modal } from './Modal';
import { onValue } from 'firebase/database';

interface EditNotePopupProps {
    show: boolean;
    handleClose: () => void;
}

const EditNotePopup: React.FC<EditNotePopupProps> = ({ show, handleClose }) => {
    const [title, setTitle] = useState('');
    const [note, setNote] = useState('');

    useEffect(() => {
        const noteObj = getNoteById(getCurrentEditingNoteId());

        if (!noteObj) return;

        setTitle(noteObj.title);
        setNote(noteObj.note);
    }, [show]);

    const handleSubmit = () => {
        setNoteById(getCurrentEditingNoteId(), title, note);
        handleClose();
    };

    return (
        <Modal title='Edit Note' show={show}>
            <div className='mb-6'>
                <input
                    className='w-full p-2 border-2 border-gray-300 rounded-xl mb-4'
                    type='text'
                    placeholder='Title'
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                />
                <textarea
                    className='w-full p-2 border-2 border-gray-300 rounded-xl'
                    placeholder='Note'
                    value={note}
                    onChange={(event) => setNote(event.target.value)}
                />
            </div>
            <div className='flex flex-row w-full items-center justify-between'>
                <button
                    className='py-2 px-4 bg-slate-600 hover:bg-slate-700 transition text-white rounded-full'
                    onClick={handleClose}
                >
                    Cancel
                </button>
                <button
                    className='py-2 px-4 bg-blue-600 hover:bg-blue-700 transition text-white rounded-full'
                    onClick={handleSubmit}
                >
                    Save
                </button>
            </div>
        </Modal>
    );
};

export default EditNotePopup;
