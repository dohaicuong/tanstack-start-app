import { useStore } from '@tanstack/react-form'
import { css, cva } from 'styled-system/css'
import type { ZodError } from 'zod'
import { Field } from '~/components/ui/field'
import { Input } from '~/components/ui/input'
import { Switch, type SwitchProps } from '~/components/ui/switch'
import { useFieldContext, useFormContext } from '../context'

export type SwitchFieldProps = Omit<
  SwitchProps,
  'name' | 'checked' | 'onCheckedChange'
> & {
  invalid?: boolean
  disabled?: boolean

  label?: React.ReactNode
  helperText?: React.ReactNode
}

export const SwitchField: React.FC<SwitchFieldProps> = ({
  invalid,
  disabled,
  label,
  helperText,
  ...props
}) => {
  const form = useFormContext()
  const isSubmitting = useStore(form.store, (state) => state.isSubmitting)

  const field = useFieldContext<boolean>()
  const errors = useStore(
    field.store,
    (state) => state.meta.errors as ZodError[],
  )

  return (
    <Field.Root
      invalid={invalid || Boolean(field.state.meta.errors.length)}
      disabled={disabled || isSubmitting}
    >
      <Switch
        {...props}
        invalid={invalid || Boolean(field.state.meta.errors.length)}
        disabled={disabled || isSubmitting}
        name={field.name}
        checked={field.state.value}
        onCheckedChange={(details) => {
          field.handleChange(details.checked)
        }}
        className={invalidControl({
          invalid: invalid || Boolean(field.state.meta.errors.length),
        })}
      >
        {label}
      </Switch>
      {helperText && <Field.HelperText>{helperText}</Field.HelperText>}
      {errors.map((error) => (
        <Field.ErrorText key={error.message}>{error.message}</Field.ErrorText>
      ))}
    </Field.Root>
  )
}

const invalidControl = cva({
  base: {},
  variants: {
    invalid: {
      true: {
        '& > [data-part="control"]': {
          background: 'border.error',
        },
        // '& [data-part="thumb"]': {
        //   background: 'red.9',
        // },
      },
    },
  },
})
