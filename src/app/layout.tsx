import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Lato,
  Bebas_Neue,
  Crimson_Pro,
  Crimson_Text,
} from "next/font/google";
import { ThemeScript } from "@/providers/ThemeProvider";
import "./globals.css";
import { SmoothScroll } from "@/utils/SmoothScroll";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  variable: "--font-lato",
});

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bebas-neue",
});

const crimsonText = Crimson_Text({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-crimson-text",
});

const crimsonPro = Crimson_Pro({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-crimson-pro",
});

export const metadata: Metadata = {
  title: "Lagoinha Sete Lagoas",
  description: "Igreja Batista da Lagoinha em Sete Lagoas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body
        className={`bg-white dark:bg-black ${geistSans.variable} ${geistMono.variable} ${lato.variable} ${bebasNeue.variable} ${crimsonText.variable} ${crimsonPro.variable} antialiased`}
      >
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
