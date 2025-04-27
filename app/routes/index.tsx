import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { authClient } from '~/auth-client'
import { Spinner } from '~/components/ui/spinner'
import { fetsHelloQueryOptions } from '~/fets/client'
import { useTRPC } from '~/trpc/client'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
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
      Hello from better-auth!{' '}
      {data ? (
        <>
          {data.user.name} {data.user.email}
        </>
      ) : (
        <>No user plz login</>
      )}
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
