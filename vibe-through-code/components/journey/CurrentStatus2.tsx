// "use client";

// import { CurrentStatus as CurrentStatusType } from "./types";
// import { cn } from "@/lib/utils";

// interface CurrentStatusProps {
//   status: CurrentStatusType;
// }

// export function CurrentStatus({ status }: CurrentStatusProps) {
//   return (
//     <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6">
//       <div className="flex items-start justify-between gap-4">
//         <div className="flex-1">
//           <div className="flex items-center gap-2.5">
//             {status.isLive ? (
//               <span className="relative flex h-2.5 w-2.5">
//                 <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
//                 <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-500" />
//               </span>
//             ) : (
//               <span className="h-2 w-2 rounded-full bg-neutral-600" />
//             )}
//             <span
//               className={cn(
//                 "text-[11px] font-semibold uppercase tracking-wider",
//                 status.isLive ? "text-red-400" : "text-neutral-500"
//               )}
//             >
//               {status.label}
//             </span>
//           </div>

//           <p className="mt-2 text-lg font-medium text-neutral-100">
//             {status.message}
//           </p>
//         </div>

//         {status.meta && status.meta.length > 0 && (
//           <div className="hidden sm:flex items-center gap-4">
//             {status.meta.map((m) => (
//               <div key={m.label} className="text-right">
//                 <p className="text-[10px] font-medium uppercase tracking-wider text-neutral-600">
//                   {m.label}
//                 </p>
//                 <p className="mt-0.5 text-sm font-semibold text-neutral-200 tabular-nums">
//                   {m.value}
//                 </p>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Mobile meta */}
//       {status.meta && status.meta.length > 0 && (
//         <div className="mt-4 flex flex-wrap gap-3 sm:hidden">
//           {status.meta.map((m) => (
//             <div
//               key={m.label}
//               className="rounded-lg border border-white/[0.04] bg-white/[0.02] px-3 py-2"
//             >
//               <p className="text-[10px] font-medium uppercase tracking-wider text-neutral-600">
//                 {m.label}
//               </p>
//               <p className="mt-0.5 text-sm font-medium text-neutral-200 tabular-nums">
//                 {m.value}
//               </p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }
