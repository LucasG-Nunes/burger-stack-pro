import "./globals.css";

import type { Metadata, Viewport } from "next";
import { Bebas_Neue, Inter } from "next/font/google";

import { BRAND } from "@/shared/constants/brand.constants";

const display = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${BRAND.name} · Hamburgueria em Candeias, Jaboatão`,
  description: `${BRAND.tagline} Peça pelo WhatsApp ou pelo cardápio digital e receba em ${BRAND.deliveryTime}.`,
  openGraph: {
    title: BRAND.name,
    description: BRAND.tagline,
    type: "website",
    locale: "pt_BR",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  colorScheme: "dark",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${display.variable} ${sans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
