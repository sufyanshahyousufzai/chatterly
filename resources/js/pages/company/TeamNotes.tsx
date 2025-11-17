import React from 'react';
import { Head } from '@inertiajs/react';
import { Card, CardBody, Badge, Button, Avatar } from '@/components/ui';
import { StickyNote, Pin, MessageSquare, Ticket, User } from 'lucide-react';

export default function TeamNotes({ notes }: any) {
    const getNotableIcon = (type: string) => {
        switch (type) {
            case 'chat':
                return <MessageSquare className="h-4 w-4" />;
            case 'ticket':
                return <Ticket className="h-4 w-4" />;
            case 'client':
                return <User className="h-4 w-4" />;
            default:
                return <StickyNote className="h-4 w-4" />;
        }
    };

    return (
        <>
            <Head title="Team Notes" />
            <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-8 flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Team Notes</h1>
                            <p className="text-slate-600 dark:text-slate-400 mt-1">Internal team collaboration and notes</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {notes.data.map((note: any) => (
                            <Card key={note.id} variant="bordered" className={note.is_pinned ? 'border-amber-300 dark:border-amber-700' : ''}>
                                <CardBody>
                                    <div className="flex items-start gap-4">
                                        <Avatar name={note.staff.name} size="md" />
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-2">
                                                <h3 className="font-semibold text-slate-900 dark:text-white">{note.staff.name}</h3>
                                                {note.is_pinned && (
                                                    <Badge variant="warning" leftIcon={<Pin className="h-3 w-3" />}>Pinned</Badge>
                                                )}
                                                <Badge variant="outline" leftIcon={getNotableIcon(note.notable_type)}>
                                                    {note.notable_type}
                                                </Badge>
                                            </div>
                                            <p className="text-slate-700 dark:text-slate-300 mb-3">{note.content}</p>
                                            {note.mentioned_staff && note.mentioned_staff.length > 0 && (
                                                <div className="flex items-center gap-2 mb-3">
                                                    <span className="text-sm text-slate-600 dark:text-slate-400">Mentioned:</span>
                                                    <div className="flex gap-2">
                                                        {note.mentioned_staff.map((staff: any) => (
                                                            <Badge key={staff.id} variant="secondary" size="sm">
                                                                @{staff.name}
                                                            </Badge>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                            <div className="flex items-center justify-between">
                                                <p className="text-xs text-slate-500">
                                                    {new Date(note.created_at).toLocaleString()}
                                                </p>
                                                <div className="flex gap-2">
                                                    <Button variant="ghost" size="sm">Edit</Button>
                                                    <Button variant="ghost" size="sm">Delete</Button>
                                                </div>
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
