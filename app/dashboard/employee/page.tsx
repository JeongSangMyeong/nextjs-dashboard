'use client';
import { useEffect, useState } from 'react';

const DashboardTestPage = () => {
    const [data, setData] = useState<any[]>([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('/api/get-data');
            const result = await response.json();
            if (response.ok) {
                setData(result.data);
            } else {
                setError(result.error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h1>Firestore Data</h1>
            {error ? (
                <p>Error: {error}</p>
            ) : (
                <pre>{JSON.stringify(data, null, 2)}</pre>
            )}
        </div>
    );
};

export default DashboardTestPage;
