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
      <div
        className={cn(
          "inline-flex h-7 items-center gap-2 bg-orange px-1.5 py-1.5 font-mono font-medium uppercase text-white w-fit",
          className,
        )}
      >
        <span className="text-sm/none">{index}</span>
        <span className="text-base/none">{children}</span>
      </div>
    );
  }

  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      <span className="size-1.5 bg-orange" aria-hidden="true" />
      <p className="font-mono text-sm/none font-medium tracking-normal uppercase">
        [{children}]
      </p>
    </div>
  );
}
