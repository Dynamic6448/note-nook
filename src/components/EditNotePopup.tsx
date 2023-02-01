import React, { useEffect, useState } from 'react';
import { createNote, getNoteById, setNoteById } from '../firebase';
import { Modal } from './Modal';
import { onValue } from 'firebase/database';

interface EditNotePopupProps {
    id: string;
    show: boolean;
    handleClose: () => void;
}

const EditNotePopup: React.FC<EditNotePopupProps> = ({ id, show, handleClose }) => {
    const [title, setTitle] = useState('');
    const [note, setNote] = useState('');

    useEffect(() => {
        onValue(getNoteById(id), (snapshot) => {
            const data = snapshot.val();

            if (!snapshot.exists()) return;

            setTitle(data[1].title);
            setNote(data[1].note);
            console.log('ran');
        });
    }, []);

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNote(e.target.value);
    };

    const handleSubmit = () => {
        setNoteById(id, title, note);

        handleClose();
    };

    return (
        <Modal title='Edit Note' show={show}>
            <div className='mb-6'>
                <input
                    type='text'
                    placeholder='Title'
                    className='w-full p-2 border-2 border-gray-300 rounded-xl mb-4'
                    onChange={handleTitleChange}
                />
                <textarea
                    placeholder='Note'
                    className='w-full p-2 border-2 border-gray-300 rounded-xl'
                    onChange={handleNoteChange}
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
