import React from 'react';
import { Head } from '@inertiajs/react';
import { Card, CardBody, Badge, Button } from '@/components/ui';
import { Sparkles, Brain, MessageSquare, FileText, Languages, TrendingUp } from 'lucide-react';

interface AiAutomationProps {
    automations: any[];
    stats: {
        smart_replies_used: number;
        sentiment_analyzed: number;
        summaries_generated: number;
        auto_translations: number;
    };
}

export default function AiAutomation({ automations, stats }: AiAutomationProps) {
    const automationFeatures = [
        {
            id: 1,
            name: 'Smart Reply Suggestions',
            description: 'AI-powered reply suggestions based on conversation context',
            icon: <MessageSquare className="h-6 w-6 text-primary-600" />,
            type: 'smart_reply',
            usageCount: stats.smart_replies_used,
        },
        {
            id: 2,
            name: 'Sentiment Analysis',
            description: 'Real-time sentiment analysis of customer conversations',
            icon: <Brain className="h-6 w-6 text-teal-600" />,
            type: 'sentiment',
            usageCount: stats.sentiment_analyzed,
        },
        {
            id: 3,
            name: 'Conversation Summaries',
            description: 'Automatic generation of conversation summaries',
            icon: <FileText className="h-6 w-6 text-amber-600" />,
            type: 'summary',
            usageCount: stats.summaries_generated,
        },
        {
            id: 4,
            name: 'Auto Translation',
            description: 'Automatic message translation for multilingual support',
            icon: <Languages className="h-6 w-6 text-rose-600" />,
            type: 'translation',
            usageCount: stats.auto_translations,
        },
    ];

    return (
        <>
            <Head title="AI & Automation" />
            <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-8">
                        <div className="flex items-center gap-2 mb-2">
                            <Sparkles className="h-8 w-8 text-primary-600" />
                            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">AI & Automation</h1>
                        </div>
                        <p className="text-slate-600 dark:text-slate-400">
                            Enhance your customer support with AI-powered features
                        </p>
                    </div>

                    {/* AI Features */}
                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                        {automationFeatures.map((feature) => {
                            const automation = automations.find((a) => a.automation_type === feature.type);
                            const isActive = automation?.is_active ?? false;

                            return (
                                <Card key={feature.id} variant="bordered">
                                    <CardBody>
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="flex items-start gap-3">
                                                <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-lg">
                                                    {feature.icon}
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="font-semibold text-slate-900 dark:text-white mb-1">
                                                        {feature.name}
                                                    </h3>
                                                    <p className="text-sm text-slate-600 dark:text-slate-400">
                                                        {feature.description}
                                                    </p>
                                                </div>
                                            </div>
                                            <Badge variant={isActive ? 'success' : 'default'}>
                                                {isActive ? 'Active' : 'Inactive'}
                                            </Badge>
                                        </div>

                                        <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-700">
                                            <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                                                <TrendingUp className="h-4 w-4" />
                                                <span>{feature.usageCount.toLocaleString()} uses</span>
                                            </div>
                                            <div className="flex gap-2">
                                                <Button variant="outline" size="sm">
                                                    Configure
                                                </Button>
                                                <Button
                                                    variant={isActive ? 'ghost' : 'primary'}
                                                    size="sm"
                                                >
                                                    {isActive ? 'Disable' : 'Enable'}
                                                </Button>
                                            </div>
                                        </div>
                                    </CardBody>
                                </Card>
                            );
                        })}
                    </div>

                    {/* Usage Statistics */}
                    <Card variant="bordered">
                        <CardBody>
                            <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
                                AI Usage Statistics
                            </h2>
                            <div className="grid md:grid-cols-4 gap-6">
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-primary-600 mb-1">
                                        {stats.smart_replies_used.toLocaleString()}
                                    </div>
                                    <p className="text-sm text-slate-600 dark:text-slate-400">Smart Replies</p>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-teal-600 mb-1">
                                        {stats.sentiment_analyzed.toLocaleString()}
                                    </div>
                                    <p className="text-sm text-slate-600 dark:text-slate-400">Sentiment Analyses</p>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-amber-600 mb-1">
                                        {stats.summaries_generated.toLocaleString()}
                                    </div>
                                    <p className="text-sm text-slate-600 dark:text-slate-400">Summaries</p>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-rose-600 mb-1">
                                        {stats.auto_translations.toLocaleString()}
                                    </div>
                                    <p className="text-sm text-slate-600 dark:text-slate-400">Translations</p>
                                </div>
                            </div>
                        </CardBody>
                    </Card>

                    {/* Information Card */}
                    <Card variant="bordered" className="mt-6">
                        <CardBody>
                            <div className="flex items-start gap-3">
                                <Sparkles className="h-5 w-5 text-primary-600 mt-0.5" />
                                <div>
                                    <h3 className="font-semibold text-slate-900 dark:text-white mb-1">
                                        About AI Features
                                    </h3>
                                    <p className="text-sm text-slate-600 dark:text-slate-400">
                                        Our AI-powered features use advanced machine learning models to enhance your customer support experience.
                                        Configure each feature to match your business needs and monitor usage statistics to track effectiveness.
                                    </p>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </>
    );
}
