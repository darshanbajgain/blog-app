export interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    content: string;
    createdAt: string;
}

export interface CreateBlogPayload {
    title: string;
    excerpt: string;
    content: string;
}

export interface UpdateBlogPayload {
    title?: string;
    excerpt?: string;
    content?: string;
}
