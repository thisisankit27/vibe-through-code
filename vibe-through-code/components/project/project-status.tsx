import { cn } from "@/lib/utils";
import type { ProjectStatus } from "@/types/project";

/**
 * The one project-status treatment.
 *
 * There were four disagreeing status palettes before this
 * (`project-card`, `current-project`, `status-badge`, and an inline
 * reimplementation) — a reader had no way to learn what a colour meant
 * because it meant something different on each page.
 *
 *   active     filled signal dot, accent label   the only status that
 *                                                earns the accent
 *   completed  filled tertiary dot               done, and quiet about it
 *   planned    hollow tertiary dot               visibly not yet filled in
 *
 * Active is separated by hue; the other two are separated by FILL, so the
 * accent stays scarce and shape does the rest of the work. `--revenue` is
 * never reachable from here — green means recorded money and nothing
 * else, so "completed" deliberately does not get it.
 *
 * The two quiet dots were `--rule-strong` first, which measured 2.01:1 on
 * paper and 1.85:1 in dark against `--surface-raised` — under the 3:1 bar
 * for a graphic, and faint enough to read as noise rather than as state.
 * `--ink-tertiary` clears it at 5.07:1 / 4.79:1 and matches the label the
 * dot sits beside, so the pair reads as one mark.
 */
const DOT: Record<ProjectStatus, string> = {
    active: "bg-accent-signal",
    completed: "bg-ink-tertiary",
    planned: "border border-ink-tertiary",
};

const LABEL: Record<ProjectStatus, string> = {
    active: "text-accent",
    completed: "text-ink-tertiary",
    planned: "text-ink-tertiary",
};

interface ProjectStatusTagProps {
    status: ProjectStatus;
    className?: string;
}

export function ProjectStatusTag({ status, className }: ProjectStatusTagProps) {
    return (
        <span
            className={cn(
                "inline-flex items-center gap-2 text-micro font-medium uppercase tracking-wider",
                LABEL[status],
                className
            )}
        >
            <span
                className={cn("h-1.5 w-1.5 shrink-0 rounded-full", DOT[status])}
                aria-hidden="true"
            />
            {status}
        </span>
    );
}
