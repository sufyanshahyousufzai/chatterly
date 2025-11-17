import React from 'react';
import { Head } from '@inertiajs/react';
import { Card, CardBody, Badge, Button } from '@/components/ui';
import { MessageSquare, Send, Phone, CheckCircle, XCircle, Clock } from 'lucide-react';

interface MessagingProps {
    channels: any[];
    templates: any[];
    smsStats: {
        total_sent: number;
        delivered: number;
        failed: number;
        pending: number;
    };
}

export default function Messaging({ channels, templates, smsStats }: MessagingProps) {
    const getChannelIcon = (type: string) => {
        if (type === 'whatsapp') {
            return <MessageSquare className="h-6 w-6 text-green-600" />;
        }
        return <Phone className="h-6 w-6 text-primary-600" />;
    };

    return (
        <>
            <Head title="SMS & WhatsApp" />
            <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Messaging Channels</h1>
                        <p className="text-slate-600 dark:text-slate-400 mt-1">Configure SMS and WhatsApp integrations</p>
                    </div>

                    {/* Statistics */}
                    <div className="grid md:grid-cols-4 gap-6 mb-8">
                        <Card variant="bordered">
                            <CardBody>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-slate-600 dark:text-slate-400">Total Sent</p>
                                        <p className="text-2xl font-bold text-slate-900 dark:text-white">{smsStats.total_sent}</p>
                                    </div>
                                    <div className="p-3 bg-primary-100 dark:bg-primary-900 rounded-lg">
                                        <Send className="h-6 w-6 text-primary-600" />
                                    </div>
                                </div>
                            </CardBody>
                        </Card>

                        <Card variant="bordered">
                            <CardBody>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-slate-600 dark:text-slate-400">Delivered</p>
                                        <p className="text-2xl font-bold text-slate-900 dark:text-white">{smsStats.delivered}</p>
                                    </div>
                                    <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                                        <CheckCircle className="h-6 w-6 text-green-600" />
                                    </div>
                                </div>
                            </CardBody>
                        </Card>

                        <Card variant="bordered">
                            <CardBody>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-slate-600 dark:text-slate-400">Failed</p>
                                        <p className="text-2xl font-bold text-slate-900 dark:text-white">{smsStats.failed}</p>
                                    </div>
                                    <div className="p-3 bg-rose-100 dark:bg-rose-900 rounded-lg">
                                        <XCircle className="h-6 w-6 text-rose-600" />
                                    </div>
                                </div>
                            </CardBody>
                        </Card>

                        <Card variant="bordered">
                            <CardBody>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-slate-600 dark:text-slate-400">Pending</p>
                                        <p className="text-2xl font-bold text-slate-900 dark:text-white">{smsStats.pending}</p>
                                    </div>
                                    <div className="p-3 bg-amber-100 dark:bg-amber-900 rounded-lg">
                                        <Clock className="h-6 w-6 text-amber-600" />
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    </div>

                    {/* Channels */}
                    <div className="mb-8">
                        <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">Messaging Channels</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            {channels.map((channel) => (
                                <Card key={channel.id} variant="bordered">
                                    <CardBody>
                                        <div className="flex items-start justify-between">
                                            <div className="flex items-start gap-4">
                                                <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-lg">
                                                    {getChannelIcon(channel.channel_type)}
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold text-slate-900 dark:text-white mb-1">
                                                        {channel.channel_type === 'whatsapp' ? 'WhatsApp Business' : 'SMS (Twilio)'}
                                                    </h3>
                                                    <p className="text-sm text-slate-600 dark:text-slate-400">
                                                        {channel.channel_type === 'whatsapp'
                                                            ? 'Send messages via WhatsApp Business API'
                                                            : 'Send SMS via Twilio'}
                                                    </p>
                                                </div>
                                            </div>
                                            <Badge variant={channel.is_active ? 'success' : 'default'}>
                                                {channel.is_active ? 'Active' : 'Inactive'}
                                            </Badge>
                                        </div>
                                        <div className="mt-4 flex gap-2">
                                            <Button variant="outline" size="sm">Configure</Button>
                                            <Button variant="ghost" size="sm">Test</Button>
                                        </div>
                                    </CardBody>
                                </Card>
                            ))}
                        </div>
                    </div>

                    {/* Templates */}
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Message Templates</h2>
                            <Button variant="primary" size="sm">Create Template</Button>
                        </div>
                        <div className="space-y-4">
                            {templates.map((template) => (
                                <Card key={template.id} variant="bordered">
                                    <CardBody>
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <h3 className="font-semibold text-slate-900 dark:text-white">{template.name}</h3>
                                                    <Badge variant="outline">{template.channel_type}</Badge>
                                                    <Badge variant={template.is_active ? 'success' : 'default'}>
                                                        {template.is_active ? 'Active' : 'Inactive'}
                                                    </Badge>
                                                </div>
                                                <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                                                    {template.template_text}
                                                </p>
                                                {template.variables && template.variables.length > 0 && (
                                                    <div className="flex gap-2">
                                                        {template.variables.map((variable: string) => (
                                                            <Badge key={variable} variant="secondary" size="sm">
                                                                {`{{${variable}}}`}
                                                            </Badge>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex gap-2">
                                                <Button variant="ghost" size="sm">Edit</Button>
                                                <Button variant="ghost" size="sm">Delete</Button>
                                            </div>
                                        </div>
                                    </CardBody>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
