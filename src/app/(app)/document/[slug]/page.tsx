import Link from "next/link";
import { fetchTopicData } from "@/lib/utils/fetch";
import {  groupTopic } from "@/lib/utils/groupCategory";
import React from "react";

const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
    const {slug} = await params;
    const response = await fetchTopicData(slug);
    const topics = groupTopic(response.contents);

    return (
        <div>
            <div>
                {topics.map((topic) => (
                <React.Fragment key={topic.topic}>
                <h1 className="text-4xl font-bold text-center">{topic.topic === 'Library-Framework' ? 'Library/Framework' : topic.topic}</h1>
                <h2 className="text-2xl font-semibold mb-4">Topics</h2>
                <section className="mt-10">
                {topic.items.map((item) => (
                    <div className="grid grid-cols-3 gap-6 justify-items-center" key={item.id}>
                        <Link
                            href={`/document/${item.topic}/article/${item.id}`}
                            className="w-full h-25 bg-border hover:bg-[#ff2911] rounded-md flex items-center justify-center text-[20px] font-bold text-white"
                        >
                            {item.subtopic}
                        </Link>
                    </div>
                ))}
                </section>
                </React.Fragment>
                ))}
            </div>
        </div>
    );
};

export default Page;