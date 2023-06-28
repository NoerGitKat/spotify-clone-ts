import { Sidebar } from "@/components";
import { Figtree } from "next/font/google";
import "./globals.css";
import { ReactNode } from "react";

const font = Figtree({ subsets: ["latin"] });

export const metadata = {
  title: "Spotify Clone",
  description: "Listen to new music!"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={font.className}>
        <Sidebar>{children}</Sidebar>
      </body>
    </html>
  );
}
