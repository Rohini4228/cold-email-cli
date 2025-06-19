import axios, { type AxiosInstance } from "axios";
import { InstantlyCampaignSchema } from "../../types/schemas";

export class InstantlyAPI {
  private client: AxiosInstance;
  private baseURL = "https://api.instantly.ai/api/v2";

  constructor(apiKey?: string) {
    this.client = axios.create({
      baseURL: this.baseURL,
      headers: {
        Authorization: `Bearer ${apiKey || process.env.INSTANTLY_API_KEY}`,
        "Content-Type": "application/json",
        "User-Agent": "CEC-Instantly/2.0.0",
      },
    });
  }

  // Account Management
  async getAccounts(params?: any) {
    const response = await this.client.get("/accounts", { params });
    return response.data;
  }

  async getAccount(email: string) {
    const response = await this.client.get(`/accounts/${email}`);
    return response.data;
  }

  async addAccount(data: any) {
    const response = await this.client.post("/accounts", data);
    return response.data;
  }

  async updateAccount(email: string, data: any) {
    const response = await this.client.patch(`/accounts/${email}`, data);
    return response.data;
  }

  async deleteAccount(email: string) {
    const response = await this.client.delete(`/accounts/${email}`);
    return response.data;
  }

  async pauseAccount(email: string) {
    const response = await this.client.post(`/accounts/${email}/pause`);
    return response.data;
  }

  async resumeAccount(email: string) {
    const response = await this.client.post(`/accounts/${email}/resume`);
    return response.data;
  }

  async testAccountVitals(accounts: string[]) {
    const response = await this.client.post("/accounts/test/vitals", { accounts });
    return response.data;
  }

  // Email Management
  async getEmails(params?: any) {
    const response = await this.client.get("/emails", { params });
    return response.data;
  }

  async getEmail(id: string) {
    const response = await this.client.get(`/emails/${id}`);
    return response.data;
  }

  async replyToEmail(data: any) {
    const response = await this.client.post("/emails/reply", data);
    return response.data;
  }

  async updateEmail(id: string, data: any) {
    const response = await this.client.patch(`/emails/${id}`, data);
    return response.data;
  }

  async deleteEmail(id: string) {
    const response = await this.client.delete(`/emails/${id}`);
    return response.data;
  }

  async countUnreadEmails() {
    const response = await this.client.get("/emails/unread/count");
    return response.data;
  }

  async markThreadAsRead(threadId: string) {
    const response = await this.client.post(`/emails/threads/${threadId}/mark-as-read`);
    return response.data;
  }

  // Campaign Management
  async getCampaigns(params?: any) {
    const response = await this.client.get("/campaigns", { params });
    return response.data;
  }

  async getCampaign(id: string) {
    const response = await this.client.get(`/campaigns/${id}`);
    return response.data;
  }

