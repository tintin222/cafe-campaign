import type { Metadata } from "next";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";

export const metadata: Metadata = {
  title: "MOC Coffee - Loyalty Rewards",
  description: "Earn points with every purchase at MOC Coffee",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-starbucks-cream min-h-screen font-sans">
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
