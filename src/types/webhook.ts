export interface WebhookSubscription {
  id: string;
  sourceUrl: string;
  callbackUrl: string;
  secret?: string;
  isActive: boolean;
  userId: string;
  createdAt: string;
  updatedAt: string;
  user?: {
    id: string;
    email: string;
  };
  _count?: {
    events: number;
  };
}

export interface WebhookEvent {
  id: string;
  subscriptionId: string;
  eventType: string;
  payload: any;
  headers?: any;
  processed: boolean;
  processingError?: string;
  retryCount: number;
  createdAt: string;
  processedAt?: string;
}
