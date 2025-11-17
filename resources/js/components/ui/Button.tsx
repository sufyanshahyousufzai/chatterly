import React from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'accent' | 'danger' | 'ghost' | 'outline';
    size?: 'sm' | 'md' | 'lg';
    isLoading?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            className,
            variant = 'primary',
            size = 'md',
            isLoading = false,
            leftIcon,
            rightIcon,
            children,
            disabled,
            ...props
        },
        ref
    ) => {
        const baseStyles =
            'inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

        const variants = {
            primary:
                'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500 shadow-sm hover:shadow-md',
            secondary:
                'bg-secondary-500 text-white hover:bg-secondary-600 focus:ring-secondary-400 shadow-sm hover:shadow-md',
            accent:
                'bg-accent-500 text-white hover:bg-accent-600 focus:ring-accent-400 shadow-sm hover:shadow-md',
            danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 shadow-sm hover:shadow-md',
            ghost:
                'bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 focus:ring-slate-400',
            outline:
                'bg-transparent border-2 border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 focus:ring-slate-400',
        };

        const sizes = {
            sm: 'px-3 py-1.5 text-sm',
            md: 'px-4 py-2 text-base',
            lg: 'px-6 py-3 text-lg',
        };

        return (
            <button
                ref={ref}
                className={cn(baseStyles, variants[variant], sizes[size], className)}
                disabled={disabled || isLoading}
                {...props}
            >
                {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                    leftIcon && <span className="flex-shrink-0">{leftIcon}</span>
                )}
                {children}
                {rightIcon && !isLoading && <span className="flex-shrink-0">{rightIcon}</span>}
            </button>
        );
    }
);

Button.displayName = 'Button';

export default Button;
