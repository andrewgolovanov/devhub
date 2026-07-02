"use client";

import { usePathname, useRouter } from "next/navigation";

export function useLocation() {
  const pathname = usePathname();
  return {
    pathname,
    search: "",
    hash: "",
  };
}

export function useHistory() {
  const router = useRouter();
  return {
    push: router.push,
    replace: router.replace,
    goBack: router.back,
  };
}
