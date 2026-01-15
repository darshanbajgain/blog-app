import { useMutation } from '@tanstack/react-query';
import { apiClient } from '../api/client';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';

export const useAuth = () => {
  const navigate = useNavigate();
  const { user, token, isAuthenticated, login, logout } = useAuthStore();

  const loginMutation = useMutation({
    mutationFn: async ({ email, password }: any) => {
      const response = await apiClient.post('/auth/login', { email, password });
      return response.data;
    },
    onSuccess: (data) => {
      if (data.token) {
        login(data.token, data.user);
        navigate('/dashboard');
      }
    },
  });

  const performLogin = (email: string, password: string) => {
    loginMutation.mutate({ email, password });
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
    isLoading: loginMutation.isPending,
    error: loginMutation.error ? (loginMutation.error as Error).message || 'Login failed' : null,
  };
};