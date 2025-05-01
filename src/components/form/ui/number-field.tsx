import { useStore } from '@tanstack/react-form'
import { css } from 'styled-system/css'
import { SystemStyleObject } from 'styled-system/types'
import type { ZodError } from 'zod'
import { Field } from '~/components/ui/field'
import {
  NumberInput,
  type NumberInputProps,
} from '~/components/ui/number-input'
import { useFieldContext, useFormContext } from '../context'

export type NumberFieldProps = Omit<
  NumberInputProps,
  'name' | 'value' | 'onChange' | 'onValueChange'
> & {
  invalid?: boolean
  disabled?: boolean

  label?: React.ReactNode
  helperText?: React.ReactNode
}

export const NumberField: React.FC<NumberFieldProps> = ({
  invalid,
  disabled,
  label,
  helperText,
  ...props
}) => {
  const form = useFormContext()
  const isSubmitting = useStore(form.store, (state) => state.isSubmitting)

  const field = useFieldContext<number>()
  const errors = useStore(
    field.store,
    (state) => state.meta.errors as ZodError[],
  )

  return (
    <Field.Root
      invalid={invalid || Boolean(field.state.meta.errors.length)}
      disabled={disabled || isSubmitting}
    >
      {label && <Field.Label>{label}</Field.Label>}
      <NumberInput
        {...props}
        name={field.name}
        value={String(field.state.value || 0)}
        onValueChange={(details) => field.handleChange(details.valueAsNumber)}
      />
      {helperText && <Field.HelperText>{helperText}</Field.HelperText>}
      {errors.map((error) => (
        <Field.ErrorText key={error.message}>{error.message}</Field.ErrorText>
      ))}
    </Field.Root>
  )
}
