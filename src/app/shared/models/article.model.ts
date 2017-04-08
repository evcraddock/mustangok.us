export interface IArticle {
    id: string;
    title: string;
    url: string;
    content: string;
    publishDate: Date;
    createdAt: Date;
    updatedAt: Date;
    dataSource: string;
    banner: string;
    author: string;
    categories: string[];
    tags: string[];
}
