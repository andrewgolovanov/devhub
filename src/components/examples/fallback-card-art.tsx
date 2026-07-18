import type { ReactNode } from "react";

/**
 * Shared decorative art used when a template (example, cookbook, or recipe) has
 * no preview screenshot. Six rotating variants so adjacent cards never repeat.
 * Called from the /templates list and the example detail hero whenever
 * `previewImage*Url` and `galleryImages` are empty.
 */
const VARIANTS: Array<{
  gradient: string;
  shapes: ReactNode;
}> = [
  {
    gradient: "bg-gradient-to-br from-[#171b21] via-[#2a3038] to-[#11141a]",
    shapes: (
      <div className="absolute inset-0">
        <div className="absolute top-6 left-7 h-16 w-24 rounded-md bg-[#0e1116]/95 shadow-lg" />
        <div className="bg-db-lava/95 absolute top-12 left-16 h-20 w-28 rounded-md" />
        <div className="absolute top-8 right-8 h-14 w-14 rounded-full border border-white/25" />
      </div>
    ),
  },
  {
    gradient: "bg-gradient-to-br from-[#eceff2] via-[#fafafa] to-[#e8ebee]",
    shapes: (
      <div className="absolute inset-0">
        <div className="absolute top-6 left-6 h-30 w-16 border-r border-black/12 bg-white/72" />
        <div className="absolute top-12 left-28 h-2 w-24 rounded bg-black/14" />
        <div className="absolute top-20 left-28 h-2 w-32 rounded bg-black/10" />
        <div className="absolute top-28 left-28 h-2 w-20 rounded bg-black/12" />
      </div>
    ),
  },
  {
    gradient: "bg-gradient-to-br from-[#0f1923] via-[#162333] to-[#0a1219]",
    shapes: (
      <div className="absolute inset-0">
        <div className="absolute top-8 left-7 h-14 w-20 rounded-sm bg-[#1a3a52]/90 shadow-lg" />
        <div className="absolute top-26 left-7 h-14 w-20 rounded-sm bg-[#1a3a52]/90 shadow-lg" />
        <div className="absolute top-14 left-32 h-20 w-24 rounded-md border border-[#2a8af6]/30 bg-[#0e1a26]/95" />
        <div className="absolute top-8 right-8 h-6 w-6 rounded-full bg-[#2a8af6]/50" />
        <div className="absolute right-10 bottom-8 h-4 w-12 rounded bg-[#2a8af6]/25" />
      </div>
    ),
  },
  {
    gradient: "bg-gradient-to-br from-[#e9ecef] via-[#f9fafb] to-[#e2e7eb]",
    shapes: (
      <div className="absolute inset-0">
        <div className="absolute bottom-6 left-6 h-28 w-10 rounded-t bg-[#4a9ff5]/40" />
        <div className="absolute bottom-6 left-20 h-20 w-10 rounded-t bg-[#4a9ff5]/55" />
        <div className="absolute bottom-6 left-34 h-32 w-10 rounded-t bg-[#4a9ff5]/35" />
        <div className="absolute top-8 right-10 h-2 w-20 rounded bg-black/12" />
        <div className="absolute top-14 right-10 h-2 w-14 rounded bg-black/10" />
        <div className="absolute top-20 right-10 h-2 w-18 rounded bg-black/8" />
      </div>
    ),
  },
  {
    gradient: "bg-gradient-to-br from-[#11141a] via-[#1b2028] to-[#0d0f14]",
    shapes: (
      <div className="absolute inset-0">
        <div className="absolute inset-0 [background-image:radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.25)_1px,transparent_0)] [background-size:8px_8px] opacity-80" />
        <div className="absolute top-8 left-8 h-12 w-28 rounded-md bg-[#1a1f28]/95 shadow-lg" />
        <div className="absolute top-24 left-8 h-12 w-28 rounded-md bg-[#1a1f28]/95 shadow-lg" />
        <div className="border-db-lava/30 absolute top-6 right-6 h-32 w-24 rounded-lg border bg-[#0e1116]/90" />
        <div className="bg-db-lava/40 absolute top-12 right-10 h-2 w-16 rounded" />
        <div className="absolute top-18 right-10 h-2 w-12 rounded bg-white/15" />
        <div className="absolute top-24 right-10 h-2 w-14 rounded bg-white/10" />
      </div>
    ),
  },
  {
    gradient: "bg-gradient-to-br from-[#f3efe8] via-[#faf8f2] to-[#ece6da]",
    shapes: (
      <div className="absolute inset-0">
        <div className="absolute top-7 left-7 h-24 w-24 rounded-full border border-black/12" />
        <div className="bg-db-lava/20 absolute right-7 bottom-7 h-16 w-28 rounded-md" />
        <div className="bg-db-lava/70 absolute right-12 bottom-12 h-3 w-16 rounded" />
      </div>
    ),
  },
];

export function FallbackCardArt({ index }: { index: number }): ReactNode {
  const variant = VARIANTS[index % VARIANTS.length];
  return (
    <div className={`absolute inset-0 ${variant.gradient}`}>
      {variant.shapes}
    </div>
  );
}
