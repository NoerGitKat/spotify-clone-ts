import { Sidebar } from "@/components";
import { Figtree } from "next/font/google";
import "./globals.css";
import { ReactNode } from "react";
import { SupabaseProvider } from "@/providers";

const font = Figtree({ subsets: ["latin"] });

export const metadata = {
  title: "Spotify Clone",
  description: "Listen to new music!"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={font.className}>
        <SupabaseProvider>
          <Sidebar>{children}</Sidebar>
        </SupabaseProvider>
      </body>
    </html>
  );
}
