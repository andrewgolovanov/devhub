import { NewHeader } from "@/components/theme/new-header";
import { useLocation } from "@docusaurus/router";
import OriginalNavbar from "@theme-original/Navbar";
import type { ReactNode } from "react";

export default function Navbar(): ReactNode {
  const { pathname } = useLocation();

  if (pathname === "/home-new" || pathname === "/home-new/") {
    return <NewHeader />;
  }

  return <OriginalNavbar />;
}
