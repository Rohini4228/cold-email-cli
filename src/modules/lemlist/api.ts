import axios, { type AxiosInstance } from "axios";
import { 
  LemListCampaignSchema,
  LemListLeadSchema,
  LemListTemplateSchema,
  LemListSequenceSchema,
} from "../../types/schemas";

export class LemListAPI {
  private client: AxiosInstance;
  private baseURL = "https://api.lemlist.com/api";

  constructor(apiKey?: string) {
    this.client = axios.create({
      baseURL: this.baseURL,
      headers: {
        Authorization: `Bearer ${apiKey || process.env.LEMLIST_API_KEY}`,
        "Content-Type": "application/json",
        "User-Agent": "CEC-LemList/2.0.0",
      },
    });
  }

  // Campaigns Management
  async getCampaigns() {
    const response = await this.client.get("/campaigns");
    return response.data.map((campaign: any) => LemListCampaignSchema.parse(campaign));
  }

  async createCampaign(data: { name: string; options?: any }) {
    const response = await this.client.post("/campaigns", data);
    return LemListCampaignSchema.parse(response.data);
  }

  async getCampaign(id: string) {
    const response = await this.client.get(`/campaigns/${id}`);
    return LemListCampaignSchema.parse(response.data);
  }

  async updateCampaign(id: string, data: any) {
    const response = await this.client.patch(`/campaigns/${id}`, data);
    return LemListCampaignSchema.parse(response.data);
  }

  async deleteCampaign(id: string) {
    await this.client.delete(`/campaigns/${id}`);
  }

  async startCampaign(id: string) {
    const response = await this.client.patch(`/campaigns/${id}/start`);
    return response.data;
  }

  async pauseCampaign(id: string) {
    const response = await this.client.patch(`/campaigns/${id}/pause`);
    return response.data;
  }

  // Leads Management
  async getCampaignLeads(campaignId: string) {
    const response = await this.client.get(`/campaigns/${campaignId}/leads`);
    return response.data.map((lead: any) => LemListLeadSchema.parse(lead));
  }

  async addLeadToCampaign(campaignId: string, data: any) {
    const response = await this.client.post(`/campaigns/${campaignId}/leads/${data.email}`, data);
    return LemListLeadSchema.parse(response.data);
  }

  async getLeadFromCampaign(campaignId: string, email: string) {
    const response = await this.client.get(`/campaigns/${campaignId}/leads/${email}`);
    return LemListLeadSchema.parse(response.data);
  }

  async updateLeadInCampaign(campaignId: string, email: string, data: any) {
    const response = await this.client.patch(`/campaigns/${campaignId}/leads/${email}`, data);
    return LemListLeadSchema.parse(response.data);
  }

  async deleteLeadFromCampaign(campaignId: string, email: string) {
    await this.client.delete(`/campaigns/${campaignId}/leads/${email}`);
  }

  async unsubscribeLead(campaignId: string, email: string) {
    const response = await this.client.patch(`/campaigns/${campaignId}/leads/${email}/unsubscribe`);
    return response.data;
  }

  // Sequences Management
  async getSequences() {
    const response = await this.client.get("/sequences");
    return response.data.map((sequence: any) => LemListSequenceSchema.parse(sequence));
  }

  async createSequence(data: { name: string; steps?: any[] }) {
    const response = await this.client.post("/sequences", data);
    return LemListSequenceSchema.parse(response.data);
  }

  async getSequence(id: string) {
    const response = await this.client.get(`/sequences/${id}`);
    return LemListSequenceSchema.parse(response.data);
  }

  async updateSequence(id: string, data: any) {
    const response = await this.client.patch(`/sequences/${id}`, data);
    return LemListSequenceSchema.parse(response.data);
  }

  async deleteSequence(id: string) {
    await this.client.delete(`/sequences/${id}`);
  }

  // Templates Management
  async getTemplates() {
    const response = await this.client.get("/templates");
    return response.data.map((template: any) => LemListTemplateSchema.parse(template));
  }

  async createTemplate(data: { name: string; subject: string; body: string }) {
    const response = await this.client.post("/templates", data);
    return LemListTemplateSchema.parse(response.data);
  }

  async getTemplate(id: string) {
    const response = await this.client.get(`/templates/${id}`);
    return LemListTemplateSchema.parse(response.data);
  }

  async updateTemplate(id: string, data: any) {
    const response = await this.client.patch(`/templates/${id}`, data);
    return LemListTemplateSchema.parse(response.data);
  }

  async deleteTemplate(id: string) {
    await this.client.delete(`/templates/${id}`);
  }

  // Analytics & Stats
  async getCampaignStats(campaignId: string) {
    const response = await this.client.get(`/campaigns/${campaignId}/stats`);
    return response.data;
  }

  async getAccountStats() {
    const response = await this.client.get("/account/stats");
    return response.data;
  }

  // Team & Account Management
  async getTeamMembers() {
    const response = await this.client.get("/team");
    return response.data;
  }

  async getAccountInfo() {
    const response = await this.client.get("/account");
    return response.data;
  }
} 