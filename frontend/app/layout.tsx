import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import ReduxProvider from "@/components/providers/redux-provider";
import LoadingBar from "@/components/ui-customs/loading-bar";
import { Toaster } from "@/components/ui/toaster";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  style: ["normal", "italic"],
  variable: "--font-roboto",
});

import "./globals.css";

export const metadata: Metadata = {
  title: "Taxi Analytics",
  description: "Taxi Analytics Dashboard by github.com/andymyp",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} antialiased`}>
        <ReduxProvider>
          <LoadingBar />
          {children}
          <Toaster />
        </ReduxProvider>
      </body>
    </html>
  );
}
