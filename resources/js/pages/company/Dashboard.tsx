import React from 'react';
import { Head } from '@inertiajs/react';
import { Card, CardHeader, CardTitle, CardDescription, CardBody, Badge } from '@/components/ui';
import { MessageSquare, Users, TrendingUp, Clock } from 'lucide-react';

export default function Dashboard() {
    return (
        <>
            <Head title="Dashboard" />

            <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                            Dashboard
                        </h1>
                        <p className="text-slate-600 dark:text-slate-400">
                            Welcome back! Here's what's happening today.
                        </p>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <Card variant="bordered">
                            <CardBody className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                                            Total Conversations
                                        </p>
                                        <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">
                                            0
                                        </p>
                                    </div>
                                    <div className="p-3 bg-primary-100 dark:bg-primary-900/30 rounded-lg">
                                        <MessageSquare className="h-6 w-6 text-primary-600" />
                                    </div>
                                </div>
                            </CardBody>
                        </Card>

                        <Card variant="bordered">
                            <CardBody className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                                            Active Visitors
                                        </p>
                                        <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">
                                            0
                                        </p>
                                    </div>
                                    <div className="p-3 bg-secondary-100 dark:bg-secondary-900/30 rounded-lg">
                                        <Users className="h-6 w-6 text-secondary-600" />
                                    </div>
                                </div>
                            </CardBody>
                        </Card>

                        <Card variant="bordered">
                            <CardBody className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                                            Avg Response Time
                                        </p>
                                        <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">
                                            -
                                        </p>
                                    </div>
                                    <div className="p-3 bg-accent-100 dark:bg-accent-900/30 rounded-lg">
                                        <Clock className="h-6 w-6 text-accent-600" />
                                    </div>
                                </div>
                            </CardBody>
                        </Card>

                        <Card variant="bordered">
                            <CardBody className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                                            Satisfaction Rate
                                        </p>
                                        <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">
                                            -
                                        </p>
                                    </div>
                                    <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                                        <TrendingUp className="h-6 w-6 text-green-600" />
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    </div>

                    {/* Placeholder Content */}
                    <Card variant="bordered">
                        <CardHeader>
                            <CardTitle>Getting Started</CardTitle>
                            <CardDescription>Complete these steps to start using Chatterly</CardDescription>
                        </CardHeader>
                        <CardBody>
                            <p className="text-slate-600 dark:text-slate-400">
                                Dashboard content coming soon in upcoming modules...
                            </p>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </>
    );
}
