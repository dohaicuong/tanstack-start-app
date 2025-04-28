import { createFormHook } from '@tanstack/react-form'
import { fieldContext, formContext } from './context'
import { FormButton } from './ui/form-button'
import { NumberField } from './ui/number-field'
import { TextField } from './ui/text-field'

export const { useAppForm } = createFormHook({
  fieldComponents: {
    TextField,
    NumberField,
  },
  formComponents: {
    FormButton,
  },
  fieldContext,
  formContext,
})
