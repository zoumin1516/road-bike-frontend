import type { Metadata } from "next";
import Script from "next/script";
import { Barlow, Barlow_Condensed, Geist_Mono } from "next/font/google";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

import "./globals.css";

const barlowSans = Barlow({
  variable: "--font-barlow-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const barlowCondensed = Barlow_Condensed({
  variable: "--font-barlow-condensed",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: {
    default: "Road Bike Database",
    template: "%s | Road Bike Database",
  },
  description: "公路车品牌、车型、配置、套件的数据查询展示网站",
  keywords: ["公路车", "road bike", "自行车数据库", "车型", "配置", "零部件"],
  openGraph: {
    title: "Road Bike Database",
    description: "公路车品牌、车型、配置、套件的数据查询展示网站",
    type: "website",
    locale: "zh_CN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Road Bike Database",
    description: "公路车品牌、车型、配置、套件的数据查询展示网站",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const umamiUrl = process.env.NEXT_PUBLIC_UMAMI_URL;
  const umamiWebsiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;
  const shouldLoadUmami = Boolean(umamiUrl && umamiWebsiteId && umamiWebsiteId !== "change-me-after-creating-site");

  return (
    <html lang="zh-CN" data-scroll-behavior="smooth">
      <body
        className={`${barlowSans.variable} ${barlowCondensed.variable} ${geistMono.variable} bg-white text-stone-900 antialiased`}
      >
        {shouldLoadUmami ? (
          <Script
            async
            src={`${umamiUrl}/script.js`}
            data-website-id={umamiWebsiteId}
            strategy="afterInteractive"
          />
        ) : null}
        <div className="flex min-h-screen flex-col">
          <SiteHeader />
          <div className="flex-1">{children}</div>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
