import type { SupportTier } from "@/types/support";

/**
 * What each tier's action button says.
 *
 * One source, because the same action appears twice on the page — as a
 * ruled control in the decision zone and as a link at the end of that
 * tier's narrative chapter — and the two drifting apart would read as
 * two different offers.
 *
 * Not a generic "Support" repeated three times. `/support` is the one
 * page where someone is being *asked* for something, and a uniform verb
 * is the cold option even when the layout is right. Each label says what
 * the money does, in that tier's own voice.
 *
 * Falls back to the tier title so a row added in /admin is never
 * actionless.
 */
const ACTIONS: Record<string, string> = {
    coffee: "Buy the coffee",
    stream: "Keep it rolling",
    builder: "Become a Builder",
};

export function actionFor(tier: SupportTier): string {
    return ACTIONS[tier.id] ?? tier.title;
}
