import { useEffect, useState } from 'react';
import { useBlogStore } from '../../store/blogStore';
import { useCreateBlog, useUpdateBlog } from '../../hooks/usePosts';
import { X } from 'lucide-react';

export const BlogFormModal = () => {
    const { isCreateModalOpen, isEditModalOpen, closeCreateModal, closeEditModal, selectedPost } = useBlogStore();
    const createBlog = useCreateBlog();
    const updateBlog = useUpdateBlog();

    const isOpen = isCreateModalOpen || isEditModalOpen;
    const isEdit = isEditModalOpen;

    const [title, setTitle] = useState('');
    const [excerpt, setExcerpt] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        if (isEdit && selectedPost) {
            setTitle(selectedPost.title);
            setExcerpt(selectedPost.excerpt);
            setContent(selectedPost.content);
        } else {
            setTitle('');
            setExcerpt('');
            setContent('');
        }
    }, [isEdit, selectedPost, isOpen]);

    const onClose = () => {
        if (isEdit) closeEditModal();
        else closeCreateModal();
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isEdit && selectedPost) {
            updateBlog.mutate({ id: selectedPost.id, payload: { title, excerpt, content } }, {
                onSuccess: onClose
            });
        } else {
            createBlog.mutate({ title, excerpt, content }, {
                onSuccess: onClose
            });
        }
    };

    if (!isOpen) return null;

    const isLoading = createBlog.isPending || updateBlog.isPending;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                    <h2 className="text-xl font-bold text-gray-800">{isEdit ? 'Edit Post' : 'Create New Post'}</h2>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                        <input
                            type="text"
                            required
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                            placeholder="Enter post title"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Excerpt</label>
                        <input
                            type="text"
                            required
                            value={excerpt}
                            onChange={(e) => setExcerpt(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                            placeholder="Short summary"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                        <textarea
                            required
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            rows={6}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all resize-none"
                            placeholder="Write your story..."
                        />
                    </div>

                    <div className="flex justify-end gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                            {isLoading ? (
                                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : null}
                            {isEdit ? 'Update Post' : 'Publish Post'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
