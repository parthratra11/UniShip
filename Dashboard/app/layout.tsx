import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "UniShip",
  description: "created by - random.random",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
