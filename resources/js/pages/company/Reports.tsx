import React from 'react';
import { Head } from '@inertiajs/react';
import { Card, CardBody, Badge, Button } from '@/components/ui';
import { FileText, Download, Calendar, BarChart3, Users, MessageSquare, Ticket } from 'lucide-react';

interface ReportsProps {
    reportTypes: Array<{
        id: string;
        name: string;
        description: string;
        category: string;
    }>;
    period: string;
}

export default function Reports({ reportTypes, period }: ReportsProps) {
    const getCategoryIcon = (category: string) => {
        switch (category) {
            case 'Communication':
                return <MessageSquare className="h-5 w-5" />;
            case 'Support':
                return <Ticket className="h-5 w-5" />;
            case 'Team':
                return <Users className="h-5 w-5" />;
            case 'Clients':
                return <Users className="h-5 w-5" />;
            case 'Quality':
                return <BarChart3 className="h-5 w-5" />;
            default:
                return <FileText className="h-5 w-5" />;
        }
    };

    const groupedReports = reportTypes.reduce((acc: any, report) => {
        if (!acc[report.category]) {
            acc[report.category] = [];
        }
        acc[report.category].push(report);
        return acc;
    }, {});

    return (
        <>
            <Head title="Reports & Export" />
            <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-8">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Reports & Export</h1>
                                <p className="text-slate-600 dark:text-slate-400 mt-1">
                                    Generate comprehensive reports and export your data
                                </p>
                            </div>
                            <Button variant="primary" leftIcon={<Download className="h-4 w-4" />}>
                                Export Data
                            </Button>
                        </div>
                    </div>

                    {/* Quick Export Card */}
                    <Card variant="bordered" className="mb-8">
                        <CardBody>
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-primary-100 dark:bg-primary-900 rounded-lg">
                                    <Download className="h-6 w-6 text-primary-600" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-semibold text-slate-900 dark:text-white mb-1">Quick Export</h3>
                                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                                        Export all your data in CSV, Excel, or JSON format
                                    </p>
                                    <div className="flex gap-2">
                                        <Button variant="outline" size="sm">Export as CSV</Button>
                                        <Button variant="outline" size="sm">Export as Excel</Button>
                                        <Button variant="outline" size="sm">Export as JSON</Button>
                                    </div>
                                </div>
                            </div>
                        </CardBody>
                    </Card>

                    {/* Report Types by Category */}
                    {Object.entries(groupedReports).map(([category, reports]: [string, any]) => (
                        <div key={category} className="mb-8">
                            <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                {getCategoryIcon(category)}
                                {category} Reports
                            </h2>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {reports.map((report: any) => (
                                    <Card key={report.id} variant="bordered">
                                        <CardBody>
                                            <div className="mb-4">
                                                <div className="flex items-center justify-between mb-2">
                                                    <h3 className="font-semibold text-slate-900 dark:text-white">
                                                        {report.name}
                                                    </h3>
                                                    <Badge variant="outline">{category}</Badge>
                                                </div>
                                                <p className="text-sm text-slate-600 dark:text-slate-400">
                                                    {report.description}
                                                </p>
                                            </div>
                                            <div className="space-y-2">
                                                <Button
                                                    variant="primary"
                                                    size="sm"
                                                    className="w-full"
                                                    leftIcon={<FileText className="h-4 w-4" />}
                                                >
                                                    Generate Report
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="w-full"
                                                    leftIcon={<Calendar className="h-4 w-4" />}
                                                >
                                                    Schedule Report
                                                </Button>
                                            </div>
                                        </CardBody>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    ))}

                    {/* Scheduled Reports */}
                    <Card variant="bordered">
                        <CardBody>
                            <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
                                Scheduled Reports
                            </h2>
                            <div className="text-center py-8">
                                <Calendar className="h-12 w-12 text-slate-400 mx-auto mb-3" />
                                <p className="text-slate-600 dark:text-slate-400 mb-4">
                                    No scheduled reports yet
                                </p>
                                <Button variant="outline" size="sm">
                                    Create Schedule
                                </Button>
                            </div>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </>
    );
}
