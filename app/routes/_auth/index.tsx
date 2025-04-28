import { createFileRoute, redirect } from '@tanstack/react-router'
import { css } from 'styled-system/css'
import { z } from 'zod'
import { useAppForm } from '~/components/form'

import { useState } from 'react'
import { authClient } from '~/auth-client'
import { Button } from '~/components/ui/button'
import { Dialog } from '~/components/ui/dialog'
import { Heading } from '~/components/ui/heading'
import { Link } from '~/components/ui/link'

export const Route = createFileRoute('/_auth/')({
  beforeLoad: (ctx) => {
    if (ctx.context.session) {
      return redirect({ href: '/dashboard' })
    }
  },
  component: Home,
})

function Home() {
  const [forgotPasswordDialogOpen, setForgotPasswordDialogOpen] =
    useState(false)
  const navigate = Route.useNavigate()

  return (
    <Dialog.Root
      open={forgotPasswordDialogOpen}
      onOpenChange={(details) => setForgotPasswordDialogOpen(details.open)}
    >
      <LoginForm
        onSignedIn={() => navigate({ to: '/dashboard' })}
        passwordAction={
          <Dialog.Trigger asChild>
            <Link textStyle="xs">Forgot password?</Link>
          </Dialog.Trigger>
        }
        secondaryAction={
          <Button
            variant="ghost"
            type="button"
            onClick={() => navigate({ to: '/signup' })}
          >
            create account
          </Button>
        }
      />
      <ForgotPasswordDialog
        onClose={() => setForgotPasswordDialogOpen(false)}
      />
    </Dialog.Root>
  )
}

type LoginFormProps = {
  onSignedIn: () => void
  passwordAction?: React.ReactNode
  secondaryAction?: React.ReactNode
}

const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(8, 'at least 8 characters'),
})

const LoginForm = ({
  onSignedIn,
  passwordAction,
  secondaryAction,
}: LoginFormProps) => {
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
      onSignedIn()
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

        {passwordAction}

        <div
          className={css({
            display: 'flex',
            gap: '2',
            justifyContent: 'flex-end',
            marginTop: '6',
          })}
        >
          {secondaryAction}
          <form.FormButton type="submit">login</form.FormButton>
        </div>
      </form>
    </form.AppForm>
  )
}

type ForgotPasswordDialogProps = {
  onClose: () => void
}

const forgotPasswordSchema = z.object({
  email: z.email(),
})

const ForgotPasswordDialog = ({ onClose }: ForgotPasswordDialogProps) => {
  const form = useAppForm({
    defaultValues: {
      email: '',
    },
    validators: {
      onSubmit: forgotPasswordSchema,
    },
    onSubmit: async (data) => {
      await authClient.forgetPassword({
        email: data.value.email,
        redirectTo: '/reset-password',
      })
      onClose
    },
  })

  return (
    <>
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
          <Heading as="h1" size="lg">
            Send reset password email
          </Heading>
          <form.AppForm>
            <form
              className={css({
                display: 'flex',
                flexDirection: 'column',
                gap: '4',
              })}
              onSubmit={(e) => {
                form.handleSubmit()
              }}
            >
              <form.AppField name="email">
                {(field) => <field.TextField label="your email" />}
              </form.AppField>
              <div
                className={css({ display: 'flex', justifyContent: 'flex-end' })}
              >
                <Button variant="ghost" onClick={onClose}>
                  cancel
                </Button>
                <form.FormButton type="submit">send link</form.FormButton>
              </div>
            </form>
          </form.AppForm>
        </Dialog.Content>
      </Dialog.Positioner>
    </>
  )
}
