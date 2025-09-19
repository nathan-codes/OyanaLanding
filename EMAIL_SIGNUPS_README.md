# Email Signups Implementation

## Overview

All email input forms across your Oyana landing pages are now fully functional and will collect signups when users submit their information.

## What's Been Implemented

### 1. API Endpoint (`/api/waitlist`)

- **Location**: `app/api/waitlist/route.ts`
- **Purpose**: Handles all email signups from different pages
- **Features**:
  - Email validation
  - Source tracking (which page the signup came from)
  - Type classification (waitlist vs preorder)
  - Timestamp logging
  - Error handling

### 2. Updated Pages

All pages now send data to the API instead of just showing local success messages:

- **`/wailistnew`** - Waitlist signup form
- **`/oyana1`** - Main landing page with email signup
- **`/oyana2`** - Alternative landing page with email signup
- **`/oyana3`** - Landing page with name + email signup
- **`/waitlist`** - Dedicated waitlist page
- **`/`** - Main page dialog form
- **`/preorder`** - Preorder form (uses existing `/api/preorder` endpoint)

### 3. Enhanced User Experience

- **Loading states**: Buttons show "Joining..." while submitting
- **Error handling**: Users see helpful error messages
- **Success feedback**: Clear confirmation when signup succeeds
- **Form reset**: Forms clear after successful submission
- **Disabled states**: Prevents double-submission

## How It Works

### Data Flow

1. User fills out email form on any page
2. Form submits to appropriate API endpoint (`/api/waitlist` or `/api/preorder`)
3. API validates email and logs the signup
4. User sees success/error message
5. Form resets on success

### Signup Data Structure

```json
{
  "email": "user@example.com",
  "name": "John Doe", // optional
  "source": "oyana1", // which page
  "type": "waitlist", // or "preorder"
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

### Source Tracking

Each page has a unique source identifier:

- `oyana1` - Main landing page
- `oyana2` - Alternative landing page
- `oyana3` - Landing page with name field
- `waitlist` - Dedicated waitlist page
- `wailistnew` - New waitlist page
- `main-page-dialog` - Dialog form on main page
- `preorder-page` - Preorder form

## Monitoring Signups

### Real-time Monitoring

1. Start your Next.js app: `npm run dev`
2. Watch the console output for signup logs
3. Test forms on different pages to see data collection

### Example Console Output

```
New waitlist signup: {
  email: 'user@example.com',
  name: 'John Doe',
  source: 'oyana3',
  type: 'waitlist',
  timestamp: '2024-01-01T12:00:00.000Z'
}
```

## Next Steps

### 1. Storage Integration

Replace the `console.log` in `/api/waitlist/route.ts` with your preferred storage solution:

**Database Options:**

- PostgreSQL with Prisma
- MongoDB with Mongoose
- Supabase
- PlanetScale

**Email Service Options:**

- Mailchimp
- ConvertKit
- Klaviyo
- EmailOctopus

**CRM Options:**

- HubSpot
- Salesforce
- Pipedrive

**Simple Options:**

- Airtable
- Google Sheets
- Notion

### 2. Email Notifications

Add email notifications for new signups:

```javascript
// Example with Resend
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

await resend.emails.send({
  from: "signups@oyana.com",
  to: "team@oyana.com",
  subject: "New Waitlist Signup",
  html: `<p>New signup: ${email} from ${source}</p>`,
});
```

### 3. Analytics Integration

Track signups with analytics:

```javascript
// Example with PostHog
import { PostHog } from "posthog-node";

const posthog = new PostHog(process.env.POSTHOG_API_KEY);

posthog.capture({
  distinctId: email,
  event: "waitlist_signup",
  properties: { source, type },
});
```

### 4. Duplicate Prevention

Add duplicate email prevention:

```javascript
// Check if email already exists before adding
const existingSignup = await db.waitlist.findUnique({
  where: { email },
});

if (existingSignup) {
  return NextResponse.json(
    { error: "Email already registered" },
    { status: 400 }
  );
}
```

## Testing

### Manual Testing

1. Visit each page with email forms
2. Submit test emails
3. Check console logs for signup data
4. Verify success/error messages display correctly

### Automated Testing

Consider adding tests for:

- API endpoint validation
- Form submission flows
- Error handling
- Email validation

## Security Considerations

- **Rate Limiting**: Add rate limiting to prevent spam
- **Email Validation**: Implement proper email validation
- **CSRF Protection**: Ensure forms are protected
- **Input Sanitization**: Sanitize all user inputs
- **Privacy Compliance**: Ensure GDPR/CCPA compliance

## Environment Variables

Add these to your `.env.local`:

```env
# Database
DATABASE_URL="your_database_url"

# Email Service
RESEND_API_KEY="your_resend_key"
# or
MAILCHIMP_API_KEY="your_mailchimp_key"

# Analytics
POSTHOG_API_KEY="your_posthog_key"
```

## Support

If you need help integrating with specific services or have questions about the implementation, feel free to ask!
