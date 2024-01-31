import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NavMenu, Footer } from "@/_components";
import styles from "@/_styles/layout.module.css";
import "./globals.css";

import "@fortawesome/fontawesome-svg-core/styles.css"; // import Font Awesome CSS
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';

const inter = Inter({ subsets: ["latin"] });

library.add(fab);

export const metadata: Metadata = {
  title: "Iris Pattaya Property",
  description: "IRis Pattaya Property will be your 1st company in Thailand you want to reach when you need any property, real estate agent, buy, sell, rental, house, villa, land, townhouse, etc. Don't hesitate to contact us anytime",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavMenu />
        <div className={styles.layout}>{children}</div>
        <Footer />
      </body>
    </html>
  );
}
