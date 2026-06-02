import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type EmptyStateProps = {
  className?: string;
  onClearFilters: () => void;
};

export function EmptyState({
  className,
  onClearFilters,
}: EmptyStateProps): ReactNode {
  return (
    <div
      className={cn(
        "empty-state mx-auto flex w-full max-w-77.5 flex-col items-center gap-8 text-center",
        className,
      )}
    >
      <div className="flex w-full flex-col items-center gap-2 font-sans leading-normal font-normal">
        <p className="m-0 w-full text-xl tracking-[-0.04em] text-white">
          No posts match your filters.
        </p>
        <p className="m-0 w-full text-base tracking-[-0.04em] text-grey-70">
          Browse by category above, or try a different search term.
        </p>
      </div>
      <Button
        className="font-mono text-base leading-none font-medium tracking-[-0.02em] text-black uppercase shadow-none hover:bg-orange/90 focus-visible:ring-db-cyan focus-visible:ring-offset-black"
        type="button"
        variant="orange"
        size="xl"
        onClick={onClearFilters}
      >
        Clear filters
      </Button>
    </div>
  );
}
