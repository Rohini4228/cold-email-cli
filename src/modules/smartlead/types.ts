export interface Campaign {
  id: number;
  name: string;
  status: "ACTIVE" | "PAUSED" | "STOPPED" | "DRAFTED" | "COMPLETED";
  created_at: string;
  updated_at: string;
  max_leads_per_day?: number;
  min_time_btwn_emails?: number;
  follow_up_percentage?: number;
  send_as_plain_text?: boolean;
  enable_ai_esp_matching?: boolean;
  timezone?: string;
  sending_schedule?: string;
  send_on_weekends?: boolean;
  smart_delivery?: boolean;
  ab_testing_enabled?: boolean;
  client_id?: number;
}

export interface Lead {
  id: number;
  email: string;
  first_name?: string;
  last_name?: string;
  company_name?: string;
  phone_number?: string;
  website?: string;
  location?: string;
  linkedin_profile?: string;
  created_at: string;
  updated_at?: string;
  is_unsubscribed?: boolean;
  custom_fields?: Record<string, any>;
}

export interface LeadInCampaign {
  lead: Lead;
  status: string;
  category_id?: number;
  sequence_step?: number;
  last_activity_at?: string;
}

export interface EmailAccount {
  id: number;
  email: string;
  name: string;
  smtp_host: string;
  smtp_port: number;
  imap_host: string;
  imap_port: number;
  username?: string;
  status: "active" | "inactive" | "failed" | "reconnecting";
  warmup_enabled?: boolean;
  daily_limit?: number;
  created_at: string;
  updated_at?: string;
}

export interface WarmupSettings {
  daily_emails?: number;
  rampup_increment?: number;
  reply_rate?: number;
  enabled?: boolean;
  max_emails_per_day?: number;
}

export interface WarmupStats {
  total_sent: number;
  total_received: number;
  reply_rate: number;
  delivery_rate: number;
  daily_breakdown?: Array<{
    date: string;
    sent: number;
    received: number;
    replies: number;
  }>;
}

export interface CampaignAnalytics {
  campaign_id: number;
  total_leads: number;
  emails_sent: number;
  emails_opened: number;
  emails_clicked: number;
  emails_replied: number;
  emails_bounced: number;
  unsubscribed: number;
  open_rate: number;
  click_rate: number;
  reply_rate: number;
  bounce_rate: number;
  unsubscribe_rate: number;
  date_range?: {
    start_date: string;
    end_date: string;
  };
}

export interface Webhook {
  id: number;
  campaign_id: number;
  name: string;
  url: string;
  events: string[];
  categories?: string[];
  status: "active" | "inactive";
  created_at: string;
}

export interface LeadCategory {
  id: number;
  name: string;
  color?: string;
  description?: string;
  lead_count?: number;
  created_at: string;
}

export interface EmailSequence {
  id: number;
  campaign_id: number;
  sequence_number: number;
  subject_line: string;
  email_body?: string;
  delay_days: number;
  email_type: "initial" | "followup";
  created_at: string;
}

export interface Client {
  id: number;
  name: string;
  email: string;
  status: string;
  created_at: string;
  permissions?: string[];
}

export interface MessageHistory {
  from: string;
  to: string;
  history: Array<{
    type: "SENT" | "RECEIVED" | "OPENED" | "CLICKED" | "REPLIED";
    time: string;
    subject?: string;
    email_body?: string;
    message_id?: string;
  }>;
}

export interface BlockListEntry {
  id: number;
  domain?: string;
  email?: string;
  reason?: string;
  created_at: string;
  client_id?: number;
}

export interface SmartLeadAPIResponse<T = any> {
  data?: T;
  total_leads?: number;
  total_count?: number;
  upload_count?: number;
  duplicate_count?: number;
  invalid_email_count?: number;
  already_added_to_campaign?: number;
  unsubscribed_leads?: number;
  success?: boolean;
  message?: string;
  error?: string;
}

export interface LeadAddSettings {
  ignore_global_block_list?: boolean;
  ignore_unsubscribe_list?: boolean;
  ignore_duplicate_leads_in_other_campaign?: boolean;
}

export interface CampaignSchedule {
  timezone?: string;
  days?: string;
  start_hour?: string;
  end_hour?: string;
  min_time_between_emails?: number;
  max_leads_per_day?: number;
}

export interface CampaignSettings {
  track_email_open?: string;
  stop_on?: string;
  send_as_plain_text?: boolean;
  follow_up_percentage?: number;
  enable_ai_esp_matching?: boolean;
  smart_delivery?: boolean;
  ab_testing_enabled?: boolean;
}

export interface LeadSearchParams {
  email?: string;
  company?: string;
  name?: string;
  status?: string;
  limit?: number;
  offset?: number;
}

export interface CampaignCreateData {
  name: string;
  client_id?: number;
}

export interface LeadUpdateData {
  email?: string;
  first_name?: string;
  last_name?: string;
  company_name?: string;
  phone_number?: string;
  website?: string;
  location?: string;
  linkedin_profile?: string;
}

export interface WebhookCreateData {
  name: string;
  url: string;
  events: string[];
  categories?: string[];
}

export interface EmailAccountCreateData {
  email: string;
  name: string;
  password?: string;
  smtp_host: string;
  smtp_port: number;
  imap_host: string;
  imap_port: number;
  daily_limit?: number;
}

export interface SequenceCreateData {
  subject_line: string;
  email_body?: string;
  delay_days: number;
  email_type: "initial" | "followup";
}
