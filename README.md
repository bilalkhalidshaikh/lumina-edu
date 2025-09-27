# Lumina - EdTech Analytics Platform

A high-fidelity 3D educational analytics platform built with Next.js 14, featuring AI-powered insights and gamified user experience.

## Features

- 🎓 **Student Analytics Dashboard** - Comprehensive view of student performance
- 🤖 **AI-Powered Predictions** - Google AI integration for personalized insights
- 📱 **Progressive Web App** - Installable mobile experience
- 🎨 **3D Gamified UI** - Premium animations and micro-interactions
- 🌐 **Multi-language Support** - English and Urdu localization
- 📊 **Real-time Data Visualization** - Interactive charts and progress tracking

## Quick Start

\`\`\`bash
# Install dependencies
npm install

# Start development server
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Project Structure

\`\`\`
├── app/
│   ├── login/          # Authentication page
│   ├── dashboard/      # Teacher/Admin dashboard
│   ├── student/[id]/   # Individual student analytics
│   └── parent/         # Parent view
├── components/
│   └── ui/             # Reusable UI components
├── lib/                # Utilities and configurations
└── public/             # Static assets and PWA manifest
\`\`\`

## Technology Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS with custom design tokens
- **3D Graphics**: React Three Fiber + Drei
- **Animations**: Framer Motion
- **Charts**: Recharts
- **PWA**: Next.js PWA capabilities
- **AI Integration**: Google AI (Gemini) - Placeholder implementation

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Deployment

This project is optimized for deployment on Vercel with automatic PWA generation and edge optimization.

## AI Integration Setup

1. Add your Google AI API key to environment variables:
   \`\`\`
   GEMINI_API_KEY=your_api_key_here
   \`\`\`

2. Configure Firebase for authentication and data storage:
   \`\`\`
   NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_config
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_config
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_config
   \`\`\`

## License

MIT License - Built for educational hackathon purposes.
