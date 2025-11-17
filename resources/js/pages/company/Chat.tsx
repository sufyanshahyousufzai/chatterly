import React, { useState, useEffect, useRef } from 'react';
import { Head, router } from '@inertiajs/react';
import { Card, CardHeader, CardTitle, CardBody, Badge, Avatar, Button, Textarea } from '@/components/ui';
import { MessageSquare, Send, X, CheckCheck, Clock, User } from 'lucide-react';
import { formatDateTime, cn } from '@/lib/utils';
import axios from 'axios';

interface Conversation {
    id: number;
    status: 'active' | 'waiting' | 'closed';
    created_at: string;
    visitor?: {
        id: number;
        name: string;
        email?: string;
    };
    client?: {
        id: number;
        name: string;
        email: string;
    };
    assigned_to?: {
        id: number;
        name: string;
    };
    unread_count?: number;
}

interface Message {
    id: number;
    conversation_id: number;
    sender_type: string;
    sender_id: number;
    message: string;
    message_type: string;
    is_read: boolean;
    read_at?: string;
    created_at: string;
    sender?: {
        id: number;
        name: string;
        email?: string;
    };
}

interface Props {
    conversations: {
        data: Conversation[];
        current_page: number;
        last_page: number;
    };
}

export default function Chat({ conversations }: Props) {
    const [selectedConversation, setSelectedConversation] = useState<number | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [sending, setSending] = useState(false);
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    // Scroll to bottom of messages
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Load conversation messages
    const loadConversation = async (conversationId: number) => {
        setLoading(true);
        setSelectedConversation(conversationId);

        try {
            const response = await axios.get(`/company/chat/${conversationId}`);
            setMessages(response.data.messages || []);

            // Mark as read
            await axios.post(`/company/chat/${conversationId}/read`);
        } catch (error) {
            console.error('Failed to load conversation:', error);
        } finally {
            setLoading(false);
        }
    };

    // Send message
    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!newMessage.trim() || !selectedConversation || sending) return;

        setSending(true);
        const messageText = newMessage;
        setNewMessage('');

        try {
            const response = await axios.post(`/company/chat/${selectedConversation}/message`, {
                message: messageText,
            });

            // Add message to local state
            setMessages((prev) => [...prev, response.data.message]);
        } catch (error) {
            console.error('Failed to send message:', error);
            setNewMessage(messageText); // Restore message on error
        } finally {
            setSending(false);
            textareaRef.current?.focus();
        }
    };

    // Close conversation
    const handleCloseConversation = async (conversationId: number) => {
        try {
            await axios.post(`/company/chat/${conversationId}/close`);
            router.reload({ only: ['conversations'] });
            setSelectedConversation(null);
            setMessages([]);
        } catch (error) {
            console.error('Failed to close conversation:', error);
        }
    };

    // Listen for real-time messages using Laravel Echo
    useEffect(() => {
        if (!selectedConversation) return;

        // @ts-ignore - Laravel Echo is globally available
        if (window.Echo) {
            // @ts-ignore
            const channel = window.Echo.private(`chat.${selectedConversation}`)
                .listen('.message.sent', (event: { message: Message }) => {
                    setMessages((prev) => {
                        // Avoid duplicates
                        if (prev.some(m => m.id === event.message.id)) {
                            return prev;
                        }
                        return [...prev, event.message];
                    });

                    // Mark as read
                    axios.post(`/company/chat/${selectedConversation}/read`);
                });

            return () => {
                channel.stopListening('.message.sent');
                // @ts-ignore
                window.Echo.leave(`chat.${selectedConversation}`);
            };
        }
    }, [selectedConversation]);

    // Auto-resize textarea
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
        }
    }, [newMessage]);

    const getConversationName = (conversation: Conversation) => {
        return conversation.visitor?.name || conversation.client?.name || 'Unknown';
    };

    const currentConversation = conversations.data.find((c) => c.id === selectedConversation);

    return (
        <>
            <Head title="Live Chat" />

            <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
                <div className="h-screen flex flex-col">
                    {/* Header */}
                    <div className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-6 py-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Live Chat</h1>
                                <p className="text-sm text-slate-600 dark:text-slate-400">
                                    {conversations.data.length} active conversations
                                </p>
                            </div>
                            {currentConversation && currentConversation.status !== 'closed' && (
                                <Button
                                    variant="danger"
                                    size="sm"
                                    onClick={() => handleCloseConversation(currentConversation.id)}
                                    leftIcon={<X className="h-4 w-4" />}
                                >
                                    Close Conversation
                                </Button>
                            )}
                        </div>
                    </div>

                    {/* Main Chat Area */}
                    <div className="flex-1 flex overflow-hidden">
                        {/* Conversations Sidebar */}
                        <div className="w-80 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 overflow-y-auto">
                            <div className="p-4">
                                <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
                                    Conversations
                                </h2>
                                <div className="space-y-2">
                                    {conversations.data.length === 0 ? (
                                        <div className="text-center py-8 text-slate-500">
                                            <MessageSquare className="h-12 w-12 mx-auto mb-3 opacity-30" />
                                            <p className="text-sm">No conversations yet</p>
                                        </div>
                                    ) : (
                                        conversations.data.map((conversation) => (
                                            <button
                                                key={conversation.id}
                                                onClick={() => loadConversation(conversation.id)}
                                                className={cn(
                                                    'w-full text-left p-3 rounded-lg transition-colors',
                                                    selectedConversation === conversation.id
                                                        ? 'bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-700'
                                                        : 'hover:bg-slate-50 dark:hover:bg-slate-700 border border-transparent'
                                                )}
                                            >
                                                <div className="flex items-start justify-between mb-2">
                                                    <div className="flex items-center gap-2">
                                                        <Avatar
                                                            name={getConversationName(conversation)}
                                                            size="sm"
                                                            status={conversation.status === 'active' ? 'online' : undefined}
                                                        />
                                                        <div>
                                                            <p className="font-medium text-slate-900 dark:text-white text-sm">
                                                                {getConversationName(conversation)}
                                                            </p>
                                                            <p className="text-xs text-slate-500">
                                                                {conversation.visitor?.email || conversation.client?.email || ''}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    {conversation.unread_count && conversation.unread_count > 0 && (
                                                        <Badge variant="primary" className="text-xs">
                                                            {conversation.unread_count}
                                                        </Badge>
                                                    )}
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <Badge
                                                        variant={
                                                            conversation.status === 'active' ? 'success' :
                                                            conversation.status === 'waiting' ? 'warning' : 'default'
                                                        }
                                                        className="text-xs"
                                                    >
                                                        {conversation.status}
                                                    </Badge>
                                                    <span className="text-xs text-slate-500">
                                                        {formatDateTime(conversation.created_at)}
                                                    </span>
                                                </div>
                                                {conversation.assigned_to && (
                                                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                                                        Assigned to: {conversation.assigned_to.name}
                                                    </p>
                                                )}
                                            </button>
                                        ))
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 flex flex-col">
                            {selectedConversation && currentConversation ? (
                                <>
                                    {/* Conversation Header */}
                                    <div className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-6 py-4">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <Avatar
                                                    name={getConversationName(currentConversation)}
                                                    status={currentConversation.status === 'active' ? 'online' : undefined}
                                                />
                                                <div>
                                                    <h3 className="font-semibold text-slate-900 dark:text-white">
                                                        {getConversationName(currentConversation)}
                                                    </h3>
                                                    <p className="text-sm text-slate-600 dark:text-slate-400">
                                                        {currentConversation.visitor?.email || currentConversation.client?.email}
                                                    </p>
                                                </div>
                                            </div>
                                            <Badge
                                                variant={
                                                    currentConversation.status === 'active' ? 'success' :
                                                    currentConversation.status === 'waiting' ? 'warning' : 'default'
                                                }
                                            >
                                                {currentConversation.status}
                                            </Badge>
                                        </div>
                                    </div>

                                    {/* Messages List */}
                                    <div className="flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-900 p-6">
                                        {loading ? (
                                            <div className="flex items-center justify-center h-full">
                                                <div className="text-slate-500">Loading messages...</div>
                                            </div>
                                        ) : messages.length === 0 ? (
                                            <div className="flex items-center justify-center h-full">
                                                <div className="text-center text-slate-500">
                                                    <MessageSquare className="h-12 w-12 mx-auto mb-3 opacity-30" />
                                                    <p>No messages yet. Start the conversation!</p>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="space-y-4">
                                                {messages.map((message) => {
                                                    const isStaff = message.sender_type.includes('Staff') ||
                                                                   message.sender_type.includes('CompanyUser');

                                                    return (
                                                        <div
                                                            key={message.id}
                                                            className={cn(
                                                                'flex',
                                                                isStaff ? 'justify-end' : 'justify-start'
                                                            )}
                                                        >
                                                            <div
                                                                className={cn(
                                                                    'max-w-md px-4 py-3 rounded-lg',
                                                                    isStaff
                                                                        ? 'bg-primary-600 text-white'
                                                                        : 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700'
                                                                )}
                                                            >
                                                                <div className="flex items-center gap-2 mb-1">
                                                                    <span className={cn(
                                                                        "text-xs font-medium",
                                                                        isStaff ? 'text-primary-100' : 'text-slate-600 dark:text-slate-400'
                                                                    )}>
                                                                        {message.sender?.name || 'Unknown'}
                                                                    </span>
                                                                    <span className={cn(
                                                                        "text-xs",
                                                                        isStaff ? 'text-primary-200' : 'text-slate-500'
                                                                    )}>
                                                                        {formatDateTime(message.created_at)}
                                                                    </span>
                                                                </div>
                                                                <p className="whitespace-pre-wrap break-words">
                                                                    {message.message}
                                                                </p>
                                                                {isStaff && (
                                                                    <div className="flex items-center justify-end gap-1 mt-1">
                                                                        {message.is_read ? (
                                                                            <CheckCheck className="h-3 w-3 text-primary-200" />
                                                                        ) : (
                                                                            <Clock className="h-3 w-3 text-primary-200" />
                                                                        )}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                                <div ref={messagesEndRef} />
                                            </div>
                                        )}
                                    </div>

                                    {/* Message Input */}
                                    {currentConversation.status !== 'closed' && (
                                        <div className="bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 p-4">
                                            <form onSubmit={handleSendMessage} className="flex gap-3">
                                                <Textarea
                                                    ref={textareaRef}
                                                    value={newMessage}
                                                    onChange={(e) => setNewMessage(e.target.value)}
                                                    placeholder="Type your message..."
                                                    className="flex-1 resize-none max-h-32"
                                                    rows={1}
                                                    onKeyDown={(e) => {
                                                        if (e.key === 'Enter' && !e.shiftKey) {
                                                            e.preventDefault();
                                                            handleSendMessage(e);
                                                        }
                                                    }}
                                                />
                                                <Button
                                                    type="submit"
                                                    variant="primary"
                                                    isLoading={sending}
                                                    disabled={!newMessage.trim() || sending}
                                                    leftIcon={<Send className="h-4 w-4" />}
                                                >
                                                    Send
                                                </Button>
                                            </form>
                                            <p className="text-xs text-slate-500 mt-2">
                                                Press Enter to send, Shift+Enter for new line
                                            </p>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <div className="flex items-center justify-center h-full bg-slate-50 dark:bg-slate-900">
                                    <div className="text-center text-slate-500">
                                        <MessageSquare className="h-16 w-16 mx-auto mb-4 opacity-20" />
                                        <h3 className="text-lg font-medium mb-2">Select a conversation</h3>
                                        <p className="text-sm">Choose a conversation from the sidebar to start chatting</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
