import React from 'react';
import { Head } from '@inertiajs/react';
import { Card, CardBody, Badge } from '@/components/ui';
import { Building2, Users, MessageSquare, Ticket, DollarSign, TrendingUp } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

interface Props {
    stats: {
        total_companies: number;
        active_companies: number;
        trial_companies: number;
        paid_companies: number;
        total_users: number;
        total_conversations: number;
        total_tickets: number;
        monthly_revenue: number;
    };
    recentCompanies: any[];
}

export default function Dashboard({ stats, recentCompanies }: Props) {
    return (
        <>
            <Head title="Super Admin Dashboard" />
            <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Super Admin Dashboard</h1>
                    
                    <div className="grid md:grid-cols-4 gap-6 mb-8">
                        <Card>
                            <CardBody className="flex items-center gap-4">
                                <div className="p-3 bg-primary-100 dark:bg-primary-900 rounded-lg">
                                    <Building2 className="h-6 w-6 text-primary-600" />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-slate-900 dark:text-white">{stats.total_companies}</p>
                                    <p className="text-sm text-slate-600 dark:text-slate-400">Total Companies</p>
                                </div>
                            </CardBody>
                        </Card>

                        <Card>
                            <CardBody className="flex items-center gap-4">
                                <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                                    <TrendingUp className="h-6 w-6 text-green-600" />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-slate-900 dark:text-white">{stats.active_companies}</p>
                                    <p className="text-sm text-slate-600 dark:text-slate-400">Active Companies</p>
                                </div>
                            </CardBody>
                        </Card>

                        <Card>
                            <CardBody className="flex items-center gap-4">
                                <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                                    <Users className="h-6 w-6 text-blue-600" />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-slate-900 dark:text-white">{stats.total_users}</p>
                                    <p className="text-sm text-slate-600 dark:text-slate-400">Total Users</p>
                                </div>
                            </CardBody>
                        </Card>

                        <Card>
                            <CardBody className="flex items-center gap-4">
                                <div className="p-3 bg-amber-100 dark:bg-amber-900 rounded-lg">
                                    <DollarSign className="h-6 w-6 text-amber-600" />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-slate-900 dark:text-white">{formatCurrency(stats.monthly_revenue)}</p>
                                    <p className="text-sm text-slate-600 dark:text-slate-400">Monthly Revenue</p>
                                </div>
                            </CardBody>
                        </Card>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 mb-8">
                        <Card>
                            <CardBody className="text-center">
                                <MessageSquare className="h-8 w-8 mx-auto mb-2 text-slate-400" />
                                <p className="text-3xl font-bold text-slate-900 dark:text-white">{stats.total_conversations}</p>
                                <p className="text-sm text-slate-600 dark:text-slate-400">Total Conversations</p>
                            </CardBody>
                        </Card>

                        <Card>
                            <CardBody className="text-center">
                                <Ticket className="h-8 w-8 mx-auto mb-2 text-slate-400" />
                                <p className="text-3xl font-bold text-slate-900 dark:text-white">{stats.total_tickets}</p>
                                <p className="text-sm text-slate-600 dark:text-slate-400">Total Tickets</p>
                            </CardBody>
                        </Card>

                        <Card>
                            <CardBody className="text-center">
                                <Building2 className="h-8 w-8 mx-auto mb-2 text-slate-400" />
                                <p className="text-3xl font-bold text-slate-900 dark:text-white">{stats.trial_companies}</p>
                                <p className="text-sm text-slate-600 dark:text-slate-400">Trial Companies</p>
                            </CardBody>
                        </Card>
                    </div>

                    <Card variant="bordered">
                        <CardBody>
                            <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Recent Companies</h2>
                            <div className="space-y-3">
                                {recentCompanies.map((company) => (
                                    <div key={company.id} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                                        <div>
                                            <p className="font-medium text-slate-900 dark:text-white">{company.name}</p>
                                            <p className="text-sm text-slate-600 dark:text-slate-400">{company.email}</p>
                                        </div>
                                        <Badge variant={company.is_active ? 'success' : 'default'}>
                                            {company.subscription_status}
                                        </Badge>
                                    </div>
                                ))}
                            </div>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </>
    );
}
