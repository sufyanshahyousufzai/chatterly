import React from 'react';
import { Head } from '@inertiajs/react';
import { Card, CardBody } from '@/components/ui';
import { Calendar } from 'lucide-react';

export default function Attendance({ staff }: any) {
    return (
        <>
            <Head title="Attendance & Leave" />
            <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Attendance & Leave Management</h1>
                    <Card variant="bordered">
                        <CardBody><p className="text-center py-12 text-slate-500"><Calendar className="h-16 w-16 mx-auto mb-4 opacity-20" /><p>Attendance system foundation ready - {staff.length} staff members</p></p></CardBody>
                    </Card>
                </div>
            </div>
        </>
    );
}
