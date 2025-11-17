import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { Button, Card, CardBody, Badge } from '@/components/ui';
import { CheckCircle, ArrowRight, MessageSquare, Users, Palette, Code } from 'lucide-react';

export default function Onboarding() {
    const steps = [
        {
            icon: <Users className="h-6 w-6" />,
            title: 'Invite Your Team',
            description: 'Add team members to help manage customer conversations',
            status: 'pending',
        },
        {
            icon: <Palette className="h-6 w-6" />,
            title: 'Customize Your Widget',
            description: 'Brand your chat widget to match your website',
            status: 'pending',
        },
        {
            icon: <Code className="h-6 w-6" />,
            title: 'Install on Your Website',
            description: 'Add one line of code to start chatting with visitors',
            status: 'pending',
        },
    ];

    return (
        <>
            <Head title="Welcome to Chatterly!" />

            <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto w-full">
                    {/* Success Header */}
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-secondary-100 dark:bg-secondary-900/30 text-secondary-500 mb-6">
                            <CheckCircle className="h-12 w-12" />
                        </div>
                        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
                            Welcome to Chatterly! 🎉
                        </h1>
                        <p className="text-xl text-slate-600 dark:text-slate-300">
                            Your account has been created successfully. Let's get you started!
                        </p>
                        <Badge variant="success" size="lg" className="mt-4">
                            14-Day Free Trial Active
                        </Badge>
                    </div>

                    {/* Onboarding Steps */}
                    <Card variant="elevated">
                        <CardBody className="p-8">
                            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-6">
                                Quick Setup Guide
                            </h2>
                            <div className="space-y-6">
                                {steps.map((step, index) => (
                                    <div
                                        key={index}
                                        className="flex items-start gap-4 p-4 rounded-lg border-2 border-slate-200 dark:border-slate-700 hover:border-primary-300 dark:hover:border-primary-700 transition-colors"
                                    >
                                        <div className="flex-shrink-0">
                                            <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary-100 dark:bg-primary-900/30 text-primary-600">
                                                {step.icon}
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">
                                                {step.title}
                                            </h3>
                                            <p className="text-slate-600 dark:text-slate-400">
                                                {step.description}
                                            </p>
                                        </div>
                                        <Badge variant="default">{step.status}</Badge>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700">
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <Link href="/company/dashboard" className="flex-1">
                                        <Button className="w-full" size="lg" rightIcon={<ArrowRight className="h-5 w-5" />}>
                                            Go to Dashboard
                                        </Button>
                                    </Link>
                                    <Link href="/company/settings/widget" className="flex-1">
                                        <Button variant="outline" className="w-full" size="lg">
                                            Start Setup
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </CardBody>
                    </Card>

                    {/* Help Section */}
                    <div className="mt-8 text-center">
                        <p className="text-slate-600 dark:text-slate-400 mb-4">
                            Need help getting started?
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <a
                                href="#"
                                className="text-primary-600 hover:text-primary-700 font-medium"
                            >
                                View Documentation
                            </a>
                            <span className="hidden sm:inline text-slate-400">•</span>
                            <a
                                href="#"
                                className="text-primary-600 hover:text-primary-700 font-medium"
                            >
                                Watch Video Tutorial
                            </a>
                            <span className="hidden sm:inline text-slate-400">•</span>
                            <a
                                href="mailto:support@chatterly.com"
                                className="text-primary-600 hover:text-primary-700 font-medium"
                            >
                                Contact Support
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
