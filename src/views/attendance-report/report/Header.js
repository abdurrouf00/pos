import React from 'react'

export default function Header({ title, date }) {
  return (
    <div className='text-center flex flex-col gap-4'>
      <div className=''>
        <h4 className='text-2xl font-medium'>Muktodhara Technology Limited</h4>
        <p className='text-sm text-gray-600'>No compromise with quality</p>
      </div>
      <div>
        {title && <h4 className='text-xl'>{title}</h4>}
        {date && <p>{date}</p>}
      </div>
    </div>
  )
}
