import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { useEffect } from 'react'
import { authClient } from '~/auth-client'
import { Spinner } from '~/components/ui/spinner'
import { db } from '~/db'
import { postTable } from '~/db/schema'
import { fetsClient, fetsHelloQueryOptions } from '~/fets/client'

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

  const { data, isPending } = authClient.useSession()

  const request = useQuery(fetsHelloQueryOptions())

  if (isPending || request.isLoading) return <Spinner />

  return (
    <div>
      <p>
        {data?.user.name} {data?.user.email}
      </p>
      <p>{request.data?.message}</p>
    </div>
  )
}
