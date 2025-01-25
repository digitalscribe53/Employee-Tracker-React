import React from 'react'

const Tabs = ({ value, onValueChange, children }) => {
  const childrenWithProps = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { value, onValueChange });
    }
    return child;
  });
  return <div>{childrenWithProps}</div>;
};

const TabsList = ({ children, value, onValueChange }) => {
  const childrenWithProps = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { value, onValueChange });
    }
    return child;
  });
  return <div className="inline-flex">{childrenWithProps}</div>;
};

const TabsTrigger = ({ value, onValueChange, children }) => {
  return (
    <button 
      onClick={() => onValueChange(value)}
      className="px-3 py-1.5"
    >
      {children}
    </button>
  );
};

const TabsContent = ({ value, activeValue, children }) => {
  return value === activeValue ? <div>{children}</div> : null
}

export { Tabs, TabsList, TabsTrigger, TabsContent }