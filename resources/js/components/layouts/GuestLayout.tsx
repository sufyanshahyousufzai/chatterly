import React from 'react';
import { Head } from '@inertiajs/react';

export interface GuestLayoutProps {
    title?: string;
    children: React.ReactNode;
}

const GuestLayout: React.FC<GuestLayoutProps> = ({ title, children }) => {
    return (
        <>
            {title && <Head title={title} />}
            <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
                <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-16">
                            <div className="flex items-center">
                                <h1 className="text-2xl font-bold text-primary-600">Chatterly</h1>
                            </div>
                            <nav className="flex gap-6">
                                <a
                                    href="/"
                                    className="text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors"
                                >
                                    Home
                                </a>
                                <a
                                    href="/pricing"
                                    className="text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors"
                                >
                                    Pricing
                                </a>
                                <a
                                    href="/login"
                                    className="text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors"
                                >
                                    Login
                                </a>
                                <a
                                    href="/register"
                                    className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 font-medium transition-colors"
                                >
                                    Get Started
                                </a>
                            </nav>
                        </div>
                    </div>
                </header>
                <main>{children}</main>
                <footer className="bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 mt-auto">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        <div className="text-center text-slate-600 dark:text-slate-400">
                            <p>&copy; 2025 Chatterly. All rights reserved.</p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
};

export default GuestLayout;
