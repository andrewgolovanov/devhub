import type { ReactNode } from "react";
import type { TabValue } from "@docusaurus/theme-common/internal";

import { ContentTabs } from "@/components/docs/content-tabs";

type TabsProps = {
  children?: ReactNode;
  className?: string;
  defaultValue?: string;
  groupId?: string;
  labels?: string[];
  queryString?: boolean | string;
  values?: readonly TabValue[];
};

export default function Tabs(props: TabsProps) {
  return <ContentTabs {...props} />;
}
