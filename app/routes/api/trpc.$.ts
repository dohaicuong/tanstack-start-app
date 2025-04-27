import { createAPIFileRoute } from '@tanstack/react-start/api'
import { fetchRequestHandler } from '@trpc/server/adapters/fetch'
import { appRouter } from '~/trpc'

export const APIRoute = createAPIFileRoute('/api/trpc/$')({
  GET: ({ request }) => {
    return fetchRequestHandler({
      endpoint: '/api/trpc',
      req: request,
      router: appRouter,
      createContext: () => ({ request }),
    })
  },
  POST: ({ request }) => {
    return fetchRequestHandler({
      endpoint: '/api/trpc',
      req: request,
      router: appRouter,
      createContext: () => ({ request }),
    })
  },
})
