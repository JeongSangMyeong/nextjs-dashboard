import { parseHTML } from '@/app/lib/utils';

interface Item {
    bloggername: string;
    title: string;
    description: string;
    link: string;
    postdate: string;
}

export default function SearchResultsTable({ results, currentPage }: { results: Item[], currentPage: number }) {
    return (
        <div className="mt-6 flow-root">
            <div className="inline-block min-w-full align-middle">
                <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
                    <table className="min-w-full table-fixed text-gray-900">
                        <thead className="rounded-lg text-left text-sm font-normal">
                            <tr>
                                {/* <th scope="col" className="w-1/5 px-4 py-5 font-medium sm:pl-6">블로거 명</th> */}
                                <th scope="col" className="w-2/6 px-3 py-5 font-medium">Title</th>
                                <th scope="col" className="w-2/6 px-3 py-5 font-medium">Content</th>
                                <th scope="col" className="w-2/6 px-3 py-5 font-medium">Link</th>
                                {/* <th scope="col" className="w-1/5 px-3 py-5 font-medium">작성일</th> */}
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {results.map((item, index) => (
                                <tr key={index} className="border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg">
                                    {/* <td className="whitespace-normal py-3 pl-6 pr-3">{item.bloggername}</td> */}
                                    <td className="whitespace-normal px-3 py-3" dangerouslySetInnerHTML={{ __html: item.title }}></td>
                                    <td className="whitespace-normal px-3 py-3" dangerouslySetInnerHTML={{ __html: item.description }}></td>
                                    <td className="whitespace-normal px-3 py-3">
                                        <a href={item.link} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">{item.link}</a>
                                    </td>
                                    {/* <td className="whitespace-normal px-3 py-3">{item.postdate}</td> */}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
