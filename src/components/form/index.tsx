import { createFormHook } from '@tanstack/react-form'
import { fieldContext, formContext } from './context'
import { FormButton } from './ui/form-button'
import { NumberField } from './ui/number-field'
import { SelectField } from './ui/select-field'
import { TextField } from './ui/text-field'
import { TextAreaField } from './ui/textarea-field'

export const { useAppForm } = createFormHook({
  fieldComponents: {
    TextField,
    NumberField,
    TextAreaField,
    SelectField,
  },
  formComponents: {
    FormButton,
  },
  fieldContext,
  formContext,
})
