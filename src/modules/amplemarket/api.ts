import axios, { type AxiosInstance } from "axios";
import { 
  AmpleMarketLeadListSchema,
  AmpleMarketContactSchema,
  AmpleMarketSequenceSchema,
  AmpleMarketTaskSchema,
} from "../../types/schemas";

export class AmpleMarketAPI {
  private client: AxiosInstance;
  private baseURL = "https://api.amplemarket.com";

  constructor(apiKey?: string) {
    this.client = axios.create({
      baseURL: this.baseURL,
      headers: {
        Authorization: `Bearer ${apiKey || process.env.AMPLEMARKET_API_KEY}`,
        "Content-Type": "application/json",
        "User-Agent": "CEC-AmpleMarket/2.0.0",
      },
    });
  }

  // Account Details
  async getAccountDetails() {
    const response = await this.client.get("/account");
    return response.data;
  }

  // Users Management
  async getUsers() {
    const response = await this.client.get("/users");
    return response.data;
  }

  // Lead Lists Management
  async getLeadLists() {
    const response = await this.client.get("/lead-lists");
    return response.data;
  }

  async createLeadList(data: { name: string; description?: string }) {
    const response = await this.client.post("/lead-lists", data);
    return AmpleMarketLeadListSchema.parse(response.data);
  }

  async getLeadList(id: string) {
    const response = await this.client.get(`/lead-lists/${id}`);
    return AmpleMarketLeadListSchema.parse(response.data);
  }

  // People Search (non-enrichment)
  async searchPeople(params: {
    company?: string;
    title?: string;
    location?: string;
    industry?: string;
    limit?: number;
  }) {
    const response = await this.client.post("/people/search", params);
    return response.data;
  }

  // Sequences Management
  async getSequences() {
    const response = await this.client.get("/sequences");
    return response.data.map((seq: any) => AmpleMarketSequenceSchema.parse(seq));
  }

  async addLeadsToSequence(sequenceId: string, leadIds: string[]) {
    const response = await this.client.post(`/sequences/${sequenceId}/leads`, { lead_ids: leadIds });
    return response.data;
  }

  // Contacts Management (Basic - No Enrichment)
  async getContactByEmail(email: string) {
    const response = await this.client.get(`/contacts/email/${email}`);
    return AmpleMarketContactSchema.parse(response.data);
  }

  async getContact(id: string) {
    const response = await this.client.get(`/contacts/${id}`);
    return AmpleMarketContactSchema.parse(response.data);
  }

  async getContacts(params?: { limit?: number; offset?: number }) {
    const response = await this.client.get("/contacts", { params });
    return response.data.map((contact: any) => AmpleMarketContactSchema.parse(contact));
  }

  // Tasks Management
  async completeTask(taskId: string, notes?: string) {
    const response = await this.client.post(`/tasks/${taskId}/complete`, { notes });
    return response.data;
  }

  async getTaskStatuses() {
    const response = await this.client.get("/tasks/statuses");
    return response.data;
  }

  async getTaskTypes() {
    const response = await this.client.get("/tasks/types");
    return response.data;
  }

  async getTasks(params?: { status?: string; type?: string; limit?: number }) {
    const response = await this.client.get("/tasks", { params });
    return response.data.map((task: any) => AmpleMarketTaskSchema.parse(task));
  }

  async skipTask(taskId: string) {
    const response = await this.client.post(`/tasks/${taskId}/skip`);
    return response.data;
  }

  // Phone Numbers
  async reviewPhoneNumber(phoneId: string, data: { is_valid: boolean; notes?: string }) {
    const response = await this.client.post(`/phone-numbers/${phoneId}/review`, data);
    return response.data;
  }
}
