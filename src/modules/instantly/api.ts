import axios, { AxiosInstance } from 'axios';
import { InstantlyCampaignSchema, InstantlyAccountSchema } from '../../types/schemas';

export class InstantlyAPI {
  private client: AxiosInstance;
  private baseURL = 'https://api.instantly.ai/api/v1';

  constructor(apiKey?: string) {
    this.client = axios.create({
      baseURL: this.baseURL,
      headers: {
        'Authorization': `Bearer ${apiKey || process.env.INSTANTLY_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });
  }

  // Account Management
  async getAccounts() {
    const response = await this.client.get('/account/accounts');
    return response.data;
  }

  async addAccount(data: any) {
    const response = await this.client.post('/account/accounts', data);
    return response.data;
  }

  async deleteAccount(email: string) {
    await this.client.delete(`/account/accounts/${email}`);
  }

  async warmupAccount(email: string, status: 'start' | 'stop') {
    const response = await this.client.patch(`/account/accounts/${email}/warmup`, { status });
    return response.data;
  }

  // Campaign Management
  async getCampaigns() {
    const response = await this.client.get('/campaign/list');
    return response.data;
  }

  async createCampaign(data: any) {
    const response = await this.client.post('/campaign/create', data);
    return InstantlyCampaignSchema.parse(response.data);
  }

  async getCampaign(id: string) {
    const response = await this.client.get(`/campaign/get/${id}`);
    return response.data;
  }

  async launchCampaign(id: string) {
    const response = await this.client.post(`/campaign/launch/${id}`);
    return response.data;
  }

  async pauseCampaign(id: string) {
    const response = await this.client.post(`/campaign/pause/${id}`);
    return response.data;
  }

  // Lead Management
  async addLeadsToCampaign(campaignId: string, leads: any[]) {
    const response = await this.client.post(`/campaign/add_leads/${campaignId}`, { leads });
    return response.data;
  }

  async getCampaignLeads(campaignId: string) {
    const response = await this.client.get(`/campaign/leads/${campaignId}`);
    return response.data;
  }

  async verifyLeads(campaignId: string) {
    const response = await this.client.post(`/leads/verify/${campaignId}`);
    return response.data;
  }

  // Analytics
  async getCampaignAnalytics(campaignId: string, period?: string) {
    const params = period ? { period } : {};
    const response = await this.client.get(`/analytics/campaign/${campaignId}`, { params });
    return response.data;
  }

  async getAccountAnalytics() {
    const response = await this.client.get('/analytics/account');
    return response.data;
  }

  // Templates
  async getTemplates() {
    const response = await this.client.get('/templates');
    return response.data;
  }

  async createTemplate(data: any) {
    const response = await this.client.post('/templates', data);
    return response.data;
  }

  // Unibox (Inbox Management)
  async getUniboxMessages(params?: any) {
    const response = await this.client.get('/unibox/messages', { params });
    return response.data;
  }

  async replyToMessage(messageId: string, text: string) {
    const response = await this.client.post(`/unibox/reply/${messageId}`, { text });
    return response.data;
  }
} 