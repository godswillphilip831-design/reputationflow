import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ReputationFlow — Get More Google Reviews for Local Businesses",
  description:
    "The simple reputation platform that helps local service businesses collect more 5-star Google reviews, protect their rating, and turn feedback into marketing.",
  keywords: [
    "Google reviews",
    "review management",
    "local SEO",
    "reputation management",
    "small business reviews",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-black text-[#e7e9ea]">
        {children}
      </body>
    </html>
  );
}