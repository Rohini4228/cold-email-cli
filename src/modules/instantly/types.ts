/**
 * Instantly v2 API TypeScript Definitions
 * Complete type definitions for all Instantly API v2 endpoints
 */

// Base API Response Types
export interface InstantlyApiResponse<T = any> {
  data?: T;
  success: boolean;
  message?: string;
  errors?: string[];
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    path: string;
    per_page: number;
    to: number;
    total: number;
  };
}

// Account Types
export interface InstantlyAccount {
  email: string;
  timestamp_created: string;
  timestamp_updated: string;
  first_name: string;
  last_name: string;
  organization: string;
  warmup_status: number; // 0: Paused, 1: Active, -1: Banned, -2: Spam Folder Unknown, -3: Permanent Suspension
  provider_code: number; // 1: Custom IMAP/SMTP, 2: Google, 3: Microsoft, 4: AWS
  setup_pending: boolean;
  is_managed_account: boolean;
  warmup?: WarmupConfig;
  added_by?: string;
  daily_limit?: number;
  modified_by?: string;
  tracking_domain_name?: string;
  tracking_domain_status?: string;
  status: number; // 1: Active, 2: Paused, -1: Connection Error, -2: Soft Bounce Error, -3: Sending Error
  enable_slow_ramp?: boolean;
  inbox_placement_test_limit?: number;
  timestamp_last_used?: string;
  status_message?: StatusMessage;
  timestamp_warmup_start?: string;
  warmup_pool_id?: string;
  dfy_password_changed?: boolean;
  stat_warmup_score?: number;
  sending_gap: number; // 0-1440 minutes
}

export interface WarmupConfig {
  limit: number;
  advanced: WarmupAdvanced;
  warmup_custom_ftag: string;
  increment: string;
  reply_rate: number;
}

export interface WarmupAdvanced {
  send_limit_per_day: number;
  warmup_increment: number;
  warmup_increment_days: number;
}

export interface StatusMessage {
  code: string;
  command: string;
  response: string;
  e_message: string;
  responseCode: number;
}

// Campaign Types
export interface InstantlyCampaign {
  id: string;
  name: string;
  status: number; // 0: Draft, 1: Active, 2: Paused, 3: Completed, 4: Running Subsequences, -99: Account Suspended, -1: Accounts Unhealthy, -2: Bounce Protect
  campaign_schedule: CampaignSchedule;
  timestamp_created: string;
  timestamp_updated: string;
  pl_value?: number;
  is_evergreen?: boolean;
  sequences?: CampaignSequence[];
  email_gap?: number;
  random_wait_max?: number;
  text_only?: boolean;
  email_list?: string[];
  daily_limit?: number;
  stop_on_reply?: boolean;
  email_tag_list?: string[];
  link_tracking?: boolean;
  open_tracking?: boolean;
  stop_on_auto_reply?: boolean;
  daily_max_leads?: number;
  prioritize_new_leads?: boolean;
  auto_variant_select?: AutoVariantSelect;
  match_lead_esp?: boolean;
  stop_for_company?: boolean;
  insert_unsubscribe_header?: boolean;
  allow_risky_contacts?: boolean;
  disable_bounce_protect?: boolean;
  cc_list?: string[];
  bcc_list?: string[];
  organization?: string;
}

export interface CampaignSchedule {
  start_date?: string;
  end_date?: string;
  schedules: Schedule[];
}

export interface Schedule {
  name: string;
  timing: {
    from: string; // HH:MM format
    to: string; // HH:MM format
  };
  days: {
    0?: boolean; // Sunday
    1?: boolean; // Monday
    2?: boolean; // Tuesday
    3?: boolean; // Wednesday
    4?: boolean; // Thursday
    5?: boolean; // Friday
    6?: boolean; // Saturday
  };
  timezone: string;
}

export interface CampaignSequence {
  name: string;
  steps: CampaignStep[];
}

export interface CampaignStep {
  id: string;
  subject: string;
  body: string;
  delay_days: number;
  step_number: number;
}

export interface AutoVariantSelect {
  trigger: string; // 'click_rate' etc.
}

// Email Types
export interface InstantlyEmail {
  id: string;
  timestamp_created: string;
  timestamp_email: string;
  message_id: string;
  subject: string;
  to_address_email_list: string;
  body: EmailBody;
  organization_id: string;
  eaccount: string;
  from_address_email?: string;
  cc_address_email_list?: string;
  bcc_address_email_list?: string;
  reply_to?: string;
  campaign_id?: string;
  subsequence_id?: string;
  list_id?: string;
  lead?: string;
  lead_id?: string;
  ue_type?: number; // 1: Sent from campaign, 2: Received, 3: Sent, 4: Scheduled
  step?: string;
  is_unread?: number;
  is_auto_reply?: number;
  reminder_ts?: string;
  ai_interest_value?: number;
  ai_assisted?: number;
  is_focused?: number;
  i_status?: number;
  thread_id?: string;
  content_preview?: string;
  from_address_json?: any[];
  to_address_json?: any[];
  cc_address_json?: any[];
}

export interface EmailBody {
  text?: string;
  html?: string;
}

// Lead Types
export interface InstantlyLead {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  company_name?: string;
  website?: string;
  phone?: string;
  linkedin_url?: string;
  title?: string;
  location?: string;
  industry?: string;
  tags?: string[];
  labels?: string[];
  custom_variables?: Record<string, any>;
  timestamp_created: string;
  timestamp_updated: string;
  status?: string;
  campaign_id?: string;
  list_id?: string;
  organization_id: string;
}

