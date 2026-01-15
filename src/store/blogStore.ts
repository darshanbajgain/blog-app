import { create } from 'zustand';
import type { BlogPost } from '../types';

interface BlogState {
    isCreateModalOpen: boolean;
    isEditModalOpen: boolean;
    isDeleteModalOpen: boolean;
    selectedPost: BlogPost | null;
    searchTerm: string;

    openCreateModal: () => void;
    closeCreateModal: () => void;
    openEditModal: (post: BlogPost) => void;
    closeEditModal: () => void;
    openDeleteModal: (post: BlogPost) => void;
    closeDeleteModal: () => void;
    setSearchTerm: (term: string) => void;
}

export const useBlogStore = create<BlogState>((set) => ({
    isCreateModalOpen: false,
    isEditModalOpen: false,
    isDeleteModalOpen: false,
    selectedPost: null,
    searchTerm: '',

    openCreateModal: () => set({ isCreateModalOpen: true }),
    closeCreateModal: () => set({ isCreateModalOpen: false }),
    openEditModal: (post) => set({ isEditModalOpen: true, selectedPost: post }),
    closeEditModal: () => set({ isEditModalOpen: false, selectedPost: null }),
    openDeleteModal: (post) => set({ isDeleteModalOpen: true, selectedPost: post }),
    closeDeleteModal: () => set({ isDeleteModalOpen: false, selectedPost: null }),
    setSearchTerm: (term) => set({ searchTerm: term }),
}));
