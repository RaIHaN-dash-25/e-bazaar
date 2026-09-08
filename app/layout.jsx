import { ClerkProvider } from "@clerk/nextjs";
import { Fraunces, Figtree } from "next/font/google";
import { Toaster } from "react-hot-toast";
import StoreProvider from "@/app/StoreProvider";
import UserSync from "@/components/UserSync";
import ProductDataLoader from "@/components/ProductDataLoader";
import "./globals.css";

// Fraunces: a soft, organic display serif — carries the "warm & friendly" voice in headings
const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-fraunces",
});

// Figtree: a rounded, approachable body sans — keeps long text easy and friendly
const figtree = Figtree({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-figtree",
});

export const metadata = {
  title: "E-Bazaar. - Shop smarter",
  description: "E-Bazaar. - Shop smarter",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${fraunces.variable} ${figtree.variable} font-body antialiased`}>
          <StoreProvider>
            <Toaster />
            <UserSync />
            <ProductDataLoader />
            {children}
          </StoreProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}