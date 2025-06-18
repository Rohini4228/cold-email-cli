import { z } from 'zod';

// Global Schemas
export const APIResponseSchema = z.object({
  success: z.boolean(),
  data: z.any().optional(),
  error: z.string().optional(),
  message: z.string().optional(),
  pagination: z.object({
    page: z.number(),
    limit: z.number(),
    total: z.number(),
    pages: z.number()
  }).optional()
});

export const CommandArgsSchema = z.record(z.any());

// SmartLead Schemas
export const SmartLeadCampaignSchema = z.object({
  id: z.string(),
  name: z.string(),
  status: z.enum(['active', 'paused', 'completed', 'draft']),
  created_at: z.string(),
  updated_at: z.string(),
  total_leads: z.number().optional(),
  sent_count: z.number().optional(),
  open_rate: z.number().optional(),
  reply_rate: z.number().optional()
});

export const SmartLeadLeadSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  company: z.string().optional(),
  status: z.enum(['active', 'paused', 'completed', 'bounced', 'replied']),
  campaign_id: z.string()
});

// Instantly Schemas
export const InstantlyCampaignSchema = z.object({
  id: z.string(),
  name: z.string(),
  status: z.enum(['active', 'paused', 'completed']),
  created_at: z.string(),
  leads_count: z.number().optional(),
  sent_count: z.number().optional(),
  open_rate: z.number().optional()
});

export const InstantlyAccountSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  provider: z.enum(['gmail', 'outlook', 'smtp']),
  status: z.enum(['active', 'warming', 'paused', 'error']),
  warmup_enabled: z.boolean(),
  daily_limit: z.number()
});

// Salesforge Schemas  
export const SalesforgeCampaignSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: z.enum(['email', 'linkedin', 'multi']),
  ai_optimization: z.boolean(),
  status: z.enum(['active', 'paused', 'completed']),
  performance_goal: z.enum(['open_rate', 'reply_rate', 'conversion']).optional()
});

export const SalesforgeSequenceSchema = z.object({
  id: z.string(),
  name: z.string(),
  campaign_id: z.string(),
  ai_generated: z.boolean(),
  persona: z.string().optional(),
  steps: z.array(z.object({
    id: z.string(),
    type: z.enum(['email', 'linkedin', 'call', 'wait']),
    content: z.string().optional(),
    delay_days: z.number()
  }))
});

// Apollo Schemas
export const ApolloSequenceSchema = z.object({
  id: z.string(),
  name: z.string(),
  status: z.enum(['active', 'paused', 'archived']),
  steps_count: z.number(),
  contacts_count: z.number().optional(),
  open_rate: z.number().optional(),
  reply_rate: z.number().optional()
});

export const ApolloContactSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  title: z.string().optional(),
  company: z.string().optional(),
  phone: z.string().optional(),
  linkedin_url: z.string().optional()
});

// Coming Soon Platform Schemas (stubs)
export const EmailBisonCampaignSchema = z.object({
  id: z.string(),
  name: z.string(),
  status: z.string(),
  // More fields TBD
});

export const AmpleMarketContactSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  // More fields TBD
});

export const LemlistCampaignSchema = z.object({
  id: z.string(),
  name: z.string(),
  // More fields TBD
});

export const OutreachSequenceSchema = z.object({
  id: z.string(),
  name: z.string(),
  // More fields TBD
});

export const SalesLoftCadenceSchema = z.object({
  id: z.string(),
  name: z.string(),
  // More fields TBD
});

// Export all platform schemas
export const PlatformSchemas = {
  smartlead: {
    campaign: SmartLeadCampaignSchema,
    lead: SmartLeadLeadSchema
  },
  instantly: {
    campaign: InstantlyCampaignSchema,
    account: InstantlyAccountSchema
  },
  salesforge: {
    campaign: SalesforgeCampaignSchema,
    sequence: SalesforgeSequenceSchema
  },
  apollo: {
    sequence: ApolloSequenceSchema,
    contact: ApolloContactSchema
  },
  // Coming soon
  emailbison: {
    campaign: EmailBisonCampaignSchema
  },
  amplemarket: {
    contact: AmpleMarketContactSchema
  },
  lemlist: {
    campaign: LemlistCampaignSchema
  },
  outreach: {
    sequence: OutreachSequenceSchema
  },
  salesloft: {
    cadence: SalesLoftCadenceSchema
  }
} as const; 