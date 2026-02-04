# Spenza Webhook Frontend

A React-based frontend for the Spenza webhook management system with built-in testing tools and external webhook integration support.

## Features

- **JWT Authentication**: Secure user login and registration
- **Webhook Management**: Create, view, cancel, and delete webhook subscriptions
- **Real-time Dashboard**: Monitor webhook events and subscription status
- **Webhook Tester**: Built-in tools for testing webhook functionality
- **External Integration**: Support for LocalTunnel and external services like Clerk
- **Modern UI**: Clean, responsive interface built with Tailwind CSS

## Tech Stack

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v3.4 (stable)
- **Routing**: React Router
- **HTTP Client**: Axios
- **UI Components**: Headless UI + Heroicons
- **Authentication**: JWT-based auth with context API

## Quick Start

### Prerequisites

- Node.js 20+
- Backend API running (see backend README)

### Installation

1. Navigate to the frontend directory:
```bash
cd packages/frontend
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

# LocalTunnel Configuration (optional)
VITE_LOCALTUNNEL_SUBDOMAIN=spenza-webhook
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

### Build for Production
```bash
npm run build
```

### Environment Setup
1. Set `VITE_API_URL` to production backend URL
2. Configure HTTPS if required
3. Set up proper CORS on backend

### Hosting Options
- Vercel (recommended)
- Netlify
- AWS S3 + CloudFront
- Any static hosting service

## Troubleshooting

### Common Issues

**API Connection Errors:**
- Verify backend is running
- Check `VITE_API_URL` configuration
- Ensure CORS is configured on backend

**Authentication Issues:**
- Clear browser localStorage
- Verify JWT secret matches backend
- Check token expiration

**LocalTunnel Issues:**
- Ensure port 3000 is available
- Check firewall settings
- Try different subdomain

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the ISC License.
