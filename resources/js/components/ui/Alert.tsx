import React from 'react';
import { cn } from '@/lib/utils';
import { AlertCircle, CheckCircle, Info, XCircle, X } from 'lucide-react';

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: 'info' | 'success' | 'warning' | 'danger';
    title?: string;
    dismissible?: boolean;
    onDismiss?: () => void;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
    ({ className, variant = 'info', title, dismissible = false, onDismiss, children, ...props }, ref) => {
        const icons = {
            info: <Info className="h-5 w-5" />,
            success: <CheckCircle className="h-5 w-5" />,
            warning: <AlertCircle className="h-5 w-5" />,
            danger: <XCircle className="h-5 w-5" />,
        };

        const variants = {
            info: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-300',
            success:
                'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-800 dark:text-green-300',
            warning:
                'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300',
            danger: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-800 dark:text-red-300',
        };

        return (
            <div
                ref={ref}
                className={cn('relative rounded-lg border-2 p-4', variants[variant], className)}
                {...props}
            >
                <div className="flex gap-3">
                    <div className="flex-shrink-0">{icons[variant]}</div>
                    <div className="flex-1">
                        {title && <h4 className="font-semibold mb-1">{title}</h4>}
                        <div className="text-sm">{children}</div>
                    </div>
                    {dismissible && onDismiss && (
                        <button
                            onClick={onDismiss}
                            className="flex-shrink-0 opacity-70 hover:opacity-100 transition-opacity"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    )}
                </div>
            </div>
        );
    }
);

Alert.displayName = 'Alert';

export default Alert;
