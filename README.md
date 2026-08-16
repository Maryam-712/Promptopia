# Promptopia

Promptopia is an open-source AI prompting tool where users can discover, create, and share creative AI prompts.

🔗 **Live site:** https://promptopia-kohl-nu-25.vercel.app

## Features

- 🔐 Google Sign-In authentication (NextAuth.js)
- ✍️ Create, edit, and delete AI prompts
- 🔍 Discover and browse prompts shared by the community
- 👤 Personalized profile page showing your own prompts
- 📋 One-click copy for any prompt
- 🏷️ Tag-based prompt organization

## Tech Stack

- **Framework:** Next.js (App Router)
- **Authentication:** NextAuth.js with Google OAuth
- **Database:** MongoDB (via Mongoose)
- **Styling:** Tailwind CSS
- **Deployment:** Vercel

## Getting Started

### Prerequisites

- Node.js installed
- A MongoDB Atlas account and cluster
- A Google Cloud project with OAuth 2.0 credentials

### Installation

1. Clone the repository
   ```bash
   git clone <your-repo-url>
   cd promptopia
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Create a `.env.local` file in the root directory with the following variables:
   ```
   MONGODB_URI=your_mongodb_connection_string
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   NEXTAUTH_SECRET=your_random_secret_string
   NEXTAUTH_URL=http://localhost:3000
   ```

4. Run the development server
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

### Google OAuth Setup

In [Google Cloud Console](https://console.cloud.google.com/) → APIs & Services → Credentials, make sure your OAuth Client ID has:

- **Authorized JavaScript origins:**
  - `http://localhost:3000`
  - `https://your-production-domain.vercel.app`
- **Authorized redirect URIs:**
  - `http://localhost:3000/api/auth/callback/google`
  - `https://your-production-domain.vercel.app/api/auth/callback/google`

### MongoDB Setup

- Whitelist your IP in Atlas under **Network Access**, or use `0.0.0.0/0` to allow access from anywhere (required for Vercel deployments, since serverless functions use dynamic IPs)
- Create a database user under **Database Access**

## Deployment

This project is deployed on [Vercel](https://vercel.com). To deploy your own:

1. Push your code to a GitHub repository
2. Import the repository into Vercel
3. Add all environment variables listed above under **Project Settings → Environment Variables**
4. Set `NEXTAUTH_URL` to your production domain
5. Deploy

## Project Structure

```
app/
  api/
    auth/[...nextauth]/   # NextAuth route handler
    prompt/                # Prompt CRUD routes
    user/[id]/posts/       # Fetch prompts by user
  create-prompt/           # Create prompt page
  update-prompt/           # Edit prompt page
  profile/                 # User profile page
components/
  Nav.jsx                  # Navigation bar
  Feed.jsx                 # Prompt feed
  PromptCard.jsx            # Individual prompt card
  Profile.jsx               # Profile page layout
  Form.jsx                  # Shared create/edit form
models/
  user.js                  # User schema
  prompt.js                 # Prompt schema
utils/
  database.js               # MongoDB connection helper
```

## License

Open-source under the MIT License.