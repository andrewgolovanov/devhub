import Link from "@docusaurus/Link";
import type { ComponentProps, ReactNode, RefObject } from "react";

import { CopyPromptButton } from "@/components/copy-prompt-button";
import CTA from "@/components/home/cta";
import NewFooter from "@/components/theme/footer";
import { BackLink } from "@/components/ui/back-link";
import { Button } from "@/components/ui/button";

type HackathonTemplateUsageProps = ComponentProps<typeof CopyPromptButton> & {
  slug: string;
};

type HackathonTemplateDetailProps = {
  title: string;
  description: string;
  usage: HackathonTemplateUsageProps;
  children: ReactNode;
  contentRef: RefObject<HTMLDivElement | null>;
  services?: readonly string[];
};

function HackathonTemplateAgentBlock({
  usage,
}: {
  usage: HackathonTemplateUsageProps;
}): ReactNode {
  const { slug, ...copyPromptProps } = usage;

  return (
    <div className="mt-8 border border-grey-30 p-5 md:mt-11 md:p-6">
      <h2 className="m-0 text-lg/snug font-medium tracking-tight text-white md:text-xl/snug">
        Use with your coding agent
      </h2>
      <ol className="mt-4 flex list-decimal flex-col gap-y-2.5 pl-4 text-lg/normal tracking-tight text-grey-90">
        <li className="pl-2">Copy the prompt below</li>
        <li className="pl-2">
          Paste into Cursor, Claude Code, Codex, or any coding agent
        </li>
        <li className="pl-2">
          Your agent builds it — asking questions along the way so the result is
          exactly what you want
        </li>
      </ol>
      <div className="mt-5 flex flex-wrap gap-x-5 gap-y-3.5">
        <CopyPromptButton
          {...copyPromptProps}
          label="Copy agent prompt"
          className="w-full h-9 flex-row-reverse rounded-none bg-orange pl-5 pr-4.5 font-mono text-sm leading-none font-medium tracking-tight text-black uppercase hover:bg-primary focus-visible:ring-orange/60 has-[>svg]:px-5 [&_svg:not([class*='size-'])]:size-3.5 sm:w-fit"
        />
        <Button
          className="w-full h-9 rounded-none bg-white px-7 font-mono text-sm leading-none font-medium tracking-tight text-black uppercase shadow-none hover:bg-white/90 sm:w-fit"
          asChild
        >
          <Link className="no-underline hover:no-underline" to="/templates">
            Explore templates
          </Link>
        </Button>
      </div>
    </div>
  );
}

export function HackathonTemplateDetail({
  title,
  description,
  usage,
  children,
  contentRef,
  services = [],
}: HackathonTemplateDetailProps): ReactNode {
  return (
    <main className="bg-black text-white">
      <section className="pt-9 md:pt-12 xl:pt-17.5">
        <div className="mx-auto max-w-4xl px-5 md:px-8">
          <article>
            <BackLink to="/templates" aria-label="All templates">
              All templates
            </BackLink>

            <h1 className="mt-6.5 text-[2rem]/[1.125] font-normal tracking-[-0.04em] wrap-break-word text-white md:text-[2.5rem]/[1.125] lg:text-[3rem]/[1.125] xl:text-[3.5rem]/[1.125]">
              {title}
            </h1>
            <p className="mt-4 max-w-208 text-lg/snug tracking-[-0.04em] text-grey-90 md:text-xl/snug">
              {description}
            </p>
            {services.length > 0 ? (
              <ul className="mt-6 flex flex-wrap gap-1" role="list">
                {services.map((service) => (
                  <li
                    className="flex items-center justify-center h-8 bg-grey-5 border border-grey-30 px-3.5 font-mono text-sm leading-none font-medium text-grey-80"
                    key={service}
                  >
                    {service}
                  </li>
                ))}
              </ul>
            ) : null}

            <HackathonTemplateAgentBlock usage={usage} />

            <div className="mt-10 md:mt-14" ref={contentRef}>
              {children}
            </div>
          </article>
        </div>
      </section>

      <div className="mx-auto mt-24 max-w-432 border-x border-grey-20 bg-black md:mt-36 lg:mt-44 xl:mt-60">
        <CTA
          className="pt-0 pb-16 lg:pb-22"
          theme="outline"
          label="Start building"
          title="Ready to ship your next agentic app in minutes?"
        />
        <NewFooter className="border-t border-white/10 bg-black lg:px-8" />
      </div>
    </main>
  );
}
