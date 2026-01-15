import { useAuth } from '@/hooks/useAuth';
import { useState } from 'react';

export default function Login() {
  const { login, isLoading, error } = useAuth();
  const [email, setEmail] = useState('demo@user.com');
  const [password, setPassword] = useState('password');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <div className="flex flex-col min-h-screen overflow-hidden items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-display font-bold text-primary mb-6 text-center">
          Welcome Back
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4 flex flex-col items-center gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition"
              placeholder="demo@user.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition"
              placeholder="password"
            />
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-500 min-w-[200px] mx-auto text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-600 disabled:opacity-50"
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>



      </div>

                      
        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded my-4 text-sm border border-red-100">
            {error}
          </div>
        )}
    </div>
  );
}