// Lead List Types
export interface InstantlyLeadList {
  id: string;
  name: string;
  description?: string;
  timestamp_created: string;
  timestamp_updated: string;
  organization_id: string;
  lead_count?: number;
  tags?: string[];
}

// Analytics Types
export interface CampaignAnalytics {
  campaign_id: string;
  sent: number;
  delivered: number;
  opened: number;
  clicked: number;
  replied: number;
  bounced: number;
  unsubscribed: number;
  open_rate: number;
  click_rate: number;
  reply_rate: number;
  bounce_rate: number;
  unsubscribe_rate: number;
}

export interface WarmupAnalytics {
  account_email: string;
  warmup_score: number;
  emails_sent: number;
  emails_received: number;
  replies_sent: number;
  reputation_status: string;
}

// Email Verification Types
export interface EmailVerification {
  email: string;
  status: string; // 'valid', 'invalid', 'risky', 'unknown'
  result: string;
  reason?: string;
  mx_provider?: string;
  is_role_account?: boolean;
  is_disposable?: boolean;
  is_catch_all?: boolean;
  timestamp_verified: string;
}

// Inbox Placement Test Types
export interface InboxPlacementTest {
  id: string;
  name: string;
  status: string;
  timestamp_created: string;
  timestamp_updated: string;
  email_subject: string;
  email_body: string;
  from_name: string;
  from_email: string;
  test_results?: InboxPlacementResult[];
}

export interface InboxPlacementResult {
  provider: string;
  placement: string; // 'inbox', 'spam', 'promotions', 'not_delivered'
  delivery_time?: number;
}

// API Key Types
export interface InstantlyApiKey {
  id: string;
  name: string;
  key: string;
  scopes: string[];
  timestamp_created: string;
  last_used?: string;
  is_active: boolean;
}

// Custom Tag Types
export interface InstantlyCustomTag {
  id: string;
  name: string;
  color?: string;
  description?: string;
  timestamp_created: string;
  timestamp_updated: string;
  organization_id: string;
}

// Block List Types
export interface BlockListEntry {
  id: string;
  email?: string;
  domain?: string;
  reason?: string;
  timestamp_created: string;
  organization_id: string;
}

// Lead Label Types
export interface InstantlyLeadLabel {
  id: string;
  name: string;
  color?: string;
  description?: string;
  timestamp_created: string;
  timestamp_updated: string;
  organization_id: string;
}

// Workspace Types
export interface InstantlyWorkspace {
  id: string;
  name: string;
  description?: string;
  timestamp_created: string;
  timestamp_updated: string;
  settings?: WorkspaceSettings;
}

export interface WorkspaceSettings {
  timezone?: string;
  default_schedule?: Schedule;
  email_signature?: string;
}

// Background Job Types
export interface BackgroundJob {
  id: string;
  type: string;
  status: string; // 'pending', 'running', 'completed', 'failed'
  progress?: number;
  result?: any;
  error_message?: string;
  timestamp_created: string;
  timestamp_updated: string;
}

// Campaign Subsequence Types
export interface CampaignSubsequence {
  id: string;
  name: string;
  campaign_id: string;
  status: string;
  steps: SubsequenceStep[];
  timestamp_created: string;
  timestamp_updated: string;
}

export interface SubsequenceStep {
  id: string;
  subject: string;
  body: string;
  delay_days: number;
  step_number: number;
}

// Audit Log Types
export interface AuditLog {
  id: string;
  action: string;
  resource_type: string;
  resource_id: string;
  user_id: string;
  timestamp: string;
  details?: Record<string, any>;
}

// Request/Response Types for API calls
export interface CreateAccountRequest {
  email: string;
  first_name: string;
  last_name: string;
  provider_code: number;
  smtp_username?: string;
  smtp_password?: string;
  smtp_host?: string;
  smtp_port?: number;
  imap_username?: string;
  imap_password?: string;
  imap_host?: string;
  imap_port?: number;
  daily_limit?: number;
  sending_gap?: number;
}

export interface CreateCampaignRequest {
  name: string;
  campaign_schedule: CampaignSchedule;
  sequences?: CampaignSequence[];
  email_list?: string[];
  daily_limit?: number;
  email_gap?: number;
  stop_on_reply?: boolean;
  link_tracking?: boolean;
  open_tracking?: boolean;
}

export interface CreateLeadRequest {
  email: string;
  first_name?: string;
  last_name?: string;
  company_name?: string;
  website?: string;
  phone?: string;
  linkedin_url?: string;
  title?: string;
  location?: string;
  industry?: string;
  custom_variables?: Record<string, any>;
}

export interface AddLeadsToListRequest {
  list_id: string;
  leads: CreateLeadRequest[];
}

export interface SendEmailReplyRequest {
  thread_id: string;
  subject: string;
  body: EmailBody;
  to_address_email_list: string;
  cc_address_email_list?: string;
  bcc_address_email_list?: string;
}

// Command Types for CLI
export interface InstantlyCommand {
  name: string;
  description: string;
  usage: string;
  examples: string[];
  category: string;
}

// Configuration Types
export interface InstantlyConfig {
  apiKey?: string;
  baseUrl?: string;
  workspace?: string;
  defaultSettings?: {
    dailyLimit?: number;
    emailGap?: number;
    timezone?: string;
  };
}
