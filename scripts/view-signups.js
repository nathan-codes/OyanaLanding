#!/usr/bin/env node

/**
 * Simple script to view collected signups from the console logs
 * Run this after starting your Next.js app to see signups in real-time
 */

console.log(`
🚀 Oyana Signup Monitor
=======================

This script helps you monitor signups from your landing pages.

To use:
1. Start your Next.js app: npm run dev
2. Open this terminal and watch for signup logs
3. Test your forms on different pages

The API will log signups in this format:
- Email: user@example.com
- Name: John Doe (if provided)
- Source: oyana1, oyana2, oyana3, waitlist, wailistnew, main-page-dialog, preorder-page
- Type: waitlist or preorder
- Timestamp: 2024-01-01T12:00:00.000Z

Watch the console output from your Next.js app to see signups in real-time!

📝 Next Steps:
- Replace console.log in /api/waitlist/route.ts with your preferred storage solution
- Consider adding email validation and duplicate prevention
- Set up email notifications for new signups
- Add analytics tracking
`);

// This script is just for documentation - the actual monitoring happens in your Next.js console
