import React, { useState } from 'react'

const Select = ({ children, defaultValue, onChange }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedValue, setSelectedValue] = useState(defaultValue)

  return (
    <div className="relative">
      <SelectTrigger 
        value={selectedValue} 
        onClick={() => setIsOpen(!isOpen)}
      />
      {isOpen && (
        <SelectContent 
          onSelect={(value) => {
            setSelectedValue(value)
            onChange?.(value)
            setIsOpen(false)
          }}
        >
          {children}
        </SelectContent>
      )}
    </div>
  )
}

const SelectTrigger = ({ value, onClick }) => (
  <button
    onClick={onClick}
    className="flex h-10 w-full items-center justify-between rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2"
  >
    <span>{value || 'Select an option'}</span>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 opacity-50"
    >
      <path d="m6 9 6 6 6-6"/>
    </svg>
  </button>
)

const SelectContent = ({ children, onSelect }) => (
  <div className="absolute top-full z-50 mt-1 max-h-60 w-full overflow-hidden rounded-md border bg-white text-gray-950 shadow-md">
    <div className="p-1">{children}</div>
  </div>
)

const SelectItem = ({ children, value }) => (
  <div
    className="relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 px-2 text-sm outline-none hover:bg-gray-100"
    onClick={() => {
      const select = document.querySelector('select')
      if (select) {
        select.value = value
        select.dispatchEvent(new Event('change', { bubbles: true }))
      }
    }}
  >
    {children}
  </div>
)

const SelectValue = ({ placeholder = "Select an option" }) => <span>{placeholder}</span>

export { Select, SelectContent, SelectItem, SelectTrigger, SelectValue }