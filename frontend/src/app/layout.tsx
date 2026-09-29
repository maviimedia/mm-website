import type { Metadata, Viewport } from "next";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SmoothScroll from "../components/SmoothScroll";
import TopAnnouncement from "../components/TopAnnouncement";
import MobileFloatingBar from "@/components/MobileFloatingBar";
import FloatingBar from "@/components/FloatingBar";
import PopupForm from "@/components/PopupForm";

const siteUrl = "https://www.maviimedia.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Website & Software Development Agency — MAVIIMEDIA",
    template: "%s — MAVIIMEDIA",
  },
  description: "Brand Building & Software Engineering Studio",
  manifest: "/manifest.json",
  icons: {
    icon: "/assets/maviimedia-favicon.svg",
    shortcut: "/assets/maviimedia-favicon.svg",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "MAVIIMEDIA",
    title: "Website & Software Development Agency — MAVIIMEDIA",
    description: "Brand Building & Software Engineering Studio",
    images: [
      {
        url: "/maviimedia-og.webp",
        width: 1200,
        height: 630,
        alt: "MAVIIMEDIA",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Website & Software Development Agency — MAVIIMEDIA",
    description: "Brand Building & Software Engineering Studio",
    images: ["/maviimedia-og.webp"],
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <TopAnnouncement />
        <SmoothScroll>
          <Header />
          {children}
          <Footer />
        </SmoothScroll>
        <FloatingBar />
        <PopupForm />
      </body>
    </html>
  );
}