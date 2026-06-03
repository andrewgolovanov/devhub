import { NewHeader } from "@/components/theme/new-header";
import { useLocation } from "@docusaurus/router";
import OriginalNavbar from "@theme-original/Navbar";
import type { ReactNode } from "react";

export default function Navbar(): ReactNode {
  const { pathname } = useLocation();

  if (pathname.startsWith("/docs")) {
    return <NewHeader className="navbar h-auto border-x-0 shadow-none" />;
  }

  if (
    pathname === "/home-new" ||
    pathname === "/home-new/" ||
    pathname === "/blog" ||
    pathname === "/blog/" ||
    pathname.startsWith("/blog/") ||
    pathname.startsWith("/templates") ||
    pathname.startsWith("/product/")
  ) {
    return <NewHeader />;
  }

  return <OriginalNavbar />;
}
