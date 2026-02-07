'use client'

import { cn } from '@/lib/utils'
import clsx from 'clsx'
import { ChevronDown } from 'lucide-react'
import { Component } from 'react'
import { Label } from '../ui/label'
import CustomSelect from '../CustomSelect'

class HrSelect extends Component {
  render() {
    const {
      name,
      label,
      value,
      onChange,
      placeholder,
      className,
      options = [],
      children = null,
      required = false,
      error,
      ...props
    } = this.props
    const ariaInvalid = props['aria-invalid'] || error
    return (
      <div className="flex flex-col w-full space-y-1.5 ">
        {label && (
          <Label
            className={cn(required && "after:content-['*'] after:ml-[-0.4rem] after:text-red-500")}
            htmlFor={name}
          >
            {label}
          </Label>
        )}
        {/* <div className="relative ">
          <select
            {...props}
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            className={clsx(
              "w-full border border-gray-200 rounded-md px-4 py-2  disabled:bg-gray-100",
              "appearance-none bg-white pr-10 text-sm",
              "focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:shadow-md shadow-blue-300 focus:px-6 transition-all duration-300 ",
              "aria-invalid:border-red-500 aria-invalid:focus-visible:ring-red-500/30 aria-invalid:focus-visible:border-red-500",
              error && "border-red-500",
              className
            )}
            required={required}
          >
            {children
              ? children
              : options.map((option, index) => (
                  <option key={option.value ?? index} value={option.value}>
                    {option.label}
                  </option>
                ))}
            <option className="py-4" value="">
              {placeholder}
            </option>
          </select>
          <div className="absolute top-1/2 -translate-y-1/2 right-0 flex items-center pr-3 pointer-events-none ">
            <ChevronDown className="h-4 w-4 text-gray-400" />
          </div>
        </div> */}
        <CustomSelect
          options={options}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={className}
          name={name}
          error={ariaInvalid}
        />
      </div>
    )
  }
}

export default HrSelect

export const mapOptions = (data, labelKey = 'name', valueKey = 'id') =>
  data?.map(item => ({
    label: item[labelKey],
    value: item[valueKey],
  })) || []
