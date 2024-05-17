'use client';
import { useState } from 'react';

const AddDataPage = () => {
    const [name, setName] = useState('');
    const [department, setDepartment] = useState('');
    const [position, setPosition] = useState('');
    const [tel, setTel] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const response = await fetch('/api/add-data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, department, position, tel }),
        });
        const result = await response.json();
        if (response.ok) {
            setMessage(`Document added with ID: ${result.id}`);
        } else {
            setMessage(`Error: ${result.error}`);
        }
    };

    return (
        <div>
            <h1>Add Data to Firestore</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Name:
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Department:
                        <input
                            type="text"
                            value={department}
                            onChange={(e) => setDepartment(e.target.value)}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Position:
                        <input
                            type="text"
                            value={position}
                            onChange={(e) => setPosition(e.target.value)}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Tel:
                        <input
                            type="text"
                            value={tel}
                            onChange={(e) => setTel(e.target.value)}
                        />
                    </label>
                </div>
                <button type="submit">Add Data</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default AddDataPage;
