import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import { Card, CardHeader, CardTitle, CardBody, Button, Input } from '@/components/ui';
import { Settings as SettingsIcon } from 'lucide-react';

export default function Settings({ company, settings }: any) {
    const form = useForm({
        name: company.name,
        email: company.email,
        phone: company.phone || '',
        timezone: company.timezone,
        currency: company.currency,
    });

    return (
        <>
            <Head title="Settings" />
            <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-8">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Company Settings</h1>
                    <Card variant="bordered">
                        <CardHeader>
                            <CardTitle>General Settings</CardTitle>
                        </CardHeader>
                        <CardBody className="space-y-4">
                            <Input label="Company Name" value={form.data.name} onChange={(e) => form.setData('name', e.target.value)} />
                            <Input label="Email" type="email" value={form.data.email} onChange={(e) => form.setData('email', e.target.value)} />
                            <Input label="Phone" value={form.data.phone} onChange={(e) => form.setData('phone', e.target.value)} />
                            <Button variant="primary" onClick={() => form.put('/company/settings')} isLoading={form.processing}>
                                Save Changes
                            </Button>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </>
    );
}
