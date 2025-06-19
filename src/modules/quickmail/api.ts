import axios, { type AxiosInstance } from "axios";

export class QuickMailAPI {
  private client: AxiosInstance;
  private baseURL = "https://api.quickmail.co/v1";

  constructor(apiKey?: string) {
    this.client = axios.create({
      baseURL: this.baseURL,
      headers: {
        Authorization: `Bearer ${apiKey || process.env.QUICKMAIL_API_KEY}`,
        "Content-Type": "application/json",
        "User-Agent": "CEC-QuickMail/2.0.0",
      },
    });
  }

  // Campaign Management
  async getCampaigns(params?: { page?: number; per_page?: number; status?: string }) {
    const response = await this.client.get("/campaigns", { params });
    return response.data;
  }

  async createCampaign(data: {
    name: string;
    subject: string;
    from_name: string;
    from_email: string;
    reply_to?: string;
    track_opens?: boolean;
    track_clicks?: boolean;
  }) {
    const response = await this.client.post("/campaigns", data);
    return response.data;
  }

  async getCampaign(id: string) {
    const response = await this.client.get(`/campaigns/${id}`);
    return response.data;
  }

  async updateCampaign(id: string, data: any) {
    const response = await this.client.put(`/campaigns/${id}`, data);
    return response.data;
  }

  async deleteCampaign(id: string) {
    await this.client.delete(`/campaigns/${id}`);
  }

  async launchCampaign(id: string) {
    const response = await this.client.post(`/campaigns/${id}/launch`);
    return response.data;
  }

  async pauseCampaign(id: string) {
    const response = await this.client.post(`/campaigns/${id}/pause`);
    return response.data;
  }

  async stopCampaign(id: string) {
    const response = await this.client.post(`/campaigns/${id}/stop`);
    return response.data;
  }

  // Outreach Management
  async getOutreaches(params?: { page?: number; per_page?: number }) {
    const response = await this.client.get("/outreaches", { params });
    return response.data;
  }

  async createOutreach(data: {
    name: string;
    subject: string;
    body: string;
    from_name: string;
    from_email: string;
    delay_days?: number;
  }) {
    const response = await this.client.post("/outreaches", data);
    return response.data;
  }

  async getOutreach(id: string) {
    const response = await this.client.get(`/outreaches/${id}`);
    return response.data;
  }

  async updateOutreach(id: string, data: any) {
    const response = await this.client.put(`/outreaches/${id}`, data);
    return response.data;
  }

  async deleteOutreach(id: string) {
    await this.client.delete(`/outreaches/${id}`);
  }

  // Contact Management
  async getContacts(params?: { page?: number; per_page?: number; search?: string }) {
    const response = await this.client.get("/contacts", { params });
    return response.data;
  }

  async createContact(data: {
    email: string;
    first_name?: string;
    last_name?: string;
    company?: string;
    position?: string;
    phone?: string;
    website?: string;
    linkedin?: string;
    custom_fields?: Record<string, any>;
  }) {
    const response = await this.client.post("/contacts", data);
    return response.data;
  }

  async getContact(id: string) {
    const response = await this.client.get(`/contacts/${id}`);
    return response.data;
  }

  async updateContact(id: string, data: any) {
    const response = await this.client.put(`/contacts/${id}`, data);
    return response.data;
  }

  async deleteContact(id: string) {
    await this.client.delete(`/contacts/${id}`);
  }

  async bulkCreateContacts(contacts: any[]) {
    const response = await this.client.post("/contacts/bulk", { contacts });
    return response.data;
  }

  async importContacts(data: { csv_data: string; mapping: Record<string, string> }) {
    const response = await this.client.post("/contacts/import", data);
    return response.data;
  }

  // Email Account Management
  async getEmailAccounts() {
    const response = await this.client.get("/email_accounts");
    return response.data;
  }

  async createEmailAccount(data: {
    email: string;
    password: string;
    smtp_host: string;
    smtp_port: number;
    imap_host: string;
    imap_port: number;
    use_ssl?: boolean;
  }) {
    const response = await this.client.post("/email_accounts", data);
    return response.data;
  }

  async getEmailAccount(id: string) {
    const response = await this.client.get(`/email_accounts/${id}`);
    return response.data;
  }

  async updateEmailAccount(id: string, data: any) {
    const response = await this.client.put(`/email_accounts/${id}`, data);
    return response.data;
  }

  async deleteEmailAccount(id: string) {
    await this.client.delete(`/email_accounts/${id}`);
  }

  async testEmailAccount(id: string) {
    const response = await this.client.post(`/email_accounts/${id}/test`);
    return response.data;
  }

  // Template Management
  async getTemplates(params?: { page?: number; per_page?: number }) {
    const response = await this.client.get("/templates", { params });
    return response.data;
  }

  async createTemplate(data: { name: string; subject: string; body: string; category?: string }) {
    const response = await this.client.post("/templates", data);
    return response.data;
  }

  async getTemplate(id: string) {
    const response = await this.client.get(`/templates/${id}`);
    return response.data;
  }

  async updateTemplate(id: string, data: any) {
    const response = await this.client.put(`/templates/${id}`, data);
    return response.data;
  }

  async deleteTemplate(id: string) {
    await this.client.delete(`/templates/${id}`);
  }

  // Analytics & Reporting
  async getCampaignStats(id: string, params?: { start_date?: string; end_date?: string }) {
    const response = await this.client.get(`/campaigns/${id}/stats`, { params });
    return response.data;
  }

  async getOverallStats(params?: { start_date?: string; end_date?: string }) {
    const response = await this.client.get("/stats", { params });
    return response.data;
  }

  async getEmailStats(params?: { campaign_id?: string; start_date?: string; end_date?: string }) {
    const response = await this.client.get("/email_stats", { params });
    return response.data;
  }

  async getClickStats(params?: { campaign_id?: string; start_date?: string; end_date?: string }) {
    const response = await this.client.get("/click_stats", { params });
    return response.data;
  }

  async getUnsubscribeStats(params?: { campaign_id?: string; start_date?: string; end_date?: string }) {
    const response = await this.client.get("/unsubscribe_stats", { params });
    return response.data;
  }

  // Webhook Management
  async getWebhooks() {
    const response = await this.client.get("/webhooks");
    return response.data;
  }

  async createWebhook(data: { url: string; events: string[]; active?: boolean }) {
    const response = await this.client.post("/webhooks", data);
    return response.data;
  }

  async updateWebhook(id: string, data: any) {
    const response = await this.client.put(`/webhooks/${id}`, data);
    return response.data;
  }

  async deleteWebhook(id: string) {
    await this.client.delete(`/webhooks/${id}`);
  }

  // Deliverability & Warmup
  async getDeliverabilityStats(email_account_id?: string) {
    const params = email_account_id ? { email_account_id } : {};
    const response = await this.client.get("/deliverability", { params });
    return response.data;
  }

  async startWarmup(
    email_account_id: string,
    config?: {
      daily_limit?: number;
      increment_rate?: number;
      reply_rate?: number;
    },
  ) {
    const response = await this.client.post(`/email_accounts/${email_account_id}/warmup`, config || {});
    return response.data;
  }

  async stopWarmup(email_account_id: string) {
    const response = await this.client.delete(`/email_accounts/${email_account_id}/warmup`);
    return response.data;
  }

  async getWarmupStats(email_account_id: string) {
    const response = await this.client.get(`/email_accounts/${email_account_id}/warmup`);
    return response.data;
  }
}

export const api = new QuickMailAPI();
