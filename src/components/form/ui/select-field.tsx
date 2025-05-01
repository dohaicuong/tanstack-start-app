import { Portal, createListCollection } from '@ark-ui/react'
import { useStore } from '@tanstack/react-form'
import { CheckIcon, ChevronsUpDownIcon } from 'lucide-react'
import { css } from 'styled-system/css'
import type { ZodError } from 'zod'
import { Field } from '~/components/ui/field'
import { Select } from '~/components/ui/select'
import { useFieldContext, useFormContext } from '../context'

export type SelectFieldProps = Omit<
  Select.RootProps,
  'name' | 'value' | 'onChange' | 'collection' | 'children'
> & {
  invalid?: boolean
  disabled?: boolean

  label?: React.ReactNode
  helperText?: React.ReactNode

  items: {
    label: string
    value: string
    group: string
    disabled?: boolean
  }[]
}

export const SelectField: React.FC<SelectFieldProps> = ({
  invalid,
  disabled,
  label,
  helperText,
  items,
  ...props
}) => {
  const form = useFormContext()
  const isSubmitting = useStore(form.store, (state) => state.isSubmitting)

  const field = useFieldContext<string>()
  const errors = useStore(
    field.store,
    (state) => state.meta.errors as ZodError[],
  )

  const collection = createListCollection({
    items,
    groupBy: (item) => item.group,
  })

  return (
    <Field.Root
      invalid={invalid || Boolean(field.state.meta.errors.length)}
      disabled={disabled || isSubmitting}
    >
      <Select.Root
        {...props}
        collection={collection}
        invalid={invalid || Boolean(field.state.meta.errors.length)}
        disabled={disabled || isSubmitting}
        positioning={{ sameWidth: true, ...props.positioning }}
        name={field.name}
        value={field.state.value ? [field.state.value] : undefined}
        onValueChange={(details) => {
          field.handleChange(details.value[0])
        }}
      >
        {label && <Select.Label>{label}</Select.Label>}
        <Select.Control>
          {/* @ts-ignore */}
          <Select.Trigger
            aria-invalid={
              invalid || field.state.meta.errors.length ? true : null
            }
            className={css({
              _invalid: {
                borderColor: 'border.error',
              },
              _focus: {
                _invalid: {
                  boxShadow: '0 0 0 1px var(--colors-border-error)',
                },
              },
            })}
          >
            <Select.ValueText />
            <ChevronsUpDownIcon />
          </Select.Trigger>
        </Select.Control>
        <Portal>
          <Select.Positioner>
            <Select.Content>
              {collection.group().map(([group, items]) => (
                <Select.ItemGroup key={group}>
                  <Select.ItemGroupLabel>{group}</Select.ItemGroupLabel>
                  {items.map((item) => (
                    <Select.Item key={item.value} item={item}>
                      <Select.ItemText>{item.label}</Select.ItemText>
                      <Select.ItemIndicator>
                        <CheckIcon />
                      </Select.ItemIndicator>
                    </Select.Item>
                  ))}
                </Select.ItemGroup>
              ))}
            </Select.Content>
          </Select.Positioner>
        </Portal>
        <Select.HiddenSelect />
      </Select.Root>
      {helperText && <Field.HelperText>{helperText}</Field.HelperText>}
      {errors.map((error) => (
        <Field.ErrorText key={error.message}>{error.message}</Field.ErrorText>
      ))}
    </Field.Root>
  )
}
