import React from 'react'

export default function AuthButton({ loading = false, children, ...props }) {
  return (
    <button
      type="submit"
      className="w-full rounded bg-[#10a6ed] text-white py-2 transition-all cursor-pointer duration-500 mt-2 hover:shadow-md hover:shadow-blue-300 font-bold disabled:opacity-70 disabled:cursor-not-allowed"
      disabled={loading}
      {...props}
    >
      {children}
    </button>
  )
}
