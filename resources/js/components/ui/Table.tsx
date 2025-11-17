import React from 'react';
import { cn } from '@/lib/utils';

export interface TableProps extends React.HTMLAttributes<HTMLTableElement> {
    bordered?: boolean;
    striped?: boolean;
}

const Table = React.forwardRef<HTMLTableElement, TableProps>(
    ({ className, bordered = false, striped = false, ...props }, ref) => {
        return (
            <div className="overflow-x-auto">
                <table
                    ref={ref}
                    className={cn(
                        'min-w-full divide-y divide-slate-200 dark:divide-slate-700',
                        bordered && 'border border-slate-200 dark:border-slate-700',
                        className
                    )}
                    {...props}
                />
            </div>
        );
    }
);

Table.displayName = 'Table';

const TableHeader = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
    ({ className, ...props }, ref) => (
        <thead
            ref={ref}
            className={cn('bg-slate-50 dark:bg-slate-800', className)}
            {...props}
        />
    )
);

TableHeader.displayName = 'TableHeader';

const TableBody = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
    ({ className, ...props }, ref) => (
        <tbody
            ref={ref}
            className={cn(
                'bg-white dark:bg-slate-900 divide-y divide-slate-200 dark:divide-slate-700',
                className
            )}
            {...props}
        />
    )
);

TableBody.displayName = 'TableBody';

const TableRow = React.forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>(
    ({ className, ...props }, ref) => (
        <tr
            ref={ref}
            className={cn(
                'hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors',
                className
            )}
            {...props}
        />
    )
);

TableRow.displayName = 'TableRow';

const TableHead = React.forwardRef<
    HTMLTableCellElement,
    React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
    <th
        ref={ref}
        className={cn(
            'px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider',
            className
        )}
        {...props}
    />
));

TableHead.displayName = 'TableHead';

const TableCell = React.forwardRef<
    HTMLTableCellElement,
    React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
    <td
        ref={ref}
        className={cn(
            'px-6 py-4 whitespace-nowrap text-sm text-slate-900 dark:text-slate-100',
            className
        )}
        {...props}
    />
));

TableCell.displayName = 'TableCell';

export { Table, TableHeader, TableBody, TableRow, TableHead, TableCell };
