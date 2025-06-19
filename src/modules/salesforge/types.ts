// SalesForge API v2 Type Definitions
// Based on https://api.salesforge.ai/public/v2/swagger/index.html

export interface SalesForgeConfig {
  apiKey: string;
  baseUrl?: string;
}

// Base Response Types
export interface SalesForgeResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface SalesForgeListResponse<T> extends SalesForgeResponse<T[]> {
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Campaign Types
export interface SalesForgeCampaign {
  id: string;
  name: string;
  status: "draft" | "scheduled" | "running" | "paused" | "stopped" | "completed";
  type: "email" | "linkedin" | "multi-channel";
  created_at: string;
  updated_at: string;
  settings: {
    daily_send_limit: number;
    time_zone: string;
    sending_days: string[];
    sending_hours: {
      start: string;
      end: string;
    };
  };
  stats: {
    total_leads: number;
    sent: number;
    opened: number;
    replied: number;
    bounced: number;
  };
}

export interface CreateCampaignRequest {
  name: string;
  type: "email" | "linkedin" | "multi-channel";
  settings?: Partial<SalesForgeCampaign["settings"]>;
}

// Lead Types
export interface SalesForgeLead {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  company?: string;
  job_title?: string;
  phone?: string;
  linkedin_url?: string;
  website?: string;
  country?: string;
  city?: string;
  industry?: string;
  custom_fields: Record<string, any>;
  status: "active" | "paused" | "unsubscribed" | "bounced" | "replied";
  created_at: string;
  updated_at: string;
  campaign_stats?: {
    campaign_id: string;
    status: string;
    step: number;
    last_activity: string;
  };
}

export interface CreateLeadRequest {
  email: string;
  first_name?: string;
  last_name?: string;
  company?: string;
  job_title?: string;
  phone?: string;
  linkedin_url?: string;
  website?: string;
  country?: string;
  city?: string;
  industry?: string;
  custom_fields?: Record<string, any>;
}

export interface ImportLeadsRequest {
  leads: CreateLeadRequest[];
  campaign_id?: string;
  skip_duplicates?: boolean;
}

// Sequence Types
export interface SalesForgeSequence {
  id: string;
  name: string;
  campaign_id: string;
  steps: SalesForgeSequenceStep[];
  created_at: string;
  updated_at: string;
}

export interface SalesForgeSequenceStep {
  id: string;
  type: "email" | "linkedin_connect" | "linkedin_message" | "call" | "manual_task";
  position: number;
  delay_days: number;
  delay_hours?: number;
  subject?: string;
  content: string;
  variables: string[];
  conditions?: {
    if_opened?: boolean;
    if_replied?: boolean;
    if_clicked?: boolean;
  };
}

export interface CreateSequenceRequest {
  name: string;
  campaign_id: string;
  steps: Omit<SalesForgeSequenceStep, "id">[];
}

// Email Account Types
export interface SalesForgeEmailAccount {
  id: string;
  email: string;
  name: string;
  provider: "gmail" | "outlook" | "smtp" | "exchange";
  status: "connected" | "disconnected" | "error" | "warming";
  daily_send_limit: number;
  current_daily_sent: number;
  warmup_enabled: boolean;
  warmup_stats?: {
    reputation_score: number;
    delivery_rate: number;
    spam_rate: number;
  };
  created_at: string;
  last_activity: string;
}

export interface ConnectEmailAccountRequest {
  email: string;
  name: string;
  provider: "gmail" | "outlook" | "smtp" | "exchange";
  credentials: {
    access_token?: string;
    refresh_token?: string;
    smtp_host?: string;
    smtp_port?: number;
    smtp_username?: string;
    smtp_password?: string;
  };
  daily_send_limit?: number;
  warmup_enabled?: boolean;
}

// Analytics Types
export interface SalesForgeAnalytics {
  campaign_id?: string;
  date_range: {
    start_date: string;
    end_date: string;
  };
  metrics: {
    total_sent: number;
    total_delivered: number;
    total_opened: number;
    total_clicked: number;
    total_replied: number;
    total_bounced: number;
    total_unsubscribed: number;
    open_rate: number;
    click_rate: number;
    reply_rate: number;
    bounce_rate: number;
    unsubscribe_rate: number;
  };
  daily_breakdown: Array<{
    date: string;
    sent: number;
    delivered: number;
    opened: number;
    clicked: number;
    replied: number;
    bounced: number;
  }>;
}

export interface AnalyticsRequest {
  campaign_id?: string;
  start_date: string;
  end_date: string;
  granularity?: "daily" | "weekly" | "monthly";
}

// Unibox/Inbox Types
export interface SalesForgeConversation {
  id: string;
  lead_id: string;
  campaign_id: string;
  status: "new" | "in_progress" | "closed" | "snoozed";
  last_message_at: string;
  messages_count: number;
  lead: SalesForgeLead;
  last_message: SalesForgeMessage;
}

export interface SalesForgeMessage {
  id: string;
  conversation_id: string;
  type: "sent" | "received";
  subject: string;
  content: string;
  sender: string;
  recipient: string;
  timestamp: string;
  is_read: boolean;
  attachments?: Array<{
    name: string;
    url: string;
    size: number;
  }>;
}

export interface SendReplyRequest {
  conversation_id: string;
  content: string;
  subject?: string;
  attachments?: Array<{
    name: string;
    content: string; // base64 encoded
  }>;
}

// Webhook Types
export interface SalesForgeWebhook {
  id: string;
  url: string;
  events: string[];
  secret?: string;
  is_active: boolean;
  created_at: string;
}

export interface CreateWebhookRequest {
  url: string;
  events: string[];
  secret?: string;
}

// Template Types
export interface SalesForgeTemplate {
  id: string;
  name: string;
  category: "email" | "linkedin" | "follow_up";
  subject?: string;
  content: string;
  variables: string[];
  created_at: string;
  updated_at: string;
}

export interface CreateTemplateRequest {
  name: string;
  category: "email" | "linkedin" | "follow_up";
  subject?: string;
  content: string;
  variables?: string[];
}

// List Management Types
export interface SalesForgeList {
  id: string;
  name: string;
  description?: string;
  leads_count: number;
  created_at: string;
  updated_at: string;
}

export interface CreateListRequest {
  name: string;
  description?: string;
}

// Deliverability Types
export interface SalesForgeDeliverability {
  email_account_id: string;
  domain: string;
  reputation_score: number;
  deliverability_rate: number;
  spam_score: number;
  dkim_status: "valid" | "invalid" | "missing";
  spf_status: "valid" | "invalid" | "missing";
  dmarc_status: "valid" | "invalid" | "missing";
  blacklist_status: {
    is_blacklisted: boolean;
    blacklists: string[];
  };
  recommendations: string[];
}

// Team Management Types
export interface SalesForgeTeamMember {
  id: string;
  email: string;
  name: string;
  role: "admin" | "member" | "viewer";
  permissions: string[];
  created_at: string;
  last_active: string;
}

export interface InviteTeamMemberRequest {
  email: string;
  name: string;
  role: "admin" | "member" | "viewer";
  permissions?: string[];
}

// Error Types
export interface SalesForgeError {
  code: string;
  message: string;
  details?: any;
}

// Export combined types
export type SalesForgeAPIResponse<T = any> = SalesForgeResponse<T> | SalesForgeListResponse<T>;
