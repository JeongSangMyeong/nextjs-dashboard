import { columnsConfig } from '@/app/config/naver-search-column-config';

interface Item {
    [key: string]: string; // 모든 키가 문자열 값을 가질 수 있도록 정의
}

interface SearchResultsTableProps {
    results: Item[];
    currentPage: number;
    apiType: string;
    display: number;
}

// date 포맷 함수
function formatDate(dateString: string): string {
    if (dateString.length === 8) {
        const year = dateString.substring(0, 4);
        const month = dateString.substring(4, 6);
        const day = dateString.substring(6, 8);
        return `${year}-${month}-${day}`;
    } else {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
}


export default function SearchResultsTable({ results, currentPage, apiType, display }: SearchResultsTableProps) {
    const columns = columnsConfig[apiType as keyof typeof columnsConfig] || [];

    return (
        <div className="mt-6 flow-root">
            <div className="inline-block min-w-full align-middle">
                <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
                    <table className="min-w-full table-fixed text-gray-900">
                        <thead className="rounded-lg text-left text-sm font-normal">
                            <tr>
                                {columns.map((col) => (
                                    <th key={col.key} scope="col" className="px-3 py-5 font-medium">
                                        {col.label}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {display === 0 ? (
                                <tr>
                                    <td colSpan={columns.length} className="px-3 py-5 text-center text-gray-500">
                                        조회된 데이터가 없습니다.
                                    </td>
                                </tr>
                            ) : (
                                results.map((item, index) => (
                                    <tr key={index} className="border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg">
                                        {columns.map((col) => (
                                            <td key={col.key} className="whitespace-normal px-3 py-3">
                                                {col.key.includes('link') ? (
                                                    <a href={item[col.key]} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">{item[col.key]}</a>
                                                ) : col.key === 'image' ? (
                                                    <img src={item[col.key]} alt="Thumbnail" width={100} height={100} />
                                                ) : col.key === 'postdate' || col.key === 'pubDate' || col.key === 'pubdate' ? (
                                                    formatDate(item[col.key])
                                                ) : (
                                                    <span dangerouslySetInnerHTML={{ __html: item[col.key] }}></span>
                                                )}
                                            </td>
                                        ))}
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
