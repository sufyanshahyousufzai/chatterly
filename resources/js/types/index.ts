// Inertia & Page Props Types
export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    created_at: string;
    updated_at: string;
}

export interface PageProps<T extends Record<string, unknown> = Record<string, unknown>> {
    auth: {
        user: User;
    };
    flash?: {
        success?: string;
        error?: string;
        warning?: string;
        info?: string;
    };
    errors?: Record<string, string>;
}

// User Types
export interface SuperAdmin {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    is_active: boolean;
    last_login_at?: string;
    created_at: string;
    updated_at: string;
}

export interface Company {
    id: number;
    uuid: string;
    name: string;
    slug: string;
    logo?: string;
    domain?: string;
    email: string;
    phone?: string;
    address?: string;
    city?: string;
    state?: string;
    country?: string;
    postal_code?: string;
    website?: string;
    timezone: string;
    currency: string;
    subscription_plan_id?: number;
    subscription_status: 'trial' | 'active' | 'cancelled' | 'expired' | 'suspended';
    trial_ends_at?: string;
    subscription_ends_at?: string;
    stripe_customer_id?: string;
    is_active: boolean;
    owner_id?: number;
    created_at: string;
    updated_at: string;
    subscription_plan?: SubscriptionPlan;
}

export interface CompanyUser {
    id: number;
    company_id: number;
    name: string;
    email: string;
    avatar?: string;
    phone?: string;
    is_owner: boolean;
    is_active: boolean;
    last_login_at?: string;
    created_at: string;
    updated_at: string;
    company?: Company;
}

export interface Staff {
    id: number;
    company_id: number;
    staff_id: string;
    name: string;
    email: string;
    avatar?: string;
    phone?: string;
    date_of_birth?: string;
    gender?: 'male' | 'female' | 'other';
    designation?: string;
    department?: string;
    joining_date: string;
    online_status: 'online' | 'offline' | 'busy' | 'away';
    last_seen_at?: string;
    max_concurrent_chats: number;
    is_active: boolean;
    last_login_at?: string;
    created_at: string;
    updated_at: string;
    company?: Company;
    roles?: Role[];
    permissions?: Permission[];
}

export interface Client {
    id: number;
    company_id: number;
    client_id: string;
    name: string;
    email: string;
    phone?: string;
    avatar?: string;
    company_name?: string;
    address?: string;
    city?: string;
    state?: string;
    country?: string;
    postal_code?: string;
    notes?: string;
    tags?: string[];
    portal_access: boolean;
    is_active: boolean;
    last_login_at?: string;
    created_by: number;
    created_at: string;
    updated_at: string;
    company?: Company;
}

// Subscription Types
export interface SubscriptionPlan {
    id: number;
    name: string;
    slug: string;
    description?: string;
    price_monthly: number;
    price_yearly: number;
    stripe_price_id_monthly?: string;
    stripe_price_id_yearly?: string;
    limits: {
        staff: number;
        clients: number;
        chats_per_month: number;
        storage_gb: number;
    };
    features: string[];
    is_active: boolean;
    sort_order: number;
    created_at: string;
    updated_at: string;
}

export interface Subscription {
    id: number;
    company_id: number;
    subscription_plan_id: number;
    stripe_subscription_id?: string;
    status: 'trial' | 'active' | 'cancelled' | 'past_due' | 'unpaid';
    billing_cycle: 'monthly' | 'yearly';
    trial_ends_at?: string;
    current_period_start?: string;
    current_period_end?: string;
    cancelled_at?: string;
    created_at: string;
    updated_at: string;
    subscription_plan?: SubscriptionPlan;
}

// Chat Types
export interface Visitor {
    id: number;
    company_id: number;
    visitor_uuid: string;
    name?: string;
    email?: string;
    phone?: string;
    ip_address: string;
    country?: string;
    city?: string;
    device?: string;
    browser?: string;
    os?: string;
    current_page?: string;
    referrer?: string;
    is_chatting: boolean;
    is_online: boolean;
    last_seen_at: string;
    created_at: string;
    updated_at: string;
}

export interface ChatConversation {
    id: number;
    company_id: number;
    conversation_uuid: string;
    visitor_id?: number;
    client_id?: number;
    assigned_to?: number;
    status: 'active' | 'waiting' | 'closed' | 'missed';
    rating?: number;
    feedback?: string;
    started_at: string;
    ended_at?: string;
    created_at: string;
    updated_at: string;
    visitor?: Visitor;
    client?: Client;
    assigned_agent?: Staff;
    messages?: ChatMessage[];
}

