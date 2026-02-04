import React, { useState, useEffect } from 'react';
import apiService from '../services/api';
import {
  PlayIcon,
  StopIcon,
  ClipboardDocumentIcon,
  ServerIcon,
  BoltIcon,
} from '@heroicons/react/24/outline';

interface LocalTunnelStatus {
  isRunning: boolean;
  url?: string;
  error?: string;
}

interface WebhookTestResult {
  success: boolean;
  eventId: string;
  timestamp: string;
  response?: any;
  error?: string;
}

const WebhookTester: React.FC = () => {
  const [subscriptions, setSubscriptions] = useState<any[]>([]);
  const [selectedSubscription, setSelectedSubscription] = useState('');
  const [localTunnel, setLocalTunnel] = useState<LocalTunnelStatus>({ isRunning: false });
  const [testResults, setTestResults] = useState<WebhookTestResult[]>([]);
  const [isTesting, setIsTesting] = useState(false);
  const [eventType, setEventType] = useState('user.created');
  const [customPayload, setCustomPayload] = useState('');

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const fetchSubscriptions = async () => {
    try {
      const data = await apiService.getWebhookSubscriptions();
      setSubscriptions(data.filter((sub: any) => sub.isActive));
    } catch (error) {
      console.error('Failed to fetch subscriptions:', error);
    }
  };

  const startLocalTunnel = async () => {
    setLocalTunnel({ isRunning: true, error: undefined });
    
    try {
      // This would typically connect to a backend endpoint that starts localtunnel
      // For now, we'll simulate it
      const tunnelUrl = `https://random-subdomain.loca.lt`;
      setLocalTunnel({ isRunning: true, url: tunnelUrl });
    } catch (error) {
      setLocalTunnel({ isRunning: false, error: 'Failed to start localtunnel' });
    }
  };

  const stopLocalTunnel = () => {
    setLocalTunnel({ isRunning: false, url: undefined });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const sendTestWebhook = async () => {
    if (!selectedSubscription) {
      alert('Please select a subscription');
      return;
    }

    setIsTesting(true);
    
    try {
      const payload = customPayload ? JSON.parse(customPayload) : generateSamplePayload(eventType);
      
      const response = await fetch(`${import.meta.env.VITE_API_URL}/webhook-events/${selectedSubscription}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Event-Type': eventType,
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      
      const testResult: WebhookTestResult = {
        success: response.ok,
        eventId: result.eventId || 'unknown',
        timestamp: new Date().toISOString(),
        response: result,
        error: response.ok ? undefined : 'Failed to send webhook',
      };

      setTestResults(prev => [testResult, ...prev.slice(0, 9)]); // Keep last 10 results
    } catch (error: any) {
      const testResult: WebhookTestResult = {
        success: false,
        eventId: 'error',
        timestamp: new Date().toISOString(),
        error: error.message,
      };
      setTestResults(prev => [testResult, ...prev.slice(0, 9)]);
    } finally {
      setIsTesting(false);
    }
  };

  const generateSamplePayload = (type: string) => {
    const payloads: Record<string, any> = {
      'user.created': {
        user: {
          id: `test_${Date.now()}`,
          email: 'test@example.com',
          name: 'Test User',
          createdAt: new Date().toISOString(),
        },
      },
      'payment.completed': {
        payment: {
          id: `pay_${Date.now()}`,
          amount: 99.99,
          currency: 'USD',
          status: 'completed',
          userId: `user_${Date.now()}`,
        },
      },
      'order.shipped': {
        order: {
          id: `order_${Date.now()}`,
          items: [
            { name: 'Product A', quantity: 2, price: 29.99 },
            { name: 'Product B', quantity: 1, price: 49.99 },
          ],
          trackingNumber: `TRACK${Date.now().toString(36).toUpperCase()}`,
        },
      },
    };

    return payloads[type] || { message: 'Test payload', timestamp: new Date().toISOString() };
  };

  const getWebhookUrl = () => {
    const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
    return `${baseUrl}/webhook-events/${selectedSubscription}`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-6">Webhook Testing Tools</h3>
          
          {/* LocalTunnel Section */}
          <div className="mb-8 p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <ServerIcon className="h-5 w-5 text-gray-400 mr-2" />
                <h4 className="text-md font-medium text-gray-900">LocalTunnel</h4>
              </div>
              {!localTunnel.isRunning ? (
                <button
                  onClick={startLocalTunnel}
                  className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <PlayIcon className="h-4 w-4 mr-1" />
                  Start Tunnel
                </button>
              ) : (
                <button
                  onClick={stopLocalTunnel}
                  className="inline-flex items-center px-3 py-2 border border-red-300 text-sm leading-4 font-medium rounded-md text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  <StopIcon className="h-4 w-4 mr-1" />
                  Stop Tunnel
                </button>
              )}
            </div>
            
            {localTunnel.error && (
              <div className="text-red-600 text-sm mb-2">{localTunnel.error}</div>
            )}
            
            {localTunnel.url && (
              <div className="bg-gray-50 p-3 rounded">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Public URL:</span>
                  <button
                    onClick={() => copyToClipboard(localTunnel.url!)}
                    className="inline-flex items-center text-sm text-indigo-600 hover:text-indigo-800"
                  >
                    <ClipboardDocumentIcon className="h-4 w-4 mr-1" />
                    Copy
                  </button>
                </div>
                <code className="text-xs text-gray-800 break-all">{localTunnel.url}</code>
              </div>
            )}
            
            <div className="mt-2 text-xs text-gray-500">
              Use this URL to test webhooks from external services like Clerk, Stripe, etc.
            </div>
          </div>

          {/* Webhook Testing Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Test Configuration */}
            <div>
              <h4 className="text-md font-medium text-gray-900 mb-4">Test Configuration</h4>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Select Subscription
                  </label>
                  <select
                    value={selectedSubscription}
                    onChange={(e) => setSelectedSubscription(e.target.value)}
                    className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="">Choose a subscription...</option>
                    {subscriptions.map((sub) => (
                      <option key={sub.id} value={sub.id}>
                        {sub.sourceUrl} ({sub.callbackUrl})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Event Type
                  </label>
                  <select
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value)}
                    className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="user.created">User Created</option>
                    <option value="payment.completed">Payment Completed</option>
                    <option value="order.shipped">Order Shipped</option>
                    <option value="subscription.renewed">Subscription Renewed</option>
                    <option value="custom">Custom Payload</option>
                  </select>
                </div>

                {eventType === 'custom' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Custom Payload (JSON)
                    </label>
                    <textarea
                      value={customPayload}
                      onChange={(e) => setCustomPayload(e.target.value)}
                      rows={4}
                      className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 font-mono text-sm"
                      placeholder='{"key": "value"}'
                    />
                  </div>
                )}

                {selectedSubscription && (
                  <div className="bg-gray-50 p-3 rounded">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">Webhook URL:</span>
                      <button
                        onClick={() => copyToClipboard(getWebhookUrl())}
                        className="inline-flex items-center text-sm text-indigo-600 hover:text-indigo-800"
                      >
                        <ClipboardDocumentIcon className="h-4 w-4 mr-1" />
                        Copy
                      </button>
                    </div>
                    <code className="text-xs text-gray-800 break-all">{getWebhookUrl()}</code>
                  </div>
                )}

                <button
                  onClick={sendTestWebhook}
                  disabled={isTesting || !selectedSubscription}
                  className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <BoltIcon className="h-4 w-4 mr-2" />
                  {isTesting ? 'Sending...' : 'Send Test Webhook'}
                </button>
              </div>
            </div>

            {/* Test Results */}
            <div>
              <h4 className="text-md font-medium text-gray-900 mb-4">Recent Test Results</h4>
              
              {testResults.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <BoltIcon className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                  <p>No test results yet</p>
                </div>
              ) : (
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {testResults.map((result, index) => (
                    <div
                      key={`${result.eventId}-${index}`}
                      className={`p-3 rounded border ${
                        result.success ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">
                          {result.success ? '✅ Success' : '❌ Failed'}
                        </span>
                        <span className="text-xs text-gray-500">
                          {new Date(result.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                      <div className="text-xs text-gray-600 mt-1">
                        Event ID: {result.eventId}
                      </div>
                      {result.error && (
                        <div className="text-xs text-red-600 mt-1">
                          Error: {result.error}
                        </div>
                      )}
                      {result.response && (
                        <details className="mt-2">
                          <summary className="text-xs text-gray-600 cursor-pointer">Response</summary>
                          <pre className="text-xs text-gray-800 mt-1 whitespace-pre-wrap">
                            {JSON.stringify(result.response, null, 2)}
                          </pre>
                        </details>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* External Services Integration */}
          <div className="mt-8 p-4 border border-gray-200 rounded-lg">
            <h4 className="text-md font-medium text-gray-900 mb-3">External Services Integration</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="bg-gray-50 p-3 rounded">
                <h5 className="font-medium text-gray-900 mb-2">Clerk Webhooks</h5>
                <p className="text-gray-600 mb-2">Configure Clerk to send webhooks to your LocalTunnel URL:</p>
                <ol className="list-decimal list-inside text-gray-600 text-xs space-y-1">
                  <li>Start LocalTunnel above</li>
                  <li>Copy the public URL</li>
                  <li>Add webhook endpoint: `{localTunnel.url || 'https://your-tunnel.loca.lt'}/webhook-events/[subscription-id]`</li>
                  <li>Configure events in Clerk dashboard</li>
                </ol>
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <h5 className="font-medium text-gray-900 mb-2">Other Services</h5>
                <p className="text-gray-600 mb-2">Similar setup for:</p>
                <ul className="list-disc list-inside text-gray-600 text-xs space-y-1">
                  <li>Stripe (payment events)</li>
                  <li>GitHub (repository events)</li>
                  <li>Shopify (order events)</li>
                  <li>Any service supporting webhooks</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebhookTester;
