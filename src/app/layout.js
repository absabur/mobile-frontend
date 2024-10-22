import localFont from "next/font/local";
import "./globals.css";
import { StoreProvider } from "@/Store/StoreProvider";
import Navbar from "@/Components/Navbar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "MobileSpecs",
  description: "MobileSpecs",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <StoreProvider>
        <body className={`${geistSans.variable} ${geistMono.variable}`}>
          <Navbar />
          <div className="main">{children}</div>
        </body>
      </StoreProvider>
    </html>
  );
}
