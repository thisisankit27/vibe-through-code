"use client";

import { useState, useEffect, useCallback } from "react";
import { cn, toISODateString } from "@/lib/utils";
import {
    getEvents, createEvent, updateEvent, deleteEvent,
    getStreams, createStream, updateStream, deleteStream,
    getPeople, createPerson, updatePerson, deletePerson,
    getProjects, createProject, updateProject, deleteProject,
    getTiers, createTier, updateTier, deleteTier,
    getSiteState, updateSiteState,
} from "./actions";

type Tab = "events" | "streams" | "people" | "projects" | "tiers" | "state";

export const dynamic = "force-dynamic";

export default function AdminPage() {
    const [tab, setTab] = useState<Tab>("events");
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [editing, setEditing] = useState<any>(null);

    const tabs: { key: Tab; label: string }[] = [
        { key: "events", label: "Events" },
        { key: "streams", label: "Streams" },
        { key: "people", label: "People" },
        { key: "projects", label: "Projects" },
        { key: "tiers", label: "Tiers" },
        { key: "state", label: "Site State" },
    ];

    const fetchData = useCallback(async () => {
        setLoading(true);
        let res: any[] = [];
        switch (tab) {
            case "events": res = await getEvents(); break;
            case "streams": res = await getStreams(); break;
            case "people": res = await getPeople(); break;
            case "projects": res = await getProjects(); break;
            case "tiers": res = await getTiers(); break;
            case "state": res = await getSiteState(); break;
        }
        setData(res);
        setLoading(false);
    }, [tab]);

    useEffect(() => { fetchData(); }, [fetchData]);

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this record?")) return;
        switch (tab) {
            case "events": await deleteEvent(id); break;
            case "streams": await deleteStream(id); break;
            case "people": await deletePerson(id); break;
            case "projects": await deleteProject(id); break;
            case "tiers": await deleteTier(id); break;
        }
        fetchData();
    };

    const openAdd = () => { setEditing(null); setModalOpen(true); };
    const openEdit = (row: any) => { setEditing(row); setModalOpen(true); };

    return (
        <main className="min-h-screen bg-surface-base text-ink-primary">
            <div className="mx-auto max-w-7xl px-4 py-10">
                <h1 className="text-3xl font-bold tracking-tight text-ink-primary">Admin</h1>
                <p className="mt-1 text-sm text-ink-tertiary">Manage journey data</p>

                {/* Tabs */}
                <div className="mt-8 flex flex-wrap gap-2 border-b border-rule-hairline pb-3">
                    {tabs.map((t) => (
                        <button
                            key={t.key}
                            onClick={() => setTab(t.key)}
                            className={cn(
                                "rounded-lg px-4 py-2 text-sm font-medium transition-all",
                                tab === t.key
                                    ? "bg-accent/10 text-accent ring-1 ring-accent/20"
                                    : "text-ink-secondary hover:bg-surface-raised hover:text-ink-primary"
                            )}
                        >
                            {t.label}
                        </button>
                    ))}
                </div>

                {/* Toolbar */}
                {tab !== "state" && (
                    <div className="mt-6 flex justify-end">
                        <button
                            onClick={openAdd}
                            className="rounded-lg bg-accent/10 px-4 py-2 text-sm font-medium text-accent ring-1 ring-accent/20 transition-all hover:bg-accent/20"
                        >
                            + Add {tabs.find((t) => t.key === tab)?.label}
                        </button>
                    </div>
                )}

                {/* Table */}
                <div className="mt-4 overflow-hidden rounded-xl border border-rule-hairline">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-surface-raised text-xs uppercase tracking-wider text-ink-tertiary">
                            <tr>
                                {getColumns(tab).map((col) => (
                                    <th key={col} className="px-4 py-3 font-medium">{col}</th>
                                ))}
                                <th className="px-4 py-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-rule-hairline">
                            {loading ? (
                                <tr><td colSpan={99} className="px-4 py-8 text-center text-ink-tertiary">Loading…</td></tr>
                            ) : data.length === 0 ? (
                                <tr><td colSpan={99} className="px-4 py-8 text-center text-ink-tertiary">No records</td></tr>
                            ) : (
                                data.map((row) => (
                                    <tr key={row.id ?? row.key} className="transition-colors hover:bg-surface-raised">
                                        {getColumns(tab).map((col) => (
                                            <td key={col} className="px-4 py-3 font-mono text-xs text-ink-secondary">
                                                {formatCell(row, col)}
                                            </td>
                                        ))}
                                        <td className="px-4 py-3 text-right">
                                            <div className="flex justify-end gap-2">
                                                <button
                                                    onClick={() => openEdit(row)}
                                                    className="rounded px-2 py-1 text-xs text-ink-secondary transition-colors hover:bg-surface-hover hover:text-ink-primary"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(row.id ?? row.key)}
                                                    className="rounded px-2 py-1 text-xs text-failure/70 transition-colors hover:bg-failure/10 hover:text-failure"
                                                >
                                                    Del
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal */}
            {modalOpen && (
                <Modal
                    tab={tab}
                    editing={editing}
                    onClose={() => setModalOpen(false)}
                    onSaved={fetchData}
                />
            )}
        </main>
    );
}

/* ── Helpers ─────────────────────────────────────────────── */

function getColumns(tab: Tab): string[] {
    switch (tab) {
        case "events": return ["id", "type", "title", "date", "badge"];
        case "streams": return ["id", "day", "title", "date", "duration"];
        case "people": return ["id", "name", "role", "isFounder"];
        case "projects": return ["id", "slug", "title", "status"];
        case "tiers": return ["id", "title", "price", "label"];
        case "state": return ["key", "value"];
    }
}

function formatCell(row: any, col: string) {
    const val = row[col];
    if (typeof val === "boolean") return val ? "Yes" : "No";
    if (col === "price") return `₹${val / 100}`;
    if (col === "isFounder") return val ? "Yes" : "No";
    if (val === null || val === undefined) return "—";
    if (typeof val === "string" && val.length > 60) return val.slice(0, 60) + "…";
    return String(val);
}

/* ── Meta Builder ────────────────────────────────────────── */

interface MetaPair {
    label: string;
    value: string;
}

/**
 * `meta` is a JSON column, so a row loaded for editing arrives already parsed
 * as an array, while `getDefaults` supplies JSON text. Accept either, and
 * coerce each pair to strings — a malformed row then degrades to editable
 * fields rather than silently rendering nothing.
 */
function parseMetaPairs(value: string | MetaPair[] | null | undefined): MetaPair[] {
    let raw: unknown = value;

    if (typeof value === "string") {
        if (value.trim() === "") return [];
        try {
            raw = JSON.parse(value);
        } catch {
            return [];
        }
    }

    if (!Array.isArray(raw)) return [];

    return raw
        .filter((p): p is Record<string, unknown> => typeof p === "object" && p !== null)
        .map((p) => ({
            label: String(p.label ?? ""),
            value: String(p.value ?? ""),
        }));
}

function MetaBuilder({ value, onChange }: {
    value: string | MetaPair[] | null | undefined;
    onChange: (v: string) => void;
}) {
    const pairs = parseMetaPairs(value);

    const update = (next: MetaPair[]) => onChange(JSON.stringify(next));
    const add = () => update([...pairs, { label: "", value: "" }]);
    const remove = (i: number) => update(pairs.filter((_, idx) => idx !== i));
    const setLabel = (i: number, label: string) => {
        const next = [...pairs]; next[i] = { ...next[i], label }; update(next);
    };
    const setValue = (i: number, val: string) => {
        const next = [...pairs]; next[i] = { ...next[i], value: val }; update(next);
    };

    return (
        <div className="space-y-2">
            {pairs.map((p, i) => (
                <div key={i} className="flex gap-2">
                    <input
                        placeholder="Label"
                        value={p.label}
                        onChange={(e) => setLabel(i, e.target.value)}
                        className="flex-1 rounded-lg border border-rule-standard bg-surface-raised px-3 py-2 text-sm text-ink-primary placeholder:text-ink-tertiary focus:border-accent/30 focus:outline-none"
                    />
                    <input
                        placeholder="Value"
                        value={p.value}
                        onChange={(e) => setValue(i, e.target.value)}
                        className="flex-1 rounded-lg border border-rule-standard bg-surface-raised px-3 py-2 text-sm text-ink-primary placeholder:text-ink-tertiary focus:border-accent/30 focus:outline-none"
                    />
                    <button
                        type="button"
                        onClick={() => remove(i)}
                        className="rounded-lg px-2 text-xs text-failure/70 hover:bg-failure/10 hover:text-failure"
                    >
                        ✕
                    </button>
                </div>
            ))}
            <button
                type="button"
                onClick={add}
                className="rounded-lg border border-rule-standard px-3 py-1.5 text-xs text-ink-secondary transition-colors hover:bg-surface-raised hover:text-ink-primary"
            >
                + Add pair
            </button>
        </div>
    );
}

/* ── Modal Form ──────────────────────────────────────────── */

function Modal({ tab, editing, onClose, onSaved }: {
    tab: Tab; editing: any; onClose: () => void; onSaved: () => void;
}) {
    const [saving, setSaving] = useState(false);
    const [form, setForm] = useState<any>(() => toFormState(tab, editing));

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            const payload = { ...form };

            // JSON columns are held as text in the form — parse them back.
            for (const key of JSON_FIELDS) {
                const val = payload[key];
                if (typeof val !== "string") continue;

                if (val.trim() === "") {
                    payload[key] = null;
                    continue;
                }

                try {
                    payload[key] = JSON.parse(val);
                } catch {
                    throw new Error(
                        `"${key}" is not valid JSON. Fix the field and try again.`
                    );
                }
            }

            // Number inputs hand back strings — coerce so integer columns
            // receive integers rather than relying on Postgres to cast.
            for (const field of getFormFields(tab)) {
                if (field.type !== "number") continue;

                const val = payload[field.name];
                if (typeof val !== "string") continue;

                if (val.trim() === "") {
                    payload[field.name] = null;
                    continue;
                }

                const num = Number(val);
                if (Number.isNaN(num)) {
                    throw new Error(`"${field.label}" must be a number.`);
                }
                payload[field.name] = num;
            }

            // Dates are validated before anything is derived from them —
            // the event id below is built from this string, so an unchecked
            // date becomes an unchecked primary key.
            for (const field of getFormFields(tab)) {
                if (field.type !== "date") continue;

                const val = payload[field.name];
                if (typeof val !== "string" || val.trim() === "") continue;

                assertPlausibleDate(val, field.label);
            }

            // Auto-generate event ID
            if (tab === "events" && !editing) {
                const rand = Math.floor(Math.random() * 900) + 100;
                payload.id = `evt-${payload.date.replace(/-/g, "")}-${payload.type.slice(0, 3)}-${rand}`;
            }

            if (editing) {
                const id = editing.id ?? editing.key;
                switch (tab) {
                    case "events": await updateEvent(id, payload); break;
                    case "streams": await updateStream(id, payload); break;
                    case "people": await updatePerson(id, payload); break;
                    case "projects": await updateProject(id, payload); break;
                    case "tiers": await updateTier(id, payload); break;
                    case "state": await updateSiteState(id, payload.value); break;
                }
            } else {
                switch (tab) {
                    case "events": await createEvent(payload); break;
                    case "streams": await createStream(payload); break;
                    case "people": await createPerson(payload); break;
                    case "projects": await createProject(payload); break;
                    case "tiers": await createTier(payload); break;
                }
            }
            onSaved();
            onClose();
        } catch (err) {
            alert("Save failed: " + (err as Error).message);
        } finally {
            setSaving(false);
        }
    };

    const fields = getFormFields(tab);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-scrim backdrop-blur-sm" onClick={onClose} />
            <div className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl border border-rule-standard bg-surface-base p-6 shadow-2xl">
                <h2 className="text-lg font-semibold text-ink-primary">
                    {editing ? "Edit" : "Add"} {tab}
                </h2>
                <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                    {fields.map((f) => (
                        <div key={f.name}>
                            <label className="block text-micro font-semibold uppercase tracking-wider text-ink-tertiary">
                                {f.label}
                            </label>
                            {f.name === "meta" && tab === "events" ? (
                                <div className="mt-1">
                                    <MetaBuilder
                                        value={form[f.name] ?? "[]"}
                                        onChange={(v) => setForm({ ...form, [f.name]: v })}
                                    />
                                </div>
                            ) : f.type === "boolean" ? (
                                <label className="mt-1 flex cursor-pointer items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={form[f.name] === true}
                                        onChange={(e) => setForm({ ...form, [f.name]: e.target.checked })}
                                        className="h-4 w-4 cursor-pointer accent-emerald-500"
                                    />
                                    <span className="text-sm text-ink-secondary">
                                        {form[f.name] === true ? "Yes" : "No"}
                                    </span>
                                </label>
                            ) : f.type === "textarea" ? (
                                <textarea
                                    value={form[f.name] ?? ""}
                                    onChange={(e) => setForm({ ...form, [f.name]: e.target.value })}
                                    rows={3}
                                    className="mt-1 w-full rounded-lg border border-rule-standard bg-surface-raised px-3 py-2 text-sm text-ink-primary placeholder:text-ink-tertiary focus:border-accent/30 focus:outline-none focus:ring-1 focus:ring-accent/20"
                                />
                            ) : f.type === "select" ? (
                                <select
                                    value={form[f.name] ?? ""}
                                    onChange={(e) => setForm({ ...form, [f.name]: e.target.value })}
                                    className="mt-1 w-full rounded-lg border border-rule-standard bg-surface-base px-3 py-2 text-sm text-ink-primary focus:border-accent/30 focus:outline-none focus:ring-1 focus:ring-accent/20"
                                >
                                    {f.options?.map((o) => (
                                        <option key={o} value={o} className="bg-surface-base text-ink-primary">
                                            {o}
                                        </option>
                                    ))}
                                </select>
                            ) : (
                                <input
                                    type={f.type}
                                    // Bounds make the browser reject an
                                    // implausible year before submit fires.
                                    // `handleSubmit` re-checks — a native
                                    // date input still accepts a five-digit
                                    // year, and constraint validation is
                                    // trivially bypassed.
                                    {...(f.type === "date"
                                        ? { min: DATE_MIN, max: dateMax() }
                                        : {})}
                                    value={form[f.name] ?? ""}
                                    onChange={(e) => setForm({ ...form, [f.name]: e.target.value })}
                                    className="mt-1 w-full rounded-lg border border-rule-standard bg-surface-raised px-3 py-2 text-sm text-ink-primary placeholder:text-ink-tertiary focus:border-accent/30 focus:outline-none focus:ring-1 focus:ring-accent/20"
                                />
                            )}
                        </div>
                    ))}
                    <div className="flex justify-end gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-lg border border-rule-standard px-4 py-2 text-sm text-ink-secondary transition-colors hover:bg-surface-raised hover:text-ink-primary"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={saving}
                            className="rounded-lg bg-accent/10 px-4 py-2 text-sm font-medium text-accent ring-1 ring-accent/20 transition-all hover:bg-accent/20 disabled:opacity-50"
                        >
                            {saving ? "Saving…" : "Save"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

/** Columns stored as JSON in Postgres. The form holds them as JSON text. */
const JSON_FIELDS = ["meta", "technologies", "narrative"] as const;

/** Columns stored as Postgres DATE. The form holds them as `YYYY-MM-DD`. */
const DATE_FIELDS = ["date", "startedOn"] as const;

/**
 * Bounds for every date input, and for the guard in `handleSubmit`.
 *
 * A free-text date field let `22026-07-30` into the record — one keystroke,
 * and Postgres accepted it as a valid year-22026 date. Because the event id
 * is derived from the date string, the typo propagated into the primary key
 * too, and `ORDER BY date DESC` then pinned that row to the top of /journey
 * for the next twenty thousand years.
 *
 * The floor is loose enough to backfill real history but still catches a
 * dropped or doubled digit. The ceiling is today: the record is a log of
 * what has happened, not a schedule.
 */
const DATE_MIN = "2020-01-01";
const dateMax = () => toISODateString(new Date());

/**
 * Rejects a date the record cannot plausibly hold.
 *
 * Throws rather than returning a flag so it joins the existing `handleSubmit`
 * failure path — the message surfaces in the same alert as a JSON parse
 * error, and nothing is written.
 */
function assertPlausibleDate(value: string, label: string): void {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
        throw new Error(
            `"${label}" must be a date in YYYY-MM-DD form. Got "${value}".`
        );
    }

    // Parsed as UTC by the `YYYY-MM-DD` form, then compared against bounds
    // parsed the same way — no local/UTC mismatch between the two sides.
    const parsed = Date.parse(value);
    if (Number.isNaN(parsed)) {
        throw new Error(`"${label}" is not a real date. Got "${value}".`);
    }

    const max = dateMax();
    if (value < DATE_MIN || value > max) {
        throw new Error(
            `"${label}" must fall between ${DATE_MIN} and ${max}. Got "${value}" — check for a mistyped year.`
        );
    }
}

