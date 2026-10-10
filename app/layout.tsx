import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { headers } from "next/headers";
import { siteUrl } from "@/src/lib/siteUrl";
import { DEFAULT_OG_IMAGE } from "@/src/lib/pageMetadata";
import "./globals.css";

const defaultDescription =
  "Presentiq designs presentations, documents, and visual systems that turn your strategy into something people actually understand.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Presentiq",
    template: "%s | Presentiq",
  },
  description: defaultDescription,
  openGraph: {
    siteName: "Presentiq",
    type: "website",
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    images: [DEFAULT_OG_IMAGE.url],
  },
};

// Colours the browser UI (Android address bar, Safari tab bar) in the
// site's navy.
export const viewport: Viewport = {
  themeColor: "#000023",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = await headers();
  const locale = headersList.get("x-locale") ?? "de";
  const usercentricsSettingsId = process.env.NEXT_PUBLIC_USERCENTRICS_SETTINGS_ID;
  // Per-request CSP nonce from proxy.ts; scripts without it are blocked.
  const nonce = headersList.get("x-nonce") ?? undefined;

  return (
    <html lang={locale}>
      <body>
        {usercentricsSettingsId && (
          <Script
            id="usercentrics-cmp"
            src="https://app.usercentrics.eu/browser-ui/latest/loader.js"
            data-settings-id={usercentricsSettingsId}
            strategy="beforeInteractive"
            nonce={nonce}
          />
        )}
        {children}
      </body>
    </html>
  );
}
