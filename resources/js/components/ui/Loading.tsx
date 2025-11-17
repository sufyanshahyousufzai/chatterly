import React from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

export interface LoadingProps {
    size?: 'sm' | 'md' | 'lg' | 'xl';
    text?: string;
    fullScreen?: boolean;
}

const Loading: React.FC<LoadingProps> = ({ size = 'md', text, fullScreen = false }) => {
    const sizes = {
        sm: 'h-4 w-4',
        md: 'h-8 w-8',
        lg: 'h-12 w-12',
        xl: 'h-16 w-16',
    };

    const spinner = (
        <div className="flex flex-col items-center justify-center gap-3">
            <Loader2 className={cn('animate-spin text-primary-600', sizes[size])} />
            {text && <p className="text-sm text-slate-600 dark:text-slate-400">{text}</p>}
        </div>
    );

    if (fullScreen) {
        return (
            <div className="fixed inset-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm flex items-center justify-center z-50">
                {spinner}
            </div>
        );
    }

    return spinner;
};

export default Loading;
