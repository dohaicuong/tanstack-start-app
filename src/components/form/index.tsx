import { createFormHook } from '@tanstack/react-form'
import { fieldContext, formContext } from './context'
import { DateField } from './ui/date-field'
import { DateRangeField } from './ui/date-range-field'
import { FormButton } from './ui/form-button'
import { NumberField } from './ui/number-field'
import { SelectField } from './ui/select-field'
import { SwitchField } from './ui/switch-field'
import { TextField } from './ui/text-field'
import { TextAreaField } from './ui/textarea-field'

export const { useAppForm } = createFormHook({
  fieldComponents: {
    TextField,
    NumberField,
    TextAreaField,
    SelectField,
    DateField,
    DateRangeField,
    SwitchField,
  },
  formComponents: {
    FormButton,
  },
  fieldContext,
  formContext,
})
