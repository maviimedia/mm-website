import type { Metadata, Viewport } from "next";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SmoothScroll from "../components/SmoothScroll";

export const metadata: Metadata = {
  title: "MAVIIMEDA",
  description: "Brand Building & Software Engineering Studio",
  manifest: "/manifest.json",
  icons: {
    icon: "/assets/maviimedia-favicon.svg",
    shortcut: "/assets/maviimedia-favicon.svg",
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
        <SmoothScroll>
          <Header />
          {children}
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}