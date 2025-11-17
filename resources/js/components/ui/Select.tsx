import React from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    error?: string;
    helperText?: string;
    options: Array<{ value: string | number; label: string }>;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
    ({ className, label, error, helperText, options, ...props }, ref) => {
        return (
            <div className="w-full">
                {label && (
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                        {label}
                    </label>
                )}
                <div className="relative">
                    <select
                        className={cn(
                            'block w-full rounded-lg border-2 bg-white dark:bg-slate-800',
                            'text-slate-900 dark:text-slate-100',
                            'focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors',
                            'appearance-none cursor-pointer',
                            error
                                ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                                : 'border-slate-300 dark:border-slate-600 focus:border-primary-500 focus:ring-primary-500',
                            'px-4 py-2.5 pr-10',
                            className
                        )}
                        ref={ref}
                        {...props}
                    >
                        {options.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
                        <ChevronDown className="h-5 w-5" />
                    </div>
                </div>
                {error && <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">{error}</p>}
                {helperText && !error && (
                    <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400">{helperText}</p>
                )}
            </div>
        );
    }
);

Select.displayName = 'Select';

export default Select;
