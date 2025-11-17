import React from 'react';
import { cn } from '@/lib/utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: 'default' | 'bordered' | 'elevated';
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
    ({ className, variant = 'default', children, ...props }, ref) => {
        const variants = {
            default: 'bg-white dark:bg-slate-800 rounded-lg',
            bordered:
                'bg-white dark:bg-slate-800 rounded-lg border-2 border-slate-200 dark:border-slate-700',
            elevated: 'bg-white dark:bg-slate-800 rounded-lg shadow-lg',
        };

        return (
            <div ref={ref} className={cn(variants[variant], className)} {...props}>
                {children}
            </div>
        );
    }
);

Card.displayName = 'Card';

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <div
            ref={ref}
            className={cn('px-6 py-4 border-b border-slate-200 dark:border-slate-700', className)}
            {...props}
        />
    )
);

CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
    ({ className, children, ...props }, ref) => (
        <h3
            ref={ref}
            className={cn('text-lg font-semibold text-slate-900 dark:text-white', className)}
            {...props}
        >
            {children}
        </h3>
    )
);

CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
    <p
        ref={ref}
        className={cn('text-sm text-slate-500 dark:text-slate-400 mt-1', className)}
        {...props}
    />
));

CardDescription.displayName = 'CardDescription';

const CardBody = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <div ref={ref} className={cn('px-6 py-4', className)} {...props} />
    )
);

CardBody.displayName = 'CardBody';

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <div
            ref={ref}
            className={cn(
                'px-6 py-4 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700 rounded-b-lg',
                className
            )}
            {...props}
        />
    )
);

CardFooter.displayName = 'CardFooter';

export { Card, CardHeader, CardTitle, CardDescription, CardBody, CardFooter };
