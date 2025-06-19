import axios, { type AxiosInstance } from "axios";
import { SmartLeadCampaignSchema } from "../../types/schemas";

export class SmartLeadAPI {
  private client: AxiosInstance;
  private baseURL = "https://server.smartlead.ai/api/v1";

  constructor(apiKey?: string) {
    this.client = axios.create({
      baseURL: this.baseURL,
      params: {
        api_key: apiKey || process.env.SMARTLEAD_API_KEY,
      },
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "CEC-SmartLead/2.0.0",
      },
    });
  }

  // Campaign Management
  async getCampaigns(params?: any) {
    const response = await this.client.get("/campaigns", { params });
    return response.data;
  }

  async getCampaign(id: string) {
    const response = await this.client.get(`/campaigns/${id}`);
    return SmartLeadCampaignSchema.parse(response.data);
  }

  async createCampaign(data: { name: string; [key: string]: any }) {
    const response = await this.client.post("/campaigns/create", data);
    return response.data;
  }

  async updateCampaign(id: string, data: any) {
    const response = await this.client.patch(`/campaigns/${id}`, data);
    return response.data;
  }

  async deleteCampaign(id: string) {
    const response = await this.client.delete(`/campaigns/${id}`);
    return response.data;
  }

  async updateCampaignStatus(id: string, status: "START" | "PAUSED" | "STOPPED") {
    const response = await this.client.post(`/campaigns/${id}/status`, { status });
    return response.data;
  }

  async updateCampaignSchedule(id: string, scheduleData: any) {
    const response = await this.client.post(`/campaigns/${id}/schedule`, scheduleData);
    return response.data;
  }

  async updateCampaignSettings(id: string, settingsData: any) {
    const response = await this.client.post(`/campaigns/${id}/settings`, settingsData);
    return response.data;
  }

  async getCampaignSequences(id: string) {
    const response = await this.client.get(`/campaigns/${id}/sequences`);
    return response.data;
  }

  async saveCampaignSequences(id: string, sequences: any) {
    const response = await this.client.post(`/campaigns/${id}/sequences`, { sequences });
    return response.data;
  }

  async getCampaignStatistics(id: string, params?: any) {
    const response = await this.client.get(`/campaigns/${id}/statistics`, { params });
    return response.data;
  }

  async getCampaignStatsByDateRange(id: string, startDate: string, endDate: string) {
    const response = await this.client.get(`/campaigns/${id}/analytics-by-date`, {
      params: { start_date: startDate, end_date: endDate }
    });
    return response.data;
  }

  async getCampaignAnalytics(id: string) {
    const response = await this.client.get(`/campaigns/${id}/analytics`);
    return response.data;
  }

  async exportCampaignLeads(id: string) {
    const response = await this.client.get(`/campaigns/${id}/leads-export`);
    return response.data;
  }

  async getCampaignEmailAccounts(id: string) {
    const response = await this.client.get(`/campaigns/${id}/email-accounts`);
    return response.data;
  }

  async addEmailAccountsToCampaign(campaignId: string, emailAccountIds: number[]) {
    const response = await this.client.post(`/campaigns/${campaignId}/email-accounts`, {
      email_account_ids: emailAccountIds
    });
    return response.data;
  }

  async removeEmailAccountsFromCampaign(campaignId: string, emailAccountIds: number[]) {
    const response = await this.client.delete(`/campaigns/${campaignId}/email-accounts`, {
      data: { email_account_ids: emailAccountIds }
    });
    return response.data;
  }

  // Lead Management
  async getCampaignLeads(campaignId: string, params?: any) {
    const response = await this.client.get(`/campaigns/${campaignId}/leads`, { params });
    return response.data;
  }

  async addLeadsToCampaign(campaignId: string, leads: any[], settings?: any) {
    const requestData = {
      lead_list: leads,
      settings: settings || {
        ignore_global_block_list: true,
        ignore_unsubscribe_list: true,
        ignore_duplicate_leads_in_other_campaign: false
      }
    };
    const response = await this.client.post(`/campaigns/${campaignId}/leads`, requestData);
    return response.data;
  }

  async deleteLeadFromCampaign(campaignId: string, leadId: string) {
    const response = await this.client.delete(`/campaigns/${campaignId}/leads/${leadId}`);
    return response.data;
  }

  async updateLeadInCampaign(campaignId: string, leadId: string, data: any) {
    const response = await this.client.post(`/campaigns/${campaignId}/leads/${leadId}`, data);
    return response.data;
  }

  async pauseLeadInCampaign(campaignId: string, leadId: string) {
    const response = await this.client.post(`/campaigns/${campaignId}/leads/${leadId}/pause`);
    return response.data;
  }

  async resumeLeadInCampaign(campaignId: string, leadId: string, delayDays?: number) {
    const response = await this.client.post(`/campaigns/${campaignId}/leads/${leadId}/resume`, {
      resume_lead_with_delay_days: delayDays || 0
    });
    return response.data;
  }

  async unsubscribeLeadFromCampaign(campaignId: string, leadId: string) {
    const response = await this.client.post(`/campaigns/${campaignId}/leads/${leadId}/unsubscribe`);
    return response.data;
  }

  async unsubscribeLeadGlobally(leadId: string) {
    const response = await this.client.post(`/leads/${leadId}/unsubscribe`);
    return response.data;
  }

  async getLeadMessageHistory(campaignId: string, leadId: string) {
    const response = await this.client.get(`/campaigns/${campaignId}/leads/${leadId}/message-history`);
    return response.data;
  }

  async replyToLeadFromMasterInbox(campaignId: string, replyData: any) {
    const response = await this.client.post(`/campaigns/${campaignId}/reply-email-thread`, replyData);
    return response.data;
  }

  async searchLeads(params?: any) {
    const response = await this.client.get("/leads", { params });
    return response.data;
  }

  async getLeadCategories() {
    const response = await this.client.get("/leads/fetch-categories");
    return response.data;
  }

  async updateLeadCategory(campaignId: string, leadId: string, categoryId: number, pauseLead?: boolean) {
    const response = await this.client.post(`/campaigns/${campaignId}/leads/${leadId}/category`, {
      category_id: categoryId,
      pause_lead: pauseLead || false
    });
    return response.data;
  }

  async addToGlobalBlockList(domains: string[], clientId?: number) {
    const response = await this.client.post("/leads/add-domain-block-list", {
      domain_block_list: domains,
      client_id: clientId || null
    });
    return response.data;
  }

  // Email Account Management
  async getEmailAccounts(params?: any) {
    const response = await this.client.get("/email-accounts", { params });
    return response.data;
  }

  async getEmailAccount(id: string) {
    const response = await this.client.get(`/email-accounts/${id}`);
    return response.data;
  }

  async createEmailAccount(data: any) {
    const response = await this.client.post("/email-accounts/save", { id: null, ...data });
    return response.data;
  }

  async updateEmailAccount(id: string, data: any) {
    const response = await this.client.post(`/email-accounts/${id}`, data);
    return response.data;
  }

  async addEmailAccount(data: any) {
    const response = await this.client.post("/email-accounts/save", data);
    return response.data;
  }

  async deleteEmailAccount(id: string) {
    const response = await this.client.delete(`/email-accounts/${id}`);
    return response.data;
  }

  async testEmailAccountConnection(id: string) {
    const response = await this.client.post(`/email-accounts/${id}/test`);
    return response.data;
  }

  async updateEmailAccountWarmup(id: string, warmupData: any) {
    const response = await this.client.post(`/email-accounts/${id}/warmup`, warmupData);
    return response.data;
  }

  async getEmailAccountWarmupStats(id: string) {
    const response = await this.client.get(`/email-accounts/${id}/warmup-stats`);
    return response.data;
  }

  async reconnectFailedEmailAccounts() {
    const response = await this.client.post("/email-accounts/reconnect-failed-email-accounts", {});
    return response.data;
  }

  async warmupEmailAccount(email: string, action: "start" | "stop") {
    // This is a placeholder implementation - actual warmup would depend on specific API
    if (action === "start") {
      return this.updateEmailAccountWarmup(email, { warmup_enabled: true });
    } else {
      return this.updateEmailAccountWarmup(email, { warmup_enabled: false });
    }
  }

  async getEmailAccountAnalytics(email: string) {
    // This would typically return warmup stats and other analytics
    return this.getEmailAccountWarmupStats(email);
  }

  // Webhook Management
  async getCampaignWebhooks(campaignId: string) {
    const response = await this.client.get(`/campaigns/${campaignId}/webhooks`);
    return response.data;
  }

  async createOrUpdateCampaignWebhook(campaignId: string, webhookData: any) {
    const response = await this.client.post(`/campaigns/${campaignId}/webhooks`, webhookData);
    return response.data;
  }

  async deleteCampaignWebhook(campaignId: string, webhookId: number) {
    const response = await this.client.delete(`/campaigns/${campaignId}/webhooks`, {
      data: { id: webhookId }
    });
    return response.data;
  }

  // Client Management (Whitelabel)
  async getClients() {
    const response = await this.client.get("/client");
    return response.data;
  }

  async createClient(clientData: any) {
    const response = await this.client.post("/client/save", clientData);
    return response.data;
  }

  // Templates Management
  async getTemplates(params?: any) {
    const response = await this.client.get("/templates", { params });
    return response.data;
  }

  async createTemplate(data: any) {
    const response = await this.client.post("/templates", data);
    return response.data;
  }

  async updateTemplate(id: string, data: any) {
    const response = await this.client.patch(`/templates/${id}`, data);
    return response.data;
  }

  async deleteTemplate(id: string) {
    const response = await this.client.delete(`/templates/${id}`);
    return response.data;
  }

  // Sequences Management (if separate from campaign sequences)
  async getSequences(params?: any) {
    const response = await this.client.get("/sequences", { params });
    return response.data;
  }

  async createSequence(data: any) {
    const response = await this.client.post("/sequences", data);
    return response.data;
  }

  async updateSequence(id: string, data: any) {
    const response = await this.client.patch(`/sequences/${id}`, data);
    return response.data;
  }

  async deleteSequence(id: string) {
    const response = await this.client.delete(`/sequences/${id}`);
    return response.data;
  }
}
