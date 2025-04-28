import { createFileRoute } from '@tanstack/react-router'
import { css } from 'styled-system/css'
import z from 'zod'
import { authClient } from '~/auth-client'
import { useAppForm } from '~/components/form'
import { Button } from '~/components/ui/button'

export const Route = createFileRoute('/_auth/signup')({
  component: RouteComponent,
})

const signupSchema = z.object({
  name: z.string(),
  email: z.email(),
  password: z.string().min(8, 'at least 8 characters'),
})

function RouteComponent() {
  const navigate = Route.useNavigate()

  const form = useAppForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
    validators: {
      onSubmit: signupSchema,
    },
    onSubmit: async (data) => {
      await authClient.signUp.email(data.value)
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
        <form.AppField name="name">
          {(field) => <field.TextField label="Your name" />}
        </form.AppField>

        <form.AppField name="email">
          {(field) => <field.TextField label="Email" />}
        </form.AppField>

        <form.AppField name="password">
          {(field) => <field.TextField label="Password" type="password" />}
        </form.AppField>

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
            onClick={() => navigate({ to: '/' })}
          >
            login instead
          </Button>
          <form.FormButton type="submit">sign up</form.FormButton>
        </div>
      </form>
    </form.AppForm>
  )
}
