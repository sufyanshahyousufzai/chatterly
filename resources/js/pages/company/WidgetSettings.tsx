import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { Card, CardHeader, CardTitle, CardDescription, CardBody, Button, Input, Textarea, Select, Badge } from '@/components/ui';
import { Settings, Code, Eye, Copy, Check, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CustomForm {
    id: number;
    name: string;
    form_type: string;
}

interface WidgetSettings {
    id: number;
    company_id: number;
    widget_position: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
    primary_color: string;
    online_message: string;
    offline_message: string;
    welcome_message?: string;
    show_company_logo: boolean;
    show_agent_photos: boolean;
    show_typing_indicator: boolean;
    enable_file_upload: boolean;
    enable_emoji: boolean;
    enable_sound_notifications: boolean;
    pre_chat_form_id?: number;
    offline_form_id?: number;
    auto_assign_chats: boolean;
}

interface Props {
    settings: WidgetSettings;
    preChatForms: CustomForm[];
    offlineForms: CustomForm[];
    widgetCode: string;
    company: any;
}

export default function WidgetSettings({ settings, preChatForms, offlineForms, widgetCode, company }: Props) {
    const [copied, setCopied] = useState(false);

    const { data, setData, put, processing, errors } = useForm({
        widget_position: settings.widget_position,
        primary_color: settings.primary_color,
        online_message: settings.online_message,
        offline_message: settings.offline_message,
        welcome_message: settings.welcome_message || '',
        show_company_logo: settings.show_company_logo,
        show_agent_photos: settings.show_agent_photos,
        show_typing_indicator: settings.show_typing_indicator,
        enable_file_upload: settings.enable_file_upload,
        enable_emoji: settings.enable_emoji,
        enable_sound_notifications: settings.enable_sound_notifications,
        pre_chat_form_id: settings.pre_chat_form_id || null,
        offline_form_id: settings.offline_form_id || null,
        auto_assign_chats: settings.auto_assign_chats,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put('/company/widget/settings');
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(widgetCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const positions = [
        { value: 'bottom-right', label: 'Bottom Right' },
        { value: 'bottom-left', label: 'Bottom Left' },
        { value: 'top-right', label: 'Top Right' },
        { value: 'top-left', label: 'Top Left' },
    ];

    return (
        <>
            <Head title="Widget Settings" />

            <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                            Chat Widget Settings
                        </h1>
                        <p className="text-slate-600 dark:text-slate-400">
                            Customize your live chat widget appearance and behavior
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Settings Form */}
                        <div className="lg:col-span-2 space-y-6">
                            <form onSubmit={handleSubmit}>
                                {/* Appearance Settings */}
                                <Card variant="bordered" className="mb-6">
                                    <CardHeader>
                                        <CardTitle>Appearance</CardTitle>
                                        <CardDescription>Customize how your widget looks</CardDescription>
                                    </CardHeader>
                                    <CardBody className="space-y-4">
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                                    Widget Position
                                                </label>
                                                <Select
                                                    value={data.widget_position}
                                                    onChange={(e) => setData('widget_position', e.target.value as any)}
                                                >
                                                    {positions.map((pos) => (
                                                        <option key={pos.value} value={pos.value}>
                                                            {pos.label}
                                                        </option>
                                                    ))}
                                                </Select>
                                                {errors.widget_position && (
                                                    <p className="text-red-600 text-xs mt-1">{errors.widget_position}</p>
                                                )}
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                                    Primary Color
                                                </label>
                                                <div className="flex gap-2">
                                                    <Input
                                                        type="color"
                                                        value={data.primary_color}
                                                        onChange={(e) => setData('primary_color', e.target.value)}
                                                        className="w-16 h-10 p-1"
                                                    />
                                                    <Input
                                                        type="text"
                                                        value={data.primary_color}
                                                        onChange={(e) => setData('primary_color', e.target.value)}
                                                        placeholder="#E11D48"
                                                        className="flex-1"
                                                    />
                                                </div>
                                                {errors.primary_color && (
                                                    <p className="text-red-600 text-xs mt-1">{errors.primary_color}</p>
                                                )}
                                            </div>
                                        </div>
                                    </CardBody>
                                </Card>

                                {/* Messages */}
                                <Card variant="bordered" className="mb-6">
                                    <CardHeader>
                                        <CardTitle>Messages</CardTitle>
                                        <CardDescription>Set default messages for different states</CardDescription>
                                    </CardHeader>
                                    <CardBody className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                                Online Message
                                            </label>
                                            <Input
                                                value={data.online_message}
                                                onChange={(e) => setData('online_message', e.target.value)}
                                                placeholder="Hi! How can we help?"
                                            />
                                            {errors.online_message && (
                                                <p className="text-red-600 text-xs mt-1">{errors.online_message}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                                Offline Message
                                            </label>
                                            <Input
                                                value={data.offline_message}
                                                onChange={(e) => setData('offline_message', e.target.value)}
                                                placeholder="We are currently offline. Leave a message!"
                                            />
                                            {errors.offline_message && (
                                                <p className="text-red-600 text-xs mt-1">{errors.offline_message}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                                Welcome Message (Optional)
                                            </label>
                                            <Textarea
                                                value={data.welcome_message}
                                                onChange={(e) => setData('welcome_message', e.target.value)}
                                                placeholder="Welcome to our support chat! How can we assist you today?"
                                                rows={3}
                                            />
                                            {errors.welcome_message && (
                                                <p className="text-red-600 text-xs mt-1">{errors.welcome_message}</p>
                                            )}
                                        </div>
                                    </CardBody>
                                </Card>

                                {/* Features */}
                                <Card variant="bordered" className="mb-6">
                                    <CardHeader>
                                        <CardTitle>Features</CardTitle>
                                        <CardDescription>Enable or disable widget features</CardDescription>
                                    </CardHeader>
                                    <CardBody className="space-y-3">
                                        {[
                                            { key: 'show_company_logo', label: 'Show Company Logo' },
                                            { key: 'show_agent_photos', label: 'Show Agent Photos' },
                                            { key: 'show_typing_indicator', label: 'Show Typing Indicator' },
                                            { key: 'enable_file_upload', label: 'Enable File Upload' },
                                            { key: 'enable_emoji', label: 'Enable Emoji Picker' },
                                            { key: 'enable_sound_notifications', label: 'Enable Sound Notifications' },
                                            { key: 'auto_assign_chats', label: 'Auto-Assign Chats to Agents' },
                                        ].map((feature) => (
                                            <label key={feature.key} className="flex items-center gap-3 cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={data[feature.key as keyof typeof data] as boolean}
                                                    onChange={(e) => setData(feature.key as any, e.target.checked)}
                                                    className="w-4 h-4 text-primary-600 border-slate-300 rounded focus:ring-primary-500"
                                                />
                                                <span className="text-sm text-slate-700 dark:text-slate-300">
                                                    {feature.label}
                                                </span>
                                            </label>
                                        ))}
                                    </CardBody>
                                </Card>

                                {/* Forms */}
                                <Card variant="bordered" className="mb-6">
                                    <CardHeader>
                                        <CardTitle>Custom Forms</CardTitle>
                                        <CardDescription>Select forms for different scenarios</CardDescription>
                                    </CardHeader>
                                    <CardBody className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                                Pre-Chat Form (Optional)
                                            </label>
                                            <Select
                                                value={data.pre_chat_form_id || ''}
                                                onChange={(e) => setData('pre_chat_form_id', e.target.value ? Number(e.target.value) : null)}
                                            >
                                                <option value="">No form</option>
                                                {preChatForms.map((form) => (
                                                    <option key={form.id} value={form.id}>
                                                        {form.name}
                                                    </option>
                                                ))}
                                            </Select>
                                            {errors.pre_chat_form_id && (
                                                <p className="text-red-600 text-xs mt-1">{errors.pre_chat_form_id}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                                Offline Form (Optional)
                                            </label>
                                            <Select
                                                value={data.offline_form_id || ''}
                                                onChange={(e) => setData('offline_form_id', e.target.value ? Number(e.target.value) : null)}
                                            >
                                                <option value="">No form</option>
                                                {offlineForms.map((form) => (
                                                    <option key={form.id} value={form.id}>
                                                        {form.name}
                                                    </option>
                                                ))}
                                            </Select>
                                            {errors.offline_form_id && (
                                                <p className="text-red-600 text-xs mt-1">{errors.offline_form_id}</p>
                                            )}
                                        </div>
                                    </CardBody>
                                </Card>

                                {/* Save Button */}
                                <div className="flex justify-end">
                                    <Button
                                        type="submit"
                                        variant="primary"
                                        size="lg"
                                        isLoading={processing}
                                        leftIcon={<Settings className="h-4 w-4" />}
                                    >
                                        Save Settings
                                    </Button>
                                </div>
                            </form>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Widget Preview */}
                            <Card variant="bordered">
                                <CardHeader>
                                    <CardTitle>Live Preview</CardTitle>
                                    <CardDescription>See how your widget will look</CardDescription>
                                </CardHeader>
                                <CardBody>
                                    <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-8 relative h-64">
                                        <div
                                            className={cn(
                                                'absolute',
                                                data.widget_position === 'bottom-right' && 'bottom-4 right-4',
                                                data.widget_position === 'bottom-left' && 'bottom-4 left-4',
                                                data.widget_position === 'top-right' && 'top-4 right-4',
                                                data.widget_position === 'top-left' && 'top-4 left-4'
                                            )}
                                        >
                                            <button
                                                style={{ backgroundColor: data.primary_color }}
                                                className="w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-white hover:scale-110 transition-transform"
                                            >
                                                <MessageSquare className="h-6 w-6" />
                                            </button>
                                        </div>
                                        <div className="text-center text-slate-500 dark:text-slate-400 text-sm mt-8">
                                            Widget position: <strong>{positions.find(p => p.value === data.widget_position)?.label}</strong>
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>

                            {/* Embed Code */}
                            <Card variant="bordered">
                                <CardHeader>
                                    <CardTitle>Embed Code</CardTitle>
                                    <CardDescription>Add this code to your website</CardDescription>
                                </CardHeader>
                                <CardBody>
                                    <div className="relative">
                                        <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg text-xs overflow-x-auto">
                                            <code>{widgetCode}</code>
                                        </pre>
                                        <button
                                            onClick={copyToClipboard}
                                            className="absolute top-2 right-2 p-2 bg-slate-700 hover:bg-slate-600 text-white rounded transition-colors"
                                            title="Copy to clipboard"
                                        >
                                            {copied ? (
                                                <Check className="h-4 w-4 text-green-400" />
                                            ) : (
                                                <Copy className="h-4 w-4" />
                                            )}
                                        </button>
                                    </div>
                                    <p className="text-xs text-slate-500 mt-3">
                                        Copy and paste this code into your website's HTML, preferably before the closing &lt;/body&gt; tag.
                                    </p>
                                </CardBody>
                            </Card>

                            {/* Quick Stats */}
                            <Card variant="bordered">
                                <CardHeader>
                                    <CardTitle>Widget Status</CardTitle>
                                </CardHeader>
                                <CardBody className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-slate-600 dark:text-slate-400">Status</span>
                                        <Badge variant="success">Active</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-slate-600 dark:text-slate-400">Company ID</span>
                                        <code className="text-xs bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
                                            {company.uuid}
                                        </code>
                                    </div>
                                </CardBody>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
