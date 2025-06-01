import React from 'react';
import { Check } from 'lucide-react';
import { cn } from '../../utils/cn';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, ...props }, ref) => {
    const [checked, setChecked] = React.useState(props.checked || false);
    
    React.useEffect(() => {
      if (props.checked !== undefined) {
        setChecked(props.checked);
      }
    }, [props.checked]);
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setChecked(e.target.checked);
      props.onChange?.(e);
    };
    
    return (
      <div className="relative inline-flex items-center">
        <input
          type="checkbox"
          ref={ref}
          className="absolute h-4 w-4 opacity-0"
          checked={checked}
          onChange={handleChange}
          {...props}
        />
        <div
          className={cn(
            "h-4 w-4 rounded border border-gray-300 flex items-center justify-center text-white",
            checked ? "bg-blue-600 border-blue-600 dark:bg-blue-400 dark:border-blue-400" : "bg-white dark:bg-gray-800 dark:border-gray-600",
            className
          )}
        >
          {checked && <Check className="h-3 w-3" />}
        </div>
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";