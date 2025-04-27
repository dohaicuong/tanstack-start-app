import { createClient } from 'fets'

import { queryOptions } from '@tanstack/react-query'
import type { fetsRouter } from '.'

export const fetsClient = createClient<typeof fetsRouter>({
  endpoint: 'http://localhost:3000',
})

export const fetsHelloQueryOptions = () => {
  return queryOptions({
    queryKey: ['/api/fets/hello', 'get'],
    queryFn: () => fetsClient['/api/fets/hello'].get().json(),
  })
}
