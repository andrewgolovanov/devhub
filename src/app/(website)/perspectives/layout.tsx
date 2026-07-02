import type { ReactNode } from "react";

import Footer from "@/components/footer";
import CTA from "@/components/home/cta";

export default function PerspectivesLayout({
  children,
}: {
  children: ReactNode;
}): ReactNode {
  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <div className="flex-1">{children}</div>
      <div className="border-grey-20 mx-auto mt-18 max-w-432 border-x bg-black md:mt-24 lg:mt-32 xl:mt-37">
        <CTA
          className="pt-0 pb-16 lg:pb-22"
          theme="outline"
          label="Start building"
          title="Ready to ship your next agentic app in minutes?"
          description="Start from Databricks templates, connect your data, and deploy with the tools your team already uses."
          actions={null}
        />
        <Footer className="border-t border-white/10 bg-black lg:px-8" />
      </div>
    </div>
  );
}
