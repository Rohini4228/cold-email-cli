import { z } from "zod";

// Global Schemas
export const APIResponseSchema = z.object({
  success: z.boolean(),
  data: z.any().optional(),
  error: z.string().optional(),
  message: z.string().optional(),
  pagination: z
    .object({
      page: z.number(),
      limit: z.number(),
      total: z.number(),
      pages: z.number(),
    })
    .optional(),
});

export const CommandArgsSchema = z.record(z.any());

// Common schemas
export const PaginationSchema = z.object({
  page: z.number().int().positive().optional(),
  limit: z.number().int().min(1).max(1000).optional(),
  offset: z.number().int().min(0).optional(),
});

export const SortSchema = z.object({
  sort_by: z.string().optional(),
  sort_order: z.enum(["asc", "desc"]).optional(),
});

export const DateRangeSchema = z.object({
  date_from: z.string().datetime().optional(),
  date_to: z.string().datetime().optional(),
});

// SmartLead Schemas
export const SmartLeadCampaignSchema = z.object({
  id: z.string(),
  name: z.string(),
  status: z.enum(["active", "paused", "completed", "draft"]),
  created_at: z.string(),
  updated_at: z.string(),
  daily_limit: z.number().int().positive(),
  timezone: z.string(),
  analytics: z.object({
    sent: z.number().int().min(0),
    delivered: z.number().int().min(0),
    opens: z.number().int().min(0),
    clicks: z.number().int().min(0),
    replies: z.number().int().min(0),
    bounces: z.number().int().min(0),
    unsubscribes: z.number().int().min(0),
    open_rate: z.number().min(0).max(100),
    click_rate: z.number().min(0).max(100),
    reply_rate: z.number().min(0).max(100),
    bounce_rate: z.number().min(0).max(100),
  }),
});

export const SmartLeadLeadSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  first_name: z.string(),
  last_name: z.string(),
  company: z.string(),
  title: z.string(),
  phone: z.string().optional(),
  linkedin: z.string().url().optional(),
  status: z.enum(["active", "replied", "bounced", "unsubscribed", "paused"]),
  campaign_id: z.string(),
  created_at: z.string(),
  last_contacted: z.string(),
  engagement_score: z.number().min(0).max(100),
});

export const SmartLeadEmailAccountSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  provider: z.enum(["google", "outlook", "smtp", "other"]),
  status: z.enum(["connected", "disconnected", "error", "warming"]),
  daily_limit: z.number().int().positive(),
  sent_today: z.number().int().min(0),
  warmup_enabled: z.boolean(),
  deliverability_score: z.number().min(0).max(100),
  reputation_status: z.enum(["good", "warning", "poor"]),
});

export const SmartLeadSequenceSchema = z.object({
  id: z.string(),
  name: z.string(),
  campaign_id: z.string(),
  steps: z.array(
    z.object({
      step_number: z.number().int().positive(),
      delay_days: z.number().int().min(0),
      subject: z.string(),
      content: z.string(),
      template_id: z.string().optional(),
    }),
  ),
  analytics: z.object({
    sent: z.number().int().min(0),
    opens: z.number().int().min(0),
    clicks: z.number().int().min(0),
    replies: z.number().int().min(0),
    open_rate: z.number().min(0).max(100),
    click_rate: z.number().min(0).max(100),
    reply_rate: z.number().min(0).max(100),
  }),
});

export const SmartLeadTemplateSchema = z.object({
  id: z.string(),
  name: z.string(),
  subject: z.string(),
  content: z.string(),
  category: z.string(),
  variables: z.array(z.string()),
  usage_count: z.number().int().min(0),
  performance_score: z.number().min(0).max(100),
});

// Instantly Schemas
export const InstantlyCampaignSchema = z.object({
  id: z.string(),
  name: z.string(),
  status: z.enum(["active", "paused", "draft"]),
  created_at: z.string(),
  leads_count: z.number().int().min(0),
  sequence_steps: z.number().int().min(0),
  daily_limit: z.number().int().positive(),
  track_opens: z.boolean(),
  track_clicks: z.boolean(),
  analytics: z.object({
    emails_sent: z.number().int().min(0),
    opens: z.number().int().min(0),
    clicks: z.number().int().min(0),
    replies: z.number().int().min(0),
    bounces: z.number().int().min(0),
    opt_outs: z.number().int().min(0),
    open_rate: z.number().min(0).max(100),
    click_rate: z.number().min(0).max(100),
    reply_rate: z.number().min(0).max(100),
  }),
});