  async createCampaign(data: any) {
    const response = await this.client.post("/campaigns", data);
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

  async launchCampaign(id: string) {
    const response = await this.client.post(`/campaigns/${id}/activate`);
    return response.data;
  }

  async pauseCampaign(id: string) {
    const response = await this.client.post(`/campaigns/${id}/pause`);
    return response.data;
  }

  // Analytics
  async getCampaignAnalytics(params?: any) {
    const response = await this.client.get("/campaigns/analytics", { params });
    return response.data;
  }

  async getCampaignAnalyticsOverview(params?: any) {
    const response = await this.client.get("/campaigns/analytics/overview", { params });
    return response.data;
  }

  async getCampaignDailyAnalytics(params?: any) {
    const response = await this.client.get("/campaigns/analytics/daily", { params });
    return response.data;
  }

  async getCampaignStepAnalytics(params?: any) {
    const response = await this.client.get("/campaigns/analytics/steps", { params });
    return response.data;
  }

  async getWarmupAnalytics(emails: string[]) {
    const response = await this.client.post("/accounts/warmup-analytics", { emails });
    return response.data;
  }

  // Lead Management
  async getLeads(params?: any) {
    const response = await this.client.get("/leads", { params });
    return response.data;
  }

  async addLeads(leads: any[]) {
    const response = await this.client.post("/leads", { leads });
    return response.data;
  }

  async updateLead(id: string, data: any) {
    const response = await this.client.patch(`/leads/${id}`, data);
    return response.data;
  }

  async deleteLead(id: string) {
    const response = await this.client.delete(`/leads/${id}`);
    return response.data;
  }

  async updateLeadInterestStatus(data: any) {
    const response = await this.client.post("/leads/update-interest-status", data);
    return response.data;
  }

  async mergeLeads(data: any) {
    const response = await this.client.post("/leads/merge", data);
    return response.data;
  }

  // Templates
  async getTemplates() {
    const response = await this.client.get("/templates");
    return response.data;
  }

  async createTemplate(data: any) {
    const response = await this.client.post("/templates", data);
    return response.data;
  }

  // Unibox (Inbox Management)
  async getUniboxMessages(params?: any) {
    const response = await this.client.get("/unibox/messages", { params });
    return response.data;
  }

  async replyToMessage(messageId: string, text: string) {
    const response = await this.client.post(`/unibox/reply/${messageId}`, { text });
    return response.data;
  }

  // Subsequences
  async getSubsequences(params?: any) {
    const response = await this.client.get("/subsequences", { params });
    return response.data;
  }

  async getSubsequence(id: string) {
    const response = await this.client.get(`/subsequences/${id}`);
    return response.data;
  }

  async createSubsequence(data: any) {
    const response = await this.client.post("/subsequences", data);
    return response.data;
  }

  async updateSubsequence(id: string, data: any) {
    const response = await this.client.patch(`/subsequences/${id}`, data);
    return response.data;
  }

  async deleteSubsequence(id: string) {
    const response = await this.client.delete(`/subsequences/${id}`);
    return response.data;
  }

  async pauseSubsequence(id: string) {
    const response = await this.client.post(`/subsequences/${id}/pause`);
    return response.data;
  }

  async resumeSubsequence(id: string) {
    const response = await this.client.post(`/subsequences/${id}/resume`);
    return response.data;
  }

  async duplicateSubsequence(id: string) {
    const response = await this.client.post(`/subsequences/${id}/duplicate`);
    return response.data;
  }

  // Tags and Labels
  async getTags(params?: any) {
    const response = await this.client.get("/custom-tags", { params });
    return response.data;
  }

  async createTag(data: any) {
    const response = await this.client.post("/custom-tags", data);
    return response.data;
  }

  async updateTag(id: string, data: any) {
    const response = await this.client.patch(`/custom-tags/${id}`, data);
    return response.data;
  }

  async deleteTag(id: string) {
    const response = await this.client.delete(`/custom-tags/${id}`);
    return response.data;
  }

  async toggleTagResource(data: any) {
    const response = await this.client.post("/custom-tags/toggle-resource", data);
    return response.data;
  }

  // Blocklist Management
  async getBlocklistEntries(params?: any) {
    const response = await this.client.get("/block-lists-entries", { params });
    return response.data;
  }

  async addToBlocklist(data: any) {
    const response = await this.client.post("/block-lists-entries", data);
    return response.data;
  }

  async removeFromBlocklist(id: string) {
    const response = await this.client.delete(`/block-lists-entries/${id}`);
    return response.data;
  }

  // Email Verification
  async verifyEmail(email: string) {
    const response = await this.client.post("/email-verification", { email });
    return response.data;
  }

  async getEmailVerificationResult(email: string) {
    const response = await this.client.get(`/email-verification/${email}`);
    return response.data;
  }

  // Lead Lists
  async getLeadLists(params?: any) {
    const response = await this.client.get("/lead-lists", { params });
    return response.data;
  }

  async createLeadList(data: any) {
    const response = await this.client.post("/lead-lists", data);
    return response.data;
  }

  async updateLeadList(id: string, data: any) {
    const response = await this.client.patch(`/lead-lists/${id}`, data);
    return response.data;
  }

  async deleteLeadList(id: string) {
    const response = await this.client.delete(`/lead-lists/${id}`);
    return response.data;
  }

  // Workspace Management
  async getCurrentWorkspace() {
    const response = await this.client.get("/workspaces/current");
    return response.data;
  }

  async updateCurrentWorkspace(data: any) {
    const response = await this.client.patch("/workspaces/current", data);
    return response.data;
  }

  // API Keys
  async getApiKeys() {
    const response = await this.client.get("/api-keys");
    return response.data;
  }

  async createApiKey(data: any) {
    const response = await this.client.post("/api-keys", data);
    return response.data;
  }

  async deleteApiKey(id: string) {
    const response = await this.client.delete(`/api-keys/${id}`);
    return response.data;
  }
}
