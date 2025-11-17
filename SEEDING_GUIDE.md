# CHATTERLY Database Seeding Guide

Complete guide for populating the CHATTERLY platform with test data.

## Quick Start

```bash
# Fresh database with all seed data
php artisan migrate:fresh --seed

# Run seeders on existing database
php artisan db:seed

# Run specific seeder
php artisan db:seed --class=CompanySeeder
```

## Login Credentials

### Super Admin
- **Email:** admin@chatterly.com
- **Password:** password
- **Access:** Platform-wide management at `/superadmin`

### Staff Members
- **Email:** Generated based on name (e.g., john.doe@techcorp.com)
- **Password:** password (all staff)
- **Access:** Company dashboard at `/company`

### Clients
- **Email:** Randomly generated (e.g., user123@example.com)
- **Password:** password (all clients)
- **Access:** Client portal (coming soon)

## Seeders Overview

### 1. SuperAdminSeeder
Creates the platform super administrator who manages all companies.

**Data Created:**
- 1 Super Admin account

### 2. CompanySeeder
Creates sample companies across different industries with subscriptions.

**Data Created:**
- 5 Companies:
  - TechCorp Solutions (Technology, Professional Plan)
  - RetailHub Inc (E-commerce, Business Plan)
  - HealthCare Plus (Healthcare, Enterprise Plan)
  - EduLearn Academy (Education, Professional Plan - Trial)
  - FinanceHub (Finance, Business Plan)

**Each company includes:**
- Complete profile (name, email, phone, website, industry)
- Full address (street, city, state, country, zip)
- Timezone and currency settings
- Unique widget ID (UUID)
- Active subscription with pricing

### 3. StaffSeeder
Creates staff members (support agents) for each company.

**Data Created:**
- 3-8 staff members per company
- Total: ~25-40 staff members

**Staff Details:**
- Employee IDs (EMP001-EMP999)
- Positions: Support Manager, Senior Support Agent, Support Agent, Technical Support, Customer Success Manager
- Departments: Support, Customer Success, Technical
- Hire dates (1-24 months ago)
- Salaries ($40,000-$90,000)

### 4. ClientSeeder
Creates client accounts for each company.

**Data Created:**
- 10-25 clients per company
- Total: ~50-125 clients

**Client Details:**
- Client IDs (CLI001-CLI999)
- Unique email addresses
- Company names and full addresses
- Active status

### 5. ChatSeeder
Creates live chat conversations with message history.

**Data Created:**
- 15-30 conversations per company
- Total: ~75-150 conversations
- 3-10 messages per conversation

**Conversation Features:**
- Realistic back-and-forth dialogue
- Client and staff messages
- Multiple statuses (active, waiting, closed)
- Staff assignments
- Timestamps spanning last 30 days
- Read/unread status

**Sample Messages:**
- Client: "Hi, I need help with my account"
- Staff: "Hello! How can I assist you today?"
- Client: "Can you help me reset my password?"
- Staff: "I'd be happy to help you with that"

### 6. TicketSeeder
Creates support tickets with replies.

**Data Created:**
- 20-40 tickets per company
- Total: ~100-200 tickets
- 1-5 replies per ticket

**Ticket Features:**
- Ticket IDs (TICK001-TICK999)
- Realistic subjects (Account Login Issue, Billing Question, Feature Request, etc.)
- Priorities: low, medium, high, urgent
- Statuses: open, in_progress, waiting_client, resolved, closed
- Categories: technical, billing, general, feature_request
- Client and staff replies
- Internal notes (staff only)
- Timestamps spanning last 60 days

### 7. SettingsSeeder
Creates company settings, widget configuration, chatbot, and knowledge base.

**Data Created per Company:**

