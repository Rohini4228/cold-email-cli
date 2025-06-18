import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { config } from '../config/config';
import {
  Campaign,
  CampaignCreateRequest,
  CampaignScheduleRequest,
  CampaignSettingsRequest,
  CampaignAnalytics,
  CampaignStatistics,
  EmailAccount,
  LeadListResponse,
  AddLeadsRequest,
  AddLeadsResponse,
  WarmupStats,
  MessageHistory,
  LeadCategory,
  Webhook,
  Client,
  ApiResponse
} from '../types/smartlead';

export class SmartLeadAPIError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public errorCode?: string,
    public response?: any
  ) {
    super(message);
    this.name = 'SmartLeadAPIError';
  }
}

export class SmartLeadClient {
  private client: AxiosInstance;
  private requestCount = 0;
  private lastRequestTime = 0;

  constructor() {
    this.validateConfig();
    this.createAxiosInstance();
  }

  private validateConfig(): void {
    if (!config.hasValidApiKey()) {
      throw new SmartLeadAPIError(
        'No valid API key found. Run: smartlead config set --api-key=your-key',
        401,
        'MISSING_API_KEY'
      );
    }
  }

  private createAxiosInstance(): void {
    this.client = axios.create({
      baseURL: config.getBaseUrl(),
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'User-Agent': 'SmartLead-CLI/1.0.0'
      }
    });

