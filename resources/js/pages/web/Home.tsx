import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { Button, Card, CardBody, Badge } from '@/components/ui';
import {
    MessageSquare,
    Users,
    Zap,
    BarChart3,
    Clock,
    Shield,
    Globe,
    Sparkles,
    CheckCircle,
    ArrowRight,
    Star,
} from 'lucide-react';

export default function Home() {
    const features = [
        {
            icon: <MessageSquare className="h-6 w-6" />,
            title: 'Live Chat',
            description:
                'Real-time conversations with your customers powered by Laravel Reverb WebSockets',
            color: 'primary',
        },
        {
            icon: <Users className="h-6 w-6" />,
            title: 'Team Collaboration',
            description: 'Multiple agents can handle conversations simultaneously with intelligent routing',
            color: 'secondary',
        },
        {
            icon: <Zap className="h-6 w-6" />,
            title: 'Instant Responses',
            description: 'AI-powered chatbot automation for 24/7 customer support',
            color: 'accent',
        },
        {
            icon: <BarChart3 className="h-6 w-6" />,
            title: 'Analytics Dashboard',
            description: 'Track conversations, response times, and customer satisfaction metrics',
            color: 'primary',
        },
        {
            icon: <Clock className="h-6 w-6" />,
            title: 'Ticket Management',
            description: 'Convert chats to tickets and manage customer issues efficiently',
            color: 'secondary',
        },
        {
            icon: <Shield className="h-6 w-6" />,
            title: 'Enterprise Security',
            description: 'Multi-tenant architecture with role-based access control',
            color: 'accent',
        },
    ];

    const benefits = [
        'Unlimited team members',
        'Unlimited conversations',
        'Advanced chatbot automation',
        'Knowledge base integration',
        'Client portal access',
        'Custom branding',
        'Real-time visitor tracking',
        'Mobile responsive widget',
    ];

    const steps = [
        {
            step: '1',
            title: 'Create Your Account',
            description: 'Sign up in seconds and get instant access to your dashboard',
        },
        {
            step: '2',
            title: 'Customize Your Widget',
            description: 'Brand your chat widget to match your website perfectly',
        },
        {
            step: '3',
            title: 'Add to Your Website',
            description: 'Copy and paste one line of code to your website',
        },
        {
            step: '4',
            title: 'Start Chatting',
            description: 'Begin engaging with your visitors in real-time',
        },
    ];

    return (
        <>
            <Head title="Live Chat & Helpdesk Platform for Modern Teams" />

            <div className="min-h-screen bg-white dark:bg-slate-900">
                {/* Navigation */}
                <header className="sticky top-0 z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-lg border-b border-slate-200 dark:border-slate-700">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-16">
                            <div className="flex items-center gap-2">
                                <MessageSquare className="h-8 w-8 text-primary-600" />
                                <h1 className="text-2xl font-bold text-primary-600">Chatterly</h1>
                            </div>
                            <nav className="hidden md:flex items-center gap-8">
                                <a
                                    href="#features"
                                    className="text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors"
                                >
                                    Features
                                </a>
                                <a
                                    href="#pricing"
                                    className="text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors"
                                >
                                    Pricing
                                </a>
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

                {/* Hero Section */}
                <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 py-20 sm:py-32">
                    <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/25" />
                    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center max-w-4xl mx-auto">
                            <Badge variant="primary" size="lg" className="mb-6">
                                <Sparkles className="h-4 w-4 mr-1" />
                                Live Chat Platform for Modern Teams
                            </Badge>
                            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 dark:text-white mb-6">
                                Transform Customer
                                <span className="text-primary-600"> Conversations</span>
                            </h1>
                            <p className="text-xl sm:text-2xl text-slate-600 dark:text-slate-300 mb-10 leading-relaxed">
                                The complete SaaS platform for live chat, helpdesk, and customer support.
                                Built with Laravel, React, and real-time WebSockets.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link href="/register">
                                    <Button size="lg" rightIcon={<ArrowRight className="h-5 w-5" />}>
                                        Start Free Trial
                                    </Button>
                                </Link>
                                <Link href="/components">
                                    <Button size="lg" variant="outline">
                                        View Components
                                    </Button>
                                </Link>
                            </div>
                            <p className="mt-6 text-sm text-slate-500 dark:text-slate-400">
                                No credit card required • 14-day free trial • Cancel anytime
                            </p>
                        </div>

                        {/* Hero Image/Demo */}
                        <div className="mt-16 relative">
                            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white dark:border-slate-700 bg-white dark:bg-slate-800">
                                <div className="aspect-video bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-slate-700 dark:to-slate-800 flex items-center justify-center">
                                    <div className="text-center">
                                        <MessageSquare className="h-24 w-24 text-primary-600 mx-auto mb-4" />
                                        <p className="text-lg font-medium text-slate-700 dark:text-slate-300">
                                            Dashboard Preview Coming Soon
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section id="features" className="py-20 sm:py-32 bg-white dark:bg-slate-900">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center max-w-3xl mx-auto mb-16">
                            <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-6">
                                Everything You Need
                            </h2>
                            <p className="text-xl text-slate-600 dark:text-slate-300">
                                Powerful features to help you deliver exceptional customer support
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {features.map((feature, index) => (
                                <Card key={index} variant="bordered" className="hover:shadow-lg transition-shadow">
                                    <CardBody className="p-8">
                                        <div
                                            className={`inline-flex p-3 rounded-lg bg-${feature.color}-100 dark:bg-${feature.color}-900/30 text-${feature.color}-600 dark:text-${feature.color}-400 mb-4`}
                                        >
                                            {feature.icon}
                                        </div>
                                        <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
                                            {feature.title}
                                        </h3>
                                        <p className="text-slate-600 dark:text-slate-400">
                                            {feature.description}
                                        </p>
                                    </CardBody>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* How It Works Section */}
                <section className="py-20 sm:py-32 bg-slate-50 dark:bg-slate-800">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center max-w-3xl mx-auto mb-16">
                            <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-6">
                                Get Started in Minutes
                            </h2>
                            <p className="text-xl text-slate-600 dark:text-slate-300">
                                Simple setup process to get your live chat up and running
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {steps.map((item, index) => (
                                <div key={index} className="relative">
                                    <div className="text-center">
                                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-600 text-white text-2xl font-bold mb-6">
                                            {item.step}
                                        </div>
                                        <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
                                            {item.title}
                                        </h3>
                                        <p className="text-slate-600 dark:text-slate-400">
                                            {item.description}
                                        </p>
                                    </div>
                                    {index < steps.length - 1 && (
                                        <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-slate-200 dark:bg-slate-700 -ml-8" />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Benefits Section */}
                <section className="py-20 sm:py-32 bg-white dark:bg-slate-900">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-6">
                                    Why Choose Chatterly?
                                </h2>
                                <p className="text-xl text-slate-600 dark:text-slate-300 mb-8">
                                    Built for modern teams who need powerful, reliable customer
                                    communication tools
                                </p>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    {benefits.map((benefit, index) => (
                                        <div key={index} className="flex items-center gap-3">
                                            <CheckCircle className="h-5 w-5 text-secondary-500 flex-shrink-0" />
                                            <span className="text-slate-700 dark:text-slate-300">
                                                {benefit}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="relative">
                                <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-slate-700 dark:to-slate-800 p-12">
                                    <div className="space-y-6">
                                        <div className="flex items-center gap-4">
                                            <Globe className="h-12 w-12 text-primary-600" />
                                            <div>
                                                <h4 className="font-semibold text-slate-900 dark:text-white">
                                                    Global Reach
                                                </h4>
                                                <p className="text-sm text-slate-600 dark:text-slate-400">
                                                    Serve customers worldwide
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <Zap className="h-12 w-12 text-secondary-500" />
                                            <div>
                                                <h4 className="font-semibold text-slate-900 dark:text-white">
                                                    Lightning Fast
                                                </h4>
                                                <p className="text-sm text-slate-600 dark:text-slate-400">
                                                    Real-time with WebSockets
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <Shield className="h-12 w-12 text-accent-500" />
                                            <div>
                                                <h4 className="font-semibold text-slate-900 dark:text-white">
                                                    Secure & Compliant
                                                </h4>
                                                <p className="text-sm text-slate-600 dark:text-slate-400">
                                                    Enterprise-grade security
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-20 sm:py-32 bg-gradient-to-r from-primary-600 to-secondary-500">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
                            Ready to Transform Your Customer Support?
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
                                Start Your Free Trial
                            </Button>
                        </Link>
                        <p className="mt-6 text-sm text-primary-100">
                            14-day free trial • No credit card required
                        </p>
                    </div>
                </section>

                {/* Footer */}
                <footer className="bg-slate-900 text-slate-300 py-12">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid md:grid-cols-4 gap-8 mb-8">
                            <div>
                                <div className="flex items-center gap-2 mb-4">
                                    <MessageSquare className="h-6 w-6 text-primary-400" />
                                    <h3 className="text-xl font-bold text-white">Chatterly</h3>
                                </div>
                                <p className="text-sm text-slate-400">
                                    The complete live chat and helpdesk platform for modern teams.
                                </p>
                            </div>
                            <div>
                                <h4 className="font-semibold text-white mb-4">Product</h4>
                                <ul className="space-y-2 text-sm">
                                    <li>
                                        <a href="#features" className="hover:text-white transition-colors">
                                            Features
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#pricing" className="hover:text-white transition-colors">
                                            Pricing
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/components" className="hover:text-white transition-colors">
                                            Components
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-semibold text-white mb-4">Company</h4>
                                <ul className="space-y-2 text-sm">
                                    <li>
                                        <a href="#" className="hover:text-white transition-colors">
                                            About
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="hover:text-white transition-colors">
                                            Blog
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="hover:text-white transition-colors">
                                            Contact
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-semibold text-white mb-4">Legal</h4>
                                <ul className="space-y-2 text-sm">
                                    <li>
                                        <a href="#" className="hover:text-white transition-colors">
                                            Privacy
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="hover:text-white transition-colors">
                                            Terms
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="border-t border-slate-800 pt-8 text-center text-sm text-slate-400">
                            <p>&copy; 2025 Chatterly. All rights reserved.</p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
