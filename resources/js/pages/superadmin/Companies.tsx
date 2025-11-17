import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { Card, CardBody, Button, Input, Badge, Table } from '@/components/ui';
import { Building2, Search } from 'lucide-react';

export default function Companies({ companies, filters }: any) {
    const [search, setSearch] = React.useState(filters.search || '');

    return (
        <>
            <Head title="Companies" />
            <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Companies</h1>
                    <Card variant="bordered" className="mb-6">
                        <CardBody>
                            <Input 
                                placeholder="Search companies..." 
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && router.get('/superadmin/companies', { search })}
                            />
                        </CardBody>
                    </Card>
                    <Card variant="bordered">
                        <CardBody className="p-0">
                            <Table>
                                <thead>
                                    <tr>
                                        <th>Company</th>
                                        <th>Email</th>
                                        <th>Status</th>
                                        <th>Plan</th>
                                        <th>Created</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {companies.data.map((company: any) => (
                                        <tr key={company.id}>
                                            <td>
                                                <Link href={`/superadmin/companies/${company.id}`} className="font-medium hover:text-primary-600">
                                                    {company.name}
                                                </Link>
                                            </td>
                                            <td>{company.email}</td>
                                            <td>
                                                <Badge variant={company.is_active ? 'success' : 'default'}>
                                                    {company.subscription_status}
                                                </Badge>
                                            </td>
                                            <td>{company.subscription_plan?.name || 'None'}</td>
                                            <td className="text-sm text-slate-600">{new Date(company.created_at).toLocaleDateString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </>
    );
}
