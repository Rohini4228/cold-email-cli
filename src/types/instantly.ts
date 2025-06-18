import { z } from 'zod';

// Base schemas
export const TimezoneSchema = z.enum([
  'Etc/GMT+12', 'Etc/GMT+11', 'Etc/GMT+10', 'America/Anchorage', 'America/Dawson',
  'America/Creston', 'America/Chihuahua', 'America/Boise', 'America/Belize', 'America/Chicago'
  // Add more timezones as needed
]);

export const CampaignStatusSchema = z.union([
  z.literal(0), // Draft
  z.literal(1), // Active
  z.literal(2), // Paused
  z.literal(3), // Completed
  z.literal(4), // Running Subsequences
  z.literal(-99), // Account Suspended
  z.literal(-1), // Accounts Unhealthy
  z.literal(-2), // Bounce Protect
]);

export const AccountWarmupStatusSchema = z.union([
  z.literal(0), // Paused
  z.literal(1), // Active
  z.literal(-1), // Banned
  z.literal(-2), // Spam Folder Unknown
  z.literal(-3), // Permanent Suspension
]);

export const AccountStatusSchema = z.union([
  z.literal(1), // Active
  z.literal(2), // Paused
  z.literal(-1), // Connection Error
  z.literal(-2), // Soft Bounce Error
  z.literal(-3), // Sending Error
]);

export const ProviderCodeSchema = z.union([
  z.literal(1), // Custom IMAP/SMTP
  z.literal(2), // Google
  z.literal(3), // Microsoft
  z.literal(4), // AWS
]);

// Account schemas
export const AccountWarmupSchema = z.object({
  limit: z.number(),
  advanced: z.object({}).optional(),
  warmup_custom_ftag: z.string().optional(),
  increment: z.string().optional(),
  reply_rate: z.number().optional(),
});

export const AccountStatusMessageSchema = z.object({
  code: z.string().optional(),
  command: z.string().optional(),
  response: z.string().optional(),
  e_message: z.string().optional(),
  responseCode: z.number().optional(),
});

export const AccountSchema = z.object({
  email: z.string().email(),
  timestamp_created: z.string().datetime(),
  timestamp_updated: z.string().datetime(),
  first_name: z.string(),
  last_name: z.string(),
  organization: z.string().uuid(),
  warmup_status: AccountWarmupStatusSchema,
  provider_code: ProviderCodeSchema,
  setup_pending: z.boolean(),
  is_managed_account: z.boolean(),
  warmup: AccountWarmupSchema.optional(),
  added_by: z.string().uuid().nullable(),
  daily_limit: z.number().nullable(),
  modified_by: z.string().uuid().nullable(),
  tracking_domain_name: z.string().nullable(),
  tracking_domain_status: z.string().nullable(),
  status: AccountStatusSchema,
  enable_slow_ramp: z.boolean().nullable(),
  inbox_placement_test_limit: z.number().nullable(),
  timestamp_last_used: z.string().datetime().nullable(),
  status_message: AccountStatusMessageSchema.optional(),
  timestamp_warmup_start: z.string().datetime().nullable(),
  warmup_pool_id: z.string().uuid().nullable(),
  dfy_password_changed: z.boolean().nullable(),
  stat_warmup_score: z.number().nullable(),
  sending_gap: z.number().min(0).max(1440).optional(),
});

// Campaign schemas
export const CampaignScheduleTimingSchema = z.object({
  from: z.string().regex(/^([01][0-9]|2[0-3]):([0-5][0-9])$/),
  to: z.string().regex(/^([01][0-9]|2[0-3]):([0-5][0-9])$/),
});

export const CampaignScheduleDaysSchema = z.object({
  0: z.boolean().optional(), // Sunday
  1: z.boolean().optional(), // Monday
  2: z.boolean().optional(), // Tuesday
  3: z.boolean().optional(), // Wednesday
  4: z.boolean().optional(), // Thursday
  5: z.boolean().optional(), // Friday
  6: z.boolean().optional(), // Saturday
});

export const CampaignScheduleItemSchema = z.object({
  name: z.string(),
  timing: CampaignScheduleTimingSchema,
  days: CampaignScheduleDaysSchema,
  timezone: TimezoneSchema,
});

export const CampaignScheduleSchema = z.object({
  schedules: z.array(CampaignScheduleItemSchema).nonempty(),
  start_date: z.string().datetime().optional(),
  end_date: z.string().datetime().optional(),
});

export const AutoVariantSelectSchema = z.object({
  trigger: z.string().optional(),
});

export const SequenceStepSchema = z.object({
  subject: z.string(),
  body: z.string(),
  delay_days: z.number().optional(),
  step_number: z.number().optional(),
});

export const SequenceSchema = z.object({
  name: z.string(),
  steps: z.array(SequenceStepSchema),
});

