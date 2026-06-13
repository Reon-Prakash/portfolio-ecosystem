import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Reon's Portfolio",
  description: "Welcome to Reon's Portfolio Website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
