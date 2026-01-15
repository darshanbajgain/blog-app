import { useParams, Link } from 'react-router-dom';
import { useBlogPost } from '../hooks/usePosts';
import { Loader } from '../components/common/Loader';
import { ArrowLeft, Calendar, User, Clock } from 'lucide-react';

const BlogPostDetails = () => {
    const { id } = useParams<{ id: string }>();
    const { data: post, isLoading, error } = useBlogPost(id);

    if (isLoading) return <div className="min-h-screen flex items-center justify-center"><Loader /></div>;

    if (error || !post) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Post not found</h2>
                <p className="text-gray-600 mb-8">The story you are looking for does not exist or has been removed.</p>
                <Link to="/" className="px-6 py-3 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition-colors">
                    Back to Home
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#fcfbf9]">
            <nav className="sticky top-0 z-50 bg-[#fcfbf9]/80 backdrop-blur-md border-b border-black/5">
                <div className="max-w-4xl mx-auto px-6 h-16 flex items-center">
                    <Link to="/" className="flex items-center gap-2 text-gray-600 hover:text-black transition-colors font-medium text-sm group">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Back to Stories
                    </Link>
                </div>
            </nav>

            <article className="max-w-4xl mx-auto px-6 py-12 md:py-20">
                <header className="mb-12 text-center">
                    <div className="flex items-center justify-center gap-4 text-sm text-gray-500 mb-6 font-medium">
                        <span className="flex items-center gap-1.5">
                            <Calendar className="w-4 h-4" />
                            {new Date(post.createdAt || Date.now()).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </span>
                        <span className="w-1 h-1 bg-gray-300 rounded-full" />
                        <span className="flex items-center gap-1.5">
                            <Clock className="w-4 h-4" />
                            5 min read
                        </span>
                    </div>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display leading-tight mb-8 text-gray-900">
                        {post.title}
                    </h1>

                    <div className="flex items-center justify-center gap-3">
                        <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-bold">
                            <User className="w-5 h-5" />
                        </div>
                        <div className="text-left">
                            <p className="text-sm font-bold text-gray-900">Demo User</p>
                            <p className="text-xs text-indigo-600 font-medium">Author</p>
                        </div>
                    </div>
                </header>

                <div className="prose prose-lg md:prose-xl prose-indigo mx-auto text-gray-700 font-serif leading-loose">
                    <p className="lead text-xl md:text-2xl text-gray-500 font-sans font-light mb-10 leading-relaxed border-l-4 border-indigo-200 pl-6 italic">
                        {post.excerpt}
                    </p>

                    <div className="whitespace-pre-wrap">
                        {post.content || post.excerpt}
                        {/* Fallback content for visual fullness if using mock data */}
                        {!post.content && (
                            <p className="mt-8">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </p>
                        )}
                    </div>
                </div>

                <div className="mt-20 pt-10 border-t border-gray-200 flex justify-between items-center">
                    <div className="text-sm text-gray-500">
                        Share this story
                    </div>
                    <div className="flex gap-4">
                        {/* Social placeholders */}
                        <div className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 cursor-pointer transition-colors" />
                        <div className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 cursor-pointer transition-colors" />
                        <div className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 cursor-pointer transition-colors" />
                    </div>
                </div>
            </article>
        </div>
    );
};

export default BlogPostDetails;
