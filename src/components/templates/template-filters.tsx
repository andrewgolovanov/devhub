import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { SERVICES, type Service } from "@/lib/recipes/recipes";
import { cn } from "@/lib/utils";

function FilterCheckIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2 10.1429L5.57143 13.7143L13.9048 3"
        stroke="currentColor"
        strokeWidth="2.14286"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TemplateFiltersTitle({
  className,
  title,
}: {
  className?: string;
  title: string;
}) {
  return (
    <p
      className={cn(
        "mb-4 text-sm/none font-medium tracking-tight text-black/30 uppercase",
        className,
      )}
    >
      [{title}]
    </p>
  );
}

export function TemplateFilters({
  selectedServices,
  onToggleService,
  replitOnly,
  onToggleReplitOnly,
  selectedFilterCount,
  onClearFilters,
}: {
  selectedServices: Set<Service>;
  onToggleService: (service: Service) => void;
  replitOnly: boolean;
  onToggleReplitOnly: () => void;
  selectedFilterCount: number;
  onClearFilters: () => void;
}) {
  const selectedFilterLabel =
    selectedFilterCount === 1
      ? "1 FILTER selected"
      : `${selectedFilterCount} FILTERS selected`;

  return (
    <nav className="flex flex-col" aria-label="Filters">
      {selectedFilterCount > 0 ? (
        <div className="mb-5 flex flex-col gap-5">
          <div className="flex items-start justify-between gap-4">
            <p className="m-0 text-xs/none font-medium tracking-tight text-black uppercase">
              {selectedFilterLabel}
            </p>
            <Button
              className="h-auto gap-1 rounded-none !bg-transparent p-0 font-sans text-xs/none font-medium tracking-tight text-black/30 uppercase shadow-none hover:!bg-transparent hover:text-black active:!bg-transparent focus-visible:!bg-transparent focus-visible:ring-db-cyan focus-visible:ring-offset-db-oat-light [&_svg:not([class*='size-'])]:size-3"
              type="button"
              variant="ghost"
              onClick={onClearFilters}
            >
              Clear all
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.125 1.875L1.875 10.125M1.875 1.875L10.125 10.125"
                  stroke="currentColor"
                  strokeWidth="1.13"
                  strokeMiterlimit="10"
                  strokeLinejoin="round"
                />
              </svg>
            </Button>
          </div>
          <div className="h-px w-full bg-grey-80" aria-hidden="true" />
        </div>
      ) : null}
      <TemplateFiltersTitle title="Services" />
      {SERVICES.map((service) => (
        <label
          className="mb-1 flex min-h-9 cursor-pointer items-center gap-2.5 text-base/snug text-black transition-colors hover:text-black"
          key={service}
        >
          <Checkbox
            className="size-5 rounded-none border-grey-60 bg-transparent data-[state=checked]:border-orange data-[state=checked]:bg-orange data-[state=checked]:text-white dark:border-grey-60 dark:bg-transparent"
            indicatorIcon={<FilterCheckIcon className="size-4" />}
            checked={selectedServices.has(service)}
            onCheckedChange={() => onToggleService(service)}
            aria-label={service}
          />
          <span>{service}</span>
        </label>
      ))}
      <TemplateFiltersTitle className="mt-7" title="Build with" />
      <label className="flex min-h-9 cursor-pointer items-center gap-2.5 text-base/snug text-black transition-colors hover:text-black">
        <Checkbox
          className="size-5 rounded-none border-grey-60 bg-transparent data-[state=checked]:border-orange data-[state=checked]:bg-orange data-[state=checked]:text-white dark:border-grey-60 dark:bg-transparent"
          indicatorIcon={<FilterCheckIcon className="size-4" />}
          checked={replitOnly}
          onCheckedChange={onToggleReplitOnly}
          aria-label="Replit"
        />
        <span>Replit</span>
      </label>
    </nav>
  );
}
