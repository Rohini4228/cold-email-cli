// Apollo Email Sequencing Types - Simplified for Email Sequences Only

export interface ApolloSequence {
  id: string;
  name: string;
  active: boolean;
  max_steps: number;
  created_at: string;
  updated_at: string;
}

export interface ApolloContact {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  company?: string;
  title?: string;
}

export interface ApolloTemplate {
  id: string;
  name: string;
  subject: string;
  body: string;
  template_type: "email";
}

export interface ApolloSequenceStep {
  id: string;
  sequence_id: string;
  step_number: number;
  template_id: string;
  delay_days: number;
}

export interface ApolloSequenceAnalytics {
  sequence_id: string;
  total_contacts: number;
  open_rate: number;
  reply_rate: number;
  bounce_rate: number;
}
