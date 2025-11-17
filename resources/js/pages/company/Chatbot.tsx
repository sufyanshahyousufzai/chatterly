import React, { useState } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import { Card, CardHeader, CardTitle, CardDescription, CardBody, Button, Input, Textarea, Select, Badge } from '@/components/ui';
import { Bot, Plus, Edit2, Trash2, Save, X } from 'lucide-react';

interface ChatbotTrigger {
    id: number;
    name: string;
    trigger_type: 'keyword' | 'url' | 'time_on_site' | 'page_visit_count' | 'greeting';
    keywords?: string[];
    url_pattern?: string;
    time_seconds?: number;
    page_visit_count?: number;
    response_type: 'text' | 'quick_replies' | 'form' | 'transfer_to_agent';
    response_message?: string;
    quick_replies?: string[];
    is_active: boolean;
    sort_order: number;
}

interface ChatbotResponse {
    id: number;
    keyword: string;
    response: string;
    is_active: boolean;
}

interface Props {
    triggers: ChatbotTrigger[];
    responses: ChatbotResponse[];
}

export default function Chatbot({ triggers, responses }: Props) {
    const [showTriggerForm, setShowTriggerForm] = useState(false);
    const [showResponseForm, setShowResponseForm] = useState(false);
    const [editingTrigger, setEditingTrigger] = useState<number | null>(null);
    const [editingResponse, setEditingResponse] = useState<number | null>(null);

    const triggerForm = useForm({
        name: '',
        trigger_type: 'keyword' as const,
        keywords: [] as string[],
        response_type: 'text' as const,
        response_message: '',
        is_active: true,
        sort_order: 0,
    });

    const responseForm = useForm({
        keyword: '',
        response: '',
        is_active: true,
    });

    const handleSaveTrigger = () => {
        if (editingTrigger) {
            triggerForm.put(`/company/chatbot/triggers/${editingTrigger}`, {
                onSuccess: () => {
                    setEditingTrigger(null);
                    setShowTriggerForm(false);
                    triggerForm.reset();
                },
            });
        } else {
            triggerForm.post('/company/chatbot/triggers', {
                onSuccess: () => {
                    setShowTriggerForm(false);
                    triggerForm.reset();
                },
            });
        }
    };

    const handleSaveResponse = () => {
        if (editingResponse) {
            responseForm.put(`/company/chatbot/responses/${editingResponse}`, {
                onSuccess: () => {
                    setEditingResponse(null);
                    setShowResponseForm(false);
                    responseForm.reset();
                },
            });
        } else {
            responseForm.post('/company/chatbot/responses', {
                onSuccess: () => {
                    setShowResponseForm(false);
                    responseForm.reset();
                },
            });
        }
    };

    const handleEditTrigger = (trigger: ChatbotTrigger) => {
        triggerForm.setData({
            name: trigger.name,
            trigger_type: trigger.trigger_type,
            keywords: trigger.keywords || [],
            response_type: trigger.response_type,
            response_message: trigger.response_message || '',
            is_active: trigger.is_active,
            sort_order: trigger.sort_order,
        });
        setEditingTrigger(trigger.id);
        setShowTriggerForm(true);
    };

    const handleEditResponse = (response: ChatbotResponse) => {
        responseForm.setData({
            keyword: response.keyword,
            response: response.response,
            is_active: response.is_active,
        });
        setEditingResponse(response.id);
        setShowResponseForm(true);
    };

    const handleDeleteTrigger = (id: number) => {
        if (confirm('Are you sure you want to delete this trigger?')) {
            router.delete(`/company/chatbot/triggers/${id}`);
        }
    };

    const handleDeleteResponse = (id: number) => {
        if (confirm('Are you sure you want to delete this response?')) {
            router.delete(`/company/chatbot/responses/${id}`);
        }
    };

    return (
        <>
            <Head title="Chatbot & Automation" />

            <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                            Chatbot & Automation
                        </h1>
                        <p className="text-slate-600 dark:text-slate-400">
                            Configure automated responses and chatbot triggers
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8">
                        {/* Advanced Triggers */}
                        <Card variant="bordered">
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <CardTitle>Chatbot Triggers</CardTitle>
                                        <CardDescription>Advanced automation rules</CardDescription>
                                    </div>
                                    <Button
                                        size="sm"
                                        variant="primary"
                                        leftIcon={<Plus className="h-4 w-4" />}
                                        onClick={() => {
                                            triggerForm.reset();
                                            setEditingTrigger(null);
                                            setShowTriggerForm(true);
                                        }}
                                    >
                                        Add Trigger
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardBody className="p-0">
                                {triggers.length === 0 ? (
                                    <div className="p-8 text-center text-slate-500">
                                        <Bot className="h-12 w-12 mx-auto mb-3 opacity-30" />
                                        <p>No triggers configured yet</p>
                                    </div>
                                ) : (
                                    <div className="divide-y divide-slate-200 dark:divide-slate-700">
                                        {triggers.map((trigger) => (
                                            <div key={trigger.id} className="p-4 hover:bg-slate-50 dark:hover:bg-slate-800">
                                                <div className="flex items-start justify-between">
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <h3 className="font-medium text-slate-900 dark:text-white">
                                                                {trigger.name}
                                                            </h3>
                                                            <Badge variant={trigger.is_active ? 'success' : 'default'}>
                                                                {trigger.is_active ? 'Active' : 'Inactive'}
                                                            </Badge>
                                                        </div>
                                                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                                                            {trigger.response_message}
                                                        </p>
                                                        <div className="flex gap-2 text-xs">
                                                            <Badge variant="outline">{trigger.trigger_type}</Badge>
                                                            <Badge variant="outline">{trigger.response_type}</Badge>
                                                        </div>
                                                    </div>
                                                    <div className="flex gap-2 ml-4">
                                                        <button
                                                            onClick={() => handleEditTrigger(trigger)}
                                                            className="text-slate-600 hover:text-primary-600"
                                                        >
                                                            <Edit2 className="h-4 w-4" />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteTrigger(trigger.id)}
                                                            className="text-slate-600 hover:text-red-600"
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </CardBody>
                        </Card>

                        {/* Simple Keyword Responses */}
                        <Card variant="bordered">
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <CardTitle>Keyword Responses</CardTitle>
                                        <CardDescription>Simple keyword-based replies</CardDescription>
                                    </div>
                                    <Button
                                        size="sm"
                                        variant="primary"
                                        leftIcon={<Plus className="h-4 w-4" />}
                                        onClick={() => {
                                            responseForm.reset();
                                            setEditingResponse(null);
                                            setShowResponseForm(true);
                                        }}
                                    >
                                        Add Response
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardBody className="p-0">
                                {responses.length === 0 ? (
                                    <div className="p-8 text-center text-slate-500">
                                        <Bot className="h-12 w-12 mx-auto mb-3 opacity-30" />
                                        <p>No responses configured yet</p>
                                    </div>
                                ) : (
                                    <div className="divide-y divide-slate-200 dark:divide-slate-700">
                                        {responses.map((response) => (
                                            <div key={response.id} className="p-4 hover:bg-slate-50 dark:hover:bg-slate-800">
                                                <div className="flex items-start justify-between">
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <code className="text-sm font-mono bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
                                                                {response.keyword}
                                                            </code>
                                                            <Badge variant={response.is_active ? 'success' : 'default'}>
                                                                {response.is_active ? 'Active' : 'Inactive'}
                                                            </Badge>
                                                        </div>
                                                        <p className="text-sm text-slate-600 dark:text-slate-400">
                                                            {response.response}
                                                        </p>
                                                    </div>
                                                    <div className="flex gap-2 ml-4">
                                                        <button
                                                            onClick={() => handleEditResponse(response)}
                                                            className="text-slate-600 hover:text-primary-600"
                                                        >
                                                            <Edit2 className="h-4 w-4" />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteResponse(response.id)}
                                                            className="text-slate-600 hover:text-red-600"
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </CardBody>
                        </Card>
                    </div>

                    {/* Trigger Form Modal (Simplified) */}
                    {showTriggerForm && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                            <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                                <CardHeader>
                                    <div className="flex items-center justify-between">
                                        <CardTitle>{editingTrigger ? 'Edit' : 'Add'} Trigger</CardTitle>
                                        <button onClick={() => setShowTriggerForm(false)}>
                                            <X className="h-5 w-5" />
                                        </button>
                                    </div>
                                </CardHeader>
                                <CardBody className="space-y-4">
                                    <Input
                                        label="Name"
                                        value={triggerForm.data.name}
                                        onChange={(e) => triggerForm.setData('name', e.target.value)}
                                        placeholder="e.g., Greeting Message"
                                    />
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Response Message</label>
                                        <Textarea
                                            value={triggerForm.data.response_message}
                                            onChange={(e) => triggerForm.setData('response_message', e.target.value)}
                                            rows={3}
                                            placeholder="What the bot should say..."
                                        />
                                    </div>
                                    <div className="flex gap-4">
                                        <Button variant="ghost" onClick={() => setShowTriggerForm(false)}>
                                            Cancel
                                        </Button>
                                        <Button variant="primary" onClick={handleSaveTrigger} isLoading={triggerForm.processing}>
                                            Save
                                        </Button>
                                    </div>
                                </CardBody>
                            </Card>
                        </div>
                    )}

                    {/* Response Form Modal */}
                    {showResponseForm && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                            <Card className="w-full max-w-lg">
                                <CardHeader>
                                    <div className="flex items-center justify-between">
                                        <CardTitle>{editingResponse ? 'Edit' : 'Add'} Response</CardTitle>
                                        <button onClick={() => setShowResponseForm(false)}>
                                            <X className="h-5 w-5" />
                                        </button>
                                    </div>
                                </CardHeader>
                                <CardBody className="space-y-4">
                                    <Input
                                        label="Keyword"
                                        value={responseForm.data.keyword}
                                        onChange={(e) => responseForm.setData('keyword', e.target.value)}
                                        placeholder="e.g., pricing, help, support"
                                    />
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Response</label>
                                        <Textarea
                                            value={responseForm.data.response}
                                            onChange={(e) => responseForm.setData('response', e.target.value)}
                                            rows={3}
                                            placeholder="What the bot should reply..."
                                        />
                                    </div>
                                    <label className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            checked={responseForm.data.is_active}
                                            onChange={(e) => responseForm.setData('is_active', e.target.checked)}
                                            className="w-4 h-4"
                                        />
                                        <span className="text-sm">Active</span>
                                    </label>
                                    <div className="flex gap-4">
                                        <Button variant="ghost" onClick={() => setShowResponseForm(false)}>
                                            Cancel
                                        </Button>
                                        <Button variant="primary" onClick={handleSaveResponse} isLoading={responseForm.processing}>
                                            Save
                                        </Button>
                                    </div>
                                </CardBody>
                            </Card>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
