import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { Card, CardHeader, CardTitle, CardBody, Button } from '@/components/ui';
import { Book, Plus } from 'lucide-react';

interface Props {
    categories: any[];
    recentArticles: any[];
}

export default function KnowledgeBase({ categories, recentArticles }: Props) {
    return (
        <>
            <Head title="Knowledge Base" />
            <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-8 flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Knowledge Base</h1>
                            <p className="text-slate-600 dark:text-slate-400">{categories.length} categories, {recentArticles.length} articles</p>
                        </div>
                        <Button variant="primary" leftIcon={<Plus className="h-4 w-4" />}>New Article</Button>
                    </div>
                    <Card variant="bordered">
                        <CardBody><p className="text-center py-12 text-slate-500"><Book className="h-16 w-16 mx-auto mb-4 opacity-20" /><p>Knowledge Base foundation ready</p></p></CardBody>
                    </Card>
                </div>
            </div>
        </>
    );
}
