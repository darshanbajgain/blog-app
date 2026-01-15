import MockAdapter from 'axios-mock-adapter'

import { apiClient } from './client'

type Post = {
  id: string
  title: string
  excerpt: string
}

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
]

const mock = new MockAdapter(apiClient, { delayResponse: 400 })

mock.onGet('/posts').reply(200, { posts })

export function setupMockApi() {
  return mock
}
