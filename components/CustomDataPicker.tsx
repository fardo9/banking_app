'use client'

import * as React from 'react'
import { format, parseISO } from 'date-fns'
import {
  FormControl,
  FormDescription,
  FormField,
  FormLabel,
  FormMessage,
  Input,
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Calendar,
} from '@components/ui'

import { cn } from '@lib/utils'

import { CalendarIcon } from 'lucide-react'
import { Control, FieldPath } from 'react-hook-form'
import { authFormSchema } from '@lib/schema'
import { z } from 'zod'

const formSchema = authFormSchema('sign-up')

interface DataPickersProps {
  control: Control<z.infer<typeof formSchema>>
  name: FieldPath<z.infer<typeof formSchema>>
  label: string
  placeholder?: string
  description?: string
}

const CustomDataPicker = ({
  control,
  name,
  label,
  placeholder,
  description,
}: DataPickersProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const selectedDate = field.value
          ? typeof field.value === 'string'
            ? parseISO(field.value)
            : field.value
          : undefined

        return (
          <div className="form-item">
            <FormLabel className="form-label">{label}</FormLabel>
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant={'outline'}
                    className={cn(
                      'w-[240px] pl-3 text-left font-normal',
                      !field.value && 'text-muted-foreground'
                    )}
                  >
                    {selectedDate ? (
                      format(selectedDate, 'PPP')
                    ) : (
                      <span>Pick a date</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) =>
                    field.onChange(date ? format(date, 'yyyy-MM-dd') : null)
                  } // Отправляем строку в формате yyyy-MM-dd
                  disabled={(date) =>
                    date > new Date() || date < new Date('1900-01-01')
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            {description && <FormDescription>{description}</FormDescription>}
            <FormMessage className="form-message mt-2" />
          </div>
        )
      }}
    />
  )
}

export default CustomDataPicker
