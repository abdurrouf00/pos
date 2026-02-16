'use client'

export default function DataBox({
  label,
  value,
  onChange,
  placeholder = '0',
  type = 'number',
  className = '',
  readonly = false,
}) {
  const displayValue =
    readonly && type === 'text'
      ? value || '-'
      : readonly
        ? Number(value || 0).toLocaleString()
        : null

  return (
    <div
      className={`border border-gray-400 bg-white p-1 rounded-sm flex flex-col h-12 ${className}`}
    >
      <span className="text-[10px] text-gray-500 font-medium leading-tight">
        {label}
      </span>
      {readonly ? (
        <div className="text-sm font-bold flex-1 flex items-center">
          {displayValue}
        </div>
      ) : (
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full h-full bg-transparent focus:outline-none text-sm font-bold"
        />
      )}
    </div>
  )
}
