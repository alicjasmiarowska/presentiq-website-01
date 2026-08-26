import type { Metadata } from "next";
import Script from "next/script";
import { headers } from "next/headers";
import { siteUrl } from "../src/lib/siteUrl";
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
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = await headers();
  const locale = headersList.get("x-locale") ?? "en";
  const usercentricsSettingsId = process.env.NEXT_PUBLIC_USERCENTRICS_SETTINGS_ID;

  return (
    <html lang={locale}>
      <body>
        {usercentricsSettingsId && (
          <Script
            id="usercentrics-cmp"
            src="https://app.usercentrics.eu/browser-ui/latest/loader.js"
            data-settings-id={usercentricsSettingsId}
            strategy="beforeInteractive"
          />
        )}
        {children}
      </body>
    </html>
  );
}
