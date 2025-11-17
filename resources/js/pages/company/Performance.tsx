import React from 'react';
import { Head, router } from '@inertiajs/react';
import { Card, CardHeader, CardTitle, CardBody, Badge, Avatar, Select } from '@/components/ui';
import { TrendingUp, MessageSquare, Ticket, Clock, Star } from 'lucide-react';

export default function Performance({ performanceData, period }: any) {
    return (
        <>
            <Head title="Staff Performance" />
            <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-8 flex items-center justify-between">
                        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Staff Performance</h1>
                        <Select value={period} onChange={(e) => router.get('/company/performance', { period: e.target.value })}>
                            <option value="week">This Week</option>
                            <option value="month">This Month</option>
                            <option value="year">This Year</option>
                        </Select>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {performanceData.map((data: any) => (
                            <Card key={data.staff.id} variant="bordered">
                                <CardBody>
                                    <div className="flex items-center gap-3 mb-4">
                                        <Avatar name={data.staff.name} />
                                        <div>
                                            <h3 className="font-semibold text-slate-900 dark:text-white">{data.staff.name}</h3>
                                            <p className="text-sm text-slate-600 dark:text-slate-400">{data.staff.designation}</p>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                                                <MessageSquare className="h-4 w-4" />
                                                <span>Chats</span>
                                            </div>
                                            <span className="font-semibold text-slate-900 dark:text-white">{data.total_chats}</span>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                                                <Ticket className="h-4 w-4" />
                                                <span>Tickets</span>
                                            </div>
                                            <span className="font-semibold text-slate-900 dark:text-white">{data.total_tickets}</span>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                                                <Clock className="h-4 w-4" />
                                                <span>Avg Response</span>
                                            </div>
                                            <span className="font-semibold text-slate-900 dark:text-white">{Math.floor(data.avg_response_time / 60)}m</span>
                                        </div>

                                        {data.satisfaction_rating && (
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                                                    <Star className="h-4 w-4" />
                                                    <span>Satisfaction</span>
                                                </div>
                                                <Badge variant="success">{data.satisfaction_rating} / 5</Badge>
                                            </div>
                                        )}
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
