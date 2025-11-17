import React from 'react';
import { Head } from '@inertiajs/react';
import { Card, CardBody } from '@/components/ui';
import { Shield } from 'lucide-react';

export default function Roles({ roles, permissions }: any) {
    return (
        <>
            <Head title="Roles & Permissions" />
            <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Roles & Permissions</h1>
                    <Card variant="bordered">
                        <CardBody>
                            <p className="text-center py-12 text-slate-500">
                                <Shield className="h-16 w-16 mx-auto mb-4 opacity-20" />
                                <p>Roles system foundation ready - {roles.length} roles, {permissions.length} permissions</p>
                            </p>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </>
    );
}