    // Request interceptor for API key and rate limiting
    this.client.interceptors.request.use(
      async (config) => {
        await this.handleRateLimit();
        
        // Add API key to all requests
        const apiKey = this.getApiKey();
        if (config.params) {
          config.params.api_key = apiKey;
        } else {
          config.params = { api_key: apiKey };
        }

        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor for error handling
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response) {
          const { status, data } = error.response;
          const message = data?.message || data?.error || error.message;
          const errorCode = data?.errorCode;
          
          config.log('error', 'API Error', {
            status,
            message,
            errorCode,
            url: error.config?.url
          });

          throw new SmartLeadAPIError(
            `API Error: ${status} - ${message}`,
            status,
            errorCode,
            data
          );
        } else if (error.request) {
          config.log('error', 'Network Error', { message: error.message });
          throw new SmartLeadAPIError(
            'Network error: Unable to reach SmartLead API',
            0,
            'NETWORK_ERROR'
          );
        } else {
          config.log('error', 'Request Error', { message: error.message });
          throw new SmartLeadAPIError(
            `Request error: ${error.message}`,
            0,
            'REQUEST_ERROR'
          );
        }
      }
    );
  }

  private getApiKey(): string {
    const apiKey = config.getApiKey();
    if (!apiKey) {
      throw new SmartLeadAPIError('API key not configured', 401, 'MISSING_API_KEY');
    }
    return apiKey;
  }

  // Rate limiting: 10 requests per 2 seconds
  private async handleRateLimit(): Promise<void> {
    const now = Date.now();
    const timeSinceLastRequest = now - this.lastRequestTime;

    if (this.requestCount >= 10 && timeSinceLastRequest < 2000) {
      const delay = 2000 - timeSinceLastRequest;
      await new Promise(resolve => setTimeout(resolve, delay));
      this.requestCount = 0;
    }

    if (timeSinceLastRequest >= 2000) {
      this.requestCount = 0;
    }

    this.requestCount++;
    this.lastRequestTime = now;
  }

  // Generic request method
  private async request<T = any>(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    endpoint: string,
    data?: any,
    params?: any
  ): Promise<T> {
    try {
      const requestConfig: AxiosRequestConfig = {
        method,
        url: endpoint,
        data,
        params
      };

      const response: AxiosResponse<T> = await this.client.request(requestConfig);
      
      config.log('info', 'API Request Success', {
        method,
        endpoint,
        status: response.status
      });

      return response.data;
    } catch (error) {
      if (error instanceof SmartLeadAPIError) {
        throw error;
      }
      throw new SmartLeadAPIError(
        `Unexpected error: ${error instanceof Error ? error.message : 'Unknown error'}`,
        0,
        'UNEXPECTED_ERROR'
      );
    }
  }

  // Campaign Methods
  async getCampaigns(): Promise<Campaign[]> {
    return this.request<Campaign[]>('GET', '/campaigns');
  }

  async getCampaign(campaignId: number): Promise<Campaign> {
    return this.request<Campaign>('GET', `/campaigns/${campaignId}`);
  }

  async createCampaign(data: CampaignCreateRequest): Promise<Campaign> {
    return this.request<Campaign>('POST', '/campaigns/create', data);
  }

  async updateCampaignSchedule(campaignId: number, data: CampaignScheduleRequest): Promise<ApiResponse> {
    return this.request<ApiResponse>('POST', `/campaigns/${campaignId}/schedule`, data);
  }

  async updateCampaignSettings(campaignId: number, data: CampaignSettingsRequest): Promise<ApiResponse> {
    return this.request<ApiResponse>('POST', `/campaigns/${campaignId}/settings`, data);
  }

  async updateCampaignStatus(campaignId: number, status: 'START' | 'PAUSED' | 'STOPPED'): Promise<ApiResponse> {
    return this.request<ApiResponse>('POST', `/campaigns/${campaignId}/status`, { status });
  }

  async deleteCampaign(campaignId: number): Promise<ApiResponse> {
    return this.request<ApiResponse>('DELETE', `/campaigns/${campaignId}`);
  }

  async getCampaignAnalytics(campaignId: number): Promise<CampaignAnalytics> {
    return this.request<CampaignAnalytics>('GET', `/campaigns/${campaignId}/analytics`);
  }

  async getCampaignAnalyticsByDate(
    campaignId: number, 
    startDate: string, 
    endDate: string
  ): Promise<CampaignAnalytics> {
    return this.request<CampaignAnalytics>(
      'GET', 
      `/campaigns/${campaignId}/analytics-by-date`,
      null,
      { start_date: startDate, end_date: endDate }
    );
  }

  async getCampaignStatistics(
    campaignId: number,
    offset: number = 0,
    limit: number = 100,
    filters?: {
      email_sequence_number?: number;
      email_status?: string;
    }
  ): Promise<CampaignStatistics> {
    const params = { offset, limit, ...filters };
    return this.request<CampaignStatistics>('GET', `/campaigns/${campaignId}/statistics`, null, params);
  }

  // Lead Methods
  async getCampaignLeads(
    campaignId: number,
    offset: number = 0,
    limit: number = 100
  ): Promise<LeadListResponse> {
    return this.request<LeadListResponse>(
      'GET',
      `/campaigns/${campaignId}/leads`,
      null,
      { offset, limit }
    );
  }

  async addLeadsToCampaign(campaignId: number, data: AddLeadsRequest): Promise<AddLeadsResponse> {
    return this.request<AddLeadsResponse>('POST', `/campaigns/${campaignId}/leads`, data);
  }

  async getLeadByEmail(email: string): Promise<any> {
    return this.request('GET', '/leads', null, { email });
  }

  async updateLead(campaignId: number, leadId: number, data: any): Promise<ApiResponse> {
    return this.request<ApiResponse>('POST', `/campaigns/${campaignId}/leads/${leadId}`, data);
  }

  async pauseLead(campaignId: number, leadId: number): Promise<ApiResponse> {
    return this.request<ApiResponse>('POST', `/campaigns/${campaignId}/leads/${leadId}/pause`);
  }

  async resumeLead(campaignId: number, leadId: number, delayDays: number = 0): Promise<ApiResponse> {
    return this.request<ApiResponse>('POST', `/campaigns/${campaignId}/leads/${leadId}/resume`, {
      resume_lead_with_delay_days: delayDays
    });
  }

  async deleteLead(campaignId: number, leadId: number): Promise<ApiResponse> {
    return this.request<ApiResponse>('DELETE', `/campaigns/${campaignId}/leads/${leadId}`);
  }

  async unsubscribeLead(campaignId: number, leadId: number): Promise<ApiResponse> {
    return this.request<ApiResponse>('POST', `/campaigns/${campaignId}/leads/${leadId}/unsubscribe`);
  }

  async getLeadMessageHistory(campaignId: number, leadId: number): Promise<MessageHistory> {
    return this.request<MessageHistory>('GET', `/campaigns/${campaignId}/leads/${leadId}/message-history`);
  }

  async getLeadCategories(): Promise<LeadCategory[]> {
    return this.request<LeadCategory[]>('GET', '/leads/fetch-categories');
  }

  async updateLeadCategory(
    campaignId: number,
    leadId: number,
    categoryId: number,
    pauseLead: boolean = false
  ): Promise<ApiResponse> {
    return this.request<ApiResponse>('POST', `/campaigns/${campaignId}/leads/${leadId}/category`, {
      category_id: categoryId,
      pause_lead: pauseLead
    });
  }

  // Email Account Methods
  async getEmailAccounts(offset: number = 0, limit: number = 100): Promise<EmailAccount[]> {
    return this.request<EmailAccount[]>('GET', '/email-accounts', null, { offset, limit });
  }

  async getEmailAccount(accountId: number): Promise<EmailAccount> {
    return this.request<EmailAccount>('GET', `/email-accounts/${accountId}`);
  }

  async getCampaignEmailAccounts(campaignId: number): Promise<EmailAccount[]> {
    return this.request<EmailAccount[]>('GET', `/campaigns/${campaignId}/email-accounts`);
  }

  async addEmailAccountToCampaign(campaignId: number, emailAccountIds: number[]): Promise<ApiResponse> {
    return this.request<ApiResponse>('POST', `/campaigns/${campaignId}/email-accounts`, {
      email_account_ids: emailAccountIds
    });
  }

  async removeEmailAccountFromCampaign(campaignId: number, emailAccountIds: number[]): Promise<ApiResponse> {
    return this.request<ApiResponse>('DELETE', `/campaigns/${campaignId}/email-accounts`, {
      email_account_ids: emailAccountIds
    });
  }

  async getWarmupStats(accountId: number): Promise<WarmupStats> {
    return this.request<WarmupStats>('GET', `/email-accounts/${accountId}/warmup-stats`);
  }

  async updateEmailAccountWarmup(
    accountId: number,
    data: {
      warmup_enabled: boolean;
      total_warmup_per_day?: number;
      daily_rampup?: number;
      reply_rate_percentage?: number;
      warmup_key_id?: string;
    }
  ): Promise<ApiResponse> {
    return this.request<ApiResponse>('POST', `/email-accounts/${accountId}/warmup`, data);
  }

  // Webhook Methods
  async getCampaignWebhooks(campaignId: number): Promise<Webhook[]> {
    return this.request<Webhook[]>('GET', `/campaigns/${campaignId}/webhooks`);
  }

  async createOrUpdateWebhook(campaignId: number, data: Partial<Webhook>): Promise<Webhook> {
    return this.request<Webhook>('POST', `/campaigns/${campaignId}/webhooks`, data);
  }

  async deleteWebhook(campaignId: number, webhookId: number): Promise<ApiResponse> {
    return this.request<ApiResponse>('DELETE', `/campaigns/${campaignId}/webhooks`, { id: webhookId });
  }

  // Client Methods (for whitelabel)
  async getClients(): Promise<Client[]> {
    return this.request<Client[]>('GET', '/client');
  }

  async createClient(data: {
    name: string;
    email: string;
    permission: string[];
    logo?: string;
    logo_url?: string;
    password: string;
  }): Promise<Client> {
    return this.request<Client>('POST', '/client/save', data);
  }

  // Utility Methods
  async testConnection(): Promise<boolean> {
    try {
      await this.getCampaigns();
      return true;
    } catch (error) {
      config.log('error', 'Connection Test Failed', { error: error.message });
      return false;
    }
  }

  async exportCampaignData(campaignId: number): Promise<string> {
    const response = await this.client.get(`/campaigns/${campaignId}/leads-export`, {
      responseType: 'text',
      params: { api_key: this.getApiKey() }
    });
    return response.data;
  }
}

// Export singleton instance
export const smartLeadApi = new SmartLeadClient(); 