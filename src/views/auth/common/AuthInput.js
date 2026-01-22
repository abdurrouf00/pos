import { Label } from '@/components/ui/label';
import { Eye, EyeOff } from 'lucide-react'
import React, { useState } from 'react'

export default function AuthInput({ label, type = 'text', name, value, onChange, placeholder, ...props }) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="w-full relative ">
      <Label className="block   text-xs font-medium mb-1.5">{label}</Label>
      <div className='relative w-full'>
        <input
          value={value}
          id={name}
          name={name}
          type={type === 'password' && showPassword ? 'text' : type}
          onChange={onChange}
          placeholder={placeholder ?? label}
          className="w-full border border-neutral-200  px-3 py-1.5 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400 focus:px-4 transition-all duration-300 focus:shadow-md shadow-blue-300 text-sm"
          {...props}
        />
        {type === 'password' && <div onClick={() => setShowPassword(!showPassword)} className='absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer'>{showPassword ? <Eye size={16} /> : <EyeOff size={16} />}</div>}
      </div>
    </div>
  )
}
