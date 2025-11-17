import React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'default';
    size?: 'sm' | 'md' | 'lg';
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
    ({ className, variant = 'default', size = 'md', children, ...props }, ref) => {
        const baseStyles = 'inline-flex items-center justify-center font-medium rounded-full';

        const variants = {
            primary: 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400',
            secondary:
                'bg-secondary-100 text-secondary-700 dark:bg-secondary-900/30 dark:text-secondary-400',
            success: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
            danger: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
            warning: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
            info: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
            default: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
        };

        const sizes = {
            sm: 'px-2 py-0.5 text-xs',
            md: 'px-2.5 py-1 text-sm',
            lg: 'px-3 py-1.5 text-base',
        };

        return (
            <span ref={ref} className={cn(baseStyles, variants[variant], sizes[size], className)} {...props}>
                {children}
            </span>
        );
    }
);

Badge.displayName = 'Badge';

export default Badge;
