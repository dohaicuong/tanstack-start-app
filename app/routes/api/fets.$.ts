import { createAPIFileRoute } from '@tanstack/react-start/api'
import { fetsRouter } from '~/fets'

export const APIRoute = createAPIFileRoute('/api/fets/$')({
  GET: async ({ request }) => {
    const res = await fetsRouter(request)
    return new Response(res.body, res)
  },
})
