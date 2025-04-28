import { useStore } from '@tanstack/react-form'
import type { ZodError } from 'zod'
import { Field } from '~/components/ui/field'
import { Textarea } from '~/components/ui/textarea'
import { useFieldContext, useFormContext } from '../context'

export type TextAreaFieldProps = Omit<
  Field.TextareaProps,
  'name' | 'value' | 'onChange'
> & {
  invalid?: boolean
  disabled?: boolean

  label?: React.ReactNode
  helperText?: React.ReactNode
}

export const TextAreaField: React.FC<TextAreaFieldProps> = ({
  invalid,
  disabled,
  label,
  helperText,
  ...props
}) => {
  const form = useFormContext()
  const isSubmitting = useStore(form.store, (state) => state.isSubmitting)

  const field = useFieldContext<string>()
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
      <Field.Textarea
        {...props}
        name={field.name}
        value={field.state.value || ''}
        onChange={(e) => field.handleChange(e.target.value)}
        asChild
      >
        <Textarea />
      </Field.Textarea>
      {helperText && <Field.HelperText>{helperText}</Field.HelperText>}
      {errors.map((error) => (
        <Field.ErrorText key={error.message}>{error.message}</Field.ErrorText>
      ))}
    </Field.Root>
  )
}
