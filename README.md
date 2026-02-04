# Spenza Webhook Frontend

A React-based frontend for the Spenza webhook management system with built-in testing tools and external webhook integration support.

## 🚀 Live Demo

**Production URL:** https://sp-webhook-frontend.vercel.app

**Backend API:** https://sp-webhook-backend-production.up.railway.app

## Features

- **JWT Authentication**: Secure user login and registration
- **Webhook Management**: Create, view, cancel, and delete webhook subscriptions
- **Real-time Dashboard**: Monitor webhook events and subscription status
- **Webhook Tester**: Built-in tools for testing webhook functionality
- **External Integration**: Support for LocalTunnel and external services like Clerk
- **Modern UI**: Clean, responsive interface built with Tailwind CSS
- **Production Ready**: Deployed on Vercel with Railway backend

## Tech Stack

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v3.4 (stable)
- **Routing**: React Router
- **HTTP Client**: Axios
- **UI Components**: Headless UI + Heroicons
- **Authentication**: JWT-based auth with context API
- **Deployment**: Vercel (Frontend), Railway (Backend)

## Quick Start

### Prerequisites

- Node.js 20+
- Backend API running (see backend README)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd sp-webhook-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Environment Variables

```env
# API Configuration
VITE_API_URL=http://localhost:3000

# Production (Vercel)
VITE_API_URL=https://sp-webhook-backend-production.up.railway.app

# LocalTunnel Configuration (optional)
VITE_LOCALTUNNEL_SUBDOMAIN=spenza-webhook

# Environment
NODE_ENV=production
```

## Application Structure

### Pages & Components

- **Login** (`/login`): User authentication
- **Dashboard** (`/`): Main webhook management interface
- **Webhook Tester** (`/tester`): Testing tools and external integration

### Key Features

#### Dashboard
- View all webhook subscriptions
- Create new subscriptions
- Monitor event counts and status
- View detailed subscription information
- Cancel/delete subscriptions

#### Webhook Tester
- Send test webhook events
- Configure LocalTunnel for external testing
- Integration guides for external services
- Real-time test results
- Custom payload support

#### External Service Integration

**LocalTunnel Setup:**
1. Start LocalTunnel from the Webhook Tester page
2. Copy the public URL
3. Use it to test webhooks from external services

**Clerk Integration:**
1. Configure Clerk webhooks to point to your LocalTunnel URL
2. Use endpoint: `https://your-tunnel.loca.lt/webhook-events/[subscription-id]`
3. Select desired events in Clerk dashboard

**Other Services:**
- Stripe: Payment events
- GitHub: Repository events  
- Shopify: Order events
- Any webhook-compatible service

## API Integration

The frontend communicates with the backend API using the following endpoints:

### Authentication
- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `GET /auth/profile` - Get user profile

### Webhooks
- `GET /webhooks` - List subscriptions
- `POST /webhooks/subscribe` - Create subscription
- `GET /webhooks/:id` - Get subscription details
- `POST /webhooks/:id/cancel` - Cancel subscription
- `DELETE /webhooks/:id` - Delete subscription

### Events
- `POST /webhook-events/:subscriptionId` - Handle webhook events

## Development

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

### Component Structure

```
src/
├── components/
│   ├── Login.tsx              # Authentication component
│   ├── Dashboard.tsx          # Main dashboard
│   └── WebhookTester.tsx     # Testing tools
├── contexts/
│   └── AuthContext.tsx       # Authentication context
├── services/
│   └── api.ts                # API service layer
├── types/
│   └── webhook.ts            # TypeScript types
└── App.tsx                   # Main application
```

## Testing Webhooks

### Manual Testing
1. Create a webhook subscription in the Dashboard
2. Navigate to the Webhook Tester
3. Select the subscription and send test events
4. Monitor results in real-time

### External Service Testing
1. Start LocalTunnel from the Webhook Tester
2. Copy the public URL
3. Configure external service (Clerk, Stripe, etc.)
4. Use format: `{tunnel-url}/webhook-events/{subscription-id}`
5. Trigger events from the external service
6. Monitor in Dashboard

## Security Features

- JWT token-based authentication
- Automatic token refresh
- Secure API communication
- Input validation and sanitization
- Protected routes

## Deployment

### 🚀 Production Deployment

The application is already deployed and live:
- **Frontend:** https://sp-webhook-frontend.vercel.app
- **Backend:** https://sp-webhook-backend-production.up.railway.app

### Build for Production
```bash
npm run build
```

### Deployment Scripts

#### Quick Deploy (Recommended)
```bash
# Uses the automated deployment script
./deploy.sh
```

#### Manual Vercel Deployment
```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy to production
vercel --prod
```

### Environment Setup

#### Development
```env
VITE_API_URL=http://localhost:3000
```

#### Production (Vercel)
The production environment variable is configured in `vercel.json`:
```json
{
  "env": {
    "VITE_API_URL": "https://sp-webhook-backend-production.up.railway.app"
  }
}
```

### Hosting Configuration

#### Vercel Configuration
- **Framework:** Vite
- **Build Command:** `./vercel-build.sh`
- **Output Directory:** `dist`
- **Node.js Version:** 20.x

#### Railway Backend
- **URL:** https://sp-webhook-backend-production.up.railway.app
- **Environment:** Production
- **Database:** PostgreSQL (if applicable)

### Hosting Options
- **Vercel** (recommended) - ✅ Currently used
- Netlify
- AWS S3 + CloudFront
- Any static hosting service

## Troubleshooting

### Common Issues

**API Connection Errors:**
- Verify backend is running at `https://sp-webhook-backend-production.up.railway.app`
- Check `VITE_API_URL` configuration in environment variables
- Ensure CORS is configured on backend
- Check network connectivity and firewall settings

**Authentication Issues:**
- Clear browser localStorage
- Verify JWT secret matches backend
- Check token expiration
- Ensure backend authentication endpoints are accessible

**LocalTunnel Issues:**
- Ensure port 3000 is available
- Check firewall settings
- Try different subdomain
- Verify LocalTunnel service status

**Deployment Issues:**
- Ensure Vercel CLI is authenticated: `vercel login`
- Check `vercel.json` configuration
- Verify environment variables in Vercel dashboard
- Check build logs for errors

**Build Errors:**
- Run `npm install` to update dependencies
- Check Node.js version (requires 20+)
- Verify TypeScript configuration
- Check for missing imports or syntax errors

### Getting Help

1. **Check the logs:** Run `npm run dev` and check console for errors
2. **Verify backend status:** Ensure Railway backend is running
3. **Test API endpoints:** Use curl or Postman to test backend connectivity
4. **Check Vercel deployment:** Visit Vercel dashboard for deployment logs

## Project Status

- ✅ **Frontend:** Deployed on Vercel
- ✅ **Backend:** Deployed on Railway  
- ✅ **Authentication:** JWT-based auth working
- ✅ **Webhook Management:** Full CRUD operations
- ✅ **Testing Tools:** Built-in webhook tester
- ✅ **Documentation:** Complete README and user guides

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Add tests if applicable
5. Commit your changes: `git commit -m 'Add amazing feature'`
6. Push to the branch: `git push origin feature/amazing-feature`
7. Submit a pull request

## License

This project is licensed under the ISC License.

---

**📞 Support:** For issues with the deployed application, check the troubleshooting section or create an issue in the repository.
