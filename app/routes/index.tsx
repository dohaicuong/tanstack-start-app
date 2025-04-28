import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { css } from 'styled-system/css'
import { z } from 'zod'
import { useAppForm } from '~/components/form'
import { Spinner } from '~/components/ui/spinner'
import { useTRPC } from '~/trpc/client'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return (
    <>
      {/* <Trpc /> */}
      <TestForm />
    </>
  )
}

const Trpc = () => {
  const trpc = useTRPC()

  const request = useQuery(trpc.hello.queryOptions())

  if (request.isLoading) return <Spinner />

  return <p>{request.data}</p>
}

const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
})

const TestForm = () => {
  const form = useAppForm({
    defaultValues: {
      email: '',
      password: '',
    },
    validators: {
      onChange: loginSchema,
    },
    onSubmit: async (data) => {
      console.log(data)
      await new Promise((resolve) => setTimeout(() => resolve({}), 2000))
    },
  })

  return (
    <form.AppForm>
      <form
        className={css({
          maxW: 'sm',
          display: 'flex',
          flexDir: 'column',
          gap: '4',
          margin: '4',
        })}
        onSubmit={(e) => {
          e.preventDefault()
          form.handleSubmit()
        }}
      >
        <form.AppField name="email">
          {(field) => (
            <field.TextField label="Email" placeholder="work email" />
          )}
        </form.AppField>
        <form.AppField name="password">
          {(field) => <field.TextField label="Password" type="password" />}
        </form.AppField>

        <form.FormButton type="submit">Submit</form.FormButton>
      </form>
    </form.AppForm>
  )
}
