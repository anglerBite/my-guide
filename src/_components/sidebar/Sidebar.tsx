import { fetchData } from '@/lib/utils/fetch'
import { groupTopic } from '@/lib/utils/groupCategory';
import Link from 'next/link'

const Sidebar = async () => {
    const response = await fetchData();
    const data = response.contents;
    const contents = groupTopic(data);
    
    return (
        <div className='flex-1 mt-10'>
            <div className='sticky top-10'>
                <div className='border border-border rounded-md h-150 overflow-y-auto'>
                    <h1 className="text-[20px] font-bold pl-2 py-5 sticky top-0 bg-(--sidebar-title) backdrop-blur-sm border-b border-border">Document List</h1>
                    <ul>
                        {contents.map((content) => (
                            <li key={content.topic} className="hover:bg-(--sidebar-title)">
                                <Link 
                                href={`/document/${content.items[0].topic}`} 
                                className="text-[18px] border-t border-border block py-2 pl-2 cursor-pointer"
                                >
                                    {content.topic === 'Library-Framework' ? 'Library/Framework' : content.topic}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Sidebar