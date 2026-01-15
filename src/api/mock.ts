import MockAdapter from 'axios-mock-adapter';
import { apiClient } from './client';

import type { BlogPost as Post } from '../types';


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

let posts: Post[] = [
  {
    id: '1',
    title: 'The Quiet Morning Routine',
    excerpt: 'Build a calm, repeatable rhythm for creative work.',
    content: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc,',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Notes on Focused Reading',
    excerpt: 'Small rituals to help you finish what you start.',
    content: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc,',
    createdAt: new Date().toISOString(),
  },
];

mock.onGet(/^\/posts\/[^/]+$/).reply((config) => {
  const id = config.url?.split('/').pop();
  const post = posts.find((p) => p.id === id);

  if (post) {
    return [200, post];
  }
  return [404, { message: 'Post not found' }];
});

mock.onGet('/posts').reply(() => {
  return [200, posts];
});

mock.onPost('/posts').reply((config) => {
  const { title, excerpt, content } = JSON.parse(config.data);
  const newPost = {
    id: Math.random().toString(36).substr(2, 9),
    title,
    excerpt,
    content,
    createdAt: new Date().toISOString(),
  };
  posts.unshift(newPost);
  return [201, newPost];
});

mock.onPut(/\/posts\/.+/).reply((config) => {
  const { title, excerpt, content } = JSON.parse(config.data);
  const id = config.url?.split('/').pop();

  const postIndex = posts.findIndex(p => p.id === id);
  if (postIndex > -1) {
    posts[postIndex] = { ...posts[postIndex], title, excerpt, content };
    return [200, posts[postIndex]];
  }
  return [404, { message: 'Post not found' }];
});

mock.onDelete(/\/posts\/.+/).reply((config) => {
  const id = config.url?.split('/').pop();
  posts = posts.filter(p => p.id !== id);
  return [200, { id }];
});


export function setupMockApi() {
  return mock;
}