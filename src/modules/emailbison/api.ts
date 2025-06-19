import axios, { type AxiosInstance } from "axios";
import { EmailBisonCampaignSchema } from "../../types/schemas";

export class EmailBisonAPI {
  private client: AxiosInstance;
  private baseURL = "https://api.emailbison.com/v1";

  constructor(apiKey?: string) {
    this.client = axios.create({
      baseURL: this.baseURL,
      headers: {
        Authorization: `Bearer ${apiKey || process.env.EMAILBISON_API_KEY}`,
        "Content-Type": "application/json",
        "User-Agent": "CEC-EmailBison/2.0.0",
      },
    });
  }

  // Power Campaign Management
  async getCampaigns(params?: { power_level?: number; status?: string; limit?: number; offset?: number }) {
    const response = await this.client.get("/campaigns", { params });
    return response.data;
  }

  async createCampaign(data: {
    name: string;
    power_level: number;
    daily_limit?: number;
    automation_rules?: any[];
    tracking_settings?: any;
  }) {
    const response = await this.client.post("/campaigns", data);
    return EmailBisonCampaignSchema.parse(response.data);
  }

  async getCampaign(id: string) {
    const response = await this.client.get(`/campaigns/${id}`);
    return EmailBisonCampaignSchema.parse(response.data);
  }

  async updateCampaign(id: string, data: any) {
    const response = await this.client.patch(`/campaigns/${id}`, data);
    return response.data;
  }

  async deleteCampaign(id: string) {
    await this.client.delete(`/campaigns/${id}`);
  }

  async powerBoostCampaign(id: string, powerLevel: number) {
    const response = await this.client.post(`/campaigns/${id}/power-boost`, { power_level: powerLevel });
    return response.data;
  }

  async startCampaign(id: string) {
    const response = await this.client.post(`/campaigns/${id}/start`);
    return response.data;
  }

  async pauseCampaign(id: string) {
    const response = await this.client.post(`/campaigns/${id}/pause`);
    return response.data;
  }

  // Advanced Lead Management
  async getLeads(campaignId?: string, params?: any) {
    const queryParams = campaignId ? { campaign_id: campaignId, ...params } : params;
    const response = await this.client.get("/leads", { params: queryParams });
    return response.data;
  }

  async addLeads(campaignId: string, leads: any[]) {
    const response = await this.client.post(`/campaigns/${campaignId}/leads`, { leads });
    return response.data;
  }

  async importLeadsFromFile(campaignId: string, file: string, options?: any) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("campaign_id", campaignId);
    if (options) formData.append("options", JSON.stringify(options));

    const response = await this.client.post(`/campaigns/${campaignId}/leads/import`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  }

  async powerSegmentLeads(campaignId: string, criteria: any) {
    const response = await this.client.post(`/campaigns/${campaignId}/leads/power-segment`, criteria);
    return response.data;
  }

  async validateLeads(campaignId: string) {
    const response = await this.client.post(`/campaigns/${campaignId}/leads/validate`);
    return response.data;
  }

  // Email Account Powerhouse
  async getEmailAccounts() {
    const response = await this.client.get("/email-accounts");
    return response.data;
  }

  async addEmailAccount(data: { email: string; provider: string; smtp_settings?: any; power_warmup?: boolean }) {
    const response = await this.client.post("/email-accounts", data);
    return response.data;
  }

  async powerWarmupAccount(email: string, settings?: any) {
    const response = await this.client.post(`/email-accounts/${email}/power-warmup`, settings);
    return response.data;
  }

  async getAccountHealth(email: string) {
    const response = await this.client.get(`/email-accounts/${email}/health`);
    return response.data;
  }

  async rotateAccounts(campaignId: string, strategy?: string) {
    const response = await this.client.post(`/campaigns/${campaignId}/rotate-accounts`, { strategy });
    return response.data;
  }

  // Power Sequences
  async getSequences(campaignId?: string) {
    const params = campaignId ? { campaign_id: campaignId } : {};
    const response = await this.client.get("/sequences", { params });
    return response.data;
  }

  async createSequence(data: { name: string; campaign_id: string; steps: any[]; power_settings?: any }) {
    const response = await this.client.post("/sequences", data);
    return response.data;
  }

  async updateSequence(id: string, data: any) {
    const response = await this.client.patch(`/sequences/${id}`, data);
    return response.data;
  }

  async deleteSequence(id: string) {
    await this.client.delete(`/sequences/${id}`);
  }

  async optimizeSequence(id: string, goal?: string) {
    const response = await this.client.post(`/sequences/${id}/optimize`, { goal });
    return response.data;
  }

  // Power Templates
  async getTemplates(params?: any) {
    const response = await this.client.get("/templates", { params });
    return response.data;
  }

  async createTemplate(data: {
    name: string;
    subject: string;
    content: string;
    category?: string;
    power_variables?: string[];
  }) {
    const response = await this.client.post("/templates", data);
    return response.data;
  }

  async getTemplate(id: string) {
    const response = await this.client.get(`/templates/${id}`);
    return response.data;
  }

  async updateTemplate(id: string, data: any) {
    const response = await this.client.patch(`/templates/${id}`, data);
    return response.data;
  }

  async deleteTemplate(id: string) {
    await this.client.delete(`/templates/${id}`);
  }

  async powerPersonalize(templateId: string, leadData: any) {
    const response = await this.client.post(`/templates/${templateId}/power-personalize`, { lead_data: leadData });
    return response.data;
  }

  // Power Analytics
  async getCampaignAnalytics(campaignId: string, period?: string) {
    const params = period ? { period } : {};
    const response = await this.client.get(`/campaigns/${campaignId}/analytics`, { params });
    return response.data;
  }

  async getPowerMetrics(campaignId: string) {
    const response = await this.client.get(`/campaigns/${campaignId}/power-metrics`);
    return response.data;
  }

  async getAccountAnalytics() {
    const response = await this.client.get("/analytics/account");
    return response.data;
  }

  async getDeliverabilityReport(period?: string) {
    const params = period ? { period } : {};
    const response = await this.client.get("/analytics/deliverability", { params });
    return response.data;
  }

  // Automation Rules
  async getAutomationRules(campaignId: string) {
    const response = await this.client.get(`/campaigns/${campaignId}/automation-rules`);
    return response.data;
  }

  async createAutomationRule(
    campaignId: string,
    rule: {
      trigger: string;
      action: string;
      conditions: any;
    },
  ) {
    const response = await this.client.post(`/campaigns/${campaignId}/automation-rules`, rule);
    return response.data;
  }

  async updateAutomationRule(campaignId: string, ruleId: string, rule: any) {
    const response = await this.client.patch(`/campaigns/${campaignId}/automation-rules/${ruleId}`, rule);
    return response.data;
  }

  async deleteAutomationRule(campaignId: string, ruleId: string) {
    await this.client.delete(`/campaigns/${campaignId}/automation-rules/${ruleId}`);
  }
}
