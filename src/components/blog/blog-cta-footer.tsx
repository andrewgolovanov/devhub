import type { ReactNode } from "react";

import CTA from "@/components/home-new/cta";
import NewFooter from "@/components/theme/footer";

export function BlogCtaFooter(): ReactNode {
  return (
    <div className="blog-cta-footer mx-auto mt-18 max-w-432 border-x border-grey-20 bg-black md:mt-24 lg:mt-32 xl:mt-37">
      <CTA
        className="pt-0 pb-16 lg:pb-22"
        theme="outline"
        label="Start building"
        title="Ready to ship your next agentic app in minutes?"
        description="Start from Databricks templates, connect your data, and deploy with the tools your team already uses."
        actions={null}
      />
      <NewFooter className="border-t border-white/10 bg-black lg:px-8" />
    </div>
  );
}
