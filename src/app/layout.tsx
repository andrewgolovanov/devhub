import "@/css/custom.css";

import type { ReactNode } from "react";
import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/react";

import { resolveSiteUrl } from "@/lib/site-url";

export const metadata: Metadata = {
  metadataBase: new URL(resolveSiteUrl()),
  title: {
    default: "Databricks Developer",
    template: "%s | Databricks Developer",
  },
  description: "Build and deploy data apps and AI agents on Databricks.",
  verification: {
    google: "r9cgLLCpOwLqma0I_MXet4Ix8AK6v_UNHMe1CHsfNr8",
  },
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      {
        url: "/favicon/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/favicon/favicon-48x48.png",
        sizes: "48x48",
        type: "image/png",
      },
      {
        url: "/favicon/favicon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
    ],
    apple: [
      {
        url: "/favicon/favicon-256x256.png",
        sizes: "256x256",
        type: "image/png",
      },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: "#040406",
};

const renderVercelAnalytics = process.env.VERCEL === "1";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body>
        {renderVercelAnalytics ? <Analytics /> : null}
        {children}
      </body>
    </html>
  );
}
