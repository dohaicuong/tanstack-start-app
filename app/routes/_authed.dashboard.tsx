import { createFileRoute } from '@tanstack/react-router'
import { css } from 'styled-system/css'
import z from 'zod'
import { authClient } from '~/auth-client'
import { useAppForm } from '~/components/form'
import { Button } from '~/components/ui/button'

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
  select: z.string().min(1, 'required!'),
  date: z.iso.date(),
  date_range: z.iso.date().array(),
  switch: z.literal(true, 'must agree with conditions!'),
})

const ShowcaseForm = () => {
  const form = useAppForm({
    defaultValues: {
      text: '',
      number: 7,
      select: '',
      date: '',
      date_range: ['', ''],
      switch: false,
    },
    validators: {
      onChange: formSchema,
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
          width: '400px',
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
                { label: 'React', value: 'react', group: 'Framework' },
                { label: 'Solid', value: 'solid', group: 'Framework' },
                { label: 'Vue', value: 'vue', group: 'Framework' },
                {
                  label: 'Svelte',
                  value: 'svelte',
                  disabled: true,
                  group: 'Framework',
                },
              ]}
            />
          )}
        </form.AppField>

        <form.AppField name="date">
          {(field) => <field.DateField label="Date Field" />}
        </form.AppField>

        <form.AppField name="date_range">
          {(field) => <field.DateRangeField label="Date Range Field" />}
        </form.AppField>

        <form.AppField name="switch">
          {(field) => <field.SwitchField label="Switch Field" />}
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
