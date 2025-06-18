import axios, { AxiosInstance } from 'axios';
import { ApolloSequenceSchema, ApolloContactSchema } from '../../types/schemas';

export class ApolloAPI {
  private client: AxiosInstance;
  private baseURL = 'https://api.apollo.io/v1';

  constructor(apiKey?: string) {
    this.client = axios.create({
      baseURL: this.baseURL,
      headers: {
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/json',
        'X-Api-Key': apiKey || process.env.APOLLO_API_KEY
      }
    });
  }

  // Sequence Management
  async getSequences() {
    const response = await this.client.get('/emailer_campaigns');
    return response.data;
  }

  async createSequence(data: any) {
    const response = await this.client.post('/emailer_campaigns', data);
    return ApolloSequenceSchema.parse(response.data);
  }

  async getSequence(id: string) {
    const response = await this.client.get(`/emailer_campaigns/${id}`);
    return response.data;
  }

  async startSequence(id: string) {
    const response = await this.client.patch(`/emailer_campaigns/${id}`, { active: true });
    return response.data;
  }

  async pauseSequence(id: string) {
    const response = await this.client.patch(`/emailer_campaigns/${id}`, { active: false });
    return response.data;
  }

  async addContactToSequence(sequenceId: string, contactId: string) {
    const response = await this.client.post(`/emailer_campaigns/${sequenceId}/add_contact_ids`, {
      contact_ids: [contactId]
    });
    return response.data;
  }

  // Contact Management
  async searchContacts(params: any) {
    const response = await this.client.post('/mixed_people/search', params);
    return response.data;
  }

  async getContact(id: string) {
    const response = await this.client.get(`/contacts/${id}`);
    return ApolloContactSchema.parse(response.data);
  }

  async createContact(data: any) {
    const response = await this.client.post('/contacts', data);
    return response.data;
  }

  async updateContact(id: string, data: any) {
    const response = await this.client.patch(`/contacts/${id}`, data);
    return response.data;
  }

  async enrichContact(id: string) {
    const response = await this.client.post(`/contacts/${id}/enrich`);
    return response.data;
  }

  // Template Management
  async getTemplates() {
    const response = await this.client.get('/emailer_templates');
    return response.data;
  }

  async createTemplate(data: any) {
    const response = await this.client.post('/emailer_templates', data);
    return response.data;
  }

  async updateTemplate(id: string, data: any) {
    const response = await this.client.patch(`/emailer_templates/${id}`, data);
    return response.data;
  }

  // Account & Organization Search
  async searchOrganizations(params: any) {
    const response = await this.client.post('/mixed_companies/search', params);
    return response.data;
  }

  async getOrganization(id: string) {
    const response = await this.client.get(`/organizations/${id}`);
    return response.data;
  }

  // Analytics
  async getSequenceAnalytics(id: string) {
    const response = await this.client.get(`/emailer_campaigns/${id}/stats`);
    return response.data;
  }

  async getContactAnalytics(id: string) {
    const response = await this.client.get(`/contacts/${id}/stats`);
    return response.data;
  }

  // Inbox Management
  async getInboxMessages(params?: any) {
    const response = await this.client.get('/emailer_messages', { params });
    return response.data;
  }

  async replyToMessage(messageId: string, text: string) {
    const response = await this.client.post(`/emailer_messages/${messageId}/reply`, { body: text });
    return response.data;
  }

  // Data Enrichment
  async enrichPerson(params: any) {
    const response = await this.client.post('/people/match', params);
    return response.data;
  }

  async enrichCompany(params: any) {
    const response = await this.client.post('/organizations/enrich', params);
    return response.data;
  }
} 