export const CampaignSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  status: CampaignStatusSchema.optional(),
  campaign_schedule: CampaignScheduleSchema,
  timestamp_created: z.string().datetime().optional(),
  timestamp_updated: z.string().datetime().optional(),
  pl_value: z.number().nullable().optional(),
  is_evergreen: z.boolean().nullable().optional(),
  sequences: z.array(SequenceSchema).optional(),
  email_gap: z.number().nullable().optional(),
  random_wait_max: z.number().nullable().optional(),
  text_only: z.boolean().nullable().optional(),
  email_list: z.array(z.string().email()).optional(),
  daily_limit: z.number().nullable().optional(),
  stop_on_reply: z.boolean().nullable().optional(),
  email_tag_list: z.array(z.string().uuid()).optional(),
  link_tracking: z.boolean().nullable().optional(),
  open_tracking: z.boolean().nullable().optional(),
  stop_on_auto_reply: z.boolean().nullable().optional(),
  daily_max_leads: z.number().nullable().optional(),
  prioritize_new_leads: z.boolean().nullable().optional(),
  auto_variant_select: AutoVariantSelectSchema.optional(),
  match_lead_esp: z.boolean().nullable().optional(),
  stop_for_company: z.boolean().nullable().optional(),
  insert_unsubscribe_header: z.boolean().nullable().optional(),
  allow_risky_contacts: z.boolean().nullable().optional(),
  disable_bounce_protect: z.boolean().nullable().optional(),
  cc_list: z.array(z.string().email()).optional(),
  bcc_list: z.array(z.string().email()).optional(),
  organization: z.string().uuid().nullable().optional(),
});

// Email schemas
export const EmailTypeSchema = z.union([
  z.literal(1), // Sent from campaign
  z.literal(2), // Received
  z.literal(3), // Sent
  z.literal(4), // Scheduled
]);

export const EmailBodySchema = z.object({
  text: z.string().optional(),
  html: z.string().optional(),
});

export const EmailSchema = z.object({
  id: z.string().uuid(),
  timestamp_created: z.string().datetime(),
  timestamp_email: z.string().datetime(),
  message_id: z.string(),
  subject: z.string(),
  to_address_email_list: z.string(),
  body: EmailBodySchema,
  organization_id: z.string().uuid(),
  eaccount: z.string(),
  from_address_email: z.string().email().nullable(),
  cc_address_email_list: z.string().nullable(),
  bcc_address_email_list: z.string().nullable(),
  reply_to: z.string().nullable(),
  campaign_id: z.string().uuid().nullable(),
  subsequence_id: z.string().uuid().nullable(),
  list_id: z.string().uuid().nullable(),
  lead: z.string().nullable(),
  lead_id: z.string().uuid().nullable(),
  ue_type: EmailTypeSchema.nullable(),
  step: z.string().nullable(),
  is_unread: z.number().nullable(),
  is_auto_reply: z.number().nullable(),
  reminder_ts: z.string().datetime().nullable(),
  ai_interest_value: z.number().nullable(),
  ai_assisted: z.number().nullable(),
  is_focused: z.number().nullable(),
  i_status: z.number().nullable(),
  thread_id: z.string().uuid().nullable(),
  content_preview: z.string().nullable(),
  from_address_json: z.array(z.any()).nullable(),
  to_address_json: z.array(z.any()).nullable(),
  cc_address_json: z.array(z.any()).nullable(),
});

// Lead schemas
export const LeadSchema = z.object({
  id: z.string().uuid().optional(),
  email: z.string().email(),
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  company: z.string().optional(),
  custom_variables: z.record(z.string(), z.any()).optional(),
  status: z.string().optional(),
  campaign_id: z.string().uuid().optional(),
  list_id: z.string().uuid().optional(),
  timestamp_created: z.string().datetime().optional(),
  timestamp_updated: z.string().datetime().optional(),
});

// Analytics schemas
export const CampaignAnalyticsSchema = z.object({
  campaign_name: z.string(),
  campaign_id: z.string().uuid(),
  campaign_status: CampaignStatusSchema,
  campaign_is_evergreen: z.boolean(),
  leads_count: z.number(),
  contacted_count: z.number(),
  open_count: z.number(),
  reply_count: z.number(),
  link_click_count: z.number(),
  bounced_count: z.number(),
  unsubscribed_count: z.number(),
  completed_count: z.number(),
  emails_sent_count: z.number(),
  new_leads_contacted_count: z.number(),
  total_opportunities: z.number(),
  total_opportunity_value: z.number(),
});

