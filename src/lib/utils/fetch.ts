import { Contents } from "@/types/microcms";
import { createClient, MicroCMSQueries } from "microcms-js-sdk";

if (!process.env.MICROCMS_SERVICE_DOMAIN) {
    throw new Error('MICROCMS_SERVICE_DOMAIN is not defined');
}

if (!process.env.MICROCMS_API_KEY) {
    throw new Error('MICROCMS_API_KEY is not defined');
}

const client = createClient({
    serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN,
    apiKey: process.env.MICROCMS_API_KEY,
})
//ここまで定型文

//全データ取得
export const fetchData = async (queries?: MicroCMSQueries) => {
    const response = await client.getList<Contents>({
        endpoint: "contents",
        queries,
        customRequestInit: {
            next: { revalidate: 60 },
        },
    });
    return response;
}

//トピックごとのデータ取得
export const fetchTopicData = async (topic: string) => {
    const response = await client.getList<Contents>({
        endpoint: "contents",
        queries: { filters: `topic[contains]${topic}` },
        customRequestInit: {
            next: { revalidate: 60 },
        }
    });
    return response;
}

//idごとのデータ取得
export const fetchIdData = async (id: string) => {
    const response = await client.getListDetail<Contents>({
        endpoint: "contents",
        contentId: id,
        queries: {filters: `id[equals]${id}`},
        // queries: { filters: `id[equals]${id}` },
        customRequestInit: {
            next: { revalidate: 60 },
        }
    },
);
    return response;
}