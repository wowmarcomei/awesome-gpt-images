# Awesome GPT Images Prompt List Online ✨

A curated collection of GPT-4 Vision image creation showcases, designed to inspire creators and provide valuable references. This is a web version of [jamez-bondos/awesome-gpt4o-images](https://github.com/jamez-bondos/awesome-gpt4o-images) project, offering enhanced browsing and interaction experience.

![demo](https://raw.githubusercontent.com/wowmarcomei/awesome-gpt-images/main/media/home-demo.png)

[![简体中文](https://img.shields.io/badge/简体中文-查看-blue)](README.md)

[![Online Preview](https://img.shields.io/badge/预览-awesome--gpt--images-green)](https://prompt.laomeinote.com)

## One-click deployment

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fwowmarcomei%2Fawesome-gpt-images)

[![Deploy with Cloudflare Pages](https://img.shields.io/badge/Deploy%20with%20Cloudflare%20Pages-000000?style=for-the-badge&logo=Cloudflare&logoColor=white)](https://pages.cloudflare.com/)

## 🌟 Features

- 📸 Curated Showcases
  - High-quality GPT-4 Vision creation examples
  - Detailed prompt descriptions
  - Links to original creations

- 🔍 Advanced Filtering
  - Tag-based filtering
  - Creator filtering
  - Keyword search

- 💡 Prompt Management
  - Code-style prompt display
  - One-click copy functionality
  - Elegant copy success notification

- 🎨 Polished UI/UX
  - Responsive card layout
  - Dark mode support
  - Smooth animations

- 👥 User System
  - Multi-user login support
  - Permanent bookmark storage
  - Synchronized likes and bookmarks

- 🌐 Multi-language Support
  - English and Chinese language switching
  - Complete internationalization experience

## Deployment

### Supabase Setup

1. Create Supabase Project
   - Register and log in to [Supabase](https://supabase.com/)
   - Create a new project and note down the project URL and API keys

2. Initialize Database
   - In the Supabase console, go to the SQL Editor
   - Copy and execute the contents of the `supabase/init.sql` file to create necessary tables and views
   - This will create the following:
     - `users_view`: User information view
     - `collections`: Likes and bookmarks table
     - `user_settings`: User settings table
     - Necessary indexes and security policies

3. Configure Authentication
   - In the Supabase console, go to the "Authentication" page
   - Enable Email/Password sign-in and configure email templates
   - In the "OAuth Providers" tab, enable as needed:
     - Google
     - GitHub
     - Twitter
     - Apple
     - Facebook
   - In "URL Configuration", set the following:
     - Site URL: Your application URL (e.g., `https://your-app.vercel.app`)
     - Redirect URLs: Add `https://your-app.vercel.app/auth/callback`

### Vercel Deployment

1. One-click Deployment
   - Click the "Deploy with Vercel" button above
   - Follow Vercel's prompts to complete the deployment

2. Manual Deployment
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Login to Vercel
   vercel login
   
   # Deploy the project
   vercel
   ```

3. Deploy via GitHub
   - Fork this repository
   - Import your GitHub repository in Vercel
   - Vercel will automatically deploy and redeploy on code updates

4. Environment Variables
   - In your Vercel project settings, add the following environment variables:
     - `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anonymous key
     - `NEXT_PUBLIC_APP_URL`: Your application URL (e.g., `https://your-app.vercel.app`)
     - `DATABASE_URL`: Your Supabase PostgreSQL connection string
     - `RESEND_API_KEY`: RECEND API KEY for email registration

### Cloudflare Pages Deployment

1. Environment Setup
   - Copy the `.env.example` file and rename it to `.env`
   - Fill in the necessary environment variables (Supabase configuration, etc.)
2. Deployment Steps
   - Log in to [Cloudflare Dashboard](https://dash.cloudflare.com/)
   - Go to the Pages section and click "Create application"
   - Choose "Connect to Git" and select your GitHub repository
   - Configure build settings:
     - Build command: `npm run build`
     - Build output directory: `.next`
     - Root directory: `/`
     - Runtime Compatibility flags： `nodejs_compat`
3. Environment Variables
   - In the deployment settings, add the following environment variables:
     - `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anonymous key
     - `NEXT_PUBLIC_APP_URL`: Your application URL (e.g., `https://your-app.pages.dev`)
     - `DATABASE_URL`: Your Supabase PostgreSQL connection string
     - `RESEND_API_KEY`: RECEND API KEY for email registration
4. Security Settings
   - In Cloudflare Pages settings, enable "Edge Runtime" to support Edge API routes

## 🔨️ Tech Stack

- **Frontend Framework**: Next.js
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: React Icons
- **Image Optimization**: Next.js Image
- **Type Checking**: TypeScript
- **Authentication**: Supabase Auth
- **Database**: Supabase PostgreSQL

## 🚀 Local Development

1. Clone the repository
```bash
git clone https://github.com/wowmarcomei/awesome-gpt4o-images-prompt-online.git
cd awesome-gpt-images
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Start the development server
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Browse online
Visit [https://prompt.laomeinote.com](https://prompt.laomeinote.com/) to view the online demo.

## 🤝 Contributing

We welcome new case submissions! Please ensure your submission includes:

- High-quality creation output
- Complete prompt text
- Creator information
- Original source link
- Appropriate tags

## 📋 Development Plan

### Phase 1 (Completed)
- [x] Basic card layout
- [x] Search functionality
- [x] Dark mode
- [x] Responsive design

### Phase 2 (In Progress)
- [x] Pagination
- [x] Advanced filtering
- [x] User authentication
- [x] Image optimization
- [x] Multi-language support
- [x] Favorite and bookmark system

### Phase 3 (Planned)
- [ ] Case submission form
- [ ] Case detail page
- [ ] Social sharing

---

If this project helps you, please consider giving it a ⭐️ 

## 📝 License

MIT License

## 💖 Acknowledgments

- Thanks to [jamez-bondos/awesome-gpt4o-images](https://github.com/jamez-bondos/awesome-gpt4o-images) for inspiration
- Thanks to all creators for their amazing contributions