import React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    helperText?: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, label, error, helperText, leftIcon, rightIcon, type = 'text', ...props }, ref) => {
        return (
            <div className="w-full">
                {label && (
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                        {label}
                    </label>
                )}
                <div className="relative">
                    {leftIcon && (
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                            {leftIcon}
                        </div>
                    )}
                    <input
                        type={type}
                        className={cn(
                            'block w-full rounded-lg border-2 bg-white dark:bg-slate-800',
                            'text-slate-900 dark:text-slate-100 placeholder:text-slate-400',
                            'focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors',
                            error
                                ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                                : 'border-slate-300 dark:border-slate-600 focus:border-primary-500 focus:ring-primary-500',
                            leftIcon ? 'pl-10' : 'pl-4',
                            rightIcon ? 'pr-10' : 'pr-4',
                            'py-2.5',
                            className
                        )}
                        ref={ref}
                        {...props}
                    />
                    {rightIcon && (
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
                            {rightIcon}
                        </div>
                    )}
                </div>
                {error && <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">{error}</p>}
                {helperText && !error && (
                    <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400">{helperText}</p>
                )}
            </div>
        );
    }
);

Input.displayName = 'Input';

export default Input;
