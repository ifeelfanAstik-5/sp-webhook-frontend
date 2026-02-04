import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import apiService from '../services/api';
import {
  PlusIcon,
  TrashIcon,
  EyeIcon,
  XCircleIcon,
  BeakerIcon,
} from '@heroicons/react/24/outline';
import type { WebhookSubscription } from '../types/webhook';

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [subscriptions, setSubscriptions] = useState<WebhookSubscription[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedSubscription, setSelectedSubscription] = useState<WebhookSubscription | null>(null);

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const fetchSubscriptions = async () => {
    try {
      const data = await apiService.getWebhookSubscriptions();
      setSubscriptions(data);
    } catch (error) {
      console.error('Failed to fetch subscriptions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateSubscription = async (subscriptionData: any) => {
    try {
      await apiService.createWebhookSubscription(
        subscriptionData.sourceUrl,
        subscriptionData.callbackUrl,
        subscriptionData.secret
      );
      setShowCreateModal(false);
      fetchSubscriptions();
    } catch (error) {
      console.error('Failed to create subscription:', error);
    }
  };

  const handleCancelSubscription = async (id: string) => {
    try {
      await apiService.cancelWebhookSubscription(id);
      fetchSubscriptions();
    } catch (error) {
      console.error('Failed to cancel subscription:', error);
    }
  };

  const handleDeleteSubscription = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this subscription?')) {
      try {
        await apiService.deleteWebhookSubscription(id);
        fetchSubscriptions();
      } catch (error) {
        console.error('Failed to delete subscription:', error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Spenza Webhook Dashboard</h1>
              <p className="mt-1 text-sm text-gray-600">Manage your webhook subscriptions</p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">Welcome, {user?.email}</span>
              <button
                onClick={logout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Logout
              </button>
            </div>
          </div>
          
          {/* Navigation */}
          <nav className="flex space-x-8">
            <Link
              to="/"
              className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                location.pathname === '/'
                  ? 'border-indigo-500 text-gray-900'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
              }`}
            >
              Dashboard
            </Link>
            <Link
              to="/tester"
              className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                location.pathname === '/tester'
                  ? 'border-indigo-500 text-gray-900'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
              }`}
            >
              <BeakerIcon className="h-4 w-4 mr-1" />
              Webhook Tester
            </Link>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-gray-900">Webhook Subscriptions</h2>
          <button
            onClick={() => setShowCreateModal(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            New Subscription
          </button>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading subscriptions...</p>
          </div>
        ) : subscriptions.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400">
              <PlusIcon className="h-12 w-12 mx-auto mb-4" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No webhook subscriptions</h3>
            <p className="text-gray-600 mb-4">Get started by creating your first webhook subscription.</p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              Create Subscription
            </button>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {subscriptions.map((subscription) => (
              <div key={subscription.id} className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-gray-900 truncate">
                      {subscription.sourceUrl}
                    </h3>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        subscription.isActive
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {subscription.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>

                  <div className="space-y-2 text-sm text-gray-600">
                    <div>
                      <span className="font-medium">Callback:</span>
                      <p className="truncate">{subscription.callbackUrl}</p>
                    </div>
                    <div>
                      <span className="font-medium">Events:</span>
                      <p>{subscription._count?.events || 0}</p>
                    </div>
                    <div>
                      <span className="font-medium">Created:</span>
                      <p>{new Date(subscription.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>

                  <div className="mt-4 flex space-x-2">
                    <button
                      onClick={() => setSelectedSubscription(subscription)}
                      className="flex-1 inline-flex justify-center items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    >
                      <EyeIcon className="h-4 w-4 mr-1" />
                      View
                    </button>
                    {subscription.isActive ? (
                      <button
                        onClick={() => handleCancelSubscription(subscription.id)}
                        className="flex-1 inline-flex justify-center items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                      >
                        <XCircleIcon className="h-4 w-4 mr-1" />
                        Cancel
                      </button>
                    ) : (
                      <button
                        onClick={() => handleDeleteSubscription(subscription.id)}
                        className="flex-1 inline-flex justify-center items-center px-3 py-2 border border-red-300 text-sm font-medium rounded-md text-red-700 bg-white hover:bg-red-50"
                      >
                        <TrashIcon className="h-4 w-4 mr-1" />
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {showCreateModal && (
        <CreateSubscriptionModal
          onClose={() => setShowCreateModal(false)}
          onSubmit={handleCreateSubscription}
        />
      )}

      {selectedSubscription && (
        <SubscriptionDetailsModal
          subscription={selectedSubscription}
          onClose={() => setSelectedSubscription(null)}
        />
      )}
    </div>
  );
};

interface CreateSubscriptionModalProps {
  onClose: () => void;
  onSubmit: (data: any) => void;
}

const CreateSubscriptionModal: React.FC<CreateSubscriptionModalProps> = ({ onClose, onSubmit }) => {
  const [sourceUrl, setSourceUrl] = useState('');
  const [callbackUrl, setCallbackUrl] = useState('');
  const [secret, setSecret] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await onSubmit({ sourceUrl, callbackUrl, secret });
    setIsLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Create Webhook Subscription</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Source URL</label>
            <input
              type="url"
              required
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="https://example.com/webhook"
              value={sourceUrl}
              onChange={(e) => setSourceUrl(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Callback URL</label>
            <input
              type="url"
              required
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="https://your-app.com/callback"
              value={callbackUrl}
              onChange={(e) => setCallbackUrl(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Secret (Optional)</label>
            <input
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Leave empty to auto-generate"
              value={secret}
              onChange={(e) => setSecret(e.target.value)}
            />
          </div>
          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50"
            >
              {isLoading ? 'Creating...' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

interface SubscriptionDetailsModalProps {
  subscription: WebhookSubscription;
  onClose: () => void;
}

const SubscriptionDetailsModal: React.FC<SubscriptionDetailsModalProps> = ({ subscription, onClose }) => {
  const [events, setEvents] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await apiService.getWebhookSubscription(subscription.id);
        setEvents(data.events || []);
      } catch (error) {
        console.error('Failed to fetch events:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, [subscription.id]);

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-10 mx-auto p-5 border w-11/12 max-w-4xl shadow-lg rounded-md bg-white">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-gray-900">Subscription Details</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            ×
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Subscription Info</h4>
            <div className="space-y-2 text-sm">
              <div><span className="font-medium">ID:</span> {subscription.id}</div>
              <div><span className="font-medium">Source:</span> {subscription.sourceUrl}</div>
              <div><span className="font-medium">Callback:</span> {subscription.callbackUrl}</div>
              <div><span className="font-medium">Status:</span> 
                <span className={`ml-2 px-2 py-1 rounded text-xs ${
                  subscription.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {subscription.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
              <div><span className="font-medium">Created:</span> {new Date(subscription.createdAt).toLocaleString()}</div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Recent Events</h4>
            {isLoading ? (
              <div className="text-center py-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
              </div>
            ) : events.length === 0 ? (
              <p className="text-gray-500 text-sm">No events yet</p>
            ) : (
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {events.map((event) => (
                  <div key={event.id} className="border rounded p-2 text-sm">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{event.eventType}</span>
                      <span className={`px-2 py-1 rounded text-xs ${
                        event.processed ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {event.processed ? 'Processed' : 'Pending'}
                      </span>
                    </div>
                    <div className="text-gray-500 text-xs">
                      {new Date(event.createdAt).toLocaleString()}
                    </div>
                    {event.processingError && (
                      <div className="text-red-600 text-xs mt-1">
                        Error: {event.processingError}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
