'use client'

import { Controller } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { get } from 'react-hook-form'
import { cn } from '@/lib/utils'
import AuthInput from '@/views/auth/common/AuthInput'
import React from 'react'
import HrSwitch from './common/HrSwitch'
import HrSelect from './common/HrSelect'

export const FormField = ({
  form,
  name,
  label,
  type = 'text',
  placeholder,
  required,
  options,
  description,
  loading = false,
  ...props
}) => {
  const {
    control,
    formState: { errors },
  } = form
  const error = get(errors, name)?.message
  if (type === 'switch') {
    return (
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <HrSwitch
            label={label}
            id={name}
            checked={field.value}
            onChange={field.onChange}
            {...props}
          />
        )}
      />
    )
  }
  if (type === 'password') {
    return (
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <AuthInput
            label={label}
            name={name}
            value={field.value}
            type={type}
            onChange={field.onChange}
            placeholder={placeholder}
            required={required}
            error={error}
            aria-invalid={!!error}
            {...props}
          />
        )}
      />
    )
  }
  if (type === 'checkbox') {
    return (
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <div className="flex items-center gap-2">
            <Checkbox
              id={name}
              checked={field.value || false}
              onCheckedChange={field.onChange}
              {...props}
            />
            {label && (
              <Label errors={errors[name]?.message} className="mb-0" htmlFor={name}>
                {label}
              </Label>
            )}
          </div>
        )}
      />
    )
  }

  if (type === 'select') {
    return (
      <div className={cn('flex flex-col ', { 'animate-pulse': loading })}>
        {/* {label && (
          <Label htmlFor={name}>
            {label}
            {required && <span className="text-destructive ml-1">*</span>}
          </Label>
        )} */}
        <Controller
          control={control}
          name={name}
          render={({ field }) => (
           <HrSelect
            name={name}
            label={label}
            value={field.value}
            onChange={field.onChange}
            options={options}
            {...props}
           />
          )}
        />
        {error && <p className="text-sm text-destructive">{error}</p>}
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
      </div>
    )
  }

  if (type === 'textarea') {
    return (
      <div className={cn('flex flex-col ', { 'animate-pulse': loading })}>
        {label && (
          <Label htmlFor={name}>
            {label}
            {required && <span className="text-destructive ml-1">*</span>}
          </Label>
        )}
        <Controller
          control={control}
          name={name}
          render={({ field }) => (
            <Textarea
              id={name}
              placeholder={placeholder}
              {...field}
              value={field.value || ''}
              {...props}
            />
          )}
        />
        {error && <p className="text-sm text-destructive">{error}</p>}
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
      </div>
    )
  }
  return (
    <div className={cn('flex flex-col ', { 'animate-pulse': loading })}>
      {label && (
        <Label htmlFor={name}>
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </Label>
      )}
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <div>
            <Input
              id={name}
              type={type}
              placeholder={placeholder}
              {...field}
              value={field.value || ''}
              error={error}
              aria-invalid={!!error}
              {...props}
            />
            {error && <p className="text-xs text-destructive">{error}</p>}
          </div>
        )}
      />
    </div>
  )
}