export const InstantlyLeadSchema = z.object({
  email: z.string().email(),
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  company: z.string().optional(),
  website: z.string().url().optional(),
  custom_variables: z.record(z.string()).optional(),
  status: z.enum(["active", "paused", "completed", "replied", "bounced"]),
  campaign_id: z.string(),
  sequence_step: z.number().int().min(0),
});

export const InstantlyAccountSchema = z.object({
  email: z.string().email(),
  smtp_host: z.string(),
  smtp_port: z.number().int().min(1).max(65535),
  username: z.string(),
  status: z.enum(["active", "inactive", "error"]),
  daily_limit: z.number().int().positive(),
  sent_today: z.number().int().min(0),
  warmup_enabled: z.boolean(),
  provider: z.string(),
});

// Salesforge Schemas
export const SalesforgeCampaignSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: z.enum(["email", "multichannel"]),
  status: z.enum(["active", "paused", "draft"]),
  ai_optimization_enabled: z.boolean(),
  created_at: z.string(),
  target_personas: z.array(z.string()),
  industry: z.string(),
  performance_goal: z.enum(["open-rate", "click-rate", "reply-rate", "conversion"]),
  ai_insights: z.object({
    performance_score: z.number().min(0).max(100),
    optimization_suggestions: z.array(z.string()),
    predicted_performance: z.object({
      open_rate: z.number().min(0).max(100),
      click_rate: z.number().min(0).max(100),
      reply_rate: z.number().min(0).max(100),
      confidence: z.number().min(0).max(100),
    }),
    best_send_times: z.array(z.string()),
    persona_match_score: z.number().min(0).max(100),
  }),
});

export const SalesforgeSequenceSchema = z.object({
  id: z.string(),
  name: z.string(),
  campaign_id: z.string(),
  steps: z.array(
    z.object({
      step_number: z.number().int().positive(),
      channel: z.enum(["email", "linkedin", "phone", "sms"]),
      delay_days: z.number().int().min(0),
      content: z.string(),
      subject: z.string().optional(),
      ai_optimized: z.boolean(),
      personalization_tokens: z.array(z.string()),
    }),
  ),
  ai_generated: z.boolean(),
  persona: z.string(),
  industry: z.string(),
  performance_metrics: z.object({
    sends: z.number().int().min(0),
    opens: z.number().int().min(0),
    clicks: z.number().int().min(0),
    replies: z.number().int().min(0),
    ai_performance_score: z.number().min(0).max(100),
    optimization_potential: z.number().min(0).max(100),
  }),
});

export const SalesforgeTemplateSchema = z.object({
  id: z.string(),
  name: z.string(),
  content: z.string(),
  subject: z.string(),
  category: z.string(),
  ai_optimized: z.boolean(),
  persona: z.string(),
  industry: z.string(),
  performance_score: z.number().min(0).max(100),
  usage_count: z.number().int().min(0),
  last_optimized: z.string(),
});

// Apollo Schemas
export const ApolloSequenceSchema = z.object({
  id: z.string(),
  name: z.string(),
  status: z.enum(["active", "paused", "archived"]),
  steps_count: z.number().int().min(0),
  contacts_count: z.number().int().min(0),
  created_at: z.string(),
  folder: z.string(),
  performance: z.object({
    emails_sent: z.number().int().min(0),
    opens: z.number().int().min(0),
    clicks: z.number().int().min(0),
    replies: z.number().int().min(0),
    bounces: z.number().int().min(0),
    opt_outs: z.number().int().min(0),
    open_rate: z.number().min(0).max(100),
    click_rate: z.number().min(0).max(100),
    reply_rate: z.number().min(0).max(100),
    deliverability_rate: z.number().min(0).max(100),
  }),
});

export const ApolloContactSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  first_name: z.string(),
  last_name: z.string(),
  title: z.string(),
  company: z.string(),
  phone: z.string().optional(),
  linkedin_url: z.string().url().optional(),
  sequence_status: z.enum(["not_contacted", "contacted", "replied", "bounced", "opted_out"]).optional(),
  sequence_step: z.number().int().min(0).optional(),
  last_contacted: z.string().optional(),
});

