"use client";

import { useState } from 'react';

export default function Home() {
    const [input, setInput] = useState('');
    const [results, setResults] = useState([]);

    const handleSearch = async () => {
        const res = await fetch(`/api/search?query=${input}`);
        const data = await res.json();
        console.log(data);
        setResults(data.items);
    };

    return (
        <div>
            <input value={input} onChange={(e) => setInput(e.target.value)} />
            <button onClick={handleSearch}>검색</button>
            <ul>
                {/* {results.map((item, index) => (
                    <li key={index}>{item.title}</li>
                ))} */}
            </ul>
        </div>
    );
}
