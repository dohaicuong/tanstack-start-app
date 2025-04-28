import { createFileRoute, redirect } from '@tanstack/react-router'
import { css } from 'styled-system/css'
import { z } from 'zod'
import { useAppForm } from '~/components/form'

import { useState } from 'react'
import { authClient } from '~/auth-client'
import { Button } from '~/components/ui/button'
import { Dialog } from '~/components/ui/dialog'
import { Field } from '~/components/ui/field'
import { Link } from '~/components/ui/link'

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

        {/* <ResetPasswordDialog /> */}

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
          <form.FormButton type="submit">login</form.FormButton>
        </div>
      </form>
    </form.AppForm>
  )
}

const ResetPasswordDialog = () => {
  const [email, setEmail] = useState('')
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Link textStyle="xs">Forgot password?</Link>
      </Dialog.Trigger>
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content
          className={css({
            padding: '4',
            display: 'flex',
            flexDirection: 'column',
            gap: '4',
          })}
        >
          <Field.Root>
            <Field.Input
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Field.Root>
          <div>
            <Button
              onClick={() =>
                authClient.forgetPassword({
                  email,
                  redirectTo: '/reset-password',
                })
              }
            >
              send link
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  )
}
