"use client";

import { useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";
import {
    getEvents, createEvent, updateEvent, deleteEvent,
    getStreams, createStream, updateStream, deleteStream,
    getPeople, createPerson, updatePerson, deletePerson,
    getProjects, createProject, updateProject, deleteProject,
    getTiers, createTier, updateTier, deleteTier,
    getSiteState, updateSiteState,
} from "./actions";

type Tab = "events" | "streams" | "people" | "projects" | "tiers" | "state";

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
        <main className="min-h-screen bg-[#0A0A0A] text-neutral-200">
            <div className="mx-auto max-w-7xl px-4 py-10">
                <h1 className="text-3xl font-bold tracking-tight text-white">Admin</h1>
                <p className="mt-1 text-sm text-neutral-500">Manage journey data</p>

                {/* Tabs */}
                <div className="mt-8 flex flex-wrap gap-2 border-b border-white/[0.06] pb-3">
                    {tabs.map((t) => (
                        <button
                            key={t.key}
                            onClick={() => setTab(t.key)}
                            className={cn(
                                "rounded-lg px-4 py-2 text-sm font-medium transition-all",
                                tab === t.key
                                    ? "bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/20"
                                    : "text-neutral-400 hover:bg-white/[0.03] hover:text-neutral-200"
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
                            className="rounded-lg bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-400 ring-1 ring-emerald-500/20 transition-all hover:bg-emerald-500/20"
                        >
                            + Add {tabs.find((t) => t.key === tab)?.label}
                        </button>
                    </div>
                )}

                {/* Table */}
                <div className="mt-4 overflow-hidden rounded-xl border border-white/[0.06]">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-white/[0.02] text-xs uppercase tracking-wider text-neutral-500">
                            <tr>
                                {getColumns(tab).map((col) => (
                                    <th key={col} className="px-4 py-3 font-medium">{col}</th>
                                ))}
                                <th className="px-4 py-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/[0.04]">
                            {loading ? (
                                <tr><td colSpan={99} className="px-4 py-8 text-center text-neutral-500">Loading…</td></tr>
                            ) : data.length === 0 ? (
                                <tr><td colSpan={99} className="px-4 py-8 text-center text-neutral-500">No records</td></tr>
                            ) : (
                                data.map((row) => (
                                    <tr key={row.id ?? row.key} className="transition-colors hover:bg-white/[0.02]">
                                        {getColumns(tab).map((col) => (
                                            <td key={col} className="px-4 py-3 font-mono text-xs text-neutral-300">
                                                {formatCell(row, col)}
                                            </td>
                                        ))}
                                        <td className="px-4 py-3 text-right">
                                            <div className="flex justify-end gap-2">
                                                <button
                                                    onClick={() => openEdit(row)}
                                                    className="rounded px-2 py-1 text-xs text-neutral-400 transition-colors hover:bg-white/[0.04] hover:text-white"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(row.id ?? row.key)}
                                                    className="rounded px-2 py-1 text-xs text-red-400/70 transition-colors hover:bg-red-500/10 hover:text-red-400"
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

function MetaBuilder({ value, onChange }: { value: string; onChange: (v: string) => void }) {
    const pairs: { label: string; value: string }[] = (() => {
        try { return JSON.parse(value || "[]"); } catch { return []; }
    })();

    const update = (next: typeof pairs) => onChange(JSON.stringify(next));
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
                        className="flex-1 rounded-lg border border-white/[0.08] bg-white/[0.02] px-3 py-2 text-sm text-white placeholder:text-neutral-700 focus:border-emerald-500/30 focus:outline-none"
                    />
                    <input
                        placeholder="Value"
                        value={p.value}
                        onChange={(e) => setValue(i, e.target.value)}
                        className="flex-1 rounded-lg border border-white/[0.08] bg-white/[0.02] px-3 py-2 text-sm text-white placeholder:text-neutral-700 focus:border-emerald-500/30 focus:outline-none"
                    />
                    <button
                        type="button"
                        onClick={() => remove(i)}
                        className="rounded-lg px-2 text-xs text-red-400/70 hover:bg-red-500/10 hover:text-red-400"
                    >
                        ✕
                    </button>
                </div>
            ))}
            <button
                type="button"
                onClick={add}
                className="rounded-lg border border-white/[0.08] px-3 py-1.5 text-xs text-neutral-400 transition-colors hover:bg-white/[0.03] hover:text-white"
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
    const [form, setForm] = useState<any>(editing ?? getDefaults(tab));

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            const payload = { ...form };

            // Parse JSON fields
            if (payload.meta && typeof payload.meta === "string" && tab === "events") {
                payload.meta = JSON.parse(payload.meta);
            }
            if (payload.technologies && typeof payload.technologies === "string") {
                payload.technologies = JSON.parse(payload.technologies);
            }
            if (payload.narrative && typeof payload.narrative === "string") {
                payload.narrative = JSON.parse(payload.narrative);
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
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
            <div className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl border border-white/[0.08] bg-[#0A0A0A] p-6 shadow-2xl">
                <h2 className="text-lg font-semibold text-white">
                    {editing ? "Edit" : "Add"} {tab}
                </h2>
                <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                    {fields.map((f) => (
                        <div key={f.name}>
                            <label className="block text-[10px] font-semibold uppercase tracking-wider text-neutral-500">
                                {f.label}
                            </label>
                            {f.name === "meta" && tab === "events" ? (
                                <div className="mt-1">
                                    <MetaBuilder
                                        value={form[f.name] ?? "[]"}
                                        onChange={(v) => setForm({ ...form, [f.name]: v })}
                                    />
                                </div>
                            ) : f.type === "textarea" ? (
                                <textarea
                                    value={form[f.name] ?? ""}
                                    onChange={(e) => setForm({ ...form, [f.name]: e.target.value })}
                                    rows={3}
                                    className="mt-1 w-full rounded-lg border border-white/[0.08] bg-white/[0.02] px-3 py-2 text-sm text-white placeholder:text-neutral-700 focus:border-emerald-500/30 focus:outline-none focus:ring-1 focus:ring-emerald-500/20"
                                />
                            ) : f.type === "select" ? (
                                <select
                                    value={form[f.name] ?? ""}
                                    onChange={(e) => setForm({ ...form, [f.name]: e.target.value })}
                                    className="mt-1 w-full rounded-lg border border-white/[0.08] bg-[#0A0A0A] px-3 py-2 text-sm text-white focus:border-emerald-500/30 focus:outline-none focus:ring-1 focus:ring-emerald-500/20"
                                >
                                    {f.options?.map((o) => (
                                        <option key={o} value={o} className="bg-[#0A0A0A] text-white">
                                            {o}
                                        </option>
                                    ))}
                                </select>
                            ) : (
                                <input
                                    type={f.type}
                                    value={form[f.name] ?? ""}
                                    onChange={(e) => setForm({ ...form, [f.name]: e.target.value })}
                                    className="mt-1 w-full rounded-lg border border-white/[0.08] bg-white/[0.02] px-3 py-2 text-sm text-white placeholder:text-neutral-700 focus:border-emerald-500/30 focus:outline-none focus:ring-1 focus:ring-emerald-500/20"
                                />
                            )}
                        </div>
                    ))}
                    <div className="flex justify-end gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-lg border border-white/[0.08] px-4 py-2 text-sm text-neutral-400 transition-colors hover:bg-white/[0.03] hover:text-white"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={saving}
                            className="rounded-lg bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-400 ring-1 ring-emerald-500/20 transition-all hover:bg-emerald-500/20 disabled:opacity-50"
                        >
                            {saving ? "Saving…" : "Save"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
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
            { name: "date", label: "Date (YYYY-MM-DD)", type: "text" },
            { name: "time", label: "Time (HH:MM)", type: "text" },
            { name: "href", label: "URL", type: "text" },
            { name: "badge", label: "Badge", type: "text" },
            { name: "meta", label: "Meta", type: "custom" },
        ];
        case "streams": return [
            { name: "id", label: "ID", type: "text" },
            { name: "day", label: "Day", type: "number" },
            { name: "title", label: "Title", type: "text" },
            { name: "url", label: "URL", type: "text" },
            { name: "date", label: "Date", type: "text" },
            { name: "duration", label: "Duration", type: "text" },
            { name: "viewers", label: "Viewers", type: "number" },
            { name: "commits", label: "Commits", type: "number" },
            { name: "focus", label: "Focus", type: "text" },
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
        ];
        case "projects": return [
            { name: "id", label: "ID", type: "text" },
            { name: "slug", label: "Slug", type: "text" },
            { name: "title", label: "Title", type: "text" },
            { name: "description", label: "Description", type: "textarea" },
            { name: "status", label: "Status", type: "select", options: ["active", "planned", "completed"] },
            { name: "repository", label: "Repository", type: "text" },
            { name: "technologies", label: "Technologies JSON", type: "textarea" },
            { name: "startedOn", label: "Started On", type: "text" },
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