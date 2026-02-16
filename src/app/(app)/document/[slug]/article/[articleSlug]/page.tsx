import { fetchIdData } from '@/lib/utils/fetch';
import Link from 'next/link'

const Page = async ({ params }: { params: Promise<{ articleSlug: string }> }) => {
    const { articleSlug } = await params;
    const article = await fetchIdData(articleSlug);

    return (
        <div className="max-w-3xl mx-auto py-10">
            <nav className="text-sm text-(--path-color) mb-6">
                <Link className="hover:underline" href="/">Home</Link>
                <span className="mx-2">/</span>
                <Link
                    className="hover:underline"
                    href={`/document/${article.topic}`}
                >
                    {article.topic}
                </Link>
            </nav>

            <article className="border border-border] rounded-lg p-8 bg-(--article-bg) shadow-sm">
                <h1 className='text-4xl font-extrabold tracking-tight text-foreground)]'>{article.subtopic}</h1>
                <div className='flex flex-wrap gap-4 text-sm text-(--path-color) mt-3'>
                    <span>create: {new Date(article.createdAt).toLocaleDateString("ja-JP", {hour: "2-digit",minute: "2-digit"})}</span>
                    <span>update: {new Date(article.updatedAt).toLocaleDateString("ja-JP", {hour: "2-digit",minute: "2-digit"})}</span>
                </div>
                <div className='flex flex-wrap items-center gap-2 text-sm text-(--path-color) mt-3'>
                    <span className='inline-flex items-center rounded-md border border-border px-2 py-1'>category: {article.category == 'Library-Framework' ? 'Library/Framework' : article.category}</span>
                </div>
                {/* 本文 */}
                <div className='mt-4 whitespace-pre-wrap leading-7' dangerouslySetInnerHTML={{ __html: article.article }}></div>
                <div className='mt-8'>
                    <Link className='inline-flex items-center px-4 py-2 rounded-md bg-[#e11503] hover:bg-[#ff2911] font-semibold text-white' href={`/document/${article.topic}`}>Back to list</Link>
                </div>
            </article>
        </div>
    );
}

export default Page