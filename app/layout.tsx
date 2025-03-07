import type { Metadata } from "next";
import "./globals.css";
import { GeistMono } from 'geist/font/mono';
import Provider from "./provider";


export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={GeistMono.className}
      >
        <Provider>
        {children}
        </Provider>
      </body>
    </html>
  );
}
