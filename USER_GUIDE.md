# Spenza Webhook System - Complete User Guide

## 🎯 Overview

Spenza Webhook System is a comprehensive platform for managing webhook subscriptions, handling incoming webhook events, and testing webhook integrations. This guide will walk you through every feature and workflow.

## 🚀 Quick Start

1. **Start Backend**: `cd packages/backend && npm run start:dev`
2. **Start Frontend**: `cd packages/frontend && npm run dev`
3. **Open Browser**: Navigate to `http://localhost:5173`
4. **Create Account**: Sign up with email and password
5. **Start Using**: Begin creating webhook subscriptions

---

## 🔐 Authentication System

### **What It Does**
- Secure user registration and login
- JWT token-based authentication
- Session management with automatic token refresh

### **How to Use**

#### **Step 1: Registration**
1. Navigate to `http://localhost:5173`
2. Click **"create a new account"** link
3. Enter your email and password (minimum 6 characters)
4. Click **"Create Account"**
5. **Result**: Account created and automatically logged in

#### **Step 2: Login**
1. If you're already on the login page, enter your credentials
2. Enter email and password
3. Click **"Sign In"**
4. **Result**: Redirected to dashboard

#### **Step 3: Profile Access**
- Your profile is automatically loaded when you log in
- View your user ID, email, and account creation date
- Logout button available in top-right corner

---

## 🎛️ Dashboard - Webhook Management Hub

### **What It Does**
The dashboard is your main control center for managing all webhook subscriptions and monitoring their activity.

### **Navigation**
- **Dashboard Tab**: Main webhook management
- **Webhook Tester Tab**: Testing and external integration tools

### **Dashboard Features**

#### **1. Creating Webhook Subscriptions**
**Purpose**: Set up new webhook endpoints to receive events from external services.

**How to Use**:
1. Click **"New Subscription"** button (top-right)
2. Fill in the form:
   - **Source URL**: Where webhooks come from (e.g., `https://stripe.com`)
   - **Callback URL**: Where to forward events (e.g., `https://yourapp.com/webhooks`)
   - **Secret** (Optional): Security key for webhook verification
3. Click **"Create"**
4. **Result**: New subscription appears in your list with auto-generated secret

#### **2. Viewing Subscription List**
**Purpose**: See all your webhook subscriptions at a glance.

**What You See**:
- **Source URL**: Where webhooks originate
- **Callback URL**: Where events are forwarded
- **Status**: Active (green) or Inactive (red)
- **Event Count**: Number of events received
- **Creation Date**: When subscription was created

#### **3. Subscription Details**
**Purpose**: Deep dive into a specific webhook subscription.

**How to Access**:
1. Click **"View"** button on any subscription card
2. **Modal opens** showing:
   - Full subscription details
   - Recent events (last 10)
   - Event processing status
   - Error messages (if any)

#### **4. Managing Subscriptions**

**Cancel Subscription**:
- Click **"Cancel"** on active subscription
- **Result**: Subscription becomes inactive, stops receiving events
- **Use Case**: Temporarily pause webhook processing

**Delete Subscription**:
- Click **"Delete"** on inactive subscription
- **Result**: Permanently removes subscription and all events
- **Use Case**: Clean up unused webhooks

---

## 🧪 Webhook Tester - Testing & Integration Hub

### **What It Does**
The Webhook Tester is a powerful tool for testing webhook functionality and integrating with external services like Clerk, Stripe, GitHub, etc.

### **How to Access**
1. Click **"Webhook Tester"** tab in navigation
2. Or navigate directly to `http://localhost:5173/tester`

### **Testing Features**

#### **1. Manual Webhook Testing**
**Purpose**: Test webhook endpoints with sample data.

**How to Use**:
1. **Select Subscription**: Choose from dropdown of your active subscriptions
2. **Choose Event Type**:
   - `user.created`: New user registration
   - `payment.completed`: Successful payment
   - `order.shipped`: Order shipped notification
   - `subscription.renewed`: Subscription renewal
   - `custom`: Your own JSON payload
3. **Send Test**: Click **"Send Test Webhook"**
4. **View Results**: Real-time success/failure status in results panel

#### **2. Custom Payload Testing**
**Purpose**: Test with your own webhook data format.

**How to Use**:
1. Select **"custom"** from event type dropdown
2. **Enter JSON payload** in the text area:
   ```json
   {
     "customField": "customValue",
     "timestamp": "2026-02-03T14:30:00Z",
     "data": {
       "key1": "value1",
       "key2": "value2"
     }
   }
   ```
3. Click **"Send Test Webhook"**

#### **3. Webhook URL Management**
**Purpose**: Get the exact webhook URL for external service configuration.

**How to Use**:
1. Select a subscription
2. **Copy URL**: Click the clipboard icon next to webhook URL
3. **Format**: `http://localhost:3000/webhook-events/[subscription-id]`
4. **Use**: Paste this URL in external service webhook settings

#### **4. Test Results History**
**Purpose**: Track your webhook testing activity.

**What You See**:
- **Success**: Green indicator with event ID
- **Failure**: Red indicator with error message
- **Timestamp**: When test was sent
- **Response Details**: Full API response data

---

## 🌐 External Service Integration

### **What It Does**
Connect external services (Clerk, Stripe, GitHub, etc.) to your webhook system for real-world testing.

### **LocalTunnel Integration**
**Purpose**: Expose your local backend to the internet for external webhook testing.

**How to Use**:
1. **Start LocalTunnel**: Click **"Start Tunnel"** button
2. **Copy Public URL**: Click clipboard icon to copy the public URL
3. **Configure External Service**: Use this URL in webhook settings:
   ```
   https://your-tunnel.loca.lt/webhook-events/[subscription-id]
   ```
