import React from 'react';
import { Head } from '@inertiajs/react';
import { Card, CardBody, Badge, Avatar } from '@/components/ui';
import { Smile, Frown, Meh, TrendingUp, Star, MessageSquare } from 'lucide-react';

interface FeedbackProps {
    feedbacks: any;
    metrics: {
        csat: number;
        nps: number;
        avg_rating: number;
        total_feedbacks: number;
        rating_distribution: Record<number, number>;
    };
    period: string;
}

export default function Feedback({ feedbacks, metrics, period }: FeedbackProps) {
    const getSentimentIcon = (rating: number) => {
        if (rating >= 8) return <Smile className="h-5 w-5 text-green-600" />;
        if (rating >= 5) return <Meh className="h-5 w-5 text-amber-600" />;
        return <Frown className="h-5 w-5 text-rose-600" />;
    };

    const getSentimentColor = (rating: number) => {
        if (rating >= 8) return 'success';
        if (rating >= 5) return 'warning';
        return 'danger';
    };

    return (
        <>
            <Head title="Customer Feedback" />
            <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Customer Feedback</h1>
                        <p className="text-slate-600 dark:text-slate-400 mt-1">Track customer satisfaction and feedback</p>
                    </div>

                    {/* Metrics */}
                    <div className="grid md:grid-cols-4 gap-6 mb-8">
                        <Card variant="bordered">
                            <CardBody>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-slate-600 dark:text-slate-400">CSAT Score</p>
                                        <p className="text-2xl font-bold text-slate-900 dark:text-white">{metrics.csat}%</p>
                                    </div>
                                    <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                                        <Smile className="h-6 w-6 text-green-600" />
                                    </div>
                                </div>
                            </CardBody>
                        </Card>

                        <Card variant="bordered">
                            <CardBody>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-slate-600 dark:text-slate-400">NPS Score</p>
                                        <p className="text-2xl font-bold text-slate-900 dark:text-white">{metrics.nps}</p>
                                    </div>
                                    <div className="p-3 bg-primary-100 dark:bg-primary-900 rounded-lg">
                                        <TrendingUp className="h-6 w-6 text-primary-600" />
                                    </div>
                                </div>
                            </CardBody>
                        </Card>

                        <Card variant="bordered">
                            <CardBody>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-slate-600 dark:text-slate-400">Avg Rating</p>
                                        <p className="text-2xl font-bold text-slate-900 dark:text-white">{metrics.avg_rating}/10</p>
                                    </div>
                                    <div className="p-3 bg-amber-100 dark:bg-amber-900 rounded-lg">
                                        <Star className="h-6 w-6 text-amber-600" />
                                    </div>
                                </div>
                            </CardBody>
                        </Card>

                        <Card variant="bordered">
                            <CardBody>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-slate-600 dark:text-slate-400">Total Feedback</p>
                                        <p className="text-2xl font-bold text-slate-900 dark:text-white">{metrics.total_feedbacks}</p>
                                    </div>
                                    <div className="p-3 bg-teal-100 dark:bg-teal-900 rounded-lg">
                                        <MessageSquare className="h-6 w-6 text-teal-600" />
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    </div>

                    {/* Feedback List */}
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">Recent Feedback</h2>
                        {feedbacks.data.map((feedback: any) => (
                            <Card key={feedback.id} variant="bordered">
                                <CardBody>
                                    <div className="flex items-start gap-4">
                                        <Avatar
                                            name={feedback.client?.name || 'Anonymous'}
                                            size="md"
                                        />
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-2">
                                                <h3 className="font-semibold text-slate-900 dark:text-white">
                                                    {feedback.client?.name || 'Anonymous'}
                                                </h3>
                                                <Badge variant={getSentimentColor(feedback.rating)}>
                                                    {feedback.rating}/10
                                                </Badge>
                                                <Badge variant="outline">
                                                    {feedback.feedback_type.toUpperCase()}
                                                </Badge>
                                                {getSentimentIcon(feedback.rating)}
                                            </div>
                                            {feedback.comment && (
                                                <p className="text-slate-700 dark:text-slate-300 mb-2">
                                                    "{feedback.comment}"
                                                </p>
                                            )}
                                            <div className="flex items-center justify-between">
                                                <p className="text-xs text-slate-500">
                                                    {new Date(feedback.created_at).toLocaleString()}
                                                </p>
                                                <p className="text-xs text-slate-500">
                                                    {feedback.feedbackable_type} #{feedback.feedbackable_id}
                                                </p>
                                            </div>
                                        </div>
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