/**
 * Seeds form state from a table row.
 *
 * The driver returns JSON columns already parsed, but the form edits them as
 * text: `MetaBuilder` parses a string, and the "… JSON" textareas need real
 * JSON. Passing an array straight to a textarea renders `String(array)` —
 * comma-joined values, not JSON — which then fails to parse on save.
 * Normalising here keeps rows, `getDefaults`, and both editors on one shape.
 */
function toFormState(tab: Tab, row: Record<string, unknown> | null): Record<string, unknown> {
    if (!row) return getDefaults(tab);

    const next: Record<string, unknown> = { ...row };

    for (const key of JSON_FIELDS) {
        const val = next[key];

        if (val != null && typeof val !== "string") {
            // Pretty-print the textarea fields; MetaBuilder ignores whitespace.
            next[key] = JSON.stringify(val, null, key === "meta" ? 0 : 2);
        }
    }

    // A Postgres DATE column arrives as a JS `Date` and survives the server
    // action boundary as one, so an unnormalised value reached the input as
    // an object — React stringified it to "Thu Jul 30 2026 00:00:00 GMT+0530
    // (India Standard Time)" and the operator had to retype the date by hand
    // on every edit. Same class as the `meta` and `technologies` defects: the
    // form assumed a string the driver never sends.
    for (const key of DATE_FIELDS) {
        if (next[key] != null) next[key] = toISODateString(next[key]);
    }

    return next;
}

