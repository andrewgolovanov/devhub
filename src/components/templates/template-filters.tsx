import { Checkbox } from "@/components/ui/checkbox";
import { SERVICES, type Service } from "@/lib/recipes/recipes";

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
            className="size-5 rounded-none border-grey-60 bg-transparent data-[state=checked]:border-orange data-[state=checked]:bg-orange"
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
