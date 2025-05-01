import { createListCollection } from '@ark-ui/react'
import { createFileRoute } from '@tanstack/react-router'
import { CheckIcon } from 'lucide-react'
import { css } from 'styled-system/css'
import z from 'zod'
import { authClient } from '~/auth-client'
import { useAppForm } from '~/components/form'
import { Button } from '~/components/ui/button'
import { Select } from '~/components/ui/select'

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
  select: z.string().min(1, 'required'),
})

const ShowcaseForm = () => {
  const form = useAppForm({
    defaultValues: {
      text: '',
      number: 7,
      select: '',
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
        })}
        onSubmit={(e) => {
          e.preventDefault()
          form.handleSubmit()
        }}
      >
        <form.AppField name="text">
          {(field) => <field.TextField label="Text Field" />}
        </form.AppField>

        <form.AppField name="text">
          {(field) => <field.TextAreaField label="Text Area Field" />}
        </form.AppField>

        <form.AppField name="number">
          {(field) => <field.NumberField label="Number Field" />}
        </form.AppField>

        <form.AppField name="select">
          {(field) => (
            <field.SelectField
              label="Select Field"
              items={[
                { label: 'React', value: 'react', group: 'framework' },
                { label: 'Solid', value: 'solid', group: 'framework' },
                { label: 'Vue', value: 'vue', group: 'framework' },
                {
                  label: 'Svelte',
                  value: 'svelte',
                  disabled: true,
                  group: 'framework',
                },
              ]}
            />
          )}
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
