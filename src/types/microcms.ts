import type {
    MicroCMSImage,
    MicroCMSListContent,
} from "microcms-js-sdk";

export type Contents = {
    category: string;
    topic: string;
    subtopic: string;
    article: string;
    image: MicroCMSImage;
} & MicroCMSListContent;