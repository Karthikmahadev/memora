import type { Metadata } from "next";
import "./globals.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import ClientWrapper from "./components/ClientWrapper";


export const metadata: Metadata = {
  title: "Tilt ",
  description:
    "Visual storytelling for the digital age. Cinematography, Art Direction & Digital R&D.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body>
        {/*
          ClientWrapper handles:
            1. Showing the Loader on first mount
            2. Revealing Navbar + main content + Footer after loader exits
        */}
        <ClientWrapper>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ClientWrapper>
      </body>
    </html>
  );
}