import { useBlogStore } from '../../store/blogStore';
import { useDeleteBlog } from '../../hooks/usePosts';
import { AlertTriangle } from 'lucide-react';

export const DeleteBlogModal = () => {
    const { isDeleteModalOpen, closeDeleteModal, selectedPost } = useBlogStore();
    const deleteBlog = useDeleteBlog();

    if (!isDeleteModalOpen || !selectedPost) return null;

    const handleDelete = () => {
        deleteBlog.mutate(selectedPost.id, {
            onSuccess: () => {
                closeDeleteModal();
            }
        });
    };

    const isLoading = deleteBlog.isPending;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-sm overflow-hidden animate-in fade-in zoom-in duration-200">
                <div className="p-6 text-center">
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <AlertTriangle className="w-6 h-6 text-red-600" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Delete Post?</h3>
                    <p className="text-gray-500 mb-6">
                        Are you sure you want to delete <span className="font-semibold text-gray-800">"{selectedPost.title}"</span>? This action cannot be undone.
                    </p>

                    <div className="flex gap-3">
                        <button
                            onClick={closeDeleteModal}
                            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleDelete}
                            disabled={isLoading}
                            className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {isLoading ? (
                                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : 'Delete'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
