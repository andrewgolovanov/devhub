import type { ReactNode } from "react";

import { getDocsSearchItems } from "@/lib/docs-content";
import { HackathonBanner } from "@/components/hackathon/hackathon-banner";
import { Header } from "@/components/header/header";

export default function WebsiteLayout({ children }: { children: ReactNode }) {
  const searchItems = getDocsSearchItems();

  return (
    <>
      <div aria-label="Skip to main content" role="region">
        <a className="skip-to-content" href="#devhub-main-content">
          Skip to main content
        </a>
      </div>
      <HackathonBanner />
      <Header searchItems={searchItems} />
      <div id="devhub-main-content" tabIndex={-1}>
        {children}
      </div>
    </>
  );
}
