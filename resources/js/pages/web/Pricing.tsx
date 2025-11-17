import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { Button, Card, CardBody, Badge } from '@/components/ui';
import {
    Check,
    X,
    MessageSquare,
    ArrowRight,
    Zap,
    Crown,
    Building2,
} from 'lucide-react';

export default function Pricing() {
    const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

    const plans = [
        {
            name: 'Starter',
            icon: <Zap className="h-6 w-6" />,
            description: 'Perfect for small teams getting started',
            monthlyPrice: 29,
            yearlyPrice: 290,
            savings: '2 months free',
            color: 'secondary',
            features: [
                { name: 'Up to 3 team members', included: true },
                { name: '100 conversations/month', included: true },
                { name: 'Basic chat widget', included: true },
                { name: 'Email support', included: true },
                { name: 'Knowledge base (10 articles)', included: true },
                { name: 'Mobile app', included: true },
                { name: 'Basic analytics', included: true },
                { name: 'Custom branding', included: false },
                { name: 'Advanced chatbot', included: false },
                { name: 'API access', included: false },
                { name: 'Priority support', included: false },
                { name: 'SLA guarantee', included: false },
            ],
            popular: false,
        },
        {
            name: 'Professional',
            icon: <Crown className="h-6 w-6" />,
            description: 'For growing businesses that need more',
            monthlyPrice: 79,
            yearlyPrice: 790,
            savings: '2 months free',
            color: 'primary',
            features: [
                { name: 'Up to 10 team members', included: true },
                { name: 'Unlimited conversations', included: true },
                { name: 'Advanced chat widget', included: true },
                { name: 'Priority email support', included: true },
                { name: 'Knowledge base (unlimited)', included: true },
                { name: 'Mobile app', included: true },
                { name: 'Advanced analytics', included: true },
                { name: 'Custom branding', included: true },
                { name: 'Advanced chatbot', included: true },
                { name: 'API access', included: true },
                { name: 'Video chat', included: true },
                { name: 'SLA guarantee', included: false },
            ],
            popular: true,
        },
        {
            name: 'Enterprise',
            icon: <Building2 className="h-6 w-6" />,
            description: 'For large organizations with custom needs',
            monthlyPrice: null,
            yearlyPrice: null,
            savings: 'Custom pricing',
            color: 'accent',
            features: [
                { name: 'Unlimited team members', included: true },
                { name: 'Unlimited conversations', included: true },
                { name: 'White-label solution', included: true },
                { name: '24/7 phone & email support', included: true },
                { name: 'Dedicated account manager', included: true },
                { name: 'Custom integrations', included: true },
                { name: 'Advanced security features', included: true },
                { name: 'Custom branding', included: true },
                { name: 'AI-powered chatbot', included: true },
                { name: 'Full API access', included: true },
                { name: 'Video & voice chat', included: true },
                { name: '99.9% SLA guarantee', included: true },
            ],
            popular: false,
        },
    ];

    const faqs = [
        {
            question: 'Can I change plans at any time?',
            answer: 'Yes! You can upgrade or downgrade your plan at any time. Changes will be prorated based on your current billing cycle.',
        },
        {
            question: 'What happens after the free trial?',
            answer: 'After your 14-day free trial ends, you\'ll be automatically enrolled in the plan you selected. You can cancel anytime before the trial ends.',
        },
        {
            question: 'Do you offer refunds?',
            answer: 'We offer a 30-day money-back guarantee. If you\'re not satisfied, contact us within 30 days for a full refund.',
        },
        {
            question: 'Is there a setup fee?',
            answer: 'No setup fees! All plans include free onboarding and setup assistance.',
        },
        {
            question: 'Can I add more team members later?',
            answer: 'Absolutely! You can add team members at any time. Additional seats are prorated based on your billing cycle.',
        },
        {
            question: 'What payment methods do you accept?',
            answer: 'We accept all major credit cards (Visa, Mastercard, American Express) through Stripe\'s secure payment processing.',
        },
    ];

    const getPrice = (plan: typeof plans[0]) => {
        if (!plan.monthlyPrice) return 'Custom';
        return billingCycle === 'monthly' ? `$${plan.monthlyPrice}` : `$${plan.yearlyPrice / 12}`;
    };

    const getTotalPrice = (plan: typeof plans[0]) => {
        if (!plan.monthlyPrice) return '';
        return billingCycle === 'monthly'
            ? '/month'
            : `/month (billed $${plan.yearlyPrice}/year)`;
    };

    return (
        <>
            <Head title="Pricing - Choose Your Plan" />

            <div className="min-h-screen bg-white dark:bg-slate-900">
                {/* Navigation */}
                <header className="sticky top-0 z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-lg border-b border-slate-200 dark:border-slate-700">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-16">
                            <Link href="/" className="flex items-center gap-2">
                                <MessageSquare className="h-8 w-8 text-primary-600" />
                                <h1 className="text-2xl font-bold text-primary-600">Chatterly</h1>
                            </Link>
                            <nav className="hidden md:flex items-center gap-8">
                                <Link
                                    href="/"
                                    className="text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors"
                                >
                                    Home
                                </Link>
                                <Link
                                    href="/pricing"
                                    className="text-primary-600 dark:text-primary-400 font-medium"
                                >
                                    Pricing
                                </Link>
                                <Link
                                    href="/login"
                                    className="text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors"
                                >
                                    Login
                                </Link>
                                <Link href="/register">
                                    <Button>Get Started Free</Button>
                                </Link>
                            </nav>
                        </div>
                    </div>
                </header>

                {/* Pricing Header */}
                <section className="py-20 bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <Badge variant="primary" size="lg" className="mb-6">
                            <Zap className="h-4 w-4 mr-1" />
                            Simple, Transparent Pricing
                        </Badge>
                        <h1 className="text-5xl sm:text-6xl font-bold text-slate-900 dark:text-white mb-6">
                            Choose Your Perfect Plan
                        </h1>
                        <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto mb-10">
                            Start with a 14-day free trial. No credit card required. Cancel anytime.
                        </p>

                        {/* Billing Toggle */}
                        <div className="inline-flex items-center gap-4 p-2 bg-slate-100 dark:bg-slate-800 rounded-lg">
                            <button
                                onClick={() => setBillingCycle('monthly')}
                                className={`px-6 py-2 rounded-md font-medium transition-all ${
                                    billingCycle === 'monthly'
                                        ? 'bg-white dark:bg-slate-700 text-primary-600 shadow-sm'
                                        : 'text-slate-600 dark:text-slate-400'
                                }`}
                            >
                                Monthly
                            </button>
                            <button
                                onClick={() => setBillingCycle('yearly')}
                                className={`px-6 py-2 rounded-md font-medium transition-all ${
                                    billingCycle === 'yearly'
                                        ? 'bg-white dark:bg-slate-700 text-primary-600 shadow-sm'
                                        : 'text-slate-600 dark:text-slate-400'
                                }`}
                            >
                                Yearly
                                <span className="ml-2 text-xs text-secondary-500">Save 17%</span>
                            </button>
                        </div>
                    </div>
                </section>

                {/* Pricing Cards */}
                <section className="py-20 -mt-10">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {plans.map((plan, index) => (
                                <Card
                                    key={index}
                                    variant="bordered"
                                    className={`relative ${
                                        plan.popular
                                            ? 'border-primary-600 ring-2 ring-primary-600 shadow-xl scale-105'
                                            : 'hover:shadow-lg'
                                    } transition-all`}
                                >
                                    {plan.popular && (
                                        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                                            <Badge variant="primary" size="lg">
                                                Most Popular
                                            </Badge>
                                        </div>
                                    )}
                                    <CardBody className="p-8">
                                        <div
                                            className={`inline-flex p-3 rounded-lg bg-${plan.color}-100 dark:bg-${plan.color}-900/30 text-${plan.color}-600 dark:text-${plan.color}-400 mb-4`}
                                        >
                                            {plan.icon}
                                        </div>
                                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                                            {plan.name}
                                        </h3>
                                        <p className="text-slate-600 dark:text-slate-400 mb-6">
                                            {plan.description}
                                        </p>

                                        <div className="mb-6">
                                            <div className="flex items-baseline gap-2">
                                                <span className="text-5xl font-bold text-slate-900 dark:text-white">
                                                    {getPrice(plan)}
                                                </span>
                                                {plan.monthlyPrice && (
                                                    <span className="text-slate-600 dark:text-slate-400">
                                                        {getTotalPrice(plan)}
                                                    </span>
                                                )}
                                            </div>
                                            {billingCycle === 'yearly' && plan.monthlyPrice && (
                                                <p className="text-sm text-secondary-500 mt-1">
                                                    {plan.savings}
                                                </p>
                                            )}
                                        </div>

                                        <Link href="/register" className="block mb-6">
                                            <Button
                                                variant={plan.popular ? 'primary' : 'outline'}
                                                className="w-full"
                                                rightIcon={<ArrowRight className="h-4 w-4" />}
                                            >
                                                {plan.monthlyPrice ? 'Start Free Trial' : 'Contact Sales'}
                                            </Button>
                                        </Link>

                                        <div className="space-y-3 pt-6 border-t border-slate-200 dark:border-slate-700">
                                            {plan.features.map((feature, idx) => (
                                                <div key={idx} className="flex items-start gap-3">
                                                    {feature.included ? (
                                                        <Check className="h-5 w-5 text-secondary-500 flex-shrink-0 mt-0.5" />
                                                    ) : (
                                                        <X className="h-5 w-5 text-slate-300 dark:text-slate-600 flex-shrink-0 mt-0.5" />
                                                    )}
                                                    <span
                                                        className={`text-sm ${
                                                            feature.included
                                                                ? 'text-slate-700 dark:text-slate-300'
                                                                : 'text-slate-400 dark:text-slate-500'
                                                        }`}
                                                    >
                                                        {feature.name}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </CardBody>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* FAQ Section */}
                <section className="py-20 bg-slate-50 dark:bg-slate-800">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
                                Frequently Asked Questions
                            </h2>
                            <p className="text-lg text-slate-600 dark:text-slate-300">
                                Everything you need to know about our pricing
                            </p>
                        </div>

                        <div className="space-y-6">
                            {faqs.map((faq, index) => (
                                <Card key={index} variant="bordered">
                                    <CardBody className="p-6">
                                        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                                            {faq.question}
                                        </h3>
                                        <p className="text-slate-600 dark:text-slate-400">{faq.answer}</p>
                                    </CardBody>
                                </Card>
                            ))}
                        </div>

                        <div className="text-center mt-12">
                            <p className="text-slate-600 dark:text-slate-400 mb-4">
                                Still have questions?
                            </p>
                            <a
                                href="mailto:support@chatterly.com"
                                className="text-primary-600 hover:text-primary-700 font-medium"
                            >
                                Contact our sales team
                            </a>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-20 bg-gradient-to-r from-primary-600 to-secondary-500">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
                            Ready to Get Started?
                        </h2>
                        <p className="text-xl text-primary-100 mb-10 max-w-2xl mx-auto">
                            Join thousands of companies using Chatterly to deliver exceptional customer
                            experiences
                        </p>
                        <Link href="/register">
                            <Button
                                size="lg"
                                className="bg-white text-primary-600 hover:bg-primary-50"
                                rightIcon={<ArrowRight className="h-5 w-5" />}
                            >
                                Start Your 14-Day Free Trial
                            </Button>
                        </Link>
                        <p className="mt-6 text-sm text-primary-100">
                            No credit card required • Cancel anytime
                        </p>
                    </div>
                </section>

                {/* Footer */}
                <footer className="bg-slate-900 text-slate-300 py-12">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center text-sm text-slate-400">
                            <p>&copy; 2025 Chatterly. All rights reserved.</p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
