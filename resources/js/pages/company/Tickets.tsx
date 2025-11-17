import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { Card, CardHeader, CardTitle, CardBody, Button, Input, Select, Badge, Table } from '@/components/ui';
import { Ticket as TicketIcon, Plus, Search, Filter } from 'lucide-react';
import { formatDateTime } from '@/lib/utils';

interface Staff {
    id: number;
    name: string;
}

interface Ticket {
    id: number;
    ticket_number: string;
    subject: string;
    status: 'open' | 'pending' | 'solved' | 'closed';
    priority: 'low' | 'medium' | 'high' | 'urgent';
    category?: string;
    client?: {
        id: number;
        name: string;
    };
    assigned_agent?: {
        id: number;
        name: string;
    };
    created_at: string;
    due_date?: string;
}

interface Props {
    tickets: {
        data: Ticket[];
        current_page: number;
        last_page: number;
    };
    agents: Staff[];
    filters: {
        status?: string;
        priority?: string;
        assigned_to?: string;
        search?: string;
    };
}

export default function Tickets({ tickets, agents, filters }: Props) {
    const [search, setSearch] = useState(filters.search || '');
    const [status, setStatus] = useState(filters.status || '');
    const [priority, setPriority] = useState(filters.priority || '');
    const [assignedTo, setAssignedTo] = useState(filters.assigned_to || '');

    const handleFilter = () => {
        router.get('/company/tickets', {
            status,
            priority,
            assigned_to: assignedTo,
            search,
        }, { preserveState: true });
    };

    const handleClearFilters = () => {
        setSearch('');
        setStatus('');
        setPriority('');
        setAssignedTo('');
        router.get('/company/tickets');
    };

    const getPriorityVariant = (priority: string) => {
        const variants: Record<string, 'danger' | 'warning' | 'default' | 'success'> = {
            urgent: 'danger',
            high: 'warning',
            medium: 'default',
            low: 'success',
        };
        return variants[priority] || 'default';
    };

    const getStatusVariant = (status: string) => {
        const variants: Record<string, 'success' | 'warning' | 'default' | 'primary'> = {
            open: 'primary',
            pending: 'warning',
            solved: 'success',
            closed: 'default',
        };
        return variants[status] || 'default';
    };

    return (
        <>
            <Head title="Tickets" />

            <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-8 flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                                Tickets
                            </h1>
                            <p className="text-slate-600 dark:text-slate-400">
                                {tickets.data.length} tickets found
                            </p>
                        </div>
                        <Link href="/company/tickets/create">
                            <Button variant="primary" leftIcon={<Plus className="h-4 w-4" />}>
                                New Ticket
                            </Button>
                        </Link>
                    </div>

                    {/* Filters */}
                    <Card variant="bordered" className="mb-6">
                        <CardBody>
                            <div className="grid md:grid-cols-5 gap-4">
                                <Input
                                    placeholder="Search tickets..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleFilter()}
                                />
                                <Select value={status} onChange={(e) => setStatus(e.target.value)}>
                                    <option value="">All Status</option>
                                    <option value="open">Open</option>
                                    <option value="pending">Pending</option>
                                    <option value="solved">Solved</option>
                                    <option value="closed">Closed</option>
                                </Select>
                                <Select value={priority} onChange={(e) => setPriority(e.target.value)}>
                                    <option value="">All Priority</option>
                                    <option value="low">Low</option>
                                    <option value="medium">Medium</option>
                                    <option value="high">High</option>
                                    <option value="urgent">Urgent</option>
                                </Select>
                                <Select value={assignedTo} onChange={(e) => setAssignedTo(e.target.value)}>
                                    <option value="">All Agents</option>
                                    {agents.map((agent) => (
                                        <option key={agent.id} value={agent.id}>
                                            {agent.name}
                                        </option>
                                    ))}
                                </Select>
                                <div className="flex gap-2">
                                    <Button variant="primary" onClick={handleFilter} leftIcon={<Search className="h-4 w-4" />}>
                                        Filter
                                    </Button>
                                    <Button variant="ghost" onClick={handleClearFilters}>
                                        Clear
                                    </Button>
                                </div>
                            </div>
                        </CardBody>
                    </Card>

                    {/* Tickets Table */}
                    <Card variant="bordered">
                        <CardBody className="p-0">
                            {tickets.data.length === 0 ? (
                                <div className="p-12 text-center text-slate-500">
                                    <TicketIcon className="h-16 w-16 mx-auto mb-4 opacity-20" />
                                    <h3 className="text-lg font-medium mb-2">No tickets found</h3>
                                    <p className="text-sm mb-4">Create your first ticket to get started</p>
                                    <Link href="/company/tickets/create">
                                        <Button variant="primary" leftIcon={<Plus className="h-4 w-4" />}>
                                            Create Ticket
                                        </Button>
                                    </Link>
                                </div>
                            ) : (
                                <Table>
                                    <thead>
                                        <tr>
                                            <th>Ticket</th>
                                            <th>Subject</th>
                                            <th>Client</th>
                                            <th>Status</th>
                                            <th>Priority</th>
                                            <th>Assigned To</th>
                                            <th>Created</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {tickets.data.map((ticket) => (
                                            <tr key={ticket.id}>
                                                <td>
                                                    <Link
                                                        href={`/company/tickets/${ticket.id}`}
                                                        className="font-mono text-primary-600 hover:text-primary-700 dark:text-primary-400"
                                                    >
                                                        {ticket.ticket_number}
                                                    </Link>
                                                </td>
                                                <td>
                                                    <div>
                                                        <Link
                                                            href={`/company/tickets/${ticket.id}`}
                                                            className="font-medium text-slate-900 dark:text-white hover:text-primary-600"
                                                        >
                                                            {ticket.subject}
                                                        </Link>
                                                        {ticket.category && (
                                                            <div className="text-xs text-slate-500 mt-1">
                                                                {ticket.category}
                                                            </div>
                                                        )}
                                                    </div>
                                                </td>
                                                <td>
                                                    {ticket.client ? ticket.client.name : '-'}
                                                </td>
                                                <td>
                                                    <Badge variant={getStatusVariant(ticket.status)}>
                                                        {ticket.status}
                                                    </Badge>
                                                </td>
                                                <td>
                                                    <Badge variant={getPriorityVariant(ticket.priority)}>
                                                        {ticket.priority}
                                                    </Badge>
                                                </td>
                                                <td>
                                                    {ticket.assigned_agent ? ticket.assigned_agent.name : 'Unassigned'}
                                                </td>
                                                <td className="text-sm text-slate-600 dark:text-slate-400">
                                                    {formatDateTime(ticket.created_at)}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            )}
                        </CardBody>
                    </Card>
                </div>
            </div>
        </>
    );
}
