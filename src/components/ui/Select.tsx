import React from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../utils/cn';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  value?: string;
  onValueChange?: (value: string) => void;
}

interface SelectContextType {
  value?: string;
  onValueChange?: (value: string) => void;
}

const SelectContext = React.createContext<SelectContextType>({});

export const Select = React.forwardRef<HTMLDivElement, SelectProps>(
  ({ className, children, value, onValueChange, ...props }, ref) => {
    return (
      <SelectContext.Provider value={{ value, onValueChange }}>
        <div ref={ref} className={cn("relative", className)}>
          {children}
        </div>
      </SelectContext.Provider>
    );
  }
);

Select.displayName = "Select";

interface SelectTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const SelectTrigger = React.forwardRef<HTMLButtonElement, SelectTriggerProps>(
  ({ className, children, ...props }, ref) => {
    const [open, setOpen] = React.useState(false);
    
    return (
      <>
        <button
          ref={ref}
          type="button"
          onClick={() => setOpen(!open)}
          className={cn(
            "flex h-10 w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100",
            className
          )}
          {...props}
        >
          {children}
          <ChevronDown className="h-4 w-4 opacity-50" />
        </button>
        {open && (
          <div 
            className="fixed inset-0 z-50"
            onClick={() => setOpen(false)}
          />
        )}
        <SelectContent className={open ? "opacity-100" : "opacity-0 pointer-events-none"} />
      </>
    );
  }
);

SelectTrigger.displayName = "SelectTrigger";

interface SelectValueProps extends React.HTMLAttributes<HTMLSpanElement> {
  placeholder?: string;
}

export const SelectValue = React.forwardRef<HTMLSpanElement, SelectValueProps>(
  ({ className, placeholder, ...props }, ref) => {
    const { value } = React.useContext(SelectContext);
    
    return (
      <span
        ref={ref}
        className={cn("block truncate", className)}
        {...props}
      >
        {value || placeholder}
      </span>
    );
  }
);

SelectValue.displayName = "SelectValue";

interface SelectContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export const SelectContent = React.forwardRef<HTMLDivElement, SelectContentProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "absolute z-50 min-w-[8rem] rounded-md border border-gray-200 bg-white p-1 shadow-md animate-in fade-in-80 dark:border-gray-800 dark:bg-gray-900",
          "top-full mt-1 left-0 w-full",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

SelectContent.displayName = "SelectContent";

interface SelectItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
  value: string;
}

export const SelectItem = React.forwardRef<HTMLLIElement, SelectItemProps>(
  ({ className, children, value, ...props }, ref) => {
    const { value: selectedValue, onValueChange } = React.useContext(SelectContext);
    const isSelected = selectedValue === value;
    
    return (
      <li
        ref={ref}
        className={cn(
          "relative flex cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-gray-100 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:hover:bg-gray-800",
          isSelected && "bg-gray-100 dark:bg-gray-800",
          className
        )}
        onClick={() => onValueChange?.(value)}
        {...props}
      >
        <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
          {isSelected && (
            <span className="h-2 w-2 rounded-full bg-blue-600 dark:bg-blue-400" />
          )}
        </span>
        <span className="block truncate">{children}</span>
      </li>
    );
  }
);

SelectItem.displayName = "SelectItem";