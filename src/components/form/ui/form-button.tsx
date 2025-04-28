import { Button, type ButtonProps } from '../../ui/button'
import { useFormContext } from '../context'

export const FormButton: React.FC<ButtonProps> = (props) => {
  const form = useFormContext()

  return (
    <form.Subscribe selector={(state) => state.isSubmitting}>
      {(isSubmitting) => (
        <Button
          {...props}
          disabled={props.disabled || isSubmitting}
          loading={props.loading || isSubmitting}
        />
      )}
    </form.Subscribe>
  )
}
