import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type SolutionEmptyStateProps = {
  className?: string;
  onClearFilters: () => void;
};

export function SolutionEmptyState({
  className,
  onClearFilters,
}: SolutionEmptyStateProps): ReactNode {
  return (
    <div
      className={cn(
        "solution-empty-state mx-auto flex w-full max-w-77.5 flex-col items-center gap-8 text-center",
        className,
      )}
    >
      <div className="flex w-full flex-col items-center gap-2 font-sans leading-normal font-normal">
        <p className="m-0 w-full text-xl tracking-normal text-white">
          No posts match your filter.
        </p>
        <p className="m-0 w-full text-base tracking-normal text-grey-70">
          Please try a different filter.
        </p>
      </div>
      <Button
        className="font-mono text-base leading-none font-medium tracking-normal text-black uppercase shadow-none hover:bg-orange/90 focus-visible:ring-db-cyan focus-visible:ring-offset-black"
        type="button"
        variant="orange"
        size="xl"
        onClick={onClearFilters}
      >
        Clear filter
      </Button>
    </div>
  );
}
