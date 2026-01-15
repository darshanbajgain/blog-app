import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../api/client';
import type { BlogPost, CreateBlogPayload, UpdateBlogPayload } from '../types';

// Fetch all posts
export const useBlogPosts = () => {
    return useQuery({
        queryKey: ['posts'],
        queryFn: async (): Promise<BlogPost[]> => {
            const { data } = await apiClient.get('/posts');
            return data;
        },
    });
};

// Fetch single post
export const useBlogPost = (id: string | undefined) => {
    return useQuery({
        queryKey: ['posts', id],
        queryFn: async (): Promise<BlogPost> => {
            const { data } = await apiClient.get(`/posts/${id}`);
            return data;
        },
        enabled: !!id,
    });
};

// Create a new post
export const useCreateBlog = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (payload: CreateBlogPayload) => {
            const { data } = await apiClient.post('/posts', payload);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['posts'] });
        },
    });
};

// Update an existing post
export const useUpdateBlog = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ id, payload }: { id: string; payload: UpdateBlogPayload }) => {
            const { data } = await apiClient.put(`/posts/${id}`, payload);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['posts'] });
        },
    });
};

// Delete a post
export const useDeleteBlog = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id: string) => {
            await apiClient.delete(`/posts/${id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['posts'] });
        },
    });
};
