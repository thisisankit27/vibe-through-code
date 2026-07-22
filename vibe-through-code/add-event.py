#!/usr/bin/env python3
"""
add-event.py — CLI tool to add events to the Vibe Through Code journey timeline.

Usage:
    python add-event.py

Run this from the project root (same folder as package.json).
"""

import re
import sys
import random
from datetime import datetime
from pathlib import Path

# ── Configuration ──────────────────────────────────────────────
DATA_DIR = Path("data")
JOURNEY_FILE = DATA_DIR / "journey.ts"
STREAMS_FILE = DATA_DIR / "streams.ts"
PROJECTS_FILE = DATA_DIR / "projects.ts"
PEOPLE_FILE = DATA_DIR / "people.ts"

EVENT_TYPES = {
    "1": ("livestream", "YouTube Livestream"),
    "2": ("pr_merge", "GitHub PR Merge"),
    "3": ("project_start", "New Project Started"),
    "4": ("project_complete", "Project Shipped"),
    "5": ("website_launch", "Website / Page Launch"),
    "6": ("revenue", "Revenue Milestone"),
    "7": ("first_sale", "First Sale Ever"),
    "8": ("milestone", "Generic Milestone"),
    "9": ("community", "Community Achievement"),
    "10": ("blog_post", "Blog Post Published"),
    "11": ("bug_fix", "Notable Bug Fix"),
    "12": ("architecture_decision", "Architecture Decision"),
    "13": ("learning_moment", "Learning Moment"),
    "14": ("deployment", "Deployment"),
    "15": ("partnership", "Partnership"),
}

# ── Helpers ────────────────────────────────────────────────────

def ask(prompt, default=""):
    if default:
        val = input(f"{prompt} [{default}]: ").strip()
        return val if val else default
    return input(f"{prompt}: ").strip()

def ask_bool(prompt, default=False):
    suffix = " [Y/n]" if default else " [y/N]"
    val = input(f"{prompt}{suffix}: ").strip().lower()
    if not val:
        return default
    return val in ("y", "yes")

def ask_meta():
    meta = []
    print("\nMeta fields (key-value pairs shown on the card). Leave key blank to finish.")
    while True:
        key = input("  Label (e.g. Duration, Files): ").strip()
        if not key:
            break
        value = input(f"  Value for '{key}': ").strip()
        if value:
            meta.append({"label": key, "value": value})
    return meta

def today_iso():
    return datetime.now().strftime("%Y-%m-%d")

def read_file(path):
    if not path.exists():
        print(f"ERROR: {path} not found. Run from project root.")
        sys.exit(1)
    return path.read_text(encoding="utf-8")

def write_file(path, content):
    path.write_text(content, encoding="utf-8")
    print(f"  ✓ Updated {path}")

# ── Journey.ts operations ─────────────────────────────────────

def prepend_event_to_journey(ts, event_ts):
    pattern = r"(events:\s*\[)"
    match = re.search(pattern, ts)
    if not match:
        print("ERROR: Could not find events: [ in journey.ts")
        sys.exit(1)
    insert_pos = match.end()
    return ts[:insert_pos] + "\n        " + event_ts + "," + ts[insert_pos:]

def update_journey_scalar(ts, key, value):
    if isinstance(value, bool):
        val_str = str(value).lower()
    elif isinstance(value, str):
        val_str = f'"{value}"'
    else:
        val_str = str(value)
    
    # Capture leading whitespace, preserve it, and ensure trailing comma
    pattern = rf"^(\s*{re.escape(key)}:\s*).+$"
    replacement = rf"\g<1>{val_str},"
    new_ts, count = re.subn(pattern, replacement, ts, count=1, flags=re.MULTILINE)
    if count == 0:
        print(f"  ⚠ Could not find '{key}' in journey.ts — skipping")
    return new_ts

def bump_current_day(ts):
    match = re.search(r"currentDay:\s*(\d+)", ts)
    if match:
        current = int(match.group(1))
        return ts[:match.start()] + f"currentDay: {current + 1}" + ts[match.end():]
    return ts

# ── Streams.ts operations ──────────────────────────────────────

