import { initTRPC } from '@trpc/server'

const t = initTRPC.context<{ request: Request }>().create()

export const router = t.router

export const publicProcedure = t.procedure
