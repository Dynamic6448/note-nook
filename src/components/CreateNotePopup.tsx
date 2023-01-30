import React, { useState } from 'react';
import { createNote } from '../firebase';

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
        setNote(e.target.value);
    };

    const handleSubmit = () => {
        createNote(title, note);

        handleClose();
    };

    return (
        <div>
            {show && (
                <div className='fixed top-0 left-0 flex items-center justify-center bg-black bg-opacity-50 transition w-full h-full'>
                    <div className='bg-white rounded-2xl'>
                        <div className='flex flex-col justify-between p-6 w-full h-full'>
                            <h1 className='text-2xl font-medium mb-6'>Create Note</h1>
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
                                    Close
                                </button>
                                <button
                                    className='py-2 px-4 bg-blue-600 hover:bg-blue-700 transition text-white rounded-full'
                                    onClick={handleSubmit}
                                >
                                    Create
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CreateNotePopup;
