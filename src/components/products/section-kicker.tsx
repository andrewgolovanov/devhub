import { cn } from "@/lib/utils";

type SectionKickerProps = {
  children: string;
  className?: string;
  index?: string;
};

export function SectionKicker({
  children,
  className,
  index,
}: SectionKickerProps) {
  if (index) {
    return (
      <span
        className={cn(
          "bg-orange inline-flex h-7 w-fit items-center gap-2 px-1.5 py-1.5 font-mono font-medium text-white uppercase",
          className,
        )}
      >
        <span className="text-sm/none">{index}</span>
        <span className="text-base/none">{children}</span>
      </span>
    );
  }

  return (
    <span className={cn("flex items-center gap-1.5", className)}>
      <span className="bg-orange size-1.5" aria-hidden="true" />
      <span className="font-mono text-sm/none font-medium tracking-normal uppercase">
        [{children}]
      </span>
    </span>
  );
}
