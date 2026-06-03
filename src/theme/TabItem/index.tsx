import type { ReactNode } from "react";

import { ContentTab } from "@/components/docs/content-tabs";

type TabItemProps = {
  children: ReactNode;
  default?: boolean;
  label?: string;
  value: string;
};

export default function TabItem(props: TabItemProps) {
  return <ContentTab {...props} />;
}
