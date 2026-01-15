import { Link } from 'react-router-dom';
import { useBlogPosts } from '../hooks/usePosts';
import { Loader } from '../components/common/Loader';
import { ArrowRight, Feather, Calendar } from 'lucide-react';

const Home = () => {
  const { data: posts, isLoading } = useBlogPosts();

  return (
    <div className="min-h-screen bg-[#f4f1ec] text-[#11131a] selection:bg-indigo-500 selection:text-white">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-[#f4f1ec]/80 backdrop-blur-md border-b border-black/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-black text-white p-2 rounded-lg group-hover:rotate-12 transition-transform duration-300">
              <Feather className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold font-display tracking-tight">Blog App<span className="text-indigo-600">.</span></span>
          </Link>
          <div className="flex items-center gap-6">
            <Link to="/dashboard" className="bg-black text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-indigo-600 hover:scale-105 transition-all duration-300">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-24 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[100px] -z-10 animate-pulse" />
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-6xl md:text-8xl font-black font-display tracking-tighter mb-8 leading-[0.9]">
            Stories that <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 animate-gradient-x">inspire.</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-12 leading-relaxed">
            Discover a curated collection of thoughts on technology, design, and the future of creativity. Join our community of makers and thinkers.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/dashboard" className="group flex items-center gap-2 bg-black text-white px-8 py-4 rounded-full font-bold hover:bg-gray-900 transition-all hover:pr-6">
              Create your blog
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="max-w-7xl mx-auto px-6 pb-32">
        <div className="flex items-baseline justify-between mb-16 border-b border-black/10 pb-8">
          <h2 className="text-4xl font-bold font-display">Featured Stories</h2>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20"><Loader /></div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {posts?.map((post, index) => (
              <Link to={`/blog/${post.id}`} key={post.id} className="group block">
                <article>
                  <div className="mb-6 overflow-hidden rounded-2xl aspect-4/3 bg-gray-100 relative">
                    {/* Placeholder image pattern */}
                    <div className={`absolute inset-0 bg-linear-to-br transition-transform duration-700 group-hover:scale-110 ${index % 3 === 0 ? 'from-indigo-100 to-purple-100' :
                      index % 3 === 1 ? 'from-pink-100 to-rose-100' : 'from-blue-100 to-cyan-100'
                      }`} />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                      Read
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-sm text-gray-500 font-medium">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(post.createdAt || Date.now()).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
                      </span>
                      <span className="w-1 h-1 bg-gray-300 rounded-full" />
                      <span>5 min read</span>
                    </div>
                    <h3 className="text-3xl font-bold font-display leading-tight group-hover:text-indigo-600 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 line-clamp-3 leading-relaxed">
                      {post.excerpt}
                    </p>
                    <div className="pt-4 flex items-center text-sm font-bold underline decoration-2 underline-offset-4 decoration-indigo-200 group-hover:decoration-indigo-600 transition-all">
                      Read Full Story
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-20">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <Feather className="w-6 h-6" />
            <span className="text-2xl font-bold font-display">Blog App.</span>
          </div>
          <p className="text-gray-400">© 2024 Blog App. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;