export const ApolloEmailTemplateSchema = z.object({
  id: z.string(),
  name: z.string(),
  subject: z.string(),
  body: z.string(),
  category: z.string(),
  usage_count: z.number().int().min(0),
  performance_metrics: z.object({
    sends: z.number().int().min(0),
    opens: z.number().int().min(0),
    clicks: z.number().int().min(0),
    replies: z.number().int().min(0),
    open_rate: z.number().min(0).max(100),
    click_rate: z.number().min(0).max(100),
    reply_rate: z.number().min(0).max(100),
  }),
  variables: z.array(z.string()),
});

export const ApolloEmailAccountSchema = z.object({
  email: z.string().email(),
  status: z.enum(["active", "inactive", "error"]),
  daily_limit: z.number().int().positive(),
  sent_today: z.number().int().min(0),
  quota_remaining: z.number().int().min(0),
  warmup_enabled: z.boolean(),
  provider: z.string(),
  last_checked: z.string(),
});

// Email Bison Schemas (Future)
export const EmailBisonCampaignSchema = z.object({
  id: z.string(),
  name: z.string(),
  status: z.enum(["active", "paused", "draft"]),
  power_level: z.number().int().min(1).max(10),
  automation_rules: z.array(
    z.object({
      trigger: z.string(),
      action: z.string(),
      conditions: z.record(z.any()),
    }),
  ),
});

// Authentication schemas
export const APIKeyConfigSchema = z.object({
  smartlead: z.string().optional(),
  instantly: z.string().optional(),
  salesforge: z.string().optional(),
  apollo: z.string().optional(),
  emailbison: z.string().optional(),
});

// Request parameter schemas
export const CampaignCreateRequestSchema = z.object({
  name: z.string().min(1),
  daily_limit: z.number().int().positive().optional(),
  timezone: z.string().optional(),
  track_opens: z.boolean().optional(),
  track_clicks: z.boolean().optional(),
});

export const LeadCreateRequestSchema = z.object({
  email: z.string().email(),
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  company: z.string().optional(),
  title: z.string().optional(),
  phone: z.string().optional(),
  linkedin: z.string().url().optional(),
  custom_variables: z.record(z.string()).optional(),
});

export const SequenceCreateRequestSchema = z.object({
  name: z.string().min(1),
  campaign_id: z.string().optional(),
  steps: z.array(
    z.object({
      delay_days: z.number().int().min(0),
      subject: z.string(),
      content: z.string(),
      template_id: z.string().optional(),
    }),
  ),
});

export const TemplateCreateRequestSchema = z.object({
  name: z.string().min(1),
  subject: z.string().min(1),
  content: z.string().min(1),
  category: z.string().optional(),
  variables: z.array(z.string()).optional(),
});

// Export types
export type SmartLeadCampaign = z.infer<typeof SmartLeadCampaignSchema>;
export type SmartLeadLead = z.infer<typeof SmartLeadLeadSchema>;
export type SmartLeadEmailAccount = z.infer<typeof SmartLeadEmailAccountSchema>;
export type SmartLeadSequence = z.infer<typeof SmartLeadSequenceSchema>;
export type SmartLeadTemplate = z.infer<typeof SmartLeadTemplateSchema>;

export type InstantlyCampaign = z.infer<typeof InstantlyCampaignSchema>;
export type InstantlyLead = z.infer<typeof InstantlyLeadSchema>;
export type InstantlyAccount = z.infer<typeof InstantlyAccountSchema>;

export type SalesforgeCampaign = z.infer<typeof SalesforgeCampaignSchema>;
export type SalesforgeSequence = z.infer<typeof SalesforgeSequenceSchema>;
export type SalesforgeTemplate = z.infer<typeof SalesforgeTemplateSchema>;

export type ApolloSequence = z.infer<typeof ApolloSequenceSchema>;
export type ApolloContact = z.infer<typeof ApolloContactSchema>;
export type ApolloEmailTemplate = z.infer<typeof ApolloEmailTemplateSchema>;
export type ApolloEmailAccount = z.infer<typeof ApolloEmailAccountSchema>;

