import React from 'react';
import { Head } from '@inertiajs/react';
import { Card, CardBody, Badge, Avatar } from '@/components/ui';
import { Activity } from 'lucide-react';
import { formatDateTime } from '@/lib/utils';

export default function ActivityLogs({ logs }: any) {
    return (
        <>
            <Head title="Activity Logs" />
            <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Activity Logs</h1>
                        <p className="text-slate-600 dark:text-slate-400 mt-1">Track all actions performed in your account</p>
                    </div>

                    <Card variant="bordered">
                        <CardBody className="p-0">
                            {logs.data.length === 0 ? (
                                <div className="p-12 text-center text-slate-500">
                                    <Activity className="h-16 w-16 mx-auto mb-4 opacity-20" />
                                    <p>No activity logs yet</p>
                                </div>
                            ) : (
                                <div className="divide-y divide-slate-200 dark:divide-slate-700">
                                    {logs.data.map((log: any) => (
                                        <div key={log.id} className="p-4 hover:bg-slate-50 dark:hover:bg-slate-800">
                                            <div className="flex items-start gap-3">
                                                <Avatar name={log.causer?.name || 'System'} size="sm" />
                                                <div className="flex-1">
                                                    <p className="text-sm text-slate-900 dark:text-white">
                                                        <span className="font-medium">{log.causer?.name || 'System'}</span>
                                                        {' '}{log.description}
                                                    </p>
                                                    <div className="flex items-center gap-3 mt-1">
                                                        <span className="text-xs text-slate-500">{formatDateTime(log.created_at)}</span>
                                                        <Badge variant="outline" className="text-xs">{log.log_name}</Badge>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardBody>
                    </Card>
                </div>
            </div>
        </>
    );
}
