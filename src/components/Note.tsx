import React, { useEffect, useRef, useState } from 'react';
import { deleteNote } from '../firebase';
import { Button } from './Button';
import { Card } from './Card';

interface NoteProps {
    key: string;
    title: string;
    dateCreated: string;
    dateUpdated?: string;
    deleting: boolean;
    onTryDelete: () => any;
    onDeleteCancel: () => any;
    onDeleteConfirm: () => any;
    onEdit: () => any;
    children: React.ReactNode;
}
export const Note: React.FC<NoteProps> = ({ key, title, dateCreated, dateUpdated, deleting, onTryDelete, onDeleteCancel, onDeleteConfirm, onEdit, children }) => {
    const [note, setNote] = useState('');

    useEffect(() => {
        if (!children) return;

        setNote(children.toString());
    }, [children]);

    return (
        <Card key={key} className='flex flex-col justify-between mb-4 w-[400px]'>
            <Card.Header className='text-center flex flex-row justify-between items-center'>
                {title}

                <div className='flex flex-row gap-2 pl-4'>
                    {!deleting && (
                        <Button className='bg-red-600 hover:bg-red-700' onClick={onTryDelete}>
                            Delete
                        </Button>
                    )}
                    {deleting && (
                        <div className='flex flex-row gap-1'>
                            <Button className='bg-red-600 hover:bg-red-700' onClick={onDeleteCancel}>
                                X
                            </Button>
                            <Button className='bg-green-600 hover:bg-green-700' onClick={onDeleteConfirm}>
                                ✓
                            </Button>
                        </div>
                    )}

                    <Button className='bg-orange-600 hover:bg-orange-700  ' onClick={onEdit}>
                        Edit
                    </Button>
                </div>
            </Card.Header>
            <Card.Body className='pr-4 h-[175px] overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100'>{note}</Card.Body>

            <Card.Footer className='flex flex-col text-xs gap-1'>
                <div className='flex flex-row justify-between'>
                    <div>{`Created: ${dateCreated}`}</div>
                    {dateUpdated && <div>{`Updated: ${dateUpdated}`}</div>}
                </div>
                <div className='flex flex-row gap-4'>
                    <div>{`Words: ${note.split(' ').length}`}</div>
                    <div>{`Characters: ${note.length}`}</div>
                </div>
            </Card.Footer>
        </Card>
    );
};
