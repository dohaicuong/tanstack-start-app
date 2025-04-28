import { createFileRoute, redirect } from '@tanstack/react-router'
import { zodValidator } from '@tanstack/zod-adapter'
import { css } from 'styled-system/css'
import z from 'zod'
import { authClient } from '~/auth-client'
import { useAppForm } from '~/components/form'

export const Route = createFileRoute('/_auth/reset-password')({
  component: RouteComponent,
  validateSearch: zodValidator(
    z.object({
      token: z.string(),
    }),
  ),
  beforeLoad: ({ search }) => {
    if (!search.token) {
      throw redirect({ to: '/' })
    }
  },
})

const resetPasswordSchema = z.object({
  token: z.string(),
  newPassword: z.string().min(8, 'at least 8 characters'),
})

function RouteComponent() {
  const { token } = Route.useSearch()
  const navigate = Route.useNavigate()

  const form = useAppForm({
    defaultValues: {
      token,
      newPassword: '',
    },
    validators: {
      onSubmit: resetPasswordSchema,
    },
    onSubmit: (data) => {
      authClient.resetPassword(data.value)
      navigate({ to: '/' })
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
        <form.AppField name="token">
          {(field) => <field.TextField label="Token" disabled />}
        </form.AppField>

        <form.AppField name="newPassword">
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
          <form.FormButton type="submit">set new password</form.FormButton>
        </div>
      </form>
    </form.AppForm>
  )
}
