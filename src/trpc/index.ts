import { auth } from '~/auth'
import { publicProcedure, router } from './trpc'

export const appRouter = router({
  hello: publicProcedure.query(async ({ ctx }) => {
    const session = await auth.api.getSession({
      headers: ctx.request.headers,
    })

    console.log(session)

    return 'hello from trpc!'
  }),
})

export type AppRouter = typeof appRouter
