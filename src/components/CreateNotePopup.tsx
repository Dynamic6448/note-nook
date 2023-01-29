import React, { useState } from 'react';
import { Button } from '@material-tailwind/react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';

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

    const handleNoteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNote(e.target.value);
    };

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();

        // add note to firebase db
        // addDoc(collection(db, 'Notes'), {
        //     Title: title,
        //     Note: note,
        // });

        handleClose();
    };

    return (
        <div></div>
        // <Modal show={show} onHide={handleClose}>
        //     <Modal.Header closeButton>
        //         <Modal.Title>Create Note</Modal.Title>
        //     </Modal.Header>
        //     <Modal.Body>
        //         <Form>
        //             <Form.Group className='mb-3' controlId='formBasicEmail'>
        //                 <Form.Label>Title</Form.Label>
        //                 <Form.Control type='text' placeholder='Enter title' onChange={handleTitleChange} />
        //             </Form.Group>

        //             <Form.Group className='mb-3' controlId='formBasicPassword'>
        //                 <Form.Label>Note</Form.Label>
        //                 <Form.Control as='textarea' placeholder='Enter note' onChange={handleNoteChange} />
        //             </Form.Group>
        //         </Form>
        //     </Modal.Body>
        //     <Modal.Footer>
        //         <Button variant='secondary' onClick={handleClose}>
        //             Close
        //         </Button>
        //         <Button variant='primary' onClick={handleSubmit}>
        //             Save Changes
        //         </Button>
        //     </Modal.Footer>
        // </Modal>
    );
};

export default CreateNotePopup;
