import React from 'react';
import { Head } from '@inertiajs/react';
import { Card, CardBody } from '@/components/ui';
import { BarChart } from 'lucide-react';

export default function Analytics({ stats }: any) {
    return (
        <>
            <Head title="Analytics & Reports" />
            <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Analytics & Reporting</h1>
                    <div className="grid md:grid-cols-4 gap-4 mb-6">
                        <Card><CardBody><p className="text-2xl font-bold">{stats.total_chats}</p><p className="text-sm text-slate-600">Total Chats</p></CardBody></Card>
                        <Card><CardBody><p className="text-2xl font-bold">{stats.total_tickets}</p><p className="text-sm text-slate-600">Total Tickets</p></CardBody></Card>
                        <Card><CardBody><p className="text-2xl font-bold">{stats.total_clients}</p><p className="text-sm text-slate-600">Total Clients</p></CardBody></Card>
                        <Card><CardBody><p className="text-2xl font-bold">{stats.total_staff}</p><p className="text-sm text-slate-600">Total Staff</p></CardBody></Card>
                    </div>
                    <Card variant="bordered">
                        <CardBody><p className="text-center py-12 text-slate-500"><BarChart className="h-16 w-16 mx-auto mb-4 opacity-20" /><p>Advanced analytics foundation ready</p></p></CardBody>
                    </Card>
                </div>
            </div>
        </>
    );
}
