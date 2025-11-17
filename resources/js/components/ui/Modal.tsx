import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    description?: string;
    children: React.ReactNode;
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
    showCloseButton?: boolean;
}

const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    title,
    description,
    children,
    size = 'md',
    showCloseButton = true,
}) => {
    const sizes = {
        sm: 'max-w-md',
        md: 'max-w-lg',
        lg: 'max-w-2xl',
        xl: 'max-w-4xl',
        full: 'max-w-7xl',
    };

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/50" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel
                                className={cn(
                                    'w-full transform overflow-hidden rounded-2xl bg-white dark:bg-slate-800 shadow-xl transition-all',
                                    sizes[size]
                                )}
                            >
                                {(title || description || showCloseButton) && (
                                    <div className="relative px-6 py-4 border-b border-slate-200 dark:border-slate-700">
                                        {title && (
                                            <Dialog.Title
                                                as="h3"
                                                className="text-lg font-semibold text-slate-900 dark:text-white"
                                            >
                                                {title}
                                            </Dialog.Title>
                                        )}
                                        {description && (
                                            <Dialog.Description className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                                {description}
                                            </Dialog.Description>
                                        )}
                                        {showCloseButton && (
                                            <button
                                                onClick={onClose}
                                                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                                            >
                                                <X className="h-5 w-5" />
                                            </button>
                                        )}
                                    </div>
                                )}
                                <div className="px-6 py-4">{children}</div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default Modal;