def prepend_stream_to_history(ts, stream_ts):
    pattern = r"(streamHistory\s*=\s*\[)"
    match = re.search(pattern, ts)
    if not match:
        print("ERROR: Could not find streamHistory = [ in streams.ts")
        sys.exit(1)
    insert_pos = match.end()
    return ts[:insert_pos] + "\n    " + stream_ts + "," + ts[insert_pos:]

def update_latest_stream(ts, title, url):
    ts = re.sub(
        r'(latestStream\s*=\s*\{[^}]*title:\s*)"[^"]*"',
        rf'\1"{title}"',
        ts, count=1,
    )
    ts = re.sub(
        r'(latestStream\s*=\s*\{[^}]*url:\s*)"[^"]*"',
        rf'\1"{url}"',
        ts, count=1,
    )
    return ts

# ── People.ts operations ──────────────────────────────────────

def build_person_object(person_id, name, role, bio, avatar, github, linkedin, website, is_founder):
    lines = ["    {"]
    lines.append(f'        id: "{person_id}",')
    lines.append(f'        name: "{name}",')
    lines.append(f'        role: "{role}",')
    lines.append(f'        bio: "{bio}",')
    lines.append(f'        avatar: "{avatar}",')
    if github:
        lines.append(f'        github: "{github}",')
    if linkedin:
        lines.append(f'        linkedin: "{linkedin}",')
    if website:
        lines.append(f'        website: "{website}",')
    lines.append(f'        isFounder: {str(is_founder).lower()},')
    lines.append("    }")
    return "\n".join(lines)

def append_person_to_people(ts, person_ts):
    """
    Insert a new person before the closing ]; of the people array.
    Adds a trailing comma to the previous entry if missing.
    """
    # Find the ]; that closes the array
    close_match = re.search(r"\n\s*\];", ts)
    if not close_match:
        print("ERROR: Could not find ]; in people.ts")
        sys.exit(1)

    close_pos = close_match.start()

    # Find the last } before ];
    last_brace = ts.rfind("}", 0, close_pos)
    if last_brace == -1:
        print("ERROR: Could not find } in people.ts")
        sys.exit(1)

    # Ensure the previous entry has a trailing comma
    between = ts[last_brace + 1:close_pos].strip()
    if not between.endswith(","):
        ts = ts[:last_brace + 1] + "," + ts[last_brace + 1:]
        close_pos += 1

    return ts[:close_pos] + "\n" + person_ts + ts[close_pos:]

# ── Event builders ───────────────────────────────────────────

def build_event_object(event_type, event_id, title, description, date, time, href, badge, meta):
    lines = ["{", f'            id: "{event_id}",', f'            type: "{event_type}" as const,', f'            title: "{title}",', f'            description:', f'                "{description}",', f'            date: "{date}",']
    if time:
        lines.append(f'            time: "{time}",')
    if href:
        lines.append(f'            href: "{href}",')
    if badge:
        lines.append(f'            badge: "{badge}",')
    if meta:
        lines.append("            meta: [")
        for m in meta:
            label = m["label"]
            value = m["value"]
            lines.append(f'                {{ label: "{label}", value: "{value}" }},')
        lines.append("            ],")
    lines[-1] = lines[-1].rstrip(",")
    lines.append("        }")
    return "\n".join(lines)

def build_stream_object(stream_id, day, title, url, date, duration, viewers, revenue, commits, focus):
    lines = ["{", f'        id: "{stream_id}",', f'        day: {day},', f'        title: "{title}",', f'        url: "{url}",', f'        date: "{date}",', f'        duration: "{duration}",', f'        viewers: {viewers},', f'        revenue: {revenue},', f'        commits: {commits},', f'        focus: "{focus}",', "    }"]
    return "\n".join(lines)

# ── Main CLI ───────────────────────────────────────────────────

