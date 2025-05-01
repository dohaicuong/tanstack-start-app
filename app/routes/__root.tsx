import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRoute,
} from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { createServerFn } from '@tanstack/react-start'
import { getWebRequest } from '@tanstack/react-start/server'
import { auth } from '~/auth'
import { TRPCQueryProvider } from '~/trpc/client'
// @ts-ignore
import favicon from '../../public/favicon.ico?url'
// @ts-ignore
import pandaCss from './index.css?url'

const fetchBetterAuth = createServerFn({ method: 'GET' }).handler(async () => {
  // biome-ignore lint/style/noNonNullAssertion:
  const request = getWebRequest()!

  const session = await auth.api.getSession({
    headers: request.headers,
  })

  return session
})

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'TanStack Start Starter',
      },
    ],
    links: [
      { rel: 'stylesheet', href: pandaCss },
      { rel: 'icon', type: 'image/x-icon', href: favicon },
    ],
  }),
  beforeLoad: async () => {
    const res = await fetchBetterAuth()

    return {
      session: res?.session,
      user: res?.user,
    }
  },
  component: RootComponent,
})

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  )
}

function RootDocument({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-AU" className="dark">
      <head>
        <HeadContent />
      </head>
      <body>
        <TRPCQueryProvider>
          {children}
          <TanStackRouterDevtools position="bottom-right" />
          <ReactQueryDevtools buttonPosition="bottom-left" />
        </TRPCQueryProvider>
        <Scripts />
      </body>
    </html>
  )
}
