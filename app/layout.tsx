import type { Metadata } from "next";
import { Geist, Geist_Mono, Dosis } from "next/font/google";
import Image from "next/image";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const dosis = Dosis({
  variable: "--font-dosis",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gerenciador de Hábitos",
  description: "gerencie seus habitos na palma de sua mão",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${dosis.variable} h-full antialiased`}
    >
      <body className={`${dosis.variable}min-h-full flex flex-col items-center mt-10 bg-neutral-900`}>
        <Image src="/title.svg" width={200} height={200} alt="Logo" />
        {children}
        </body>
    </html>
  );
}
