import { Sidebar } from "@/components";
import {
  ModalProvider,
  SupabaseProvider,
  ToasterProvider,
  UserProvider
} from "@/providers";
import { Figtree } from "next/font/google";
import { ReactNode } from "react";
import "./globals.css";

const font = Figtree({ subsets: ["latin"] });

export const metadata = {
  title: "Spotify Clone",
  description: "Listen to new music!"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider />
        <SupabaseProvider>
          <UserProvider>
            <ModalProvider />
            <Sidebar>{children}</Sidebar>
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
