import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { Button, Input, Card, CardBody, Alert, Badge } from '@/components/ui';
import { MessageSquare, Building2, Mail, Lock, User, Phone, Check } from 'lucide-react';
import type { SubscriptionPlan } from '@/types';

interface Props {
    plans: SubscriptionPlan[];
    errors?: Record<string, string>;
}

export default function Register({ plans, errors }: Props) {
    const [selectedPlan, setSelectedPlan] = useState<number | null>(null);
    const { data, setData, post, processing } = useForm({
        company_name: '',
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        phone: '',
        subscription_plan_id: null as number | null,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/register');
    };

    return (
        <>
            <Head title="Register - Start Your Free Trial" />

            <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <Link href="/" className="flex items-center justify-center gap-2 mb-6">
                        <MessageSquare className="h-12 w-12 text-primary-600" />
                        <h1 className="text-3xl font-bold text-primary-600">Chatterly</h1>
                    </Link>
                    <h2 className="text-center text-3xl font-bold text-slate-900 dark:text-white">
                        Create your account
                    </h2>
                    <p className="mt-2 text-center text-sm text-slate-600 dark:text-slate-400">
                        Start your 14-day free trial. No credit card required.
                    </p>
                </div>

                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-2xl">
                    <Card variant="elevated" className="mx-4">
                        <CardBody className="p-8">
                            {errors && errors.error && (
                                <Alert variant="danger" className="mb-6">
                                    {errors.error}
                                </Alert>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Step 1: Company Information */}
                                <div>
                                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 text-sm font-bold">
                                            1
                                        </div>
                                        Company Information
                                    </h3>
                                    <div className="space-y-4 pl-10">
                                        <Input
                                            label="Company Name"
                                            placeholder="Acme Corporation"
                                            leftIcon={<Building2 className="h-4 w-4" />}
                                            value={data.company_name}
                                            onChange={(e) => setData('company_name', e.target.value)}
                                            error={errors?.company_name}
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Step 2: Your Information */}
                                <div>
                                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 text-sm font-bold">
                                            2
                                        </div>
                                        Your Information
                                    </h3>
                                    <div className="space-y-4 pl-10">
                                        <Input
                                            label="Full Name"
                                            placeholder="John Doe"
                                            leftIcon={<User className="h-4 w-4" />}
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            error={errors?.name}
                                            required
                                        />
                                        <Input
                                            label="Email Address"
                                            type="email"
                                            placeholder="john@acme.com"
                                            leftIcon={<Mail className="h-4 w-4" />}
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            error={errors?.email}
                                            required
                                        />
                                        <Input
                                            label="Phone Number (Optional)"
                                            type="tel"
                                            placeholder="+1 (555) 000-0000"
                                            leftIcon={<Phone className="h-4 w-4" />}
                                            value={data.phone}
                                            onChange={(e) => setData('phone', e.target.value)}
                                            error={errors?.phone}
                                        />
                                    </div>
                                </div>

                                {/* Step 3: Security */}
                                <div>
                                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 text-sm font-bold">
                                            3
                                        </div>
                                        Create Password
                                    </h3>
                                    <div className="space-y-4 pl-10">
                                        <Input
                                            label="Password"
                                            type="password"
                                            placeholder="••••••••"
                                            leftIcon={<Lock className="h-4 w-4" />}
                                            value={data.password}
                                            onChange={(e) => setData('password', e.target.value)}
                                            error={errors?.password}
                                            helperText="Minimum 8 characters"
                                            required
                                        />
                                        <Input
                                            label="Confirm Password"
                                            type="password"
                                            placeholder="••••••••"
                                            leftIcon={<Lock className="h-4 w-4" />}
                                            value={data.password_confirmation}
                                            onChange={(e) => setData('password_confirmation', e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Step 4: Choose Plan (Optional) */}
                                {plans && plans.length > 0 && (
                                    <div>
                                        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 text-sm font-bold">
                                                4
                                            </div>
                                            Choose a Plan (Optional)
                                        </h3>
                                        <div className="grid md:grid-cols-3 gap-4 pl-10">
                                            {plans.map((plan) => (
                                                <button
                                                    key={plan.id}
                                                    type="button"
                                                    onClick={() => {
                                                        setSelectedPlan(plan.id);
                                                        setData('subscription_plan_id', plan.id);
                                                    }}
                                                    className={`p-4 rounded-lg border-2 transition-all text-left ${
                                                        selectedPlan === plan.id
                                                            ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/20'
                                                            : 'border-slate-200 dark:border-slate-700 hover:border-primary-300'
                                                    }`}
                                                >
                                                    <div className="flex items-start justify-between mb-2">
                                                        <h4 className="font-semibold text-slate-900 dark:text-white">
                                                            {plan.name}
                                                        </h4>
                                                        {selectedPlan === plan.id && (
                                                            <Check className="h-5 w-5 text-primary-600" />
                                                        )}
                                                    </div>
                                                    <p className="text-2xl font-bold text-primary-600 mb-1">
                                                        ${plan.price}
                                                        <span className="text-sm font-normal text-slate-600 dark:text-slate-400">
                                                            /month
                                                        </span>
                                                    </p>
                                                </button>
                                            ))}
                                        </div>
                                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-3 pl-10">
                                            You can choose later during onboarding
                                        </p>
                                    </div>
                                )}

                                {/* Submit Button */}
                                <div className="pt-6 border-t border-slate-200 dark:border-slate-700">
                                    <Button
                                        type="submit"
                                        className="w-full"
                                        size="lg"
                                        isLoading={processing}
                                    >
                                        Create Account & Start Free Trial
                                    </Button>
                                </div>

                                {/* Trust Signals */}
                                <div className="flex items-center justify-center gap-6 text-sm text-slate-600 dark:text-slate-400">
                                    <div className="flex items-center gap-1">
                                        <Check className="h-4 w-4 text-secondary-500" />
                                        <span>14-day free trial</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Check className="h-4 w-4 text-secondary-500" />
                                        <span>No credit card</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Check className="h-4 w-4 text-secondary-500" />
                                        <span>Cancel anytime</span>
                                    </div>
                                </div>
                            </form>
                        </CardBody>
                    </Card>

                    {/* Login Link */}
                    <p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-400">
                        Already have an account?{' '}
                        <Link
                            href="/login"
                            className="font-medium text-primary-600 hover:text-primary-500"
                        >
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
}
