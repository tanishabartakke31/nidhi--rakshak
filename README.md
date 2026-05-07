# Nidhi Rakshak - Asset & Inheritance Management Platform

**Nidhi Rakshak** (Treasure Guardian) is a secure web application designed to help citizens safeguard and manage their assets and inheritance planning. It provides role-based access for account holders and nominees with comprehensive asset management, document storage, and activity tracking features.

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com)
[![Built with Next.js](https://img.shields.io/badge/Built%20with-Next.js-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![Supabase](https://img.shields.io/badge/Database-Supabase-black?style=for-the-badge&logo=supabase)](https://supabase.com)

## Features

### Core Features
- **Secure Authentication** - Email/password authentication with Supabase Auth
- **Role-Based Access** - Separate portals for Account Holders and Nominees
- **Asset Management** - View and manage financial assets
- **Document Storage** - Upload and organize important legal/financial documents
- **Inheritance Rules** - Set up and manage inheritance protection rules
- **Activity Tracking** - Comprehensive audit logs for security and compliance
- **Safety Status** - Emergency status reporting ("I'm Safe" / "Need Help")
- **Session Management** - Secure token-based authentication with localStorage persistence

## Tech Stack

- **Frontend:** Next.js 15 (React 19.2)
- **Backend:** Next.js API Routes
- **Database:** Supabase (PostgreSQL)
- **Authentication:** Supabase Auth
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **Package Manager:** npm

## Quick Start

### Prerequisites
- Node.js 18+
- Supabase account with active project

### Dashboard
- **Account Holder:** Manage assets, documents, and inheritance rules
- **Nominee:** Access account information and report safety status

## Project Structure

```
├── app/
│   ├── api/auth/                    # Authentication APIs
│   ├── page.tsx                     # Login page
│   ├── register/                    # Registration page
│   ├── select-user-type/            # User role selection
│   ├── account-holder-dashboard/    # Account holder portal
│   └── nominee-dashboard/           # Nominee portal
├── components/                       # Reusable components
├── lib/supabase/                    # Supabase configuration
├── public/                          # Static assets
└── .env.local                       # Environment variables
```


## Troubleshooting

### "Invalid API key" Error
- Verify Supabase credentials in `.env.local`
- Ensure your Supabase instance is active (not paused)
- Confirm credentials match your Supabase project

### "Email not confirmed" Error
- Go to Supabase Dashboard → Authentication → Providers → Email
- Toggle "Confirm email" OFF for testing
- For production, keep email confirmation enabled

### "Email rate limit exceeded"
- Wait 5-10 minutes before trying again
- Try registering with a different email address

### Port 3000 Already in Use
- The app will automatically use the next available port
- Check terminal output for the actual port being used

## License

MIT License - see LICENSE file for details

## Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Database by [Supabase](https://supabase.com/)
- UI Components from [shadcn/ui](https://ui.shadcn.com/)
- Styling with [Tailwind CSS](https://tailwindcss.com/)
