import { useAuth } from "@/hooks/useAuth";
import BlogList from "./BlogList";
import { LogOut, LayoutDashboard } from 'lucide-react';

const Dashboard = () => {
    const { logout, user } = useAuth();

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col sticky top-0 h-screen">
                <div className="p-6 border-b border-gray-100">
                    <div className="flex items-center gap-2 font-bold text-xl text-gray-900">
                        <LayoutDashboard className="w-6 h-6 text-indigo-600" />
                        <span>Admin</span>
                    </div>
                </div>

                <nav className="flex-1 p-4 space-y-1">
                    <a href="#" className="flex items-center gap-3 px-4 py-3 bg-indigo-50 text-indigo-700 rounded-lg font-medium">
                        <LayoutDashboard className="w-5 h-5" />
                        Posts
                    </a>

                </nav>

                <div className="p-4 border-t border-gray-100">
                    <div className="flex items-center gap-3 px-4 py-3 mb-2">
                        <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold">
                            {user?.name?.[0] || 'U'}
                        </div>
                        <div className="text-sm">
                            <p className="font-medium text-gray-900">{user?.name || 'User'}</p>
                            <p className="text-xs text-gray-500">{user?.email || 'admin@example.com'}</p>
                        </div>
                    </div>
                    <button
                        onClick={logout}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-colors text-sm font-medium"
                    >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
                {/* Header for Mobile */}
                <div className="md:hidden bg-white border-b border-gray-200 p-4 flex justify-between items-center">
                    <h1 className="font-bold text-lg">Admin Dashboard</h1>
                    <button onClick={logout} className="p-2 text-gray-500"><LogOut className="w-5 h-5" /></button>
                </div>

                <div className="p-6 md:p-10">
                    <BlogList />
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