export type EmailBisonCampaign = z.infer<typeof EmailBisonCampaignSchema>;

export type APIResponse<T = any> = z.infer<typeof APIResponseSchema> & { data?: T };
export type APIKeyConfig = z.infer<typeof APIKeyConfigSchema>;

export type CampaignCreateRequest = z.infer<typeof CampaignCreateRequestSchema>;
export type LeadCreateRequest = z.infer<typeof LeadCreateRequestSchema>;
export type SequenceCreateRequest = z.infer<typeof SequenceCreateRequestSchema>;
export type TemplateCreateRequest = z.infer<typeof TemplateCreateRequestSchema>;

// Export all platform schemas
export const PlatformSchemas = {
  smartlead: {
    campaign: SmartLeadCampaignSchema,
    lead: SmartLeadLeadSchema,
    emailAccount: SmartLeadEmailAccountSchema,
    sequence: SmartLeadSequenceSchema,
    template: SmartLeadTemplateSchema,
  },
  instantly: {
    campaign: InstantlyCampaignSchema,
    lead: InstantlyLeadSchema,
    account: InstantlyAccountSchema,
  },
  salesforge: {
    campaign: SalesforgeCampaignSchema,
    sequence: SalesforgeSequenceSchema,
    template: SalesforgeTemplateSchema,
  },
  apollo: {
    sequence: ApolloSequenceSchema,
    contact: ApolloContactSchema,
    emailTemplate: ApolloEmailTemplateSchema,
    emailAccount: ApolloEmailAccountSchema,
  },
  // Coming soon platforms
  // emailbison: {},
  // Future platforms (schemas TBD)
  // amplemarket: {},
  // lemlist: {},
  // outreach: {},
  // salesloft: {},
} as const;

// AmpleMarket Schemas
export const AmpleMarketLeadListSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  created_at: z.string(),
  updated_at: z.string(),
  leads_count: z.number().int().min(0),
  status: z.enum(["active", "paused", "completed"]),
});

export const AmpleMarketContactSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  company: z.string().optional(),
  title: z.string().optional(),
  phone: z.string().optional(),
  linkedin_url: z.string().url().optional(),
  status: z.enum(["active", "bounced", "unsubscribed"]),
  created_at: z.string(),
  updated_at: z.string(),
});

export const AmpleMarketSequenceSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  status: z.enum(["active", "paused", "draft"]),
  steps_count: z.number().int().min(0),
  leads_count: z.number().int().min(0),
  created_at: z.string(),
  updated_at: z.string(),
});

export const AmpleMarketCallSchema = z.object({
  id: z.string(),
  contact_id: z.string(),
  disposition: z.string(),
  notes: z.string().optional(),
  duration: z.number().int().min(0).optional(),
  call_date: z.string(),
  created_at: z.string(),
});

export const AmpleMarketTaskSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().optional(),
  status: z.enum(["pending", "completed", "skipped"]),
  type: z.string(),
  due_date: z.string().optional(),
  contact_id: z.string().optional(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const AmpleMarketEmailValidationSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  status: z.enum(["valid", "invalid", "risky", "pending"]),
  confidence: z.number().min(0).max(100).optional(),
  reason: z.string().optional(),
  created_at: z.string(),
});

export const AmpleMarketExclusionSchema = z.object({
  email: z.string().email().optional(),
  domain: z.string().optional(),
  created_at: z.string(),
  reason: z.string().optional(),
});

// AmpleMarket Request Schemas
export const AmpleMarketLeadListCreateRequestSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
});

export const AmpleMarketSequenceAddLeadsRequestSchema = z.object({
  lead_ids: z.array(z.string()).min(1),
});

export const AmpleMarketCallLogRequestSchema = z.object({
  contact_id: z.string(),
  disposition: z.string(),
  notes: z.string().optional(),
  duration: z.number().int().min(0).optional(),
  call_date: z.string().optional(),
});

export const AmpleMarketTaskCompleteRequestSchema = z.object({
  notes: z.string().optional(),
});

export const AmpleMarketEmailValidationRequestSchema = z.object({
  emails: z.array(z.string().email()).min(1).max(1000),
});

