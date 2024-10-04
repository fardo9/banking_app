import React from 'react'
import {
  FormControl,
  FormDescription,
  FormField,
  FormLabel,
  FormMessage,
  Input,
} from '@components/ui'
import { Control, FieldPath } from 'react-hook-form'
import { z } from 'zod'
import { authFormSchema } from '@lib/schema'

const formSchema = authFormSchema('sign-up')

interface CustomInputProps {
  control: Control<z.infer<typeof formSchema>>
  name: FieldPath<z.infer<typeof formSchema>>
  label: string
  placeholder?: string
  description?: string
}

const CustomInput = ({
  control,
  name,
  label,
  placeholder,
  description,
}: CustomInputProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <div className="form-item">
          <FormLabel className="form-label">{label}</FormLabel>
          <div className="flex w-full flex-col">
            <FormControl>
              <Input
                placeholder={placeholder}
                className="input-class placeholder:text-sm"
                type={name === 'password' ? 'password' : 'text'}
                {...field}
                value={field.value || ''}
              />
            </FormControl>
            {description && <FormDescription>{description}</FormDescription>}
            <FormMessage className="form-message mt-2" />
          </div>
        </div>
      )}
    />
  )
}

export default CustomInput
