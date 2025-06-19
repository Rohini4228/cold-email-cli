import axios, { type AxiosInstance } from "axios";
import { SalesLoftCadenceSchema, SalesLoftEmailSchema, SalesLoftPersonSchema } from "../../types/schemas";

export class SalesLoftAPI {
  private client: AxiosInstance;
  private baseURL = "https://api.salesloft.com/v2";

  constructor(apiKey?: string) {
    this.client = axios.create({
      baseURL: this.baseURL,
      headers: {
        Authorization: `Bearer ${apiKey || process.env.SALESLOFT_API_KEY}`,
        "Content-Type": "application/json",
        "User-Agent": "CEC-SalesLoft/2.0.0",
      },
    });
  }

  // Cadences Management
  async getCadences(params?: { page?: number; per_page?: number }) {
    const response = await this.client.get("/cadences", { params });
    return response.data.data.map((cadence: any) => SalesLoftCadenceSchema.parse(cadence));
  }

  async createCadence(data: { name: string; shared?: boolean }) {
    const response = await this.client.post("/cadences", data);
    return SalesLoftCadenceSchema.parse(response.data.data);
  }

  async getCadence(id: string) {
    const response = await this.client.get(`/cadences/${id}`);
    return SalesLoftCadenceSchema.parse(response.data.data);
  }

  async updateCadence(id: string, data: any) {
    const response = await this.client.put(`/cadences/${id}`, data);
    return SalesLoftCadenceSchema.parse(response.data.data);
  }

  async deleteCadence(id: string) {
    await this.client.delete(`/cadences/${id}`);
  }

  // People Management
  async getPeople(params?: { page?: number; per_page?: number }) {
    const response = await this.client.get("/people", { params });
    return response.data.data.map((person: any) => SalesLoftPersonSchema.parse(person));
  }

  async createPerson(data: any) {
    const response = await this.client.post("/people", data);
    return SalesLoftPersonSchema.parse(response.data.data);
  }

  async getPerson(id: string) {
    const response = await this.client.get(`/people/${id}`);
    return SalesLoftPersonSchema.parse(response.data.data);
  }

  async updatePerson(id: string, data: any) {
    const response = await this.client.put(`/people/${id}`, data);
    return SalesLoftPersonSchema.parse(response.data.data);
  }

  async deletePerson(id: string) {
    await this.client.delete(`/people/${id}`);
  }

  // Email Management
  async getEmails(params?: { page?: number; per_page?: number }) {
    const response = await this.client.get("/activities/emails", { params });
    return response.data.data.map((email: any) => SalesLoftEmailSchema.parse(email));
  }

  async sendEmail(data: any) {
    const response = await this.client.post("/activities/emails", data);
    return SalesLoftEmailSchema.parse(response.data.data);
  }

  // Calls Management
  async getCalls(params?: { page?: number; per_page?: number }) {
    const response = await this.client.get("/activities/calls", { params });
    return response.data;
  }

  async createCall(data: any) {
    const response = await this.client.post("/activities/calls", data);
    return response.data.data;
  }

  // Analytics
  async getCadenceStats(cadenceId: string) {
    const response = await this.client.get(`/cadences/${cadenceId}/cadence_memberships`);
    return response.data;
  }

  async getPersonStats(personId: string) {
    const response = await this.client.get(`/people/${personId}/activities`);
    return response.data;
  }

  // Admin & Settings
  async getUser() {
    const response = await this.client.get("/me");
    return response.data.data;
  }

  async getTeam() {
    const response = await this.client.get("/team");
    return response.data.data;
  }

  async getSettings() {
    const response = await this.client.get("/team");
    return response.data.data;
  }
}

// Export the API instance
export const api = new SalesLoftAPI();
