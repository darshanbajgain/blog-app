import MockAdapter from 'axios-mock-adapter';
import { apiClient } from './client';

type Post = {
  id: string;
  title: string;
  excerpt: string;
};

// Initial Data
const posts: Post[] = [
  {
    id: '1',
    title: 'The Quiet Morning Routine',
    excerpt: 'Build a calm, repeatable rhythm for creative work.',
  },
  {
    id: '2',
    title: 'Notes on Focused Reading',
    excerpt: 'Small rituals to help you finish what you start.',
  },
];

const mock = new MockAdapter(apiClient, { delayResponse: 500 });

// --- AUTH MOCKS ---

// 1. Login Mock (Added console logs for debugging)

mock.onPost('/api/auth/login').reply((config) => {
  try {
    const { email, password } = JSON.parse(config.data);

    if (email === 'demo@user.com' && password === 'password') {
      return [
        200,
        {
          token: 'fake-jwt-token-xyz-123',
          user: {
            id: 'u1',
            name: 'Demo User',
            email: 'demo@user.com',
          },
        },
      ];
    }
    
    return [401, { message: 'Invalid credentials. Use demo@user.com / password' }];
    
  } catch (e) {
    console.error('Mock: Error in login handler', e);
    return [400, { message: 'Bad Request' }];
  }
});

// 3. Get Current User (Verify Token)
mock.onGet('/auth/me').reply((config) => {
  const headers = config.headers;
  if (headers?.Authorization === 'Bearer fake-jwt-token-xyz-123') {
    return [
      200,
      {
        id: 'u1',
        name: 'Demo User',
        email: 'demo@user.com',
      },
    ];
  }
  return [401, { message: 'Unauthorized' }];
});

// --- BLOG MOCKS ---
mock.onGet('/posts').reply(200, { posts });

export function setupMockApi() {
  return mock;
}