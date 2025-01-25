import React from 'react'

const Tabs = ({ value, onValueChange, children }) => {
  return (
    <div className="w-full">
      {React.Children.map(children, child => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { activeValue: value, onValueChange })
        }
        return child
      })}
    </div>
  )
}

const TabsList = ({ children, className = '' }) => {
  return (
    <div className={`inline-flex h-10 items-center justify-center rounded-lg bg-gray-100 p-1 text-gray-500 ${className}`}>
      {children}
    </div>
  )
}

const TabsTrigger = ({ value, activeValue, onValueChange, children }) => {
  const isSelected = value === activeValue
  
  return (
    <button
      className={`inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50
        ${isSelected ? 'bg-white text-gray-950 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
      onClick={() => onValueChange(value)}
    >
      {children}
    </button>
  )
}

const TabsContent = ({ value, activeValue, children }) => {
  if (value !== activeValue) return null
  
  return (
    <div className="mt-2">
      {children}
    </div>
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent }