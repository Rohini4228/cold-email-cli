// SmartLead API Types - Based on Official Documentation
// API Base URL: https://server.smartlead.ai/api/v1

export interface Config {
  apiKey?: string;
  baseUrl?: string;
  lastUsed?: string;
  theme?: 'default' | 'smartlead' | 'neon' | 'matrix';
}

export interface Campaign {
  id: number;
  user_id: number;
  created_at: string;
  updated_at: string;
  status: 'DRAFTED' | 'ACTIVE' | 'COMPLETED' | 'STOPPED' | 'PAUSED';
  name: string;
  track_settings?: 'DONT_EMAIL_OPEN' | 'DONT_LINK_CLICK' | 'DONT_REPLY_TO_AN_EMAIL';
  scheduler_cron_value?: string;
  min_time_btwn_emails?: number; // minutes
  max_leads_per_day?: number;
  stop_lead_settings?: 'REPLY_TO_AN_EMAIL' | 'CLICK_ON_A_LINK' | 'OPEN_AN_EMAIL';
  unsubscribe_text?: string;
  client_id?: number | null;
  enable_ai_esp_matching?: boolean;
  send_as_plain_text?: boolean;
  follow_up_percentage?: number;
}

export interface CampaignCreateRequest {
  name: string;
  client_id?: number | null;
  max_leads_per_day?: number;
  enable_ai_esp_matching?: boolean;
}

export interface CampaignScheduleRequest {
  timezone: string;
  days_of_the_week: number[]; // [0,1,2,3,4,5,6]
  start_hour: string; // "09:00"
  end_hour: string; // "18:00"
  min_time_btw_emails: number; // minutes
  max_new_leads_per_day: number;
  schedule_start_time?: string; // ISO format
}

export interface CampaignSettingsRequest {
  track_settings?: string[];
  stop_lead_settings?: string;
  unsubscribe_text?: string;
  send_as_plain_text?: boolean;
  follow_up_percentage?: number;
  client_id?: number | null;
  enable_ai_esp_matching?: boolean;
}

export interface Lead {
  id: number;
  first_name?: string;
  last_name?: string;
  email: string;
  phone_number?: string;
  company_name?: string;
  website?: string;
  location?: string;
  custom_fields?: Record<string, any>;
  linkedin_profile?: string;
  company_url?: string;
  is_unsubscribed: boolean;
}

export interface LeadListItem {
  campaign_lead_map_id: number;
  status: 'STARTED' | 'COMPLETED' | 'BLOCKED' | 'INPROGRESS' | 'SENT' | 'OPENED' | 'CLICKED' | 'REPLIED' | 'BOUNCED' | 'UNSUBSCRIBED' | 'FAILED';
  created_at: string;
  lead: Lead;
}

export interface LeadListResponse {
  total_leads: number;
  offset: number;
  limit: number;
  data: LeadListItem[];
}

export interface LeadInput {
  first_name?: string;
  last_name?: string;
  email: string;
  phone_number?: string;
  company_name?: string;
  website?: string;
  location?: string;
  custom_fields?: Record<string, any>; // max 20 fields
  linkedin_profile?: string;
  company_url?: string;
}

export interface AddLeadsRequest {
  lead_list: LeadInput[]; // max 100 leads
  settings?: {
    ignore_global_block_list?: boolean;
    ignore_unsubscribe_list?: boolean;
    ignore_duplicate_leads_in_other_campaign?: boolean;
  };
}

export interface AddLeadsResponse {
  ok: boolean;
  upload_count: number;
  total_leads: number;
  already_added_to_campaign: number;
  duplicate_count: number;
  invalid_email_count: number;
  unsubscribed_leads: number;
}

export interface EmailAccount {
  id: number;
  created_at: string;
  updated_at: string;
  user_id: number;
  from_name: string;
  from_email: string;
  username: string;
  smtp_host: string;
  smtp_port: number;
  smtp_port_type: 'SSL' | 'TLS';
  message_per_day: number;
  max_email_per_day?: number;
  different_reply_to_address?: string;
  is_different_imap_account: boolean;
  imap_username?: string;
  imap_host: string;
  imap_port: number;
  imap_port_type: 'SSL' | 'TLS';
  signature?: string;
  custom_tracking_domain?: string;
  bcc_email?: string;
  is_smtp_success: boolean;
  is_imap_success: boolean;
  smtp_failure_error?: string;
  imap_failure_error?: string;
  type: 'GMAIL' | 'SMTP' | 'ZOHO' | 'OUTLOOK';
  daily_sent_count: number;
  client_id?: number | null;
  warmup_enabled?: boolean;
  warmup_details?: WarmupDetails;
}

export interface WarmupDetails {
  id: number;
  status: 'ACTIVE' | 'INACTIVE';
  created_at: string;
  reply_rate: number;
  warmup_key_id: string;
  blocked_reason?: string;
  total_sent_count: number;
  total_spam_count: number;
  warmup_max_count: number;
  warmup_min_count: number;
  is_warmup_blocked: boolean;
  max_email_per_day: number;
  warmup_reputation: string;
}

export interface WarmupStats {
  id: number;
  sent_count: string;
  spam_count: string;
  inbox_count: string;
  warmup_email_received_count: string;
  stats_by_date: WarmupDayStats[];
}

export interface WarmupDayStats {
  id: number;
  date: string;
  sent_count: number;
  reply_count: number;
  save_from_spam_count: number;
}

export interface CampaignAnalytics {
  id: number;
  user_id: number;
  created_at: string;
  status: string;
  name: string;
  sent_count: string;
  open_count: string;
  click_count: string;
  reply_count: string;
  block_count: string;
  total_count: string;
  drafted_count: string;
  bounce_count: string;
  unsubscribed_count: string;
  sequence_count: string;
  unique_open_count: string;
  unique_click_count: string;
  unique_sent_count: string;
  client_id?: number;
  client_name?: string;
  client_email?: string;
  parent_campaign_id?: number | null;
  campaign_lead_stats: {
    total: number;
    blocked: number;
    stopped: number;
    completed: number;
    inprogress: number;
    notStarted: number;
  };
  tags?: Array<{
    id: number;
    name: string;
    color: string;
  }>;
}

export interface CampaignStatistics {
  total_stats: string;
  data: CampaignStatItem[];
  offset: number;
  limit: number;
}

export interface CampaignStatItem {
  lead_name: string;
  lead_email: string;
  lead_category?: string;
  sequence_number: number;
  email_campaign_seq_id: number;
  seq_variant_id: number;
  email_subject: string;
  email_message: string;
  sent_time: string;
  open_time?: string;
  click_time?: string;
  reply_time?: string;
  open_count: number;
  click_count: number;
  is_unsubscribed: boolean;
  is_bounced: boolean;
}

export interface MessageHistory {
  history: MessageHistoryItem[];
  from: string;
  to: string;
}

export interface MessageHistoryItem {
  type: 'SENT' | 'REPLY';
  message_id: string;
  stats_id: string;
  time: string;
  email_body: string;
  subject?: string;
}

export interface LeadCategory {
  id: number;
  created_at: string;
  name: string;
}

export interface Webhook {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
  webhook_url: string;
  email_campaign_id: number;
  event_types: WebhookEventType[];
  categories?: string[];
}

export type WebhookEventType =
  | 'EMAIL_SENT'
  | 'EMAIL_OPEN'
  | 'EMAIL_LINK_CLICK'
  | 'EMAIL_REPLY'
  | 'LEAD_UNSUBSCRIBED'
  | 'LEAD_CATEGORY_UPDATED';

export interface Client {
  id: number;
  name: string;
  email: string;
  uuid: string;
  created_at: string;
  user_id: number;
  logo?: string;
  logo_url?: string;
  client_permision: {
    permission: string[];
    retricted_category: string[];
  };
}

// API Response Types
export interface ApiResponse<T = any> {
  ok: boolean;
  data?: T;
  message?: string;
  error?: string;
  errorCode?: string;
}

// Filter Types for Enhanced UX
export interface CampaignFilters {
  status?: string;
  limit?: number;
  sort?: 'newest' | 'oldest' | 'activity' | 'name';
  showStats?: boolean;
  skipFilters?: boolean;
}

export interface LeadFilters {
  status?: string;
  company?: string;
  limit?: number;
  sort?: 'recent' | 'name' | 'email' | 'company' | 'status';
  extended?: boolean;
  skipFilters?: boolean;
  campaignId?: string;
}

export interface EmailAccountFilters {
  status?: 'healthy' | 'partial' | 'failed' | 'smtp_failed' | 'imap_failed';
  warmup?: 'enabled' | 'disabled' | 'high_activity' | 'low_activity';
  provider?: string;
  sort?: 'activity' | 'email' | 'health' | 'limit' | 'warmup';
  extended?: boolean;
  skipFilters?: boolean;
}

// Terminal Enhancement Types
export interface TerminalSize {
  width: number;
  height: number;
}

export interface ShellCommand {
  command: string;
  args: string[];
  filters: Record<string, any>;
}

export interface Theme {
  primary: any;
  secondary: any;
  success: any;
  warning: any;
  error: any;
  muted: any;
  accent: any;
  electric: any;
  neon: any;
} 