def main():
    print("=" * 60)
    print("  VIBE THROUGH CODE — Journey Event Adder")
    print("=" * 60)
    print()
    print("Select event type:")
    for key, (slug, label) in EVENT_TYPES.items():
        print(f"  {key}. {label}")
    print()
    choice = ask("Event type (1-15)")
    while choice not in EVENT_TYPES:
        print("Invalid choice. Pick 1–15.")
        choice = ask("Event type (1-15)")
    event_type, type_label = EVENT_TYPES[choice]
    print(f"\n  → Adding: {type_label}\n")
    title = ask("Title")
    description = ask("Description")
    date = ask("Date (YYYY-MM-DD)", today_iso())
    time = ask("Time (HH:MM, optional)")
    time = time if time else None
    href = ask("Link URL (optional)")
    href = href if href else None
    badge = ask("Badge text (optional)")
    badge = badge if badge else None
    meta = ask_meta()
    event_id = f"evt-{date.replace('-', '')}-{event_type[:3]}-{random.randint(100, 999)}"
    event_ts = build_event_object(
        event_type, event_id, title, description, date, time, href, badge, meta
    )
    print("\n📄 Updating data/journey.ts ...")
    journey_ts = read_file(JOURNEY_FILE)
    journey_ts = prepend_event_to_journey(journey_ts, event_ts)
    print("\nUpdate journey scalars?")
    if ask_bool("Increment currentDay?"):
        journey_ts = bump_current_day(journey_ts)
    if ask_bool("Update currentGoal?"):
        new_goal = ask("New currentGoal")
        journey_ts = update_journey_scalar(journey_ts, "currentGoal", new_goal)
    if ask_bool("Update currentMilestone?"):
        new_ms = ask("New currentMilestone")
        journey_ts = update_journey_scalar(journey_ts, "currentMilestone", new_ms)
    if ask_bool("Update revenue?"):
        new_rev = int(ask("New revenue total"))
        journey_ts = update_journey_scalar(journey_ts, "revenue", new_rev)
    if ask_bool("Update streak?"):
        new_streak = int(ask("New streak (days)"))
        journey_ts = update_journey_scalar(journey_ts, "streak", new_streak)
    if ask_bool("Update totalCommits?"):
        new_commits = int(ask("New totalCommits"))
        journey_ts = update_journey_scalar(journey_ts, "totalCommits", new_commits)
    if ask_bool("Update totalStreams?"):
        new_streams = int(ask("New totalStreams"))
        journey_ts = update_journey_scalar(journey_ts, "totalStreams", new_streams)
    write_file(JOURNEY_FILE, journey_ts)
    if event_type == "livestream":
        print("\n📄 Updating data/streams.ts ...")
        streams_ts = read_file(STREAMS_FILE)
        print("\nStream-specific fields:")
        day = int(ask("Stream day number"))
        duration = ask("Duration", "4h 00m")
        viewers = int(ask("Viewers (0 if still live)", "0"))
        commits = int(ask("Commits during stream", "0"))
        focus = ask("Focus / topic")
        stream_id = f"stream-{day:03d}"
        stream_ts = build_stream_object(
            stream_id, day, title, href or "", date, duration, viewers, 0, commits, focus
        )
        streams_ts = prepend_stream_to_history(streams_ts, stream_ts)
        if href:
            streams_ts = update_latest_stream(streams_ts, title, href)
        write_file(STREAMS_FILE, streams_ts)
    if event_type in ("project_start", "project_complete"):
        print("\n📄 Consider updating data/projects.ts manually:")
        if event_type == "project_start":
            print("  • Add new project to projects[]")
        else:
            print("  • Set completedOn date")
            print("  • Update project.status to completed")
            print("  • Add milestone to project.milestones[]")

    # ── NEW: Contributor support ───────────────────────────────
    print()
    if ask_bool("Add a contributor to people.ts?"):
        people_ts = read_file(PEOPLE_FILE)
        print("\nContributor details:")
        person_id = ask("ID (e.g. contributor-2)")
        name = ask("Name")
        role = ask("Role", "Engineer")
        bio = ask("Bio")
        avatar = ask("Avatar path", "/images/avatar-default.png")
        github = ask("GitHub URL (optional)")
        linkedin = ask("LinkedIn URL (optional)")
        website = ask("Website URL (optional)")
        is_founder = ask_bool("Is founder?", default=False)
        person_ts = build_person_object(
            person_id, name, role, bio, avatar,
            github or None, linkedin or None, website or None,
            is_founder
        )
        people_ts = append_person_to_people(people_ts, person_ts)
        write_file(PEOPLE_FILE, people_ts)

    print("\n" + "=" * 60)
    print("  ✅ Done! Run npm run dev to verify.")
    print("=" * 60)


if __name__ == "__main__":
    main()