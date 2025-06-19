import axios, { type AxiosInstance } from "axios";
import { SalesforgeCampaignSchema, SalesforgeSequenceSchema } from "../../types/schemas";

export class SalesforgeAPI {
  private client: AxiosInstance;
  private baseURL = "https://api.salesforge.ai/public/v2";

  constructor(apiKey?: string) {
    this.client = axios.create({
      baseURL: this.baseURL,
      headers: {
        Authorization: `Bearer ${apiKey || process.env.SALESFORGE_API_KEY}`,
        "Content-Type": "application/json",
      },
    });
  }

  // AI Campaign Management
  async getCampaigns(params?: any) {
    const response = await this.client.get("/campaigns", { params });
    return response.data;
  }

  async createCampaign(data: any) {
    const response = await this.client.post("/campaigns", data);
    return SalesforgeCampaignSchema.parse(response.data);
  }

  async optimizeCampaign(id: string, goal: string) {
    const response = await this.client.post(`/campaigns/${id}/optimize`, { goal });
    return response.data;
  }

  // AI Sequence Management
  async getSequences(params?: any) {
    const response = await this.client.get("/sequences", { params });
    return response.data;
  }

  async createSequence(data: any) {
    const response = await this.client.post("/sequences", data);
    return SalesforgeSequenceSchema.parse(response.data);
  }

  async generateSequence(brief: string, persona: string) {
    const response = await this.client.post("/sequences/generate", { brief, persona });
    return response.data;
  }

  async optimizeSequence(id: string, goal: string) {
    const response = await this.client.post(`/sequences/${id}/optimize`, { goal });
    return response.data;
  }

  async getSequenceAnalytics(id: string) {
    const response = await this.client.get(`/sequences/${id}/analytics`);
    return response.data;
  }

  // AI Template Management
  async getTemplates(params?: any) {
    const response = await this.client.get("/templates", { params });
    return response.data;
  }

  async generateTemplate(persona: string, tone: string, industry?: string) {
    const response = await this.client.post("/templates/generate", { persona, tone, industry });
    return response.data;
  }

  async optimizeTemplate(id: string, goal: string) {
    const response = await this.client.post(`/templates/${id}/optimize`, { goal });
    return response.data;
  }

  async personalizeTemplate(id: string, leadData: any) {
    const response = await this.client.post(`/templates/${id}/personalize`, { lead_data: leadData });
    return response.data;
  }

  // Lead Management with AI
  async getLeads(params?: any) {
    const response = await this.client.get("/leads", { params });
    return response.data;
  }

  async enrichLead(id: string) {
    const response = await this.client.post(`/leads/${id}/enrich`);
    return response.data;
  }

  async scoreLeads(campaignId: string, criteria: string) {
    const response = await this.client.post(`/leads/score`, { campaign_id: campaignId, criteria });
    return response.data;
  }

  async segmentLeads(campaignId: string) {
    const response = await this.client.post(`/leads/segment`, { campaign_id: campaignId });
    return response.data;
  }

  // Multi-Channel Management
  async getMultiChannelSequences() {
    const response = await this.client.get("/multichannel/sequences");
    return response.data;
  }

  async createMultiChannelSequence(data: any) {
    const response = await this.client.post("/multichannel/sequences", data);
    return response.data;
  }

  // AI Analytics & Insights
  async getAIInsights(campaignId: string) {
    const response = await this.client.get(`/analytics/ai-insights/${campaignId}`);
    return response.data;
  }

  async getPerformancePredictions(campaignId: string, forecastDays?: number) {
    const params = forecastDays ? { forecast_days: forecastDays } : {};
    const response = await this.client.get(`/analytics/predictions`, {
      params: { campaign_id: campaignId, ...params },
    });
    return response.data;
  }

  async getPerformanceAnalytics(campaignId?: string) {
    const params = campaignId ? { campaign_id: campaignId } : {};
    const response = await this.client.get("/analytics/performance", { params });
    return response.data;
  }
}
