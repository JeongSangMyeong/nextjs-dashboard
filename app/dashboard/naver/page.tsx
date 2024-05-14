"use client";

import { lusitana } from '@/app/ui/fonts';
import { Suspense, useState } from 'react';

interface Item {
    title: string;
}

export default function Home() {
    const [input, setInput] = useState('');
    const [results, setResults] = useState<Item[]>([]);

    const handleSearch = async () => {
        const res = await fetch(`/api/search?query=${input}`);
        const data = await res.json();
        console.log("====================");
        console.log(data);
        console.log("====================");
        setResults(data.items);
    };

    return (
        <div className="w-full">
            <div className="flex w-full items-center justify-between">
                <h1 className={`${lusitana.className} text-2xl`}>네이버 검색</h1>
            </div>
            <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                <input value={input} onChange={(e) => setInput(e.target.value)} />
                <button onClick={handleSearch}>검색</button>
                

            </div>
            <div className="mt-5 flex w-full justify-center">
                <ul>
                    {results.map((item, index) => (
                        <li key={index}>{item.title}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
