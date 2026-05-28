import { Checkbox } from "@/components/ui/checkbox";
import { SERVICES, type Service } from "@/lib/recipes/recipes";

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

export function TemplateFilters({
  selectedServices,
  onToggleService,
}: {
  selectedServices: Set<Service>;
  onToggleService: (service: Service) => void;
}) {
  return (
    <nav className="space-y-1" aria-label="Filters">
      {SERVICES.map((service) => (
        <label
          className="flex min-h-9 cursor-pointer items-center gap-2.5 text-base/snug text-black transition-colors hover:text-black"
          key={service}
        >
          <Checkbox
            className="size-5 rounded-none border-grey-60 bg-transparent data-[state=checked]:border-orange data-[state=checked]:bg-orange data-[state=checked]:text-white"
            indicatorIcon={<FilterCheckIcon className="size-4" />}
            checked={selectedServices.has(service)}
            onCheckedChange={() => onToggleService(service)}
            aria-label={service}
          />
          <span>{service}</span>
        </label>
      ))}
    </nav>
  );
}
