from pathlib import Path

# ==========================================================
# CONFIG
# ==========================================================

ROOT = Path(
    r"C:\Users\thisi\OneDrive\Desktop\Vibe Through Code\Repos\vibe-through-code\vibe-through-code"
)

IGNORE_DIRS = {
    ".git",
    ".github",
    ".idea",
    ".vscode",

    ".next",
    "node_modules",
    ".turbo",
    "out",
    "dist",
    "build",

    "__pycache__",
    ".venv",
    "venv",
    "env",

    ".pytest_cache",
    ".mypy_cache",
}

IGNORE_FILES = {
    ".DS_Store",
    "Thumbs.db",
}

IGNORE_EXTENSIONS = {
    ".log",
    ".pyc",
    ".pyo",
}

# ==========================================================


def should_ignore(path: Path) -> bool:
    return (
        path.name in IGNORE_DIRS
        or path.name in IGNORE_FILES
        or path.suffix in IGNORE_EXTENSIONS
    )


def print_tree(path: Path, prefix: str = ""):
    items = sorted(
        [p for p in path.iterdir() if not should_ignore(p)],
        key=lambda p: (p.is_file(), p.name.lower())
    )

    for index, item in enumerate(items):
        last = index == len(items) - 1

        print(f"{prefix}{'└── ' if last else '├── '}{item.name}")

        if item.is_dir():
            print_tree(
                item,
                prefix + ("    " if last else "│   ")
            )


print(ROOT.name)
print_tree(ROOT)