"use client";

import { useEffect, useState, useCallback } from 'react';
import { lusitana } from '@/app/ui/fonts';
import Pagination from '@/app/ui/naver/pagination';
import SearchResultsTable from '@/app/ui/naver/table'; // 테이블 컴포넌트 임포트

interface Item {
    [key: string]: string; // 모든 키가 문자열 값을 가질 수 있도록 정의
}

interface SearchResults {
    items: Item[];
    total: number;
    start: number;
    display: number;
}

export default function Home() {
    const [input, setInput] = useState('');
    const [results, setResults] = useState<Item[]>([]);
    const [total, setTotal] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [display, setDisplay] = useState(0);
    const [apiType, setApiType] = useState('blog'); // default는 블로그

    const ITEMS_PER_PAGE = 10;  // 페이지 당 호출 개수

    const handleSearch = useCallback(async (page: number) => {
        const start = (page - 1) * ITEMS_PER_PAGE + 1;
        const res = await fetch(`/api/search?query=${encodeURIComponent(input)}&start=${start}&display=${ITEMS_PER_PAGE}&apiType=${apiType}`);
        const data = await res.json();
        if (data.items) {
            setResults(data.items);
            setTotal(data.total);
            setDisplay(data.display);
            setCurrentPage(page);
            console.log(data);
        }
    }, [input, apiType]);

    const handleKeyPress = useCallback((e: KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSearch(1);
        }
    }, [handleSearch]);

    const handleApiTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setApiType(e.target.value);
        setInput('');
        setResults([]);
        setTotal(0);
        setCurrentPage(1);
    };

    useEffect(() => {
        document.addEventListener('keypress', handleKeyPress);
        return () => {
            document.removeEventListener('keypress', handleKeyPress);
        };
    }, [handleKeyPress]);

    const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

    return (
        <div className="w-full">
            <div className="flex w-full items-center justify-between">
                <h1 className={`${lusitana.className} text-2xl`}>네이버 검색</h1>
            </div>
            <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                <select className="block w-1/2 rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-1" value={apiType} onChange={handleApiTypeChange}>
                    <option value="blog">Blog</option>
                    <option value="news">News</option>
                    <option value="book">Book</option>
                    <option value="cafearticle">카페 글</option>
                    <option value="kin">지식인</option>
                    <option value="local">지역</option>
                </select>
                <label htmlFor="search" className="sr-only">
                    Search
                </label>
                <input className='peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500' value={input} onChange={(e) => setInput(e.target.value)} placeholder='검색어를 입력하세요...' />
                <button className='flex h-10 items-center rounded-lg bg-red-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600' onClick={() => handleSearch(1)}>Search</button>
            </div>
            <div className="mt-5 flex w-full justify-center">
                <SearchResultsTable results={results} currentPage={currentPage} apiType={apiType} display={display} />
            </div>
            <div className="mt-5 flex w-full justify-center">
                {totalPages > 1 && (
                    <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handleSearch} itemsPerPage={ITEMS_PER_PAGE} />
                )}
            </div>
        </div>
    );
}
