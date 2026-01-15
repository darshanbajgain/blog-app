import { Link } from 'react-router-dom';
import { useBlogStore } from '../store/blogStore';
import { Loader } from '../components/common/Loader';
import { BlogFormModal } from '../components/blog/BlogFormModal';
import { DeleteBlogModal } from '../components/blog/DeleteBlogModal';
import { Plus, Edit2, Trash2, Calendar, Eye } from 'lucide-react';
import { useBlogPosts } from '@/hooks/usePosts';

const BlogList = () => {
    const { data: posts, isLoading, error } = useBlogPosts();
    const { openCreateModal, openEditModal, openDeleteModal } = useBlogStore();

    if (isLoading) return <div className="flex justify-center items-center min-h-[50vh]"><Loader /></div>;
    if (error) return <div className="text-center text-red-500 py-10">Error loading posts</div>;

    return (
        <div className="max-w-5xl mx-auto p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Blog Posts</h1>
                    <p className="text-gray-500 mt-1">Manage your blog content</p>
                </div>
                <button
                    onClick={openCreateModal}
                    className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg font-medium transition-all shadow-sm active:scale-95"
                >
                    <Plus className="w-5 h-5" />
                    New Post
                </button>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {posts?.map((post) => (
                    <div
                        key={post.id}
                        className="group bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col overflow-hidden"
                    >
                        <div className="h-2 bg-linear-to-r from-indigo-500 to-purple-500" />
                        <div className="p-6 flex-1 flex flex-col">
                            <div className="flex justify-between items-start mb-4">
                                <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md uppercase tracking-wider">
                                    Article
                                </span>
                                <span className="flex items-center text-xs text-gray-400">
                                    <Calendar className="w-3 h-3 mr-1" />
                                    {new Date(post.createdAt || Date.now()).toLocaleDateString()}
                                </span>
                            </div>

                            <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 leading-tight">
                                {post.title}
                            </h3>

                            <p className="text-gray-600 text-sm line-clamp-3 mb-6 flex-1">
                                {post.excerpt}
                            </p>

                            <div className="flex items-center justify-end gap-2 pt-4 border-t border-gray-100 opacity-0 group-hover:opacity-100 transition-opacity duration-200 transform translate-y-2 group-hover:translate-y-0">
                                <Link
                                    to={`/blog/${post.id}`}
                                    className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                    title="View"
                                >
                                    <Eye className="w-4 h-4" />
                                </Link>
                                <button
                                    onClick={() => openEditModal(post)}
                                    className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                                    title="Edit"
                                >
                                    <Edit2 className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => openDeleteModal(post)}
                                    className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                    title="Delete"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}

                {posts?.length === 0 && (
                    <div className="col-span-full py-12 text-center bg-gray-50 rounded-xl border border-dashed border-gray-300">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 text-gray-400 mb-4">
                            <Plus className="w-6 h-6" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900">No posts yet</h3>
                        <p className="text-gray-500 mt-1 mb-4">Create your first blog post to get started</p>
                        <button
                            onClick={openCreateModal}
                            className="text-indigo-600 hover:text-indigo-700 font-medium text-sm"
                        >
                            Create Post
                        </button>
                    </div>
                )}
            </div>

            <BlogFormModal />
            <DeleteBlogModal />
        </div>
    );
};

export default BlogList;
