import React from 'react';
import { Head } from '@inertiajs/react';
import { Card, CardHeader, CardTitle, CardDescription, CardBody, Badge, Avatar } from '@/components/ui';
import { MessageSquare, Users, TrendingUp, Clock, UserCheck, Ticket, Eye, Mail } from 'lucide-react';
import { formatDateTime } from '@/lib/utils';

interface Props {
    company: any;
    stats: any;
    recentConversations: any[];
    activeVisitors: any[];
    teamMembers: any[];
}

export default function Dashboard({ company, stats, recentConversations, activeVisitors, teamMembers }: Props) {
    return (
        <>
            <Head title="Dashboard" />

            <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                            Dashboard
                        </h1>
                        <p className="text-slate-600 dark:text-slate-400">
                            Welcome back to {company.name}!
                        </p>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <Card variant="bordered">
                            <CardBody className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                                            Total Conversations
                                        </p>
                                        <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">
                                            {stats.total_conversations}
                                        </p>
                                        <p className="text-xs text-slate-500 mt-1">
                                            {stats.conversations_today} today
                                        </p>
                                    </div>
                                    <div className="p-3 bg-primary-100 dark:bg-primary-900/30 rounded-lg">
                                        <MessageSquare className="h-6 w-6 text-primary-600" />
                                    </div>
                                </div>
                            </CardBody>
                        </Card>

                        <Card variant="bordered">
                            <CardBody className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                                            Active Visitors
                                        </p>
                                        <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">
                                            {stats.active_visitors}
                                        </p>
                                        <p className="text-xs text-slate-500 mt-1">
                                            Last 5 minutes
                                        </p>
                                    </div>
                                    <div className="p-3 bg-secondary-100 dark:bg-secondary-900/30 rounded-lg">
                                        <Eye className="h-6 w-6 text-secondary-600" />
                                    </div>
                                </div>
                            </CardBody>
                        </Card>

                        <Card variant="bordered">
                            <CardBody className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                                            Avg Response Time
                                        </p>
                                        <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">
                                            {stats.avg_response_time || '-'}
                                        </p>
                                        <p className="text-xs text-slate-500 mt-1">
                                            First response
                                        </p>
                                    </div>
                                    <div className="p-3 bg-accent-100 dark:bg-accent-900/30 rounded-lg">
                                        <Clock className="h-6 w-6 text-accent-600" />
                                    </div>
                                </div>
                            </CardBody>
                        </Card>

                        <Card variant="bordered">
                            <CardBody className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                                            Satisfaction Rate
                                        </p>
                                        <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">
                                            {stats.satisfaction_rate || '-'}
                                        </p>
                                        <p className="text-xs text-slate-500 mt-1">
                                            From ratings
                                        </p>
                                    </div>
                                    <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                                        <TrendingUp className="h-6 w-6 text-green-600" />
                                    </div>
                                </div>
                            </CardBody>
                        </Card>

                        <Card variant="bordered">
                            <CardBody className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                                            Team Online
                                        </p>
                                        <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">
                                            {stats.staff_online}/{stats.total_staff}
                                        </p>
                                    </div>
                                    <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                                        <UserCheck className="h-6 w-6 text-blue-600" />
                                    </div>
                                </div>
                            </CardBody>
                        </Card>

                        <Card variant="bordered">
                            <CardBody className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                                            Total Clients
                                        </p>
                                        <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">
                                            {stats.total_clients}
                                        </p>
                                    </div>
                                    <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                                        <Users className="h-6 w-6 text-purple-600" />
                                    </div>
                                </div>
                            </CardBody>
                        </Card>

                        <Card variant="bordered">
                            <CardBody className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                                            Open Tickets
                                        </p>
                                        <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">
                                            {stats.open_tickets}
                                        </p>
                                    </div>
                                    <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                                        <Ticket className="h-6 w-6 text-orange-600" />
                                    </div>
                                </div>
                            </CardBody>
                        </Card>

                        <Card variant="bordered">
                            <CardBody className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                                            Messages Today
                                        </p>
                                        <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">
                                            {stats.messages_today}
                                        </p>
                                    </div>
                                    <div className="p-3 bg-pink-100 dark:bg-pink-900/30 rounded-lg">
                                        <Mail className="h-6 w-6 text-pink-600" />
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8">
                        {/* Recent Conversations */}
                        <Card variant="bordered">
                            <CardHeader>
                                <CardTitle>Recent Conversations</CardTitle>
                                <CardDescription>Latest chat conversations</CardDescription>
                            </CardHeader>
                            <CardBody className="p-0">
                                {recentConversations && recentConversations.length > 0 ? (
                                    <div className="divide-y divide-slate-200 dark:divide-slate-700">
                                        {recentConversations.map((conversation) => (
                                            <div key={conversation.id} className="p-4 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <p className="font-medium text-slate-900 dark:text-white">
                                                            {conversation.visitor_name}
                                                        </p>
                                                        <p className="text-sm text-slate-500">
                                                            {conversation.assigned_to || 'Unassigned'}
                                                        </p>
                                                    </div>
                                                    <div className="text-right">
                                                        <Badge variant={
                                                            conversation.status === 'active' ? 'success' :
                                                            conversation.status === 'closed' ? 'default' : 'warning'
                                                        }>
                                                            {conversation.status}
                                                        </Badge>
                                                        <p className="text-xs text-slate-500 mt-1">
                                                            {formatDateTime(conversation.created_at)}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="p-8 text-center text-slate-500">
                                        No conversations yet
                                    </div>
                                )}
                            </CardBody>
                        </Card>

                        {/* Active Visitors */}
                        <Card variant="bordered">
                            <CardHeader>
                                <CardTitle>Active Visitors</CardTitle>
                                <CardDescription>Currently browsing your website</CardDescription>
                            </CardHeader>
                            <CardBody className="p-0">
                                {activeVisitors && activeVisitors.length > 0 ? (
                                    <div className="divide-y divide-slate-200 dark:divide-slate-700">
                                        {activeVisitors.map((visitor) => (
                                            <div key={visitor.id} className="p-4 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-3">
                                                        <Avatar name={visitor.name} size="sm" status="online" />
                                                        <div>
                                                            <p className="font-medium text-slate-900 dark:text-white">
                                                                {visitor.name}
                                                            </p>
                                                            <p className="text-sm text-slate-500 truncate max-w-xs">
                                                                {visitor.current_page}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="text-right text-xs text-slate-500">
                                                        <p>{visitor.city}, {visitor.country}</p>
                                                        <p>{visitor.device}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="p-8 text-center text-slate-500">
                                        No active visitors
                                    </div>
                                )}
                            </CardBody>
                        </Card>

                        {/* Team Members */}
                        <Card variant="bordered" className="lg:col-span-2">
                            <CardHeader>
                                <CardTitle>Team Members</CardTitle>
                                <CardDescription>Your support team status</CardDescription>
                            </CardHeader>
                            <CardBody className="p-0">
                                {teamMembers && teamMembers.length > 0 ? (
                                    <div className="divide-y divide-slate-200 dark:divide-slate-700">
                                        {teamMembers.map((staff) => (
                                            <div key={staff.id} className="p-4 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-3">
                                                        <Avatar
                                                            name={staff.name}
                                                            status={staff.online_status as any}
                                                        />
                                                        <div>
                                                            <p className="font-medium text-slate-900 dark:text-white">
                                                                {staff.name}
                                                            </p>
                                                            <p className="text-sm text-slate-500">
                                                                {staff.email}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-4">
                                                        <div className="text-right">
                                                            <p className="text-sm font-medium text-slate-900 dark:text-white">
                                                                {staff.active_chats}/{staff.max_concurrent_chats}
                                                            </p>
                                                            <p className="text-xs text-slate-500">
                                                                Active chats
                                                            </p>
                                                        </div>
                                                        <Badge variant={
                                                            staff.online_status === 'online' ? 'success' :
                                                            staff.online_status === 'busy' ? 'warning' :
                                                            staff.online_status === 'away' ? 'info' : 'default'
                                                        }>
                                                            {staff.online_status}
                                                        </Badge>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="p-8 text-center text-slate-500">
                                        No team members yet. Invite your first team member!
                                    </div>
                                )}
                            </CardBody>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    );
}
