import React, { useState } from 'react';
import { Head, useForm, router, Link } from '@inertiajs/react';
import { Card, CardHeader, CardTitle, CardBody, Button, Input, Textarea, Select, Badge, Avatar } from '@/components/ui';
import { ArrowLeft, Send, Edit2, Trash2, Clock, User } from 'lucide-react';
import { formatDateTime } from '@/lib/utils';

interface Staff {
    id: number;
    name: string;
}

interface TicketReply {
    id: number;
    message: string;
    is_internal: boolean;
    created_at: string;
    sender: {
        id: number;
        name: string;
        email: string;
    };
    sender_type: string;
}

interface Ticket {
    id: number;
    ticket_number: string;
    subject: string;
    description: string;
    status: 'open' | 'pending' | 'solved' | 'closed';
    priority: 'low' | 'medium' | 'high' | 'urgent';
    category?: string;
    client?: {
        id: number;
        name: string;
        email: string;
    };
    assigned_agent?: {
        id: number;
        name: string;
    };
    assigned_to?: number;
    created_at: string;
    due_date?: string;
    solved_at?: string;
    closed_at?: string;
    replies: TicketReply[];
}

interface Props {
    ticket: Ticket;
    agents: Staff[];
}

export default function TicketDetail({ ticket, agents }: Props) {
    const [editing, setEditing] = useState(false);

    const updateForm = useForm({
        subject: ticket.subject,
        description: ticket.description,
        priority: ticket.priority,
        status: ticket.status,
        category: ticket.category || '',
        assigned_to: ticket.assigned_to || null,
        due_date: ticket.due_date || '',
    });

    const replyForm = useForm({
        message: '',
        is_internal: false,
    });

    const handleUpdate = () => {
        updateForm.put(`/company/tickets/${ticket.id}`, {
            onSuccess: () => setEditing(false),
        });
    };

    const handleAddReply = (e: React.FormEvent) => {
        e.preventDefault();
        replyForm.post(`/company/tickets/${ticket.id}/replies`, {
            onSuccess: () => replyForm.reset(),
        });
    };

    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this ticket?')) {
            router.delete(`/company/tickets/${ticket.id}`);
        }
    };

    const getPriorityColor = (priority: string) => {
        const colors: Record<string, string> = {
            urgent: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
            high: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
            medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
            low: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
        };
        return colors[priority] || colors.medium;
    };

    const getStatusColor = (status: string) => {
        const colors: Record<string, string> = {
            open: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
            pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
            solved: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
            closed: 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200',
        };
        return colors[status] || colors.open;
    };

    return (
        <>
            <Head title={`Ticket #${ticket.ticket_number}`} />

            <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-6">
                        <Link href="/company/tickets" className="text-primary-600 hover:text-primary-700 flex items-center gap-2 mb-4">
                            <ArrowLeft className="h-4 w-4" />
                            Back to Tickets
                        </Link>
                        <div className="flex items-start justify-between">
                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                                        {ticket.ticket_number}
                                    </h1>
                                    <Badge className={getStatusColor(ticket.status)}>
                                        {ticket.status}
                                    </Badge>
                                    <Badge className={getPriorityColor(ticket.priority)}>
                                        {ticket.priority} priority
                                    </Badge>
                                </div>
                                <p className="text-slate-600 dark:text-slate-400">
                                    Created {formatDateTime(ticket.created_at)}
                                </p>
                            </div>
                            <div className="flex gap-2">
                                <Button variant="outline" size="sm" onClick={() => setEditing(!editing)} leftIcon={<Edit2 className="h-4 w-4" />}>
                                    Edit
                                </Button>
                                <Button variant="danger" size="sm" onClick={handleDelete} leftIcon={<Trash2 className="h-4 w-4" />}>
                                    Delete
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-6">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Ticket Details */}
                            <Card variant="bordered">
                                <CardHeader>
                                    <CardTitle>Ticket Details</CardTitle>
                                </CardHeader>
                                <CardBody>
                                    {editing ? (
                                        <div className="space-y-4">
                                            <Input
                                                label="Subject"
                                                value={updateForm.data.subject}
                                                onChange={(e) => updateForm.setData('subject', e.target.value)}
                                            />
                                            <div>
                                                <label className="block text-sm font-medium mb-2">Description</label>
                                                <Textarea
                                                    value={updateForm.data.description}
                                                    onChange={(e) => updateForm.setData('description', e.target.value)}
                                                    rows={4}
                                                />
                                            </div>
                                            <Input
                                                label="Category"
                                                value={updateForm.data.category}
                                                onChange={(e) => updateForm.setData('category', e.target.value)}
                                            />
                                            <div className="flex gap-4">
                                                <Button variant="primary" onClick={handleUpdate} isLoading={updateForm.processing}>
                                                    Save Changes
                                                </Button>
                                                <Button variant="ghost" onClick={() => setEditing(false)}>
                                                    Cancel
                                                </Button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="space-y-4">
                                            <div>
                                                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                                                    {ticket.subject}
                                                </h3>
                                                <p className="text-slate-600 dark:text-slate-400 whitespace-pre-wrap">
                                                    {ticket.description}
                                                </p>
                                            </div>
                                            {ticket.category && (
                                                <div>
                                                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Category: </span>
                                                    <span className="text-sm text-slate-600 dark:text-slate-400">{ticket.category}</span>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </CardBody>
                            </Card>

                            {/* Replies */}
                            <Card variant="bordered">
                                <CardHeader>
                                    <CardTitle>Replies ({ticket.replies.length})</CardTitle>
                                </CardHeader>
                                <CardBody>
                                    <div className="space-y-4 mb-6">
                                        {ticket.replies.length === 0 ? (
                                            <p className="text-center text-slate-500 py-8">No replies yet</p>
                                        ) : (
                                            ticket.replies.map((reply) => (
                                                <div key={reply.id} className="flex gap-3">
                                                    <Avatar name={reply.sender.name} size="sm" />
                                                    <div className="flex-1">
                                                        <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4">
                                                            <div className="flex items-center justify-between mb-2">
                                                                <span className="font-medium text-slate-900 dark:text-white">
                                                                    {reply.sender.name}
                                                                </span>
                                                                <span className="text-xs text-slate-500">
                                                                    {formatDateTime(reply.created_at)}
                                                                </span>
                                                            </div>
                                                            <p className="text-slate-600 dark:text-slate-400 whitespace-pre-wrap">
                                                                {reply.message}
                                                            </p>
                                                            {reply.is_internal && (
                                                                <Badge variant="warning" className="mt-2 text-xs">
                                                                    Internal Note
                                                                </Badge>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        )}
                                    </div>

                                    {/* Add Reply Form */}
                                    <form onSubmit={handleAddReply} className="border-t pt-4">
                                        <Textarea
                                            placeholder="Write a reply..."
                                            value={replyForm.data.message}
                                            onChange={(e) => replyForm.setData('message', e.target.value)}
                                            rows={3}
                                            className="mb-3"
                                        />
                                        <div className="flex items-center justify-between">
                                            <label className="flex items-center gap-2">
                                                <input
                                                    type="checkbox"
                                                    checked={replyForm.data.is_internal}
                                                    onChange={(e) => replyForm.setData('is_internal', e.target.checked)}
                                                    className="w-4 h-4"
                                                />
                                                <span className="text-sm text-slate-600 dark:text-slate-400">Internal note</span>
                                            </label>
                                            <Button type="submit" variant="primary" isLoading={replyForm.processing} leftIcon={<Send className="h-4 w-4" />}>
                                                Send Reply
                                            </Button>
                                        </div>
                                    </form>
                                </CardBody>
                            </Card>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Quick Actions */}
                            <Card variant="bordered">
                                <CardHeader>
                                    <CardTitle>Quick Actions</CardTitle>
                                </CardHeader>
                                <CardBody className="space-y-3">
                                    <Select
                                        value={updateForm.data.status}
                                        onChange={(e) => {
                                            updateForm.setData('status', e.target.value as any);
                                            updateForm.put(`/company/tickets/${ticket.id}`);
                                        }}
                                    >
                                        <option value="open">Open</option>
                                        <option value="pending">Pending</option>
                                        <option value="solved">Solved</option>
                                        <option value="closed">Closed</option>
                                    </Select>

                                    <Select
                                        value={updateForm.data.priority}
                                        onChange={(e) => {
                                            updateForm.setData('priority', e.target.value as any);
                                            updateForm.put(`/company/tickets/${ticket.id}`);
                                        }}
                                    >
                                        <option value="low">Low</option>
                                        <option value="medium">Medium</option>
                                        <option value="high">High</option>
                                        <option value="urgent">Urgent</option>
                                    </Select>

                                    <Select
                                        value={updateForm.data.assigned_to || ''}
                                        onChange={(e) => {
                                            updateForm.setData('assigned_to', e.target.value ? Number(e.target.value) : null);
                                            updateForm.put(`/company/tickets/${ticket.id}`);
                                        }}
                                    >
                                        <option value="">Unassigned</option>
                                        {agents.map((agent) => (
                                            <option key={agent.id} value={agent.id}>
                                                {agent.name}
                                            </option>
                                        ))}
                                    </Select>
                                </CardBody>
                            </Card>

                            {/* Client Info */}
                            {ticket.client && (
                                <Card variant="bordered">
                                    <CardHeader>
                                        <CardTitle>Client</CardTitle>
                                    </CardHeader>
                                    <CardBody>
                                        <div className="flex items-center gap-3">
                                            <Avatar name={ticket.client.name} />
                                            <div>
                                                <p className="font-medium text-slate-900 dark:text-white">
                                                    {ticket.client.name}
                                                </p>
                                                <p className="text-sm text-slate-600 dark:text-slate-400">
                                                    {ticket.client.email}
                                                </p>
                                            </div>
                                        </div>
                                    </CardBody>
                                </Card>
                            )}

                            {/* Metadata */}
                            <Card variant="bordered">
                                <CardHeader>
                                    <CardTitle>Details</CardTitle>
                                </CardHeader>
                                <CardBody className="space-y-3 text-sm">
                                    <div>
                                        <span className="text-slate-600 dark:text-slate-400">Created:</span>
                                        <p className="font-medium text-slate-900 dark:text-white">
                                            {formatDateTime(ticket.created_at)}
                                        </p>
                                    </div>
                                    {ticket.due_date && (
                                        <div>
                                            <span className="text-slate-600 dark:text-slate-400">Due Date:</span>
                                            <p className="font-medium text-slate-900 dark:text-white">
                                                {formatDateTime(ticket.due_date)}
                                            </p>
                                        </div>
                                    )}
                                    {ticket.solved_at && (
                                        <div>
                                            <span className="text-slate-600 dark:text-slate-400">Solved:</span>
                                            <p className="font-medium text-slate-900 dark:text-white">
                                                {formatDateTime(ticket.solved_at)}
                                            </p>
                                        </div>
                                    )}
                                    {ticket.closed_at && (
                                        <div>
                                            <span className="text-slate-600 dark:text-slate-400">Closed:</span>
                                            <p className="font-medium text-slate-900 dark:text-white">
                                                {formatDateTime(ticket.closed_at)}
                                            </p>
                                        </div>
                                    )}
                                </CardBody>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
