import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { css } from 'styled-system/css'
import z, { number } from 'zod'
import { authClient } from '~/auth-client'
import { useAppForm } from '~/components/form'
import { Button } from '~/components/ui/button'
import { Spinner } from '~/components/ui/spinner'
import { useTRPC } from '~/trpc/client'

export const Route = createFileRoute('/_authed/dashboard')({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = Route.useNavigate()

  return (
    <div>
      <Button
        onClick={async () => {
          await authClient.signOut()
          navigate({ to: '/' })
        }}
      >
        Logout
      </Button>
      <ShowcaseForm />
    </div>
  )
}

const formSchema = z.object({
  text: z.string().min(8, 'minimun length 8'),
  number: z.number().min(8, 'minumum value 8'),
})

const ShowcaseForm = () => {
  const form = useAppForm({
    defaultValues: {
      text: '',
      number: 10,
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: (data) => console.log(data.value),
  })

  return (
    <form.AppForm>
      <form
        className={css({
          marginTop: '12',
          marginLeft: '12',
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
        <form.AppField name="text">
          {(field) => <field.TextField label="Text Field" />}
        </form.AppField>

        <form.AppField name="number">
          {(field) => <field.NumberField label="Text Field" />}
        </form.AppField>
        <div
          className={css({
            display: 'flex',
            gap: '2',
            justifyContent: 'flex-end',
            marginTop: '6',
          })}
        >
          <form.FormButton type="submit">submit</form.FormButton>
        </div>
      </form>
    </form.AppForm>
  )
}
