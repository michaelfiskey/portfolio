import Navbar from "./components/Navbar";
import { AuthProvider } from "./components/AuthContext";
import Footer from './components/Footer';
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>Michael Fiskey</title>
        <meta name="description" content="Michael Fiskey's Personal Portfolio" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${bebasNeue.variable} antialiased min-h-screen flex flex-col`}
      >
        <AuthProvider>
          <Navbar />
          <div className="m-1 pt-20 pb-10 sm:m-10 sm:pl-5 sm:pr-5 sm:pt-20 sm:px-5 sm:pb-10 flex-grow">
              {children}
          </div>
          <Footer/>
        </AuthProvider>
      </body>
    </html>
  );
}
