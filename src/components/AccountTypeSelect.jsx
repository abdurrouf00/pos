import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Label } from './ui/label'
import { Fragment } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Button } from './ui/button'

export default function AccountTypeSelect({ label, data = [], onChange, value, ...props }) {
  return (
    <div>
      {label && <Label>{label}</Label>}

      <Select value={value} onValueChange={onChange} {...props}>
        <SelectTrigger className="w-full ">
          <SelectValue placeholder="Select a Account Type" />
        </SelectTrigger>
        <SelectContent className="max-h-[300px] overflow-y-auto">
          {Object.keys(data).map(key => (
            <Fragment key={key}>
              <SelectGroup key={key}>
                <SelectLabel className={'text-xs'}>{key}</SelectLabel>
                {data[key].map(item => (
                  <SelectItem
                    className={'text-sm py-2 cursor-pointer'}
                    key={item.id}
                    value={item.id}
                  >
                    {item.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </Fragment>
          ))}
          {/* {
          data.map((item) => (
            <Fragment key={item.id}>
               <SelectGroup key={item.id}>
              <SelectLabel>{item.name}</SelectLabel>
              {item.children.map((child) => (
                <SelectItem key={child.id} value={child.id}>{child.name}</SelectItem>
              ))}
              </SelectGroup>
            </Fragment>
          ))
        } */}
        </SelectContent>
      </Select>
    </div>
  )
}
