import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import Page from '.';

const Dashboard: React.FC = () => {
    const [notes, setNotes] = useState<Object[]>([]);

    const notesCollection = collection(db, 'notes');

    useEffect(() => {
        const getNotes = async () => {
            const data = await getDocs(notesCollection);
            setNotes(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };

        getNotes();
    }, [notesCollection]);

    return (
        <Page>
            <Card>
                <Card.Header className='text-center'>Note Sample</Card.Header>
                <Card.Body>body</Card.Body>
            </Card>
        </Page>
    );
};

export default Dashboard;
