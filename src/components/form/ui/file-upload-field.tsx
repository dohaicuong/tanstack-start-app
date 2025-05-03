import { type UseFileUploadProps, useFileUpload } from '@ark-ui/react'
import { useStore } from '@tanstack/react-form'
import { FileIcon } from 'lucide-react'
import { useMemo } from 'react'
import type { ZodError } from 'zod'
import { Button } from '~/components/ui/button'
import { Field } from '~/components/ui/field'
import { FileUpload } from '~/components/ui/file-upload'
import { useFieldContext, useFormContext } from '../context'

export type FileUploadFieldProps = Omit<
  UseFileUploadProps,
  'name' | 'value' | 'onChange'
> & {
  invalid?: boolean
  disabled?: boolean

  label?: React.ReactNode
  helperText?: React.ReactNode
}

export const FileUploadField: React.FC<FileUploadFieldProps> = ({
  invalid,
  disabled,
  label,
  helperText,
  ...props
}) => {
  const form = useFormContext()
  const isSubmitting = useStore(form.store, (state) => state.isSubmitting)

  const field = useFieldContext<File[]>()
  const errors = useStore(
    field.store,
    (state) => state.meta.errors as ZodError[],
  )

  const fieldInvalid = useMemo(() => {
    return Boolean(invalid || field.state.meta.errors.length)
  }, [invalid, field.state.meta.errors.length])

  const fieldDisabled = useMemo(() => {
    return disabled || isSubmitting
  }, [disabled, isSubmitting])

  const fileUpload = useFileUpload({
    ...props,
    invalid: fieldInvalid,
    disabled: fieldDisabled,
    onFileAccept: (details) => field.handleChange(details.files),
  })

  return (
    <Field.Root invalid={fieldInvalid} disabled={fieldDisabled}>
      <FileUpload.RootProvider value={fileUpload}>
        <FileUpload.Dropzone>
          <FileUpload.Label>Drop your files here</FileUpload.Label>
          <FileUpload.Trigger asChild>
            <Button size="sm">Open Dialog</Button>
          </FileUpload.Trigger>
        </FileUpload.Dropzone>

        <FileUpload.ItemGroup>
          <FileUpload.Context>
            {({ acceptedFiles }) => {
              return acceptedFiles.map((file) => (
                <FileUpload.Item key={file.name} file={file}>
                  <FileUpload.ItemPreview type="image/*">
                    <FileUpload.ItemPreviewImage />
                  </FileUpload.ItemPreview>
                  <FileUpload.ItemPreview type=".*">
                    <FileIcon />
                  </FileUpload.ItemPreview>
                  <FileUpload.ItemName />
                  <FileUpload.ItemSizeText />
                  <FileUpload.ItemDeleteTrigger>X</FileUpload.ItemDeleteTrigger>
                </FileUpload.Item>
              ))
            }}
          </FileUpload.Context>
        </FileUpload.ItemGroup>

        <FileUpload.HiddenInput />
      </FileUpload.RootProvider>

      {helperText && <Field.HelperText>{helperText}</Field.HelperText>}
      {errors.map((error) => (
        <Field.ErrorText key={error.message}>{error.message}</Field.ErrorText>
      ))}
    </Field.Root>
  )
}
