import axios from 'axios';
import type { AxiosInstance, AxiosResponse } from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Add request interceptor to include auth token
    this.api.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Add response interceptor to handle auth errors
    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          localStorage.removeItem('token');
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }

  // Auth endpoints
  async register(email: string, password: string) {
    const response: AxiosResponse = await this.api.post('/auth/register', {
      email,
      password,
    });
    return response.data;
  }

  async login(email: string, password: string) {
    const response: AxiosResponse = await this.api.post('/auth/login', {
      email,
      password,
    });
    return response.data;
  }

  async getProfile() {
    const response: AxiosResponse = await this.api.get('/auth/profile');
    return response.data;
  }

  // Webhook endpoints
  async createWebhookSubscription(sourceUrl: string, callbackUrl: string, secret?: string) {
    const response: AxiosResponse = await this.api.post('/webhooks/subscribe', {
      sourceUrl,
      callbackUrl,
      secret,
    });
    return response.data;
  }

  async getWebhookSubscriptions() {
    const response: AxiosResponse = await this.api.get('/webhooks');
    return response.data;
  }

  async getWebhookSubscription(id: string) {
    const response: AxiosResponse = await this.api.get(`/webhooks/${id}`);
    return response.data;
  }

  async cancelWebhookSubscription(id: string) {
    const response: AxiosResponse = await this.api.post(`/webhooks/${id}/cancel`);
    return response.data;
  }

  async deleteWebhookSubscription(id: string) {
    const response: AxiosResponse = await this.api.delete(`/webhooks/${id}`);
    return response.data;
  }

  // Utility methods
  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  removeToken() {
    localStorage.removeItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isAuthenticated() {
    return !!this.getToken();
  }
}

export const apiService = new ApiService();
export default apiService;