**Widget Settings:**
- Position: bottom-right
- Colors: Rose (#E11D48), Teal (#14B8A6)
- Welcome message
- Offline message
- Feature flags (avatar, file upload, emoji)

**Chatbot (4 triggers per company):**
- Greeting trigger (hello, hi, hey)
- Pricing keyword trigger
- Support keyword trigger
- Hours keyword trigger
- Automated responses for each

**Knowledge Base:**
- 5 categories per company:
  - Getting Started
  - Account Management
  - Billing & Pricing
  - Technical Support
  - API Documentation
- 3-5 articles per category
- Total: ~75-125 KB articles

### 8. FeedbackSeeder
Creates customer satisfaction feedback and ratings.

**Data Created:**
- 10-20 CSAT feedback per company (on closed chats)
- 15-30 NPS feedback per company
- 10-20 ticket ratings per company
- Total: ~150-300 feedback entries

**Feedback Types:**
- **CSAT (Customer Satisfaction):** 1-5 scale (converted to 10-point)
- **NPS (Net Promoter Score):** 0-10 scale
- **Rating:** General 6-10 ratings for tickets

**Features:**
- Optional comments
- Linked to conversations/tickets
- Timestamps spanning last 30 days
- Realistic feedback messages

## Seeding Order

Seeders run in dependency order to maintain referential integrity:

1. **SuperAdminSeeder** - Creates super admin first
2. **CompanySeeder** - Creates companies and subscriptions
3. **StaffSeeder** - Requires companies
4. **ClientSeeder** - Requires companies
5. **ChatSeeder** - Requires companies, staff, and clients
6. **TicketSeeder** - Requires companies, staff, and clients
7. **SettingsSeeder** - Requires companies
8. **FeedbackSeeder** - Requires companies, clients, conversations, and tickets

## Total Test Data Generated

| Entity | Count |
|--------|-------|
| Super Admins | 1 |
| Companies | 5 |
| Subscriptions | 5 |
| Staff Members | 25-40 |
| Clients | 50-125 |
| Chat Conversations | 75-150 |
| Chat Messages | 225-1,500 |
| Support Tickets | 100-200 |
| Ticket Replies | 100-1,000 |
| Widget Settings | 5 |
| Chatbot Triggers | 20 |
| Chatbot Responses | 20 |
| KB Categories | 25 |
| KB Articles | 75-125 |
| Feedback Entries | 150-300 |

## Running Individual Seeders

```bash
# Seed only super admin
php artisan db:seed --class=SuperAdminSeeder

# Seed only companies
php artisan db:seed --class=CompanySeeder

# Seed only staff
php artisan db:seed --class=StaffSeeder

# Seed only clients
php artisan db:seed --class=ClientSeeder

# Seed only chats
php artisan db:seed --class=ChatSeeder

# Seed only tickets
php artisan db:seed --class=TicketSeeder

# Seed only settings
php artisan db:seed --class=SettingsSeeder

# Seed only feedback
php artisan db:seed --class=FeedbackSeeder
```

## Testing Scenarios

### Test Live Chat
1. Login as staff: `john.doe@techcorp.com` / `password`
2. Navigate to `/company/chat`
3. View existing conversations with clients
4. Test message sending and real-time updates

### Test Ticketing System
1. Login as staff
2. Navigate to `/company/tickets`
3. View tickets in various statuses
4. Test replying to tickets
5. Test status changes and priority updates

### Test Knowledge Base
1. Login as staff
2. Navigate to `/company/kb`
3. Browse categories and articles
4. Test article search and filtering

### Test Feedback & Analytics
1. Login as staff
2. Navigate to `/company/feedback`
3. View CSAT scores, NPS, and ratings
4. Check rating distribution and comments

### Test Super Admin Panel
1. Login as super admin: `admin@chatterly.com` / `password`
2. Navigate to `/superadmin/dashboard`
3. View all companies and their statistics
4. Test company management features

## Customization

### Modify Seeder Data

Edit any seeder in `database/seeders/` to customize:
- Number of records created
- Sample data values
- Relationships between entities
- Timestamps and date ranges

### Add More Companies

Edit `database/seeders/CompanySeeder.php`:
```php
$companies = [
    [
        'name' => 'Your Company',
        'email' => 'info@yourcompany.com',
        'plan' => 'business',
        'status' => 'active',
    ],
    // ... add more companies
];
```

### Change Default Passwords

Update password hashing in respective seeders:
```php
'password' => Hash::make('your_custom_password'),
```

## Troubleshooting

### Database Connection Error
```
SQLSTATE[HY000] [2002] Connection refused
```
**Solution:** Configure `.env` with correct database credentials and ensure MySQL/PostgreSQL is running.

### Foreign Key Constraint Error
```
SQLSTATE[23000]: Integrity constraint violation
```
**Solution:** Run `php artisan migrate:fresh --seed` to reset database and run all seeders in order.

### Duplicate Entry Error
```
SQLSTATE[23000]: Integrity constraint violation: 1062 Duplicate entry
```
**Solution:** Run `php artisan migrate:fresh --seed` to start with a clean database.

## Production Considerations

⚠️ **Never run seeders in production!**

Seeders are designed for development and testing only. They:
- Create users with default passwords
- Generate random/fake data
- May overwrite existing data with `migrate:fresh`

For production data import, create separate import commands or scripts.

## Next Steps

After seeding:
1. Test all authentication flows
2. Verify chat and ticket functionality
3. Test real-time features with Laravel Reverb
4. Configure email settings for notifications
5. Set up Stripe for billing (production)
6. Configure SMS/WhatsApp integrations
7. Set up AI services (if using)

## Support

For issues or questions about seeding:
1. Check seeder files in `database/seeders/`
2. Review migration files in `database/migrations/`
3. Verify model relationships in `app/Models/`
4. Check Laravel logs in `storage/logs/`
