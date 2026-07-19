export type EventType =
  | 'website_launch'
  | 'project_start'
  | 'project_complete'
  | 'livestream'
  | 'pr_merge'
  | 'milestone'
  | 'revenue'
  | 'community';

export interface JourneyEventData {
  id: string;
  type: EventType;
  title: string;
  description: string;
  date: string; // ISO 8601, e.g. "2026-07-19"
  time?: string; // e.g. "14:30"
  href?: string; // deep-link to related content
  meta?: {
    label: string;
    value: string;
  }[]; // key-value pairs for extra context
  badge?: string; // optional badge text
}

export interface CurrentStatusData {
  label: string;
  message: string;
  isLive?: boolean;
  meta?: {
    label: string;
    value: string;
  }[];
}

export interface JourneyTimelineProps {
  status: CurrentStatusData;
  events: JourneyEventData[];
  cta: {
    label: string;
    href: string;
  };
  className?: string;
}