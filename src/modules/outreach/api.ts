import axios, { type AxiosInstance } from "axios";

export class OutreachAPI {
  private client: AxiosInstance;
  private baseURL = "https://api.outreach.io/api/v2";

  constructor(apiKey?: string) {
    this.client = axios.create({
      baseURL: this.baseURL,
      headers: {
        Authorization: `Bearer ${apiKey || process.env.OUTREACH_API_KEY}`,
        "Content-Type": "application/vnd.api+json",
        "User-Agent": "CEC-Outreach/2.0.0",
      },
    });
  }

  // Sequences Management
  async getSequences(params?: { page?: number; count?: number }) {
    const response = await this.client.get("/sequences", { params });
    return response.data.data;
  }

  async createSequence(data: { name: string; description?: string }) {
    const response = await this.client.post("/sequences", {
      data: {
        type: "sequence",
        attributes: data,
      },
    });
    return response.data.data;
  }

  async getSequence(id: string) {
    const response = await this.client.get(`/sequences/${id}`);
    return response.data.data;
  }

  async updateSequence(id: string, data: any) {
    const response = await this.client.patch(`/sequences/${id}`, {
      data: {
        type: "sequence",
        id,
        attributes: data,
      },
    });
    return response.data.data;
  }

  async deleteSequence(id: string) {
    await this.client.delete(`/sequences/${id}`);
  }

  // Prospects Management
  async getProspects(params?: { page?: number; count?: number }) {
    const response = await this.client.get("/prospects", { params });
    return response.data.data;
  }

  async createProspect(data: any) {
    const response = await this.client.post("/prospects", {
      data: {
        type: "prospect",
        attributes: data,
      },
    });
    return response.data.data;
  }

  async getProspect(id: string) {
    const response = await this.client.get(`/prospects/${id}`);
    return response.data.data;
  }

  async updateProspect(id: string, data: any) {
    const response = await this.client.patch(`/prospects/${id}`, {
      data: {
        type: "prospect",
        id,
        attributes: data,
      },
    });
    return response.data.data;
  }

  // Mailboxes Management
  async getMailboxes() {
    const response = await this.client.get("/mailboxes");
    return response.data.data;
  }

  async getMailbox(id: string) {
    const response = await this.client.get(`/mailboxes/${id}`);
    return response.data.data;
  }

  async updateMailbox(id: string, data: any) {
    const response = await this.client.patch(`/mailboxes/${id}`, {
      data: {
        type: "mailbox",
        id,
        attributes: data,
      },
    });
    return response.data.data;
  }

  // Templates Management
  async getTemplates(params?: { page?: number; count?: number }) {
    const response = await this.client.get("/templates", { params });
    return response.data.data;
  }

  async createTemplate(data: any) {
    const response = await this.client.post("/templates", {
      data: {
        type: "template",
        attributes: data,
      },
    });
    return response.data.data;
  }

  async getTemplate(id: string) {
    const response = await this.client.get(`/templates/${id}`);
    return response.data.data;
  }

  async updateTemplate(id: string, data: any) {
    const response = await this.client.patch(`/templates/${id}`, {
      data: {
        type: "template",
        id,
        attributes: data,
      },
    });
    return response.data.data;
  }

  // Analytics
  async getSequenceStats(sequenceId: string, params?: any) {
    const response = await this.client.get(`/sequences/${sequenceId}/sequenceStates`, { params });
    return response.data;
  }

  async getProspectStats(params?: any) {
    const response = await this.client.get("/prospects", { params });
    return response.data;
  }

  // Settings
  async getUserSettings() {
    const response = await this.client.get("/users/me");
    return response.data.data;
  }

  async updateUserSettings(data: any) {
    const response = await this.client.patch("/users/me", {
      data: {
        type: "user",
        attributes: data,
      },
    });
    return response.data.data;
  }
}

// Export the API instance
export const api = new OutreachAPI();
