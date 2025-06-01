import React from 'react';
import { cn } from '../../utils/cn';

interface SliderProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultValue?: number[];
  value?: number[];
  min?: number;
  max?: number;
  step?: number;
  onValueChange?: (value: number[]) => void;
}

export const Slider = React.forwardRef<HTMLDivElement, SliderProps>(
  ({ 
    className, 
    defaultValue = [0], 
    value, 
    min = 0, 
    max = 100, 
    step = 1, 
    onValueChange,
    ...props 
  }, ref) => {
    const [localValue, setLocalValue] = React.useState(value || defaultValue);
    const [dragging, setDragging] = React.useState(false);
    const trackRef = React.useRef<HTMLDivElement>(null);
    
    React.useEffect(() => {
      if (value !== undefined) {
        setLocalValue(value);
      }
    }, [value]);

    const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
      e.preventDefault();
      setDragging(true);
      document.addEventListener('pointermove', handlePointerMove);
      document.addEventListener('pointerup', handlePointerUp);
      updateValue(e.clientX);
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (dragging) {
        updateValue(e.clientX);
      }
    };

    const handlePointerUp = () => {
      setDragging(false);
      document.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('pointerup', handlePointerUp);
    };

    const updateValue = (clientX: number) => {
      if (trackRef.current) {
        const { left, width } = trackRef.current.getBoundingClientRect();
        const percent = Math.max(0, Math.min(1, (clientX - left) / width));
        const rawValue = min + percent * (max - min);
        const steppedValue = Math.round(rawValue / step) * step;
        const clampedValue = Math.min(max, Math.max(min, steppedValue));
        
        const newValue = [clampedValue];
        setLocalValue(newValue);
        onValueChange?.(newValue);
      }
    };

    const percent = ((localValue[0] - min) / (max - min)) * 100;

    return (
      <div
        ref={ref}
        className={cn("relative flex w-full touch-none select-none items-center", className)}
        {...props}
      >
        <div
          ref={trackRef}
          className="relative h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700"
          onPointerDown={handlePointerDown}
        >
          <div
            className="absolute h-full rounded-full bg-blue-600 dark:bg-blue-400"
            style={{ width: `${percent}%` }}
          />
          <div
            className="absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-blue-600 bg-white dark:border-blue-400 dark:bg-gray-900"
            style={{ left: `${percent}%` }}
          />
        </div>
      </div>
    );
  }
);

Slider.displayName = "Slider";