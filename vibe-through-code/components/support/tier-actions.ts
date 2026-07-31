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
 * None of these may restate the tier's own title. "Become a Builder" did,
 * so the words appeared under a heading that already said them.
 */
const ACTIONS: Record<string, string> = {
    coffee: "Buy the coffee",
    stream: "Keep it rolling",
};

/**
 * The recurring tier's action is the one thing on this page that changes
 * permanently, once, when the first Builder joins.
 *
 * Before: "Lay the first stone" — literally true, and only ever true for
 * one person. After: "Build together", which is the promise the stone was
 * laid on. Nothing about it counts or grows; it is a single binary
 * transition tied to `site_state.first_builder_on`, the same key the
 * foundation stone reads.
 */
function ongoingAction(laid: boolean): string {
    return laid ? "Build together" : "Lay the first stone";
}

export function actionFor(tier: SupportTier, firstBuilderOn?: string): string {
    if (tier.frequency) return ongoingAction(Boolean(firstBuilderOn));
    return ACTIONS[tier.id] ?? tier.title;
}
