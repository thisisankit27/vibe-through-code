"use client";

import { JourneyTimelineProps } from "./types";
import { CurrentStatus } from "./CurrentStatus";
import { JourneyEvent } from "./JourneyEvent";
import { cn } from "@/lib/utils";

export function JourneyTimeline({
  status,
  events,
  cta,
  className,
}: JourneyTimelineProps) {
  // Enforce max 3 visible events
  const visibleEvents = events.slice(0, 3);

  return (
    <section
      className={cn(
        "mx-auto w-full max-w-2xl px-4 py-16 sm:px-6 lg:px-8",
        className
      )}
    >
      {/* Header */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold tracking-tight text-neutral-100">
          Journey
        </h2>
        <p className="mt-1.5 text-sm text-neutral-500">
          Building in public, one commit at a time.
        </p>
      </div>

      {/* Current Status */}
      <div className="mb-10">
        <CurrentStatus status={status} />
      </div>

      {/* Timeline */}
      <div className="relative">
        {visibleEvents.map((event, index) => (
          <JourneyEvent
            key={event.id}
            event={event}
            isLast={index === visibleEvents.length - 1}
          />
        ))}
      </div>

      {/* CTA */}
      <div className="mt-8 flex justify-center">
        <a
          href={cta.href}
          className={cn(
            "group inline-flex items-center gap-2 rounded-xl border border-white/[0.08]",
            "bg-white/[0.03] px-5 py-3 text-sm font-medium text-neutral-300",
            "transition-all duration-200",
            "hover:border-emerald-500/30 hover:bg-emerald-500/5 hover:text-emerald-400"
          )}
        >
          <span>{cta.label}</span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-transform duration-200 group-hover:translate-x-0.5"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </a>
      </div>
    </section>
  );
}
