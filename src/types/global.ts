/**
 * Global type definitions for Cold Email CLI
 * Supports SmartLead, Instantly, Salesforge, and Apollo modules
 */

export interface CLICommand {
  name: string;
  description: string;
  usage: string;
  category: string;
  options?: CommandOption[];
  examples?: string[];
  handler: (args: Record<string, any>) => Promise<void>;
}

export interface CommandOption {
  flag: string;
  description: string;
  required?: boolean;
  type?: 'string' | 'number' | 'boolean' | 'array';
  default?: any;
  choices?: string[];
}

export interface CLIModule {
  name: string;
  description: string;
  version: string;
  commands: CLICommand[];
  execute(command: string, args: Record<string, any>): Promise<void>;
}

export interface ModuleInfo {
  name: string;
  description: string;
  version: string;
  commandCount: number;
  status: 'Available' | 'Coming Soon' | 'Beta';
  color: string;
  icon: string;
}

// Configuration types
export interface ModuleConfig {
  apiKey?: string;
  baseUrl?: string;
  [key: string]: any;
}

export interface Config {
  defaultModule?: string;
  modules: Record<string, ModuleConfig>;
  lastUsed?: string;
}

// SmartLead specific types
export interface SmartLeadCampaign {
  id: string;
  name: string;
  status: 'active' | 'paused' | 'completed' | 'draft';
  created_at: string;
  updated_at: string;
  daily_limit: number;
  timezone: string;
  analytics: SmartLeadCampaignAnalytics;
}

export interface SmartLeadCampaignAnalytics {
  sent: number;
  delivered: number;
  opens: number;
  clicks: number;
  replies: number;
  bounces: number;
  unsubscribes: number;
  open_rate: number;
  click_rate: number;
  reply_rate: number;
  bounce_rate: number;
}

export interface SmartLeadLead {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  company: string;
  title: string;
  phone?: string;
  linkedin?: string;
  status: 'active' | 'replied' | 'bounced' | 'unsubscribed' | 'paused';
  campaign_id: string;
  created_at: string;
  last_contacted: string;
  engagement_score: number;
}

export interface SmartLeadEmailAccount {
  id: string;
  email: string;
  provider: 'google' | 'outlook' | 'smtp' | 'other';
  status: 'connected' | 'disconnected' | 'error' | 'warming';
  daily_limit: number;
  sent_today: number;
  warmup_enabled: boolean;
  deliverability_score: number;
  reputation_status: 'good' | 'warning' | 'poor';
}

// Instantly specific types
export interface InstantlyCampaign {
  id: string;
  name: string;
  status: 'active' | 'paused' | 'draft';
  created_at: string;
  leads_count: number;
  sequence_steps: number;
  daily_limit: number;
  track_opens: boolean;
  track_clicks: boolean;
  analytics: InstantlyAnalytics;
}

export interface InstantlyAnalytics {
  emails_sent: number;
  opens: number;
  clicks: number;
  replies: number;
  bounces: number;
  opt_outs: number;
  open_rate: number;
  click_rate: number;
  reply_rate: number;
}

export interface InstantlyLead {
  email: string;
  first_name?: string;
  last_name?: string;
  company?: string;
  website?: string;
  custom_variables?: Record<string, string>;
  status: 'active' | 'paused' | 'completed' | 'replied' | 'bounced';
  campaign_id: string;
  sequence_step: number;
}

export interface InstantlyAccount {
  email: string;
  smtp_host: string;
  smtp_port: number;
  username: string;
  status: 'active' | 'inactive' | 'error';
  daily_limit: number;
  sent_today: number;
  warmup_enabled: boolean;
  provider: string;
}

// Salesforge specific types
export interface SalesforgeCampaign {
  id: string;
  name: string;
  type: 'email' | 'multichannel';
  status: 'active' | 'paused' | 'draft';
  ai_optimization_enabled: boolean;
  created_at: string;
  target_personas: string[];
  industry: string;
  performance_goal: 'open-rate' | 'click-rate' | 'reply-rate' | 'conversion';
  ai_insights: SalesforgeAIInsights;
}

export interface SalesforgeAIInsights {
  performance_score: number;
  optimization_suggestions: string[];
  predicted_performance: {
    open_rate: number;
    click_rate: number;
    reply_rate: number;
    confidence: number;
  };
  best_send_times: string[];
  persona_match_score: number;
}

export interface SalesforgeSequence {
  id: string;
  name: string;
  campaign_id: string;
  steps: SalesforgeSequenceStep[];
  ai_generated: boolean;
  persona: string;
  industry: string;
  performance_metrics: SalesforgeSequenceMetrics;
}