export interface ChatMessage {
    id: number;
    conversation_id: number;
    sender_type: string;
    sender_id?: number;
    message?: string;
    message_type: 'text' | 'file' | 'image' | 'system';
    file_path?: string;
    file_name?: string;
    file_size?: number;
    is_read: boolean;
    read_at?: string;
    created_at: string;
    updated_at: string;
    sender?: Staff | Client | Visitor;
}

// Ticket Types
export interface Ticket {
    id: number;
    company_id: number;
    ticket_number: string;
    subject: string;
    description: string;
    client_id?: number;
    visitor_id?: number;
    assigned_to?: number;
    priority: 'low' | 'medium' | 'high' | 'urgent';
    status: 'open' | 'pending' | 'solved' | 'closed';
    category?: string;
    source: 'chat' | 'email' | 'portal' | 'manual';
    conversation_id?: number;
    rating?: number;
    feedback?: string;
    due_date?: string;
    solved_at?: string;
    closed_at?: string;
    created_at: string;
    updated_at: string;
    client?: Client;
    visitor?: Visitor;
    assigned_agent?: Staff;
    replies?: TicketReply[];
}

export interface TicketReply {
    id: number;
    ticket_id: number;
    sender_type: string;
    sender_id: number;
    message: string;
    is_internal: boolean;
    attachments?: string[];
    created_at: string;
    updated_at: string;
    sender?: Staff | Client;
}

// Knowledge Base Types
export interface KbCategory {
    id: number;
    company_id: number;
    name: string;
    slug: string;
    description?: string;
    icon?: string;
    is_public: boolean;
    sort_order: number;
    created_at: string;
    updated_at: string;
    articles?: KbArticle[];
}

export interface KbArticle {
    id: number;
    company_id: number;
    category_id: number;
    title: string;
    slug: string;
    content: string;
    excerpt?: string;
    is_public: boolean;
    is_published: boolean;
    views: number;
    helpful_count: number;
    not_helpful_count: number;
    author_id: number;
    published_at?: string;
    created_at: string;
    updated_at: string;
    category?: KbCategory;
    author?: Staff;
}

// Role & Permission Types (Spatie)
export interface Role {
    id: number;
    name: string;
    guard_name: string;
    created_at: string;
    updated_at: string;
    permissions?: Permission[];
}

export interface Permission {
    id: number;
    name: string;
    guard_name: string;
    created_at: string;
    updated_at: string;
}

// Analytics Types
export interface ChatAnalytics {
    id: number;
    company_id: number;
    date: string;
    total_chats: number;
    missed_chats: number;
    completed_chats: number;
    avg_wait_time: number;
    avg_chat_duration: number;
    avg_messages_per_chat: number;
    satisfaction_rating?: number;
    created_at: string;
    updated_at: string;
}

export interface StaffPerformance {
    id: number;
    company_id: number;
    staff_id: number;
    date: string;
    total_chats: number;
    completed_chats: number;
    avg_response_time: number;
    avg_chat_duration: number;
    satisfaction_rating?: number;
    created_at: string;
    updated_at: string;
    staff?: Staff;
}

// Pagination Type
export interface PaginatedData<T> {
    data: T[];
    current_page: number;
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: Array<{
        url: string | null;
        label: string;
        active: boolean;
    }>;
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
}

// Form Types
export interface CustomForm {
    id: number;
    company_id: number;
    name: string;
    description?: string;
    form_type: 'pre_chat' | 'offline' | 'client_portal' | 'general';
    form_fields: FormField[];
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

export interface FormField {
    name: string;
    label: string;
    type: 'text' | 'email' | 'tel' | 'textarea' | 'select' | 'checkbox' | 'radio';
    required: boolean;
    options?: string[];
    placeholder?: string;
}

// Utility Types
export type OnlineStatus = 'online' | 'offline' | 'busy' | 'away';
export type TicketPriority = 'low' | 'medium' | 'high' | 'urgent';
export type TicketStatus = 'open' | 'pending' | 'solved' | 'closed';
export type ConversationStatus = 'active' | 'waiting' | 'closed' | 'missed';
export type SubscriptionStatus = 'trial' | 'active' | 'cancelled' | 'expired' | 'suspended';

// Global Window Augmentation
declare global {
    interface Window {
        axios: typeof import('axios').default;
        Pusher: typeof import('pusher-js').default;
        Echo: import('laravel-echo').default;
    }
}
