import type { ReactNode } from "react";

import WebsiteLayout from "./(website)/layout";
import WebsiteNotFound, {
  metadata as websiteNotFoundMetadata,
} from "./(website)/not-found";

export const metadata = websiteNotFoundMetadata;

export default function NotFound(): ReactNode {
  return (
    <WebsiteLayout>
      <WebsiteNotFound />
    </WebsiteLayout>
  );
}
