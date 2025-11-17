import { Head } from '@inertiajs/react';

export default function Welcome() {
    return (
        <>
            <Head title="Welcome to Chatterly" />

            <div className="min-h-screen bg-gradient-to-br from-primary-600 via-secondary-500 to-accent-500 flex items-center justify-center px-4">
                <div className="max-w-4xl w-full text-center">
                    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-12">
                        <div className="mb-8">
                            <h1 className="text-6xl font-bold text-primary-600 mb-4">
                                Chatterly
                            </h1>
                            <p className="text-2xl text-slate-600 dark:text-slate-300 mb-6">
                                Complete SaaS Live Chat & Helpdesk Platform
                            </p>
                            <div className="flex items-center justify-center gap-4 text-sm text-slate-500">
                                <span className="px-3 py-1 bg-primary-50 text-primary-600 rounded-full font-medium">
                                    Laravel 12
                                </span>
                                <span className="px-3 py-1 bg-secondary-50 text-secondary-600 rounded-full font-medium">
                                    React 18
                                </span>
                                <span className="px-3 py-1 bg-accent-50 text-accent-600 rounded-full font-medium">
                                    TypeScript
                                </span>
                                <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full font-medium">
                                    Inertia.js
                                </span>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-3 gap-6 mt-12">
                            <div className="p-6 bg-slate-50 dark:bg-slate-700 rounded-xl">
                                <div className="text-4xl mb-3">💬</div>
                                <h3 className="font-semibold text-lg text-slate-800 dark:text-white mb-2">
                                    Live Chat
                                </h3>
                                <p className="text-slate-600 dark:text-slate-300 text-sm">
                                    Real-time conversations with Laravel Reverb
                                </p>
                            </div>

                            <div className="p-6 bg-slate-50 dark:bg-slate-700 rounded-xl">
                                <div className="text-4xl mb-3">🎫</div>
                                <h3 className="font-semibold text-lg text-slate-800 dark:text-white mb-2">
                                    Ticketing
                                </h3>
                                <p className="text-slate-600 dark:text-slate-300 text-sm">
                                    Complete helpdesk & support system
                                </p>
                            </div>

                            <div className="p-6 bg-slate-50 dark:bg-slate-700 rounded-xl">
                                <div className="text-4xl mb-3">📊</div>
                                <h3 className="font-semibold text-lg text-slate-800 dark:text-white mb-2">
                                    Analytics
                                </h3>
                                <p className="text-slate-600 dark:text-slate-300 text-sm">
                                    Powerful insights & reporting
                                </p>
                            </div>
                        </div>

                        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-600">
                            <p className="text-slate-500 dark:text-slate-400 text-sm">
                                ✅ MODULE 5: Inertia.js + React + TypeScript Setup Complete
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
