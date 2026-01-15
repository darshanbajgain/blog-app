import { useState } from 'react';
import { apiClient } from '../api/client';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';

export const useAuth = () => {
  const navigate = useNavigate();
  const { user, token, isAuthenticated, login, logout } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

const performLogin = async (email: string, password: string) => {
  setIsLoading(true);
  setError(null);
  try {
    const response = await apiClient.post('/auth/login', { email, password });
    if (response.data && response.data.token) {
      login(response.data.token, response.data.user);
      navigate('/dashboard');
    }
  } catch (err: unknown) {
    setError(err instanceof Error ? err.message : 'Login failed');
  } finally {
    setIsLoading(false);
  }
};

  const performLogout = () => {
    logout();
    navigate('/login');
  };

  return {
    user,
    token,
    isAuthenticated,
    login: performLogin,
    logout: performLogout,
    isLoading,
    error,
  };
};