export const AnalyticsOverviewSchema = z.object({
  open_count: z.number(),
  open_count_unique: z.number(),
  open_count_unique_by_step: z.number(),
  link_click_count: z.number(),
  link_click_count_unique: z.number(),
  link_click_count_unique_by_step: z.number(),
  reply_count: z.number(),
  reply_count_unique: z.number(),
  reply_count_unique_by_step: z.number(),
  bounced_count: z.number(),
  unsubscribed_count: z.number(),
  completed_count: z.number(),
  emails_sent_count: z.number(),
  new_leads_contacted_count: z.number(),
  total_opportunities: z.number(),
  total_opportunity_value: z.number(),
  total_interested: z.number(),
  total_meeting_booked: z.number(),
  total_meeting_completed: z.number(),
  total_closed: z.number(),
});

export const DailyAnalyticsSchema = z.object({
  date: z.string(),
  sent: z.number(),
  opened: z.number(),
  unique_opened: z.number(),
  replies: z.number(),
  unique_replies: z.number(),
  clicks: z.number(),
  unique_clicks: z.number(),
});

export const StepAnalyticsSchema = z.object({
  step: z.string(),
  variant: z.string(),
  sent: z.number(),
  opened: z.number(),
  unique_opened: z.number(),
  replies: z.number(),
  unique_replies: z.number(),
  clicks: z.number(),
  unique_clicks: z.number(),
});

// API Response schemas
export const PaginatedResponseSchema = <T>(itemSchema: z.ZodType<T>) => z.object({
  items: z.array(itemSchema),
  next_starting_after: z.string().optional(),
});

// Email Verification schemas
export const EmailVerificationSchema = z.object({
  email: z.string().email(),
  status: z.string(),
  result: z.string().optional(),
  reason: z.string().optional(),
  timestamp_created: z.string().datetime().optional(),
});

// Lead List schemas
export const LeadListSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  description: z.string().optional(),
  leads_count: z.number().optional(),
  timestamp_created: z.string().datetime().optional(),
  timestamp_updated: z.string().datetime().optional(),
});

// Subsequence schemas
export const SubsequenceSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  campaign_id: z.string().uuid().optional(),
  status: z.string().optional(),
  steps: z.array(SequenceStepSchema).optional(),
  timestamp_created: z.string().datetime().optional(),
  timestamp_updated: z.string().datetime().optional(),
});

// Custom Tag schemas
export const CustomTagSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  color: z.string().optional(),
  description: z.string().optional(),
  timestamp_created: z.string().datetime().optional(),
  timestamp_updated: z.string().datetime().optional(),
});

// Block List Entry schemas
export const BlockListEntrySchema = z.object({
  id: z.string().uuid().optional(),
  email: z.string().email().optional(),
  domain: z.string().optional(),
  reason: z.string().optional(),
  timestamp_created: z.string().datetime().optional(),
});

// Lead Label schemas
export const LeadLabelSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  color: z.string().optional(),
  description: z.string().optional(),
  timestamp_created: z.string().datetime().optional(),
  timestamp_updated: z.string().datetime().optional(),
});

// Workspace schemas
export const WorkspaceSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  settings: z.record(z.string(), z.any()).optional(),
  timestamp_created: z.string().datetime().optional(),
  timestamp_updated: z.string().datetime().optional(),
});

// Background Job schemas
export const BackgroundJobSchema = z.object({
  id: z.string().uuid(),
  status: z.string(),
  type: z.string(),
  progress: z.number().optional(),
  result: z.any().optional(),
  error: z.string().optional(),
  timestamp_created: z.string().datetime(),
  timestamp_updated: z.string().datetime(),
});

// API Key schemas
export const APIKeySchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  scopes: z.array(z.string()),
  key: z.string().optional(),
  timestamp_created: z.string().datetime().optional(),
  timestamp_last_used: z.string().datetime().optional(),
});

// Export types
export type Account = z.infer<typeof AccountSchema>;
export type Campaign = z.infer<typeof CampaignSchema>;
export type Email = z.infer<typeof EmailSchema>;
export type Lead = z.infer<typeof LeadSchema>;
export type CampaignAnalytics = z.infer<typeof CampaignAnalyticsSchema>;
export type AnalyticsOverview = z.infer<typeof AnalyticsOverviewSchema>;
export type DailyAnalytics = z.infer<typeof DailyAnalyticsSchema>;
export type StepAnalytics = z.infer<typeof StepAnalyticsSchema>;
export type EmailVerification = z.infer<typeof EmailVerificationSchema>;
export type LeadList = z.infer<typeof LeadListSchema>;
export type Subsequence = z.infer<typeof SubsequenceSchema>;
export type CustomTag = z.infer<typeof CustomTagSchema>;
export type BlockListEntry = z.infer<typeof BlockListEntrySchema>;
export type LeadLabel = z.infer<typeof LeadLabelSchema>;
export type Workspace = z.infer<typeof WorkspaceSchema>;
export type BackgroundJob = z.infer<typeof BackgroundJobSchema>;
export type APIKey = z.infer<typeof APIKeySchema>; 