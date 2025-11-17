import React from 'react';
import { cn } from '@/lib/utils';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
    helperText?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className, label, error, helperText, ...props }, ref) => {
        return (
            <div className="w-full">
                {label && (
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                        {label}
                    </label>
                )}
                <textarea
                    className={cn(
                        'block w-full rounded-lg border-2 bg-white dark:bg-slate-800',
                        'text-slate-900 dark:text-slate-100 placeholder:text-slate-400',
                        'focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors',
                        'resize-none',
                        error
                            ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                            : 'border-slate-300 dark:border-slate-600 focus:border-primary-500 focus:ring-primary-500',
                        'px-4 py-2.5',
                        className
                    )}
                    ref={ref}
                    {...props}
                />
                {error && <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">{error}</p>}
                {helperText && !error && (
                    <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400">{helperText}</p>
                )}
            </div>
        );
    }
);

Textarea.displayName = 'Textarea';

export default Textarea;