export interface SalesforgeSequenceStep {
  step_number: number;
  channel: 'email' | 'linkedin' | 'phone' | 'sms';
  delay_days: number;
  content: string;
  subject?: string;
  ai_optimized: boolean;
  personalization_tokens: string[];
}

export interface SalesforgeSequenceMetrics {
  sends: number;
  opens: number;
  clicks: number;
  replies: number;
  ai_performance_score: number;
  optimization_potential: number;
}

export interface SalesforgeTemplate {
  id: string;
  name: string;
  content: string;
  subject: string;
  category: string;
  ai_optimized: boolean;
  persona: string;
  industry: string;
  performance_score: number;
  usage_count: number;
  last_optimized: string;
}

// Apollo specific types
export interface ApolloSequence {
  id: string;
  name: string;
  status: 'active' | 'paused' | 'archived';
  steps_count: number;
  contacts_count: number;
  created_at: string;
  folder: string;
  performance: ApolloSequencePerformance;
}

export interface ApolloSequencePerformance {
  emails_sent: number;
  opens: number;
  clicks: number;
  replies: number;
  bounces: number;
  opt_outs: number;
  open_rate: number;
  click_rate: number;
  reply_rate: number;
  deliverability_rate: number;
}

export interface ApolloContact {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  title: string;
  company: string;
  phone?: string;
  linkedin_url?: string;
  sequence_status?: 'not_contacted' | 'contacted' | 'replied' | 'bounced' | 'opted_out';
  sequence_step?: number;
  last_contacted?: string;
}

export interface ApolloEmailTemplate {
  id: string;
  name: string;
  subject: string;
  body: string;
  category: string;
  usage_count: number;
  performance_metrics: ApolloTemplateMetrics;
  variables: string[];
}

export interface ApolloTemplateMetrics {
  sends: number;
  opens: number;
  clicks: number;
  replies: number;
  open_rate: number;
  click_rate: number;
  reply_rate: number;
}

export interface ApolloEmailAccount {
  email: string;
  status: 'active' | 'inactive' | 'error';
  daily_limit: number;
  sent_today: number;
  quota_remaining: number;
  warmup_enabled: boolean;
  provider: string;
  last_checked: string;
}

// Common API response types
export interface APIResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  pagination?: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
}

export interface PaginationOptions {
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface FilterOptions {
  status?: string[];
  date_from?: string;
  date_to?: string;
  search?: string;
}

// Analytics and reporting types
export interface AnalyticsMetrics {
  total_campaigns: number;
  total_leads: number;
  total_emails_sent: number;
  overall_open_rate: number;
  overall_click_rate: number;
  overall_reply_rate: number;
  overall_bounce_rate: number;
  revenue_generated?: number;
  roi?: number;
}

export interface PerformanceTrend {
  date: string;
  metrics: {
    sent: number;
    opens: number;
    clicks: number;
    replies: number;
    bounces: number;
  };
  rates: {
    open_rate: number;
    click_rate: number;
    reply_rate: number;
    bounce_rate: number;
  };
}

export interface CohortAnalysis {
  cohort_period: string;
  size: number;
  retention_rates: number[];
  engagement_rates: number[];
  conversion_rates?: number[];
}

// Error types
export interface CLIError {
  code: string;
  message: string;
  details?: any;
  timestamp: string;
}

// Export and import types
export interface ExportOptions {
  format: 'csv' | 'xlsx' | 'json';
  include_analytics?: boolean;
  date_range?: {
    from: string;
    to: string;
  };
  filters?: FilterOptions;
}

export interface ImportResult {
  total_processed: number;
  successful: number;
  failed: number;
  errors: string[];
  warnings: string[];
}

// Webhook and integration types
export interface WebhookConfig {
  url: string;
  events: string[];
  secret?: string;
  active: boolean;
  retry_attempts: number;
}

export interface CRMIntegration {
  platform: 'salesforce' | 'hubspot' | 'pipedrive' | 'custom';
  status: 'connected' | 'disconnected' | 'error';
  sync_enabled: boolean;
  last_sync: string;
  field_mappings: Record<string, string>;
}

// Type guards for runtime type checking
export function isSmartLeadCampaign(obj: any): obj is SmartLeadCampaign {
  return obj && typeof obj.id === 'string' && obj.analytics;
}

export function isInstantlyCampaign(obj: any): obj is InstantlyCampaign {
  return obj && typeof obj.id === 'string' && typeof obj.track_opens === 'boolean';
}

export function isSalesforgeCampaign(obj: any): obj is SalesforgeCampaign {
  return obj && typeof obj.id === 'string' && typeof obj.ai_optimization_enabled === 'boolean';
}

export function isApolloSequence(obj: any): obj is ApolloSequence {
  return obj && typeof obj.id === 'string' && typeof obj.steps_count === 'number';
} 