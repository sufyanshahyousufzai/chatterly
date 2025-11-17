import React, { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

export interface DropdownProps {
    trigger: React.ReactNode;
    align?: 'left' | 'right';
    width?: 'sm' | 'md' | 'lg';
    children: React.ReactNode;
}

const Dropdown: React.FC<DropdownProps> = ({ trigger, align = 'right', width = 'md', children }) => {
    const widths = {
        sm: 'w-48',
        md: 'w-56',
        lg: 'w-64',
    };

    const alignments = {
        left: 'left-0',
        right: 'right-0',
    };

    return (
        <Menu as="div" className="relative inline-block text-left">
            <Menu.Button as={Fragment}>{trigger}</Menu.Button>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items
                    className={cn(
                        'absolute z-10 mt-2 origin-top-right rounded-lg bg-white dark:bg-slate-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none',
                        widths[width],
                        alignments[align]
                    )}
                >
                    <div className="py-1">{children}</div>
                </Menu.Items>
            </Transition>
        </Menu>
    );
};

interface DropdownItemProps {
    onClick?: () => void;
    icon?: React.ReactNode;
    selected?: boolean;
    danger?: boolean;
    children: React.ReactNode;
}

const DropdownItem: React.FC<DropdownItemProps> = ({ onClick, icon, selected, danger, children }) => {
    return (
        <Menu.Item>
            {({ active }) => (
                <button
                    onClick={onClick}
                    className={cn(
                        'w-full text-left px-4 py-2 text-sm flex items-center gap-3 transition-colors',
                        active && !danger && 'bg-slate-100 dark:bg-slate-700',
                        active && danger && 'bg-red-50 dark:bg-red-900/20',
                        danger
                            ? 'text-red-600 dark:text-red-400'
                            : 'text-slate-700 dark:text-slate-300'
                    )}
                >
                    {icon && <span className="flex-shrink-0">{icon}</span>}
                    <span className="flex-1">{children}</span>
                    {selected && <Check className="h-4 w-4 text-primary-600" />}
                </button>
            )}
        </Menu.Item>
    );
};

const DropdownDivider: React.FC = () => {
    return <div className="my-1 border-t border-slate-200 dark:border-slate-700" />;
};

export { Dropdown, DropdownItem, DropdownDivider };
