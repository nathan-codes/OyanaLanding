# Google Sheets Integration Setup Guide

## Overview

This guide will help you set up Google Sheets to automatically collect all email signups from your Oyana landing pages. No database required!

## Step 1: Create a Google Sheet

1. **Go to Google Sheets**: https://sheets.google.com
2. **Create a new sheet** called "Oyana Signups"
3. **Add headers** in row 1:
   - Column A: `Timestamp`
   - Column B: `Email`
   - Column C: `Name`
   - Column D: `Source`
   - Column E: `Type`

Your sheet should look like this:

```
| Timestamp | Email | Name | Source | Type |
|-----------|-------|------|--------|------|
|           |       |      |        |      |
```

4. **Copy the Sheet ID** from the URL:
   - URL looks like: `https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID/edit`
   - Copy the part between `/d/` and `/edit`

## Step 2: Create a Google Cloud Project

1. **Go to Google Cloud Console**: https://console.cloud.google.com
2. **Create a new project**:

   - Click "Select a project" → "New Project"
   - Name: "Oyana Signups"
   - Click "Create"

3. **Enable Google Sheets API**:
   - Go to "APIs & Services" → "Library"
   - Search for "Google Sheets API"
   - Click on it and press "Enable"

## Step 3: Create a Service Account

1. **Go to "APIs & Services" → "Credentials"**
2. **Click "Create Credentials" → "Service Account"**
3. **Fill in the details**:
   - Service account name: `oyana-sheets-service`
   - Service account ID: `oyana-sheets-service`
   - Description: `Service account for Oyana signups`
4. **Click "Create and Continue"**
5. **Skip the optional steps** and click "Done"

## Step 4: Generate Service Account Key

1. **Find your service account** in the credentials list
2. **Click on the service account email**
3. **Go to "Keys" tab**
4. **Click "Add Key" → "Create new key"**
5. **Select "JSON" format**
6. **Click "Create"**
7. **Download the JSON file** - keep it safe!

## Step 5: Share Your Google Sheet

1. **Open your Google Sheet**
2. **Click "Share" button** (top right)
3. **Add the service account email** (from the JSON file you downloaded)
   - Look for `"client_email"` in the JSON file
   - It looks like: `oyana-sheets-service@your-project.iam.gserviceaccount.com`
4. **Give it "Editor" permissions**
5. **Click "Send"**

## Step 6: Set Up Environment Variables

1. **Create/update `.env.local`** in your project root
2. **Add these variables**:

```env
# Google Sheets Configuration
GOOGLE_SHEET_ID=your_sheet_id_here
GOOGLE_SERVICE_ACCOUNT_EMAIL=oyana-sheets-service@your-project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour private key here\n-----END PRIVATE KEY-----\n"

# Optional: Your app URL (for production)
NEXT_PUBLIC_BASE_URL=https://your-domain.com
```

### How to get the values:

**GOOGLE_SHEET_ID**: Copy from your Google Sheet URL

**GOOGLE_SERVICE_ACCOUNT_EMAIL**: Copy from the JSON file (`client_email` field)

**GOOGLE_PRIVATE_KEY**: Copy from the JSON file (`private_key` field) and wrap in quotes

## Step 7: Test the Integration

1. **Start your development server**:

   ```bash
   npm run dev
   ```

2. **Visit one of your pages** with email forms:

   - http://localhost:3000/oyana1
   - http://localhost:3000/wailistnew
   - etc.

3. **Submit a test email**

4. **Check your Google Sheet** - you should see the data appear!

## Troubleshooting

### Common Issues:

**"Permission denied" error**:

- Make sure you shared the sheet with the service account email
- Check that the service account has "Editor" permissions

**"Sheet not found" error**:

- Double-check your `GOOGLE_SHEET_ID` in `.env.local`
- Make sure the sheet exists and is accessible

**"Invalid credentials" error**:

- Verify your `GOOGLE_SERVICE_ACCOUNT_EMAIL` and `GOOGLE_PRIVATE_KEY`
- Make sure the private key includes the `\n` characters

**"API not enabled" error**:

- Go back to Google Cloud Console
- Make sure Google Sheets API is enabled for your project

### Debug Steps:

1. **Check the console logs** in your terminal when testing
2. **Look for error messages** in the browser's Network tab
3. **Verify environment variables** are loaded correctly

## What Happens When Someone Signs Up?

1. **User fills out email form** on any page
2. **Data gets sent** to your `/api/waitlist` endpoint
3. **API validates** the email
4. **Data gets written** to your Google Sheet automatically
5. **User sees success message**

## Data Structure in Your Sheet

Each signup creates a new row with:

- **Timestamp**: When they signed up
- **Email**: Their email address
- **Name**: Their name (if provided)
- **Source**: Which page they came from (oyana1, oyana2, etc.)
- **Type**: waitlist or preorder

## Security Notes

- **Keep your `.env.local` file private** - never commit it to git
- **The service account** only has access to your specific sheet
- **All data is encrypted** in transit and at rest
- **You can revoke access** anytime from Google Cloud Console

## Production Deployment

When you deploy to production:

1. **Set environment variables** in your hosting platform:

   - Vercel: Project Settings → Environment Variables
   - Netlify: Site Settings → Environment Variables
   - Railway: Project → Variables

2. **Update `NEXT_PUBLIC_BASE_URL`** to your production domain

3. **Test the integration** on your live site

## Advanced Features (Optional)

### Email Notifications

You can set up Google Apps Script to send you email notifications when new signups arrive:

1. **Open your Google Sheet**
2. **Go to Extensions → Apps Script**
3. **Add this code**:

```javascript
function onEdit(e) {
  if (e.range.getRow() > 1) {
    // Skip header row
    MailApp.sendEmail({
      to: "your-email@example.com",
      subject: "New Oyana Signup!",
      body: `New signup: ${e.range.getValues()[0][1]} from ${
        e.range.getValues()[0][3]
      }`,
    });
  }
}
```

### Data Validation

Add data validation to your sheet:

1. **Select the Email column**
2. **Go to Data → Data validation**
3. **Set criteria to "Text contains @"**

## Support

If you run into issues:

1. **Check the console logs** for error messages
2. **Verify all environment variables** are set correctly
3. **Test with a simple email** first
4. **Make sure your Google Cloud project** has billing enabled (required for API access)

Your signups will now automatically appear in Google Sheets! 🎉
