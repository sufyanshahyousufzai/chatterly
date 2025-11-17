import React, { useState } from 'react';
import GuestLayout from '@/components/layouts/GuestLayout';
import {
    Button,
    Input,
    Textarea,
    Select,
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardBody,
    CardFooter,
    Badge,
    Alert,
    Modal,
    Loading,
    Avatar,
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableHead,
    TableCell,
} from '@/components/ui';
import { Plus, Search, Mail, User, Download } from 'lucide-react';

export default function ComponentsDemo() {
    const [showModal, setShowModal] = useState(false);
    const [showAlert, setShowAlert] = useState(true);

    return (
        <GuestLayout title="Design System - Components Demo">
            <div className="py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
                            Chatterly Design System
                        </h1>
                        <p className="text-lg text-slate-600 dark:text-slate-400">
                            Complete UI component library with Tailwind CSS
                        </p>
                    </div>

                    <div className="space-y-12">
                        {/* Buttons */}
                        <Card variant="bordered">
                            <CardHeader>
                                <CardTitle>Buttons</CardTitle>
                                <CardDescription>Button variants and sizes</CardDescription>
                            </CardHeader>
                            <CardBody>
                                <div className="space-y-6">
                                    <div>
                                        <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                                            Variants
                                        </h4>
                                        <div className="flex flex-wrap gap-3">
                                            <Button variant="primary">Primary</Button>
                                            <Button variant="secondary">Secondary</Button>
                                            <Button variant="accent">Accent</Button>
                                            <Button variant="danger">Danger</Button>
                                            <Button variant="ghost">Ghost</Button>
                                            <Button variant="outline">Outline</Button>
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                                            Sizes
                                        </h4>
                                        <div className="flex flex-wrap items-center gap-3">
                                            <Button size="sm">Small</Button>
                                            <Button size="md">Medium</Button>
                                            <Button size="lg">Large</Button>
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                                            With Icons
                                        </h4>
                                        <div className="flex flex-wrap gap-3">
                                            <Button leftIcon={<Plus className="h-4 w-4" />}>
                                                Add New
                                            </Button>
                                            <Button
                                                variant="secondary"
                                                rightIcon={<Download className="h-4 w-4" />}
                                            >
                                                Download
                                            </Button>
                                            <Button isLoading>Loading</Button>
                                        </div>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>

                        {/* Form Inputs */}
                        <Card variant="bordered">
                            <CardHeader>
                                <CardTitle>Form Inputs</CardTitle>
                                <CardDescription>Input fields, textarea, and select</CardDescription>
                            </CardHeader>
                            <CardBody>
                                <div className="space-y-6 max-w-2xl">
                                    <Input
                                        label="Email Address"
                                        type="email"
                                        placeholder="you@example.com"
                                        leftIcon={<Mail className="h-4 w-4" />}
                                        helperText="We'll never share your email"
                                    />
                                    <Input
                                        label="Full Name"
                                        placeholder="John Doe"
                                        leftIcon={<User className="h-4 w-4" />}
                                    />
                                    <Input
                                        label="Password"
                                        type="password"
                                        error="Password must be at least 8 characters"
                                    />
                                    <Input
                                        label="Search"
                                        placeholder="Search..."
                                        leftIcon={<Search className="h-4 w-4" />}
                                    />
                                    <Textarea
                                        label="Message"
                                        rows={4}
                                        placeholder="Enter your message..."
                                        helperText="Maximum 500 characters"
                                    />
                                    <Select
                                        label="Select Option"
                                        options={[
                                            { value: '', label: 'Choose an option...' },
                                            { value: '1', label: 'Option 1' },
                                            { value: '2', label: 'Option 2' },
                                            { value: '3', label: 'Option 3' },
                                        ]}
                                    />
                                </div>
                            </CardBody>
                        </Card>

                        {/* Badges */}
                        <Card variant="bordered">
                            <CardHeader>
                                <CardTitle>Badges</CardTitle>
                                <CardDescription>Status indicators and labels</CardDescription>
                            </CardHeader>
                            <CardBody>
                                <div className="space-y-4">
                                    <div className="flex flex-wrap gap-3">
                                        <Badge variant="primary">Primary</Badge>
                                        <Badge variant="secondary">Secondary</Badge>
                                        <Badge variant="success">Success</Badge>
                                        <Badge variant="danger">Danger</Badge>
                                        <Badge variant="warning">Warning</Badge>
                                        <Badge variant="info">Info</Badge>
                                        <Badge variant="default">Default</Badge>
                                    </div>
                                    <div className="flex flex-wrap items-center gap-3">
                                        <Badge size="sm">Small</Badge>
                                        <Badge size="md">Medium</Badge>
                                        <Badge size="lg">Large</Badge>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>

                        {/* Alerts */}
                        <Card variant="bordered">
                            <CardHeader>
                                <CardTitle>Alerts</CardTitle>
                                <CardDescription>Alert messages and notifications</CardDescription>
                            </CardHeader>
                            <CardBody>
                                <div className="space-y-4">
                                    <Alert variant="info" title="Information">
                                        This is an informational message.
                                    </Alert>
                                    <Alert variant="success" title="Success">
                                        Your changes have been saved successfully!
                                    </Alert>
                                    <Alert variant="warning" title="Warning">
                                        Please review your settings before continuing.
                                    </Alert>
                                    <Alert variant="danger" title="Error">
                                        An error occurred while processing your request.
                                    </Alert>
                                    {showAlert && (
                                        <Alert
                                            variant="info"
                                            title="Dismissible Alert"
                                            dismissible
                                            onDismiss={() => setShowAlert(false)}
                                        >
                                            This alert can be dismissed.
                                        </Alert>
                                    )}
                                </div>
                            </CardBody>
                        </Card>

                        {/* Avatars */}
                        <Card variant="bordered">
                            <CardHeader>
                                <CardTitle>Avatars</CardTitle>
                                <CardDescription>User profile pictures with status</CardDescription>
                            </CardHeader>
                            <CardBody>
                                <div className="space-y-4">
                                    <div className="flex flex-wrap items-center gap-4">
                                        <Avatar name="John Doe" size="xs" />
                                        <Avatar name="Jane Smith" size="sm" />
                                        <Avatar name="Bob Johnson" size="md" />
                                        <Avatar name="Alice Williams" size="lg" />
                                        <Avatar name="Charlie Brown" size="xl" />
                                    </div>
                                    <div className="flex flex-wrap items-center gap-4">
                                        <Avatar name="Online User" status="online" />
                                        <Avatar name="Offline User" status="offline" />
                                        <Avatar name="Busy User" status="busy" />
                                        <Avatar name="Away User" status="away" />
                                    </div>
                                </div>
                            </CardBody>
                        </Card>

                        {/* Table */}
                        <Card variant="bordered">
                            <CardHeader>
                                <CardTitle>Table</CardTitle>
                                <CardDescription>Data tables with responsive design</CardDescription>
                            </CardHeader>
                            <CardBody className="p-0">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Name</TableHead>
                                            <TableHead>Email</TableHead>
                                            <TableHead>Role</TableHead>
                                            <TableHead>Status</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell className="font-medium">John Doe</TableCell>
                                            <TableCell>john@example.com</TableCell>
                                            <TableCell>Admin</TableCell>
                                            <TableCell>
                                                <Badge variant="success">Active</Badge>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="font-medium">Jane Smith</TableCell>
                                            <TableCell>jane@example.com</TableCell>
                                            <TableCell>Staff</TableCell>
                                            <TableCell>
                                                <Badge variant="success">Active</Badge>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="font-medium">Bob Johnson</TableCell>
                                            <TableCell>bob@example.com</TableCell>
                                            <TableCell>Staff</TableCell>
                                            <TableCell>
                                                <Badge variant="danger">Inactive</Badge>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </CardBody>
                        </Card>

                        {/* Loading States */}
                        <Card variant="bordered">
                            <CardHeader>
                                <CardTitle>Loading States</CardTitle>
                                <CardDescription>Loading spinners and indicators</CardDescription>
                            </CardHeader>
                            <CardBody>
                                <div className="flex flex-wrap items-center gap-8">
                                    <Loading size="sm" />
                                    <Loading size="md" />
                                    <Loading size="lg" />
                                    <Loading size="xl" text="Loading..." />
                                </div>
                            </CardBody>
                        </Card>

                        {/* Modal */}
                        <Card variant="bordered">
                            <CardHeader>
                                <CardTitle>Modal</CardTitle>
                                <CardDescription>Dialog and modal windows</CardDescription>
                            </CardHeader>
                            <CardBody>
                                <Button onClick={() => setShowModal(true)}>Open Modal</Button>
                                <Modal
                                    isOpen={showModal}
                                    onClose={() => setShowModal(false)}
                                    title="Example Modal"
                                    description="This is a demo modal dialog"
                                    size="md"
                                >
                                    <div className="space-y-4">
                                        <p className="text-slate-600 dark:text-slate-400">
                                            This is the modal content. You can put any content here
                                            including forms, text, images, etc.
                                        </p>
                                        <div className="flex justify-end gap-3">
                                            <Button
                                                variant="ghost"
                                                onClick={() => setShowModal(false)}
                                            >
                                                Cancel
                                            </Button>
                                            <Button onClick={() => setShowModal(false)}>
                                                Confirm
                                            </Button>
                                        </div>
                                    </div>
                                </Modal>
                            </CardBody>
                        </Card>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
