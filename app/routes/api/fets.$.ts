import { createAPIFileRoute } from '@tanstack/react-start/api'
import { fetsRouter } from '~/fets'

export const APIRoute = createAPIFileRoute('/api/fets/$')({
  GET: async ({ request }) => {
    const res = await fetsRouter(request)
    return new Response(res.body, res)
  },
  POST: async ({ request }) => {
    const res = await fetsRouter(request)
    return new Response(res.body, res)
  },
  PUT: async ({ request }) => {
    const res = await fetsRouter(request)
    return new Response(res.body, res)
  },
  PATCH: async ({ request }) => {
    const res = await fetsRouter(request)
    return new Response(res.body, res)
  },
  DELETE: async ({ request }) => {
    const res = await fetsRouter(request)
    return new Response(res.body, res)
  },
  OPTIONS: async ({ request }) => {
    const res = await fetsRouter(request)
    return new Response(res.body, res)
  },
  HEAD: async ({ request }) => {
    const res = await fetsRouter(request)
    return new Response(res.body, res)
  },
})