function getDefaults(tab: Tab): any {
    switch (tab) {
        case "events": return { type: "livestream", title: "", description: "", date: "", time: "", href: "", badge: "", meta: "[]", source: "manual" };
        case "streams": return { id: "", day: 1, title: "", url: "", date: "", duration: "", viewers: 0, revenue: 0, commits: 0, focus: "", isLive: false };
        case "people": return { id: "", name: "", role: "", bio: "", avatar: "", github: "", linkedin: "", website: "", isFounder: false };
        case "projects": return { id: "", slug: "", title: "", description: "", status: "active", repository: "", technologies: "[]", startedOn: "" };
        case "tiers": return { id: "", title: "", price: 0, currency: "INR", frequency: "", label: "", description: "", narrative: "[]" };
        default: return {};
    }
}

function getFormFields(tab: Tab): { name: string; label: string; type: string; options?: string[] }[] {
    switch (tab) {
        case "events": return [
            { name: "type", label: "Type", type: "select", options: ["livestream", "pr_merge", "project_start", "project_complete", "website_launch", "revenue", "first_sale", "milestone", "community", "blog_post", "bug_fix", "architecture_decision", "learning_moment", "deployment", "partnership"] },
            { name: "title", label: "Title", type: "text" },
            { name: "description", label: "Description", type: "textarea" },
            { name: "date", label: "Date", type: "date" },
            { name: "time", label: "Time", type: "time" },
            { name: "href", label: "URL", type: "text" },
            { name: "badge", label: "Badge", type: "text" },
            { name: "meta", label: "Meta", type: "custom" },
        ];
        case "streams": return [
            { name: "id", label: "ID", type: "text" },
            { name: "day", label: "Day", type: "number" },
            { name: "title", label: "Title", type: "text" },
            { name: "url", label: "URL", type: "text" },
            { name: "date", label: "Date", type: "date" },
            { name: "duration", label: "Duration", type: "text" },
            { name: "viewers", label: "Viewers", type: "number" },
            { name: "commits", label: "Commits", type: "number" },
            { name: "revenue", label: "Revenue (cents)", type: "number" },
            { name: "focus", label: "Focus", type: "text" },
            { name: "isLive", label: "Streaming live", type: "boolean" },
        ];
        case "people": return [
            { name: "id", label: "ID", type: "text" },
            { name: "name", label: "Name", type: "text" },
            { name: "role", label: "Role", type: "text" },
            { name: "bio", label: "Bio", type: "textarea" },
            { name: "avatar", label: "Avatar Path", type: "text" },
            { name: "github", label: "GitHub", type: "text" },
            { name: "linkedin", label: "LinkedIn", type: "text" },
            { name: "website", label: "Website", type: "text" },
            { name: "isFounder", label: "Founder", type: "boolean" },
        ];
        case "projects": return [
            { name: "id", label: "ID", type: "text" },
            { name: "slug", label: "Slug", type: "text" },
            { name: "title", label: "Title", type: "text" },
            { name: "description", label: "Description", type: "textarea" },
            { name: "status", label: "Status", type: "select", options: ["active", "planned", "completed"] },
            { name: "repository", label: "Repository", type: "text" },
            { name: "technologies", label: "Technologies JSON", type: "textarea" },
            { name: "startedOn", label: "Started On", type: "date" },
        ];
        case "tiers": return [
            { name: "id", label: "ID", type: "text" },
            { name: "title", label: "Title", type: "text" },
            { name: "price", label: "Price (paise)", type: "number" },
            { name: "currency", label: "Currency", type: "text" },
            { name: "frequency", label: "Frequency", type: "text" },
            { name: "label", label: "Label", type: "text" },
            { name: "description", label: "Description", type: "textarea" },
            { name: "narrative", label: "Narrative JSON", type: "textarea" },
        ];
        case "state": return [
            { name: "key", label: "Key", type: "text" },
            { name: "value", label: "Value", type: "text" },
        ];
        default: return [];
    }
}