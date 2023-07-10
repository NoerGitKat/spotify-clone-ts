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
import { getActiveProductsWithPrices, getSongsByUserId } from "@/actions";
import { Player } from "@/components/player";

const font = Figtree({ subsets: ["latin"] });

export const metadata = {
  title: "Spotify Clone",
  description: "Listen to new music!"
};

export const revalidate = 0;

export default async function RootLayout({
  children
}: {
  children: ReactNode;
}) {
  const userSongs = await getSongsByUserId();
  const activeProducts = await getActiveProductsWithPrices();

  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider />
        <SupabaseProvider>
          <UserProvider>
            <ModalProvider activeProducts={activeProducts} />
            <Sidebar userSongs={userSongs}>{children}</Sidebar>
            <Player />
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
