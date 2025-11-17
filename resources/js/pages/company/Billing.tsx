import React from 'react';
import { Head } from '@inertiajs/react';
import { Card, CardBody, Badge } from '@/components/ui';
import { CreditCard } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

export default function Billing({ company, invoices }: any) {
    return (
        <>
            <Head title="Billing" />
            <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Billing & Subscription</h1>
                    <div className="grid md:grid-cols-3 gap-6 mb-8">
                        <Card>
                            <CardBody>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Current Plan</p>
                                <p className="text-2xl font-bold text-slate-900 dark:text-white">
                                    {company.subscription_plan?.name || 'Free Trial'}
                                </p>
                            </CardBody>
                        </Card>
                        <Card>
                            <CardBody>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Status</p>
                                <Badge variant={company.subscription_status === 'active' ? 'success' : 'warning'}>
                                    {company.subscription_status}
                                </Badge>
                            </CardBody>
                        </Card>
                        <Card>
                            <CardBody>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Monthly Cost</p>
                                <p className="text-2xl font-bold text-slate-900 dark:text-white">
                                    {company.subscription_plan ? formatCurrency(company.subscription_plan.price_monthly) : '$0'}
                                </p>
                            </CardBody>
                        </Card>
                    </div>
                    <Card variant="bordered">
                        <CardBody>
                            <h2 className="text-lg font-semibold mb-4">Invoices</h2>
                            <p className="text-center py-12 text-slate-500">
                                <CreditCard className="h-16 w-16 mx-auto mb-4 opacity-20" />
                                <p>Billing history will appear here</p>
                            </p>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </>
    );
}