export const AmpleMarketExclusionRequestSchema = z.object({
  emails: z.array(z.string().email()).optional(),
  domains: z.array(z.string()).optional(),
});

// =============================================================================
// LemList Schemas
// =============================================================================

export const LemListCampaignSchema = z.object({
  _id: z.string(),
  name: z.string(),
  isStarted: z.boolean(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  steps: z.array(z.object({
    type: z.string(),
    content: z.string().optional(),
  })).optional(),
});

export const LemListLeadSchema = z.object({
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  campaignId: z.string().optional(),
  campaignStatus: z.string().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export const LemListTemplateSchema = z.object({
  _id: z.string(),
  name: z.string(),
  subject: z.string(),
  body: z.string(),
  isPublic: z.boolean().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export const LemListSequenceSchema = z.object({
  _id: z.string(),
  name: z.string(),
  steps: z.array(z.object({
    stepNumber: z.number(),
    type: z.string(),
    content: z.string().optional(),
    delayDays: z.number().optional(),
  })).optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

// Outreach Schemas
export const OutreachSequenceSchema = z.object({
  id: z.string(),
  type: z.literal("sequence"),
  attributes: z.object({
    name: z.string(),
    description: z.string().optional(),
    enabled: z.boolean(),
    locked: z.boolean(),
    maxActivations: z.number().int().min(0).optional(),
    primaryReplyAction: z.string().optional(),
    secondaryReplyAction: z.string().optional(),
    createdAt: z.string(),
    updatedAt: z.string(),
  }),
});

export const OutreachProspectSchema = z.object({
  id: z.string(),
  type: z.literal("prospect"),
  attributes: z.object({
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    emails: z.array(z.string().email()),
    title: z.string().optional(),
    company: z.string().optional(),
    linkedInUrl: z.string().url().optional(),
    phoneNumbers: z.array(z.string()).optional(),
    tags: z.array(z.string()).optional(),
    stage: z.string().optional(),
    createdAt: z.string(),
    updatedAt: z.string(),
  }),
});

export const OutreachMailboxSchema = z.object({
  id: z.string(),
  type: z.literal("mailbox"),
  attributes: z.object({
    email: z.string().email(),
    emailHash: z.string(),
    emailProvider: z.string(),
    ewsEndpoint: z.string().optional(),
    exchangeVersion: z.string().optional(),
    imapHost: z.string().optional(),
    imapPort: z.number().int().optional(),
    maxEmailsPerDay: z.number().int().min(0),
    maxMailingsPerDay: z.number().int().min(0),
    optOutMessage: z.string().optional(),
    prospectEmailExclusions: z.array(z.string()).optional(),
    sendDisabled: z.boolean(),
    sendErroredAt: z.string().optional(),
    sendMaxRetries: z.number().int().min(0),
    sendMethod: z.string(),
    sendRequiresSync: z.boolean(),
    sendSuccessAt: z.string().optional(),
    sendThreshold: z.number().int().min(0),
    smtpHost: z.string().optional(),
    smtpPort: z.number().int().optional(),
    smtpSsl: z.boolean().optional(),
    smtpStartTls: z.boolean().optional(),
    smtpUsername: z.string().optional(),
    syncDisabled: z.boolean(),
    syncErroredAt: z.string().optional(),
    syncMethod: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
  }),
});

export const OutreachTemplateSchema = z.object({
  id: z.string(),
  type: z.literal("template"),
  attributes: z.object({
    bodyHtml: z.string(),
    bodyText: z.string(),
    name: z.string(),
    subject: z.string(),
    archived: z.boolean(),
    bounceCount: z.number().int().min(0),
    clickCount: z.number().int().min(0),
    deliverCount: z.number().int().min(0),
    failureCount: z.number().int().min(0),
    negativeReplyCount: z.number().int().min(0),
    neutralReplyCount: z.number().int().min(0),
    openCount: z.number().int().min(0),
    optOutCount: z.number().int().min(0),
    positiveReplyCount: z.number().int().min(0),
    replyCount: z.number().int().min(0),
    scheduleCount: z.number().int().min(0),
    tags: z.array(z.string()).optional(),
    createdAt: z.string(),
    updatedAt: z.string(),
  }),
});

// SalesLoft Schemas
export const SalesLoftCadenceSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  archived: z.boolean(),
  bounced_stage: z.number().int().optional(),
  cadence_function: z.string().optional(),
  cadence_priority: z.string().optional(),
  created_at: z.string(),
  current_state: z.string(),
  draft: z.boolean(),
  external_identifier: z.string().optional(),
  finished_stage: z.number().int().optional(),
  group_id: z.number().int().optional(),
  latest_cadence_changed_at: z.string().optional(),
  opt_out_link_included: z.boolean(),
  remove_bounced_at: z.number().int().optional(),
  remove_replied_at: z.number().int().optional(),
  replied_stage: z.number().int().optional(),
  shared: z.boolean(),
  tags: z.array(z.string()).optional(),
  team_cadence: z.boolean(),
  updated_at: z.string(),
});

export const SalesLoftPersonSchema = z.object({
  id: z.number().int(),
  created_at: z.string(),
  updated_at: z.string(),
  archived_at: z.string().optional(),
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  display_name: z.string().optional(),
  email_address: z.string().email().optional(),
  secondary_email_address: z.string().email().optional(),
  personal_email_address: z.string().email().optional(),
  full_email_address: z.string().email().optional(),
  home_phone_number: z.string().optional(),
  mobile_phone_number: z.string().optional(),
  work_phone_number: z.string().optional(),
  linkedin_url: z.string().url().optional(),
  title: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  country: z.string().optional(),
  work_city: z.string().optional(),
  work_state: z.string().optional(),
  work_country: z.string().optional(),
  crm_id: z.string().optional(),
  crm_url: z.string().url().optional(),
  crm_object_type: z.string().optional(),
  owner_crm_id: z.string().optional(),
  person_company_name: z.string().optional(),
  person_company_website: z.string().url().optional(),
  person_company_industry: z.string().optional(),
  do_not_contact: z.boolean(),
  bouncing: z.boolean(),
  locale: z.string().optional(),
  personal_website: z.string().url().optional(),
  twitter_handle: z.string().optional(),
  last_completed_step_cadence_id: z.number().int().optional(),
  last_completed_step: z.number().int().optional(),
  last_contacted_at: z.string().optional(),
  last_contacted_by: z.number().int().optional(),
  last_contacted_type: z.string().optional(),
  last_replied_at: z.string().optional(),
  phone_number_dnc: z.boolean(),
  phone_number_dnc_type: z.string().optional(),
  email_address_dnc: z.boolean(),
  custom_fields: z.record(z.any()).optional(),
  tags: z.array(z.string()).optional(),
  contact_restrictions: z.array(z.string()).optional(),
});

export const SalesLoftEmailSchema = z.object({
  id: z.number().int(),
  created_at: z.string(),
  updated_at: z.string(),
  archived_at: z.string().optional(),
  bounced_at: z.string().optional(),
  cadence_id: z.number().int().optional(),
  clicked_at: z.string().optional(),
  delivered_at: z.string().optional(),
  error_message: z.string().optional(),
  in_reply_to_id: z.string().optional(),
  opened_at: z.string().optional(),
  person_id: z.number().int(),
  recipient_email_address: z.string().email(),
  replied_at: z.string().optional(),
  send_after: z.string().optional(),
  sent_at: z.string().optional(),
  subject: z.string(),
  user_id: z.number().int(),
  view_tracking: z.boolean(),
  click_tracking: z.boolean(),
  personalization: z.record(z.any()).optional(),
  email_template_id: z.number().int().optional(),
  mailing_id: z.number().int().optional(),
  status: z.string(),
  body: z.string().optional(),
  body_preview: z.string().optional(),
});

// Export the new types
export type OutreachSequence = z.infer<typeof OutreachSequenceSchema>;
export type OutreachProspect = z.infer<typeof OutreachProspectSchema>;
export type OutreachMailbox = z.infer<typeof OutreachMailboxSchema>;
export type OutreachTemplate = z.infer<typeof OutreachTemplateSchema>;

export type SalesLoftCadence = z.infer<typeof SalesLoftCadenceSchema>;
export type SalesLoftPerson = z.infer<typeof SalesLoftPersonSchema>;
export type SalesLoftEmail = z.infer<typeof SalesLoftEmailSchema>;
