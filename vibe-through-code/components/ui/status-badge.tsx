import { Circle } from "lucide-react";

interface StatusBadgeProps {
    label: string;
}

export default function StatusBadge({
    label,
}: StatusBadgeProps) {
    return (
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-400">
            <Circle className="h-2.5 w-2.5 fill-current" />
            {label}
        </div>
    );
}