4. **Stop Tunnel**: Click **"Stop Tunnel"** when done testing

### **Clerk Integration Example**
**Purpose**: Test user authentication events from Clerk.

**Setup Steps**:
1. **Start LocalTunnel** in Webhook Tester
2. **Copy Public URL**: `https://random.loca.lt`
3. **Configure Clerk**:
   - Go to Clerk Dashboard → Webhooks
   - Add webhook URL: `https://random.loca.lt/webhook-events/[subscription-id]`
   - Select events: `user.created`, `user.updated`, `user.deleted`
4. **Test**: Trigger events in Clerk (create/update users)
5. **Monitor**: Watch events appear in your dashboard

### **Other Services Supported**
- **Stripe**: Payment events (`payment.succeeded`, `payment.failed`)
- **GitHub**: Repository events (`push`, `issues`, `pull_request`)
- **Shopify**: Order events (`orders/create`, `orders/updated`)
- **Custom**: Any service supporting webhooks

---

## 📊 Event Monitoring & Management

### **What It Does**
Track all incoming webhook events, their processing status, and handle failures.

### **Event Lifecycle**

#### **1. Event Reception**
- **Incoming**: Webhook received from external service
- **Validation**: Headers and payload validated
- **Storage**: Event stored in database with metadata

#### **2. Event Processing**
- **Forwarding**: Event sent to your callback URL
- **Success**: Marked as processed with timestamp
- **Failure**: Error logged and retry scheduled

#### **3. Retry Mechanism**
- **Automatic**: Failed events retried every minute
- **Max Attempts**: 3 retries per event
- **Final Status**: Marked as failed after max attempts

### **Event Status Indicators**
- **✅ Processed**: Successfully forwarded to callback
- **⏳ Pending**: Awaiting processing or retry
- **❌ Failed**: Max retries exceeded, manual intervention needed

---

## 🔧 Advanced Features

### **1. Webhook Security**
- **Secret Keys**: Optional secret for webhook signature verification
- **JWT Authentication**: Secure API access with token-based auth
- **CORS Protection**: Proper cross-origin request handling

### **2. Event Filtering**
- **Type-Based**: Filter events by type (user, payment, order, etc.)
- **Source-Based**: Filter by webhook source URL
- **Custom Headers**: Process events based on custom headers

### **3. Real-Time Updates**
- **Live Event Feed**: See events as they arrive
- **Status Changes**: Real-time status updates
- **Dashboard Refresh**: Auto-update subscription counts

---

## 📋 Complete Workflow Example

### **Scenario: Setting Up Stripe Payment Webhooks**

#### **Step 1: Create Account**
1. Go to `http://localhost:5173`
2. Click "create a new account"
3. Enter email and password
4. Click "Create Account"

#### **Step 2: Create Webhook Subscription**
1. On dashboard, click "New Subscription"
2. Fill in:
   - Source URL: `https://stripe.com`
   - Callback URL: `https://yourapp.com/stripe-webhooks`
   - Secret: `stripe_webhook_secret_123`
3. Click "Create"

#### **Step 3: Test with Simulator**
1. Go to "Webhook Tester" tab
2. Select your new subscription
3. Choose "payment.completed" event type
4. Click "Send Test Webhook"
5. Verify success in results panel

#### **Step 4: Set Up External Integration**
1. Start LocalTunnel in Webhook Tester
2. Copy public URL: `https://abc123.loca.lt`
3. In Stripe Dashboard → Webhooks:
   - Add endpoint: `https://abc123.loca.lt/webhook-events/[subscription-id]`
   - Select events: `payment_intent.succeeded`, `charge.succeeded`
4. Test with real Stripe payments

#### **Step 5: Monitor Events**
1. Go back to dashboard
2. Click "View" on your subscription
3. Watch events appear in real-time
4. Check processing status and any errors

---

## 🛠️ Troubleshooting Common Issues

### **Login Not Working**
- **Check**: Backend is running on port 3000
- **Check**: Browser console for JavaScript errors
- **Solution**: Refresh page and try again

### **Webhook Events Not Received**
- **Check**: Subscription is active (green status)
- **Check**: Callback URL is accessible
- **Check**: External service webhook configuration

### **External Service Can't Reach Your Webhook**
- **Solution**: Use LocalTunnel to expose local backend
- **Check**: Firewall settings
- **Verify**: Webhook URL format is correct

### **Events Not Processing**
- **Check**: Callback URL is responding correctly
- **Check**: Event payload format matches expectations
- **Monitor**: Retry mechanism status in backend logs

---

## 🎯 Best Practices

### **Security**
- Use strong, unique secrets for each webhook
- Regularly rotate webhook secrets
- Validate incoming webhook signatures
- Use HTTPS for production callback URLs

### **Performance**
- Keep callback URLs lightweight and fast
- Implement proper error handling
- Monitor webhook event volumes
- Use appropriate retry intervals

### **Reliability**
- Test webhook endpoints thoroughly
- Implement proper logging and monitoring
- Have fallback mechanisms for critical events
- Regular backup of webhook configurations

---

## 📚 Next Steps

1. **Explore**: Try different event types and payloads
2. **Integrate**: Set up real external service webhooks
3. **Monitor**: Watch event processing and retry behavior
4. **Scale**: Add more subscriptions and test volume handling
5. **Customize**: Implement custom event processing logic

---

*This guide covers all features and workflows. For technical setup instructions, see the README files in the packages/backend and packages/frontend directories.*
