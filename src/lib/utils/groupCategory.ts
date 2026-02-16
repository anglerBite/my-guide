import { Contents } from "@/types/microcms";

export type GroupedCategory = {
    category: string;
    items: Contents[];
};

export type GroupedTopic = {
    topic: string;
    items: Contents[];
};

export const groupCategory = (contents: Contents[]): GroupedCategory[] => {
    const grouped = contents.reduce<Record<string, Contents[]>>((acc, content) => {
        acc[content.category] ??= [];
        acc[content.category].push(content);
        return acc;
    }, {});

    return Object.entries(grouped)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([category, items]) => ({
            category,
            items,
        }));
};

export const groupTopic = (contents: Contents[]): GroupedTopic[] => {
    const grouped = contents.reduce<Record<string, Contents[]>>((acc, content) => {
        acc[content.topic] ??= [];
        acc[content.topic].push(content);
        return acc;
    }, {});

    return Object.entries(grouped)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([topic, items]) => ({
            topic,
            items,
        }));
};