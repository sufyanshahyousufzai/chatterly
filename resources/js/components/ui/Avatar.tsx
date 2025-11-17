import React from 'react';
import { cn } from '@/lib/utils';
import { getInitials } from '@/lib/utils';

export interface AvatarProps {
    src?: string;
    alt?: string;
    name?: string;
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    status?: 'online' | 'offline' | 'busy' | 'away';
    className?: string;
}

const Avatar: React.FC<AvatarProps> = ({ src, alt, name, size = 'md', status, className }) => {
    const sizes = {
        xs: 'h-6 w-6 text-xs',
        sm: 'h-8 w-8 text-sm',
        md: 'h-10 w-10 text-base',
        lg: 'h-12 w-12 text-lg',
        xl: 'h-16 w-16 text-xl',
    };

    const statusSizes = {
        xs: 'h-1.5 w-1.5',
        sm: 'h-2 w-2',
        md: 'h-2.5 w-2.5',
        lg: 'h-3 w-3',
        xl: 'h-4 w-4',
    };

    const statusColors = {
        online: 'bg-status-online',
        offline: 'bg-status-offline',
        busy: 'bg-status-busy',
        away: 'bg-status-away',
    };

    return (
        <div className={cn('relative inline-block', className)}>
            {src ? (
                <img
                    src={src}
                    alt={alt || name || 'Avatar'}
                    className={cn('rounded-full object-cover', sizes[size])}
                />
            ) : (
                <div
                    className={cn(
                        'rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 flex items-center justify-center font-semibold',
                        sizes[size]
                    )}
                >
                    {name ? getInitials(name) : '?'}
                </div>
            )}
            {status && (
                <span
                    className={cn(
                        'absolute bottom-0 right-0 block rounded-full ring-2 ring-white dark:ring-slate-800',
                        statusSizes[size],
                        statusColors[status]
                    )}
                />
            )}
        </div>
    );
};

export default Avatar;
