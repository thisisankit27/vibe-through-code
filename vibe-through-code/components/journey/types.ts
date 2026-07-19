export type EventType =
  | 'website_launch'
  | 'project_start'
  | 'project_complete'
  | 'livestream'
  | 'pr_merge'
  | 'milestone'
  | 'revenue'
  | 'community'
  | 'blog_post'
  | 'bug_fix'
  | 'architecture_decision'
  | 'learning_moment'
  | 'deployment'
  | 'partnership'
  | 'first_sale';

export interface JourneyEventData {
  id: string;
  type: EventType;
  title: string;
  description: string;
  date: string;
  time?: string;
  href?: string;
  meta?: { label: string; value: string }[];
  badge?: string;
}

export interface CurrentStatusData {
  label: string;
  message: string;
  isLive?: boolean;
  meta?: { label: string; value: string }[];
}

export interface JourneyTimelineProps {
  status: CurrentStatusData;
  events: JourneyEventData[];
  cta: { label: string; href: string };
  className?: string;
}