import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CommentFuel",
  description: "Generate viral TikTok, Instagram, and YouTube comments using AI",
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