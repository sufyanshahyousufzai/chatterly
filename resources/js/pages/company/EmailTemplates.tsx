import React from 'react';
import { Head } from '@inertiajs/react';
import { Card, CardBody, Badge, Button } from '@/components/ui';
import { Mail, Plus } from 'lucide-react';

export default function EmailTemplates({ templates }: any) {
    return (
        <>
            <Head title="Email Templates" />
            <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-8 flex items-center justify-between">
                        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Email Templates</h1>
                        <Button variant="primary" leftIcon={<Plus className="h-4 w-4" />}>New Template</Button>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {templates.map((template: any) => (
                            <Card key={template.id} variant="bordered">
                                <CardBody>
                                    <div className="flex items-start justify-between mb-3">
                                        <Mail className="h-8 w-8 text-primary-600" />
                                        <Badge>{template.type}</Badge>
                                    </div>
                                    <h3 className="font-semibold text-slate-900 dark:text-white mb-1">{template.name}</h3>
                                    <p className="text-sm text-slate-600 dark:text-slate-400">{template.subject}</p>
                                </CardBody>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
