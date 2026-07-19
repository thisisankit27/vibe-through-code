"use client";

import { JourneyEventData, EventType } from "./types";
import { cn } from "@/lib/utils";

const eventTypeConfig: Record<
  EventType,
  {
    icon: React.ReactNode;
    accentClass: string;
    borderClass: string;
    bgClass: string;
    label: string;
  }
> = {
  website_launch: {
    label: "Launch",
    accentClass: "text-emerald-400",
    borderClass: "border-emerald-500/20",
    bgClass: "bg-emerald-500/5",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
  project_start: {
    label: "Project",
    accentClass: "text-sky-400",
    borderClass: "border-sky-500/20",
    bgClass: "bg-sky-500/5",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  project_complete: {
    label: "Shipped",
    accentClass: "text-emerald-400",
    borderClass: "border-emerald-500/20",
    bgClass: "bg-emerald-500/5",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
  },
  livestream: {
    label: "Stream",
    accentClass: "text-amber-400",
    borderClass: "border-amber-500/20",
    bgClass: "bg-amber-500/5",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="5 3 19 12 5 21 5 3" />
      </svg>
    ),
  },
  pr_merge: {
    label: "Merged",
    accentClass: "text-violet-400",
    borderClass: "border-violet-500/20",
    bgClass: "bg-violet-500/5",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="18" cy="18" r="3" /><circle cx="6" cy="6" r="3" /><path d="M6 21V9a9 9 0 0 0 9 9" />
      </svg>
    ),
  },
  milestone: {
    label: "Milestone",
    accentClass: "text-emerald-400",
    borderClass: "border-emerald-500/20",
    bgClass: "bg-emerald-500/5",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" /><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
        <path d="M4 22h16" /><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 19.88 7 21h10c0-1.12-.85-2.25-1.97-2.79-.5-.23-.97-.66-.97-1.21v-2.34" />
        <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 19.88 17 21" />
        <path d="M12 2v7.5" /><path d="M8 9.5l4-4 4 4" />
      </svg>
    ),
  },
  revenue: {
    label: "Revenue",
    accentClass: "text-emerald-400",
    borderClass: "border-emerald-500/20",
    bgClass: "bg-emerald-500/5",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
  community: {
    label: "Community",
    accentClass: "text-rose-400",
    borderClass: "border-rose-500/20",
    bgClass: "bg-rose-500/5",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  // ── NEW: Content ──────────────────────────────────────────
  blog_post: {
    label: "Blog",
    accentClass: "text-orange-400",
    borderClass: "border-orange-500/20",
    bgClass: "bg-orange-500/5",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    ),
  },
  // ── NEW: Engineering ──────────────────────────────────────
  bug_fix: {
    label: "Fix",
    accentClass: "text-red-400",
    borderClass: "border-red-500/20",
    bgClass: "bg-red-500/5",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m8 2 1.88 1.88" /><path d="M14.12 3.88 16 2" /><path d="M9 7.13v-1a3.003 3.003 0 1 1 6 0v1" />
        <path d="M12 20c-3.3 0-6-2.7-6-6v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v3c0 3.3-2.7 6-6 6" />
        <path d="M12 20v-9" /><path d="M6.53 9C4.6 8.8 3 7.1 3 5" /><path d="M6 13H2" />
        <path d="M17.47 9c1.93-.2 3.53-1.9 3.53-4" /><path d="M18 13h4" />
      </svg>
    ),
  },
  architecture_decision: {
    label: "ADR",
    accentClass: "text-cyan-400",
    borderClass: "border-cyan-500/20",
    bgClass: "bg-cyan-500/5",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
      </svg>
    ),
  },
  learning_moment: {
    label: "Learned",
    accentClass: "text-fuchsia-400",
    borderClass: "border-fuchsia-500/20",
    bgClass: "bg-fuchsia-500/5",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
        <path d="M9 18h6" /><path d="M10 22h4" />
      </svg>
    ),
  },
  deployment: {
    label: "Deploy",
    accentClass: "text-teal-400",
    borderClass: "border-teal-500/20",
    bgClass: "bg-teal-500/5",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
  },
  // ── NEW: Business ─────────────────────────────────────────
  partnership: {
    label: "Partner",
    accentClass: "text-indigo-400",
    borderClass: "border-indigo-500/20",
    bgClass: "bg-indigo-500/5",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="8.5" cy="7" r="4" />
        <path d="M20 8v6" /><path d="M23 11h-6" />
      </svg>
    ),
  },
  first_sale: {
    label: "First Sale",
    accentClass: "text-emerald-400",
    borderClass: "border-emerald-500/20",
    bgClass: "bg-emerald-500/5",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
      </svg>
    ),
  },
};

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

interface JourneyEventProps {
  event: JourneyEventData;
  isLast?: boolean;
}

export function JourneyEvent({ event, isLast = false }: JourneyEventProps) {
  const config = eventTypeConfig[event.type];
  const Wrapper = event.href ? "a" : "div";

  return (
    <div className="group relative flex gap-5">
      {/* Timeline rail */}
      <div className="flex flex-col items-center">
        <div
          className={cn(
            "relative z-10 flex h-9 w-9 items-center justify-center rounded-full border",
            "bg-[#0A0A0A] transition-colors duration-200",
            config.borderClass,
            event.href && "group-hover:border-emerald-400/50 group-hover:bg-emerald-500/10"
          )}
        >
          <span className={cn("transition-colors duration-200", config.accentClass)}>
            {config.icon}
          </span>
        </div>
        {!isLast && <div className="mt-2 h-full w-px bg-white/10" />}
      </div>

      {/* Card */}
      <div className="flex-1 pb-10">
        <Wrapper
          href={event.href}
          className={cn(
            "relative block overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.02] p-5",
            "transition-all duration-200",
            event.href && "hover:border-white/10 hover:bg-white/[0.04] cursor-pointer"
          )}
        >
          {/* Emerald glow */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-emerald-500/15 blur-3xl" />

          <div className="relative z-10">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <span className={cn(
                  "inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wider",
                  config.bgClass, config.accentClass
                )}>
                  {config.label}
                </span>
                {event.badge && (
                  <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-emerald-400">
                    {event.badge}
                  </span>
                )}
              </div>
              <time className="text-xs text-neutral-500 tabular-nums">
                {formatDate(event.date)}
                {event.time && <span className="ml-1.5 text-neutral-600">{event.time}</span>}
              </time>
            </div>

            <h3 className="mt-3 text-base font-semibold text-neutral-100">{event.title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-neutral-400">{event.description}</p>

            {event.meta && event.meta.length > 0 && (
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {event.meta.map((m) => (
                  <div key={m.label} className="rounded-lg border border-white/[0.04] bg-white/[0.02] px-3 py-2">
                    <p className="text-[10px] font-medium uppercase tracking-wider text-neutral-600">{m.label}</p>
                    <p className="mt-0.5 text-sm font-medium text-neutral-200 tabular-nums">{m.value}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Wrapper>
      </div>
    </div>
  );
}