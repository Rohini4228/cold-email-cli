import axios, { type AxiosInstance } from "axios";
import { SmartLeadCampaignSchema } from "../../types/schemas";

export class SmartLeadAPI {
  private client: AxiosInstance;
  private baseURL = "https://server.smartlead.ai/api/v1";

  constructor(apiKey?: string) {
    this.client = axios.create({
      baseURL: this.baseURL,
      headers: {
        Authorization: `Bearer ${apiKey || process.env.SMARTLEAD_API_KEY}`,
        "Content-Type": "application/json",
      },
    });
  }

  // Campaign Management
  async getCampaigns(params?: { limit?: number; offset?: number }) {
    const response = await this.client.get("/campaigns", { params });
    return response.data;
  }

  async createCampaign(data: any) {
    const response = await this.client.post("/campaigns", data);
    return SmartLeadCampaignSchema.parse(response.data);
  }

  async getCampaign(id: string) {
    const response = await this.client.get(`/campaigns/${id}`);
    return SmartLeadCampaignSchema.parse(response.data);
  }

  async updateCampaign(id: string, data: any) {
    const response = await this.client.patch(`/campaigns/${id}`, data);
    return response.data;
  }

  async deleteCampaign(id: string) {
    await this.client.delete(`/campaigns/${id}`);
  }

  async startCampaign(id: string) {
    const response = await this.client.post(`/campaigns/${id}/start`);
    return response.data;
  }

  async pauseCampaign(id: string) {
    const response = await this.client.post(`/campaigns/${id}/pause`);
    return response.data;
  }

  // Lead Management
  async addLeadsToCampaign(campaignId: string, leads: any[]) {
    const response = await this.client.post(`/campaigns/${campaignId}/leads`, { lead_list: leads });
    return response.data;
  }

  async getCampaignLeads(campaignId: string, params?: any) {
    const response = await this.client.get(`/campaigns/${campaignId}/leads`, { params });
    return response.data;
  }

  async updateLead(leadId: string, data: any) {
    const response = await this.client.patch(`/leads/${leadId}`, data);
    return response.data;
  }

  // Email Accounts
  async getEmailAccounts() {
    const response = await this.client.get("/email-accounts");
    return response.data;
  }

  async addEmailAccount(data: any) {
    const response = await this.client.post("/email-accounts", data);
    return response.data;
  }

  async warmupEmailAccount(email: string, action: "start" | "stop") {
    const response = await this.client.post(`/email-accounts/${email}/warmup`, { action });
    return response.data;
  }

  // Analytics
  async getCampaignAnalytics(campaignId: string) {
    const response = await this.client.get(`/campaigns/${campaignId}/analytics`);
    return response.data;
  }

  async getEmailAccountAnalytics(email: string) {
    const response = await this.client.get(`/email-accounts/${email}/analytics`);
    return response.data;
  }

  // Templates
  async getTemplates(params?: any) {
    const response = await this.client.get("/templates", { params });
    return response.data;
  }

  async getTemplate(id: string) {
    const response = await this.client.get(`/templates/${id}`);
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
    await this.client.delete(`/templates/${id}`);
  }

  // Sequences
  async getSequences(campaignId?: string) {
    const params = campaignId ? { campaign_id: campaignId } : {};
    const response = await this.client.get("/sequences", { params });
    return response.data;
  }

  async getCampaignSequences(campaignId: string) {
    const response = await this.client.get(`/campaigns/${campaignId}/sequences`);
    return response.data;
  }

  async createSequence(campaignId: string, data: any) {
    const response = await this.client.post(`/campaigns/${campaignId}/sequences`, data);
    return response.data;
  }

  async updateSequence(id: string, data: any) {
    const response = await this.client.patch(`/sequences/${id}`, data);
    return response.data;
  }

  async deleteSequence(id: string) {
    await this.client.delete(`/sequences/${id}`);
  }

  async getSequenceAnalytics(id: string) {
    const response = await this.client.get(`/sequences/${id}/analytics`);
    return response.data;
  }
}
