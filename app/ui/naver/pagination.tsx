'use client';

import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

interface PaginationProps {
    totalPages: number;
    currentPage: number;
    onPageChange: (page: number) => void;
    itemsPerPage: number;
}

export default function Pagination({ totalPages, currentPage, onPageChange, itemsPerPage }: PaginationProps) {
    // 페이지 번호들을 생성합니다 (최대 5개 표시).
    const maxPagesToShow = 5;
    let startPage = Math.max(currentPage - 2, 1);
    let endPage = startPage + maxPagesToShow - 1;
    if (endPage > totalPages) {
        endPage = totalPages;
        startPage = Math.max(endPage - maxPagesToShow + 1, 1);
    }

    const pages = Array.from({ length: (endPage - startPage + 1) }, (_, i) => startPage + i);

    const handlePageClick = (pageNumber: number) => {
        if (pageNumber !== currentPage) {
            onPageChange(pageNumber);
        }
    };

    return (
        <div className="inline-flex">
            <PaginationArrow
                direction="left"
                onClick={() => handlePageClick(currentPage - 1)}
                isDisabled={currentPage <= 1}
            />

            <div className="flex -space-x-px">
                {pages.map((page) => (
                    <PaginationNumber
                        key={page}
                        page={page}
                        isActive={currentPage === page}
                        onClick={() => handlePageClick(page)}
                    />
                ))}
            </div>

            <PaginationArrow
                direction="right"
                onClick={() => handlePageClick(currentPage + 1)}
                isDisabled={currentPage >= totalPages}
            />
        </div>
    );
}

function PaginationNumber({
    page,
    isActive,
    onClick,
}: {
    page: number;
    isActive: boolean;
    onClick: () => void;
}) {
    const className = clsx(
        'flex h-10 w-10 items-center justify-center text-sm border',
        {
            'z-10 bg-blue-600 border-blue-600 text-white': isActive,
            'hover:bg-gray-100 cursor-pointer': !isActive,
        },
    );

    return (
        <div onClick={onClick} className={className}>
            {page}
        </div>
    );
}

function PaginationArrow({
    direction,
    onClick,
    isDisabled,
}: {
    direction: 'left' | 'right';
    onClick: () => void;
    isDisabled: boolean;
}) {
    const className = clsx(
        'flex h-10 w-10 items-center justify-center rounded-md border',
        {
            'text-gray-300': isDisabled,
            'hover:bg-gray-100 cursor-pointer': !isDisabled,
            'mr-2 md:mr-4': direction === 'left',
            'ml-2 md:ml-4': direction === 'right',
        },
    );

    const icon = direction === 'left' ? (
        <ArrowLeftIcon className="w-4" />
    ) : (
        <ArrowRightIcon className="w-4" />
    );

    return (
        <div className={className} onClick={!isDisabled ? onClick : undefined}>
            {icon}
        </div>
    );
}
