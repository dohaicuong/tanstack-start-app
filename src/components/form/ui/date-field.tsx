import { Portal, parseDate } from '@ark-ui/react'
import { useStore } from '@tanstack/react-form'
import { CalendarIcon } from 'lucide-react'
import { useMemo } from 'react'
import { css } from 'styled-system/css'
import type { ZodError } from 'zod'
import { DatePicker } from '~/components/ui/date-picker'
import { Field } from '~/components/ui/field'
import { IconButton } from '~/components/ui/icon-button'
import { Input } from '~/components/ui/input'
import { useFieldContext, useFormContext } from '../context'
import {
  CalendarDayView,
  CalendarMonthView,
  CalendarYearView,
} from './_date_picker'

export type DateFieldProps = Omit<
  DatePicker.RootProps,
  'name' | 'value' | 'onChange' | 'onValueChange' | 'selectionMode'
> & {
  invalid?: boolean
  disabled?: boolean

  label?: React.ReactNode
  helperText?: React.ReactNode
}

export const DateField: React.FC<DateFieldProps> = ({
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
  const value = useMemo(() => {
    if (!field.state.value.length) return undefined

    return [parseDate(field.state.value)]
  }, [field.state.value])

  return (
    <Field.Root
      invalid={invalid || Boolean(field.state.meta.errors.length)}
      disabled={disabled || isSubmitting}
    >
      <DatePicker.Root
        {...props}
        positioning={{ sameWidth: true, ...props.positioning }}
        disabled={disabled || isSubmitting}
        name={field.name}
        value={value}
        onValueChange={(details) => {
          field.handleChange(details.value[0].toString())
        }}
      >
        {label && <DatePicker.Label>{label}</DatePicker.Label>}

        <DatePicker.Control>
          <DatePicker.Input index={0} asChild>
            {/* @ts-ignore */}
            <Input
              name={field.name}
              aria-invalid={
                invalid || field.state.meta.errors.length ? true : null
              }
            />
          </DatePicker.Input>
          <DatePicker.Trigger asChild>
            {/* @ts-ignore */}
            <IconButton
              variant="outline"
              aria-label="Open date picker"
              aria-invalid={
                invalid || field.state.meta.errors.length ? true : null
              }
              _invalid={css.raw({
                borderColor: 'border.error',
              })}
            >
              <CalendarIcon />
            </IconButton>
          </DatePicker.Trigger>
        </DatePicker.Control>

        <Portal>
          <DatePicker.Positioner>
            <DatePicker.Content>
              <CalendarDayView />
              <CalendarMonthView />
              <CalendarYearView />
            </DatePicker.Content>
          </DatePicker.Positioner>
        </Portal>
      </DatePicker.Root>
      {helperText && <Field.HelperText>{helperText}</Field.HelperText>}
      {errors.map((error) => (
        <Field.ErrorText key={error.message}>{error.message}</Field.ErrorText>
      ))}
    </Field.Root>
  )
}
