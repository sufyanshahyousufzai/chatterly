import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { Menu, Bell, Settings, LogOut, User, ChevronDown } from 'lucide-react';
import { Avatar, Dropdown, DropdownItem, DropdownDivider } from '@/components/ui';

export interface AuthenticatedLayoutProps {
    title?: string;
    user: {
        name: string;
        email: string;
        avatar?: string;
    };
    children: React.ReactNode;
}

const AuthenticatedLayout: React.FC<AuthenticatedLayoutProps> = ({ title, user, children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <>
            {title && <Head title={title} />}
            <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
                {/* Top Navigation */}
                <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 sticky top-0 z-40">
                    <div className="px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-16">
                            {/* Left: Logo & Menu Toggle */}
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={() => setSidebarOpen(!sidebarOpen)}
                                    className="lg:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                                >
                                    <Menu className="h-6 w-6 text-slate-600 dark:text-slate-400" />
                                </button>
                                <Link href="/" className="text-2xl font-bold text-primary-600">
                                    Chatterly
                                </Link>
                            </div>

                            {/* Right: Notifications & User Menu */}
                            <div className="flex items-center gap-4">
                                {/* Notifications */}
                                <button className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors relative">
                                    <Bell className="h-5 w-5 text-slate-600 dark:text-slate-400" />
                                    <span className="absolute top-1 right-1 h-2 w-2 bg-primary-600 rounded-full"></span>
                                </button>

                                {/* User Dropdown */}
                                <Dropdown
                                    trigger={
                                        <button className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                                            <Avatar src={user.avatar} name={user.name} size="sm" />
                                            <div className="hidden md:block text-left">
                                                <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                                    {user.name}
                                                </p>
                                                <p className="text-xs text-slate-500 dark:text-slate-400">
                                                    {user.email}
                                                </p>
                                            </div>
                                            <ChevronDown className="h-4 w-4 text-slate-600 dark:text-slate-400" />
                                        </button>
                                    }
                                >
                                    <DropdownItem icon={<User className="h-4 w-4" />}>
                                        Profile
                                    </DropdownItem>
                                    <DropdownItem icon={<Settings className="h-4 w-4" />}>
                                        Settings
                                    </DropdownItem>
                                    <DropdownDivider />
                                    <DropdownItem icon={<LogOut className="h-4 w-4" />} danger>
                                        Logout
                                    </DropdownItem>
                                </Dropdown>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">{children}</main>
            </div>
        </>
    );
};

export default AuthenticatedLayout;
