import { useQuery } from '@tanstack/react-query'
import { createFileRoute, redirect } from '@tanstack/react-router'
import { css } from 'styled-system/css'
import { z } from 'zod'
import { useAppForm } from '~/components/form'
import { Heading } from '~/components/ui/heading'
import { Spinner } from '~/components/ui/spinner'
import { Text } from '~/components/ui/text'
import { useTRPC } from '~/trpc/client'

import { authClient } from '~/auth-client'
import { Button } from '~/components/ui/button'
import { Link } from '~/components/ui/link'
// @ts-ignore
import miku from './miku.png?url'

export const Route = createFileRoute('/_auth/')({
  beforeLoad: (ctx) => {
    if (ctx.context.session) {
      return redirect({ href: '/dashboard' })
    }
  },
  component: Home,
})

const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(8, 'at least 8 characters'),
})

function Home() {
  const navigate = Route.useNavigate()

  const form = useAppForm({
    defaultValues: {
      email: '',
      password: '',
    },
    validators: {
      onSubmit: loginSchema,
    },
    onSubmit: async (data) => {
      await authClient.signIn.email({
        email: data.value.email,
        password: data.value.password,
      })
      navigate({ to: '/dashboard' })
    },
  })

  return (
    <form.AppForm>
      <form
        className={css({
          marginTop: '12',
          display: 'flex',
          flexDir: 'column',
          gap: '4',
          width: '256px',
          smDown: {
            width: '100%',
            alignItems: 'center',
          },
        })}
        onSubmit={(e) => {
          e.preventDefault()
          form.handleSubmit()
        }}
      >
        <form.AppField name="email">
          {(field) => <field.TextField label="Email" />}
        </form.AppField>

        <form.AppField name="password">
          {(field) => <field.TextField label="Password" type="password" />}
        </form.AppField>
        <Link textStyle="xs">Forgot password?</Link>

        <div
          className={css({
            display: 'flex',
            gap: '2',
            justifyContent: 'flex-end',
            marginTop: '6',
          })}
        >
          <Button
            variant="ghost"
            type="button"
            onClick={() => navigate({ to: '/signup' })}
          >
            create account
          </Button>
          <form.FormButton type="submit">Login</form.FormButton>
        </div>
      </form>
    </form.AppForm>
  )
}
