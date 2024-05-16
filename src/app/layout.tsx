import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {DataProvider} from "@/context/employee";
import React from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Worker schedule app",
  description: "Worker schedule app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
      <DataProvider>
        {children}
      </DataProvider>
      </body>
    </html>
  );
}
