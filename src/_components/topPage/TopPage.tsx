import { fetchData } from "@/lib/utils/fetch";
import { groupCategory } from "@/lib/utils/groupCategory";
import Link from "next/link";

const TopPage = async () => {
    const response = await fetchData();
    const contents = response.contents;
    const grouped = groupCategory(contents);

    return (
        <div>
        <h1 className="text-4xl font-bold text-center">All My Document</h1>
        {grouped.map((group) => (
            <section key={group.category} className="mt-10">
                <h2 className="text-2xl font-semibold mb-4">{group.category === 'Library-Framework' ? 'Library/Framework' : group.category}</h2>

                <div className="grid grid-cols-3 gap-6 justify-items-center">
                    {group.items.map((doc) => (
                        <Link
                            key={doc.id}
                            href={`/document/${doc.topic}`}
                            className="w-full h-25 bg-border hover:bg-[#ff2911] rounded-md flex items-center justify-center text-[20px] text-white font-bold"
                        >
                            {doc.topic}
                        </Link>
                    ))}
                </div>
            </section>
        ))}
        </div>
    )
}

export default TopPage