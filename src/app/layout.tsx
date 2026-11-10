import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import localFont from "next/font/local";
import "./globals.css";

// Caveat (SIL Open Font License, see fonts/CAVEAT-OFL.txt) for the handwritten sticky notes.
const caveat = localFont({ src: "./fonts/caveat.woff2", variable: "--font-caveat", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://esheetvivek.vercel.app"),
  title: { default: "Esheet Vivek · design engineer", template: "%s · Esheet Vivek" },
  description: "Esheet Vivek: product-minded design engineer. Case studies in product, UI/UX, frontend and system design, including TicketRush, ticketing that stays fair under a 3,000-buyer race.",
  openGraph: { type: "website", url: "/", title: "Esheet Vivek · design engineer", description: "Product thinking, design sense, systems that hold. Open esheet.os and look around." },
  twitter: { card: "summary" },
};
export const viewport: Viewport = { themeColor: [{ media: "(prefers-color-scheme: light)", color: "#efe6d8" }, { media: "(prefers-color-scheme: dark)", color: "#14141c" }] };

// Applies a saved theme choice before first paint so there's no flash. Storage can throw; ignore.
const themeScript = `try{var t=localStorage.getItem('theme');if(t==='light'||t==='dark')document.documentElement.dataset.theme=t}catch(e){}`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable} ${caveat.variable}`} suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: themeScript }} /></head>
      <body>{children}</body>
    </html>
  );
}
