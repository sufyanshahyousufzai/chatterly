import React from 'react';
import { Head } from '@inertiajs/react';
import { Card, CardBody, Badge, Button } from '@/components/ui';
import { FileText, Plus } from 'lucide-react';

export default function CustomForms({ forms }: any) {
    return (
        <>
            <Head title="Custom Forms" />
            <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-8 flex items-center justify-between">
                        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Custom Forms</h1>
                        <Button variant="primary" leftIcon={<Plus className="h-4 w-4" />}>Create Form</Button>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {forms.map((form: any) => (
                            <Card key={form.id} variant="bordered">
                                <CardBody>
                                    <div className="flex items-start justify-between mb-3">
                                        <FileText className="h-8 w-8 text-primary-600" />
                                        <Badge variant={form.is_active ? 'success' : 'default'}>
                                            {form.is_active ? 'Active' : 'Inactive'}
                                        </Badge>
                                    </div>
                                    <h3 className="font-semibold text-slate-900 dark:text-white mb-1">{form.name}</h3>
                                    <p className="text-sm text-slate-600 dark:text-slate-400">{form.form_type}</p>
                                    <p className="text-xs text-slate-500 mt-2">{form.form_fields.length} fields</p>
                                </CardBody>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
