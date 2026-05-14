import { cn } from "@/lib/utils";

const METRIC_COLUMNS = [
  {
    title: "For developers",
    description:
      "Pick a template, run one command, and your agentic app is live - with a database, AI model access, and auth already wired up. No Kubernetes. No Terraform. No waiting on ops.",
    metrics: [
      { value: "44%", label: "improved operational accuracy" },
      { value: "$10M+", label: "in productivity gains" },
    ],
  },
  {
    title: "For developers",
    description:
      "Pick a template, run one command, and your agentic app is live - with a database, AI model access, and auth already wired up. No Kubernetes. No Terraform. No waiting on ops.",
    metrics: [
      { value: "96%", label: "accuracy of responses" },
      { value: "10x", label: "reduced costs via automation" },
    ],
  },
];

function LovedByDevelopers({ className }: { className?: string }) {
  return (
    <section
      className={cn(
        "relative loved-by-developers overflow-hidden text-white",
        className,
      )}
    >
      <div className="relative z-10 mx-auto flex flex-col px-5 py-18 max-w-272 xl:max-w-304 md:px-8 md:py-24 lg:py-32 xl:py-46 2xl:max-w-376">
        <header className="relative z-10 flex flex-col">
          <h2 className="font-heading text-6xl leading-none font-normal tracking-normal md:text-8xl/none lg:text-9xl/none xl:text-[10rem] 2xl:text-[13.125rem]">
            <span className="block max-w-342 text-balance">
              Built for enterprise.
            </span>
            <span className="block">
              {" "}
              <span className="block text-db-lava-light lg:ml-60 2xl:ml-122">
                Loved by
              </span>{" "}
              <span className="block lg:ml-24 2xl:ml-64 xl:translate-x-8">
                developers.
              </span>
            </span>
          </h2>
        </header>

        <ul className="relative z-10 mt-20 grid gap-10 md:mt-28 md:grid-cols-2 md:gap-8 lg:gap-20 lg:mt-44 xl:mt-46 xl:gap-24 2xl:gap-56">
          {METRIC_COLUMNS.map(({ title, description, metrics }, index) => (
            <li
              key={`${title}-${index}`}
              className={cn(
                "flex flex-col border-white/20 md:border-l md:pl-8",
                index === 1 && "border-t pt-10 md:border-t-0 md:pt-0",
              )}
            >
              <h3 className="text-base leading-normal font-medium text-white md:text-xl/normal lg:text-2xl/normal">
                {title}
              </h3>
              <p className="mt-3 max-w-lg text-sm/normal text-white/60 md:text-base xl:text-lg/normal">
                {description}
              </p>
              <ul className="mt-20 grid gap-10 md:mt-32 xl:mt-42.5 md:gap-20">
                {metrics.map(({ value, label }) => (
                  <li
                    key={value}
                    className="flex items-baseline gap-3 md:gap-4"
                  >
                    <span className="font-mono text-5xl leading-[1.125] font-normal tracking-normal text-white md:text-6xl lg:text-7xl xl:text-7xl 2xl:text-[7rem]">
                      {value}
                    </span>
                    <span className="max-w-40 text-xs leading-normal ml-1 text-white/60 md:max-w-66 md:text-sm lg:text-lg">
                      {label}
                    </span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        aria-hidden="true"
      >
        <div className="absolute top-0 left-1/2 h-33 w-61 translate-x-1/6 [background-image:radial-gradient(circle_at_1px_1px,rgb(255_255_255)_1px,transparent_0)] bg-size-[6px_6px] lg:h-85 lg:w-140 lg:right-auto lg:left-[calc(50%-3em)] 2xl:h-94 2xl:w-170 2xl:left-[calc(50%-2em)] 2xl:translate-x-1/6" />
        <div className="absolute hidden top-57 -right-1/2 h-98 w-145 [background-image:radial-gradient(circle_at_1px_1px,rgb(255_255_255)_1px,transparent_0)] bg-size-[6px_6px] lg:block xl:right-[calc(50%+31.125rem)] xl:top-130 xl:h-84 xl:w-145 2xl:h-98 2xl:right-[calc(50%+29.75rem)] 2xl:w-145 2xl:top-158" />
        <div className="absolute hidden top-66 right-1/2 h-48.5 w-45 [background-image:radial-gradient(circle_at_1px_1px,rgb(255_255_255)_1px,transparent_0)] bg-size-[6px_6px] lg:block xl:right-[calc(50%+22rem)] xl:top-130 xl:h-36 xl:w-36 2xl:h-45 2xl:right-[calc(50%+17.5rem)] 2xl:w-48.5 2xl:top-158" />
      </div>
    </section>
  );
}

export default LovedByDevelopers;
