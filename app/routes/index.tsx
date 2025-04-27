import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { useEffect } from 'react'
import { authClient } from '~/auth-client'
import { Spinner } from '~/components/ui/spinner'
import { db } from '~/db'
import { postTable } from '~/db/schema'
import { fetsClient, fetsHelloQueryOptions } from '~/fets/client'
import { useTRPC } from '~/trpc/client'

export const getPost = createServerFn().handler(async () => {
  return db.select().from(postTable)
})

export const Route = createFileRoute('/')({
  component: Home,
  loader: async () => {
    return {
      // posts: await getPost(),
    }
  },
})

function Home() {
  // const state = Route.useLoaderData()

  return (
    <div>
      <Auth />
      <Fets />
      <Trpc />
    </div>
  )
}

const Auth = () => {
  const { data, isPending } = authClient.useSession()

  if (isPending) return <Spinner />

  return (
    <p>
      {data?.user.name} {data?.user.email}
    </p>
  )
}

const Fets = () => {
  const request = useQuery(fetsHelloQueryOptions())

  if (request.isLoading) return <Spinner />

  return <p>{request.data?.message}</p>
}

const Trpc = () => {
  const trpc = useTRPC()

  const request = useQuery(trpc.hello.queryOptions())

  if (request.isLoading) return <Spinner />

  return <p>{request.data}</p>
}
