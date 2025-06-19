import axios, { type AxiosInstance } from "axios";

export class ApolloAPI {
  private client: AxiosInstance;
  private baseURL = "https://api.apollo.io/v1";

  constructor(apiKey?: string) {
    this.client = axios.create({
      baseURL: this.baseURL,
      headers: {
        "Cache-Control": "no-cache",
        "Content-Type": "application/json",
      },
    });

    // Add API key to all requests
    this.client.interceptors.request.use((config) => {
      config.params = {
        ...config.params,
        api_key: apiKey || process.env.APOLLO_API_KEY,
      };
      return config;
    });
  }

  // EMAIL SEQUENCES - Apollo's main focus
  async createEmailSequence(data: any) {
    const response = await this.client.post("/sequences", data);
    return response.data;
  }

  async getEmailSequences(params?: any) {
    const response = await this.client.get("/sequences", { params });
    return response.data;
  }

  async getEmailSequence(id: string) {
    const response = await this.client.get(`/sequences/${id}`);
    return response.data;
  }

  async updateEmailSequence(id: string, data: any) {
    const response = await this.client.put(`/sequences/${id}`, data);
    return response.data;
  }

  async deleteEmailSequence(id: string) {
    const response = await this.client.delete(`/sequences/${id}`);
    return response.data;
  }

  async duplicateEmailSequence(id: string, data?: any) {
    const response = await this.client.post(`/sequences/${id}/duplicate`, data);
    return response.data;
  }

  // EMAIL SEQUENCE STEPS
  async createSequenceStep(sequenceId: string, data: any) {
    const response = await this.client.post(`/sequences/${sequenceId}/steps`, data);
    return response.data;
  }

  async getSequenceSteps(sequenceId: string) {
    const response = await this.client.get(`/sequences/${sequenceId}/steps`);
    return response.data;
  }

  async updateSequenceStep(sequenceId: string, stepId: string, data: any) {
    const response = await this.client.put(`/sequences/${sequenceId}/steps/${stepId}`, data);
    return response.data;
  }

  async deleteSequenceStep(sequenceId: string, stepId: string) {
    const response = await this.client.delete(`/sequences/${sequenceId}/steps/${stepId}`);
    return response.data;
  }

  // EMAIL SEQUENCE CONTACTS
  async addContactsToSequence(sequenceId: string, data: any) {
    const response = await this.client.post(`/sequences/${sequenceId}/contacts`, data);
    return response.data;
  }

  async getSequenceContacts(sequenceId: string, params?: any) {
    const response = await this.client.get(`/sequences/${sequenceId}/contacts`, { params });
    return response.data;
  }

  async removeContactFromSequence(sequenceId: string, contactId: string) {
    const response = await this.client.delete(`/sequences/${sequenceId}/contacts/${contactId}`);
    return response.data;
  }

  async pauseSequenceContact(sequenceId: string, contactId: string) {
    const response = await this.client.post(`/sequences/${sequenceId}/contacts/${contactId}/pause`);
    return response.data;
  }

  async resumeSequenceContact(sequenceId: string, contactId: string) {
    const response = await this.client.post(`/sequences/${sequenceId}/contacts/${contactId}/resume`);
    return response.data;
  }

  // EMAIL ANALYTICS
  async getSequenceStats(sequenceId: string, params?: any) {
    const response = await this.client.get(`/sequences/${sequenceId}/stats`, { params });
    return response.data;
  }

  async getSequenceAnalytics(sequenceId: string, params?: any) {
    const response = await this.client.get(`/sequences/${sequenceId}/analytics`, { params });
    return response.data;
  }

  // EMAIL TEMPLATES
  async createEmailTemplate(data: any) {
    const response = await this.client.post("/email_templates", data);
    return response.data;
  }

  async getEmailTemplates(params?: any) {
    const response = await this.client.get("/email_templates", { params });
    return response.data;
  }

  async getEmailTemplate(id: string) {
    const response = await this.client.get(`/email_templates/${id}`);
    return response.data;
  }

  async updateEmailTemplate(id: string, data: any) {
    const response = await this.client.put(`/email_templates/${id}`, data);
    return response.data;
  }

  async deleteEmailTemplate(id: string) {
    const response = await this.client.delete(`/email_templates/${id}`);
    return response.data;
  }

  // CONTACTS
  async createContact(data: any) {
    const response = await this.client.post("/contacts", data);
    return response.data;
  }

  async getContacts(params?: any) {
    const response = await this.client.get("/contacts", { params });
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
    const response = await this.client.delete(`/contacts/${id}`);
    return response.data;
  }

  // EMAIL ACCOUNTS
  async getEmailAccounts() {
    const response = await this.client.get("/email_accounts");
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
}
