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

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/tanishabartakke31/Nidhi-Rakshak.git
cd Nidhi-Rakshak
```

2. **Install dependencies**
```bash
npm install --legacy-peer-deps
```

3. **Set up environment variables**

Create a `.env.local` file in the project root:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Get these values from [Supabase Dashboard](https://app.supabase.com) → Settings → API

4. **Start development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

### Registration
1. Navigate to `/register`
2. Enter email, password, first name, and last name
3. Click "Create Account"

### Login
1. Go to `/` (home page)
2. Enter your registered email and password
3. Click "Login"

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

## Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run ESLint
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

## Deployment

### Deploy to Vercel

1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel project settings:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `NEXT_PUBLIC_SITE_URL`
3. Push to main branch - Vercel will auto-deploy

## Security

- Passwords are securely hashed by Supabase Auth
- Row Level Security (RLS) policies protect sensitive data
- Activity logs track all user actions
- Session tokens with automatic expiration
- HTTPS enforced in production

## Contributing

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Commit changes: `git commit -m 'Add feature'`
3. Push branch: `git push origin feature/your-feature`
4. Open a Pull Request

## Support

For issues or questions:
- Check [Supabase Docs](https://supabase.com/docs)
- Review [Next.js Docs](https://nextjs.org/docs)
- Open an issue on GitHub

## License

MIT License - see LICENSE file for details

## Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Database by [Supabase](https://supabase.com/)
- UI Components from [shadcn/ui](https://ui.shadcn.com/)
- Styling with [Tailwind CSS](https://tailwindcss.com/)
