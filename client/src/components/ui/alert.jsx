import React from 'react'

const Alert = ({ children, className }) => {
  return (
    <div className={`bg-red-50 border border-red-200 text-red-800 rounded-lg p-4 ${className}`} role="alert">
      {children}
    </div>
  )
}

const AlertDescription = ({ children, className }) => {
  return (
    <div className={`text-sm ${className}`}>
      {children}
    </div>
  )
}

export { Alert, AlertDescription }