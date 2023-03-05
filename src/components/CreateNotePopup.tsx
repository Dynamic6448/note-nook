import React, { useState } from 'react';
import { createNote } from '../firebase';
import { Modal } from './Modal';
import { Button } from './Button';

interface CreateNotePopupProps {
    show: boolean;
    handleClose: () => void;
}
const CreateNotePopup: React.FC<CreateNotePopupProps> = ({ show, handleClose }) => {
    const [title, setTitle] = useState('');
    const [note, setNote] = useState('');

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        // TODO: convert linebreaks in textarea to new lines
        const text = e.target.value;
        setNote(text);
    };

    const handleSubmit = () => {
        createNote(title, note);

        handleClose();
    };

    return (
        <Modal title='Create Note' show={show}>
            <div className='mb-6'>
                <input type='text' placeholder='Title' className='w-full p-2 border-2 border-gray-300 rounded-xl mb-4' onChange={handleTitleChange} />
                <textarea placeholder='Note' className='w-full p-2 border-2 border-gray-300 rounded-xl' onChange={handleNoteChange} />
            </div>
            <div className='flex flex-row w-full items-center justify-between'>
                <Button className='bg-slate-600 hover:bg-slate-700 text-[1rem]' onClick={handleClose}>
                    Cancel
                </Button>
                <Button className='bg-blue-600 hover:bg-blue-700 text-[1rem]' onClick={handleSubmit}>
                    Create
                </Button>
            </div>
        </Modal>
    );
};

export default CreateNotePopup;
