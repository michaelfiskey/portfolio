import type { Metadata } from "next";
import Navbar from "./components/navbar";
import { Geist, Geist_Mono, Bebas_Neue } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas-neue",
  subsets: ["latin"],
  weight: "400", // Bebas Neue only has 400
});

export const metadata: Metadata = {
  title: "Michael Fiskey",
  description: "Michael Fiskey's Personal Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${bebasNeue.variable} antialiased`}
      >
      <div className="border border-gray-250 m-5 pt-5 pl-5 pr-5 pb-10">
        <Navbar />
        {children}
      </div>
      </body>
    </html>
  );
}
