import React from 'react';
import { Head } from '@inertiajs/react';
import { Card, CardBody, Badge, Button } from '@/components/ui';
import { Webhook, Plus, Link as LinkIcon } from 'lucide-react';

export default function Webhooks({ webhooks }: any) {
    return (
        <>
            <Head title="Webhooks" />
            <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-8 flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Webhooks</h1>
                            <p className="text-slate-600 dark:text-slate-400 mt-1">Configure webhooks to receive real-time notifications</p>
                        </div>
                        <Button variant="primary" leftIcon={<Plus className="h-4 w-4" />}>Add Webhook</Button>
                    </div>

                    <div className="space-y-4">
                        {webhooks.map((webhook: any) => (
                            <Card key={webhook.id} variant="bordered">
                                <CardBody>
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-start gap-4">
                                            <div className="p-3 bg-primary-100 dark:bg-primary-900 rounded-lg">
                                                <Webhook className="h-6 w-6 text-primary-600" />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-slate-900 dark:text-white mb-1">{webhook.name}</h3>
                                                <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 mb-2">
                                                    <LinkIcon className="h-4 w-4" />
                                                    <code className="bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">{webhook.url}</code>
                                                </div>
                                                <div className="flex gap-2">
                                                    {webhook.events.map((event: string) => (
                                                        <Badge key={event} variant="outline">{event}</Badge>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <Badge variant={webhook.is_active ? 'success' : 'default'}>
                                            {webhook.is_active ? 'Active' : 'Inactive'}
                                        </Badge>
                                    </div>
                                </CardBody>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
