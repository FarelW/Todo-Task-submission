import "@/styles/globals.css";

import { TRPCReactProvider } from "@/trpc/react";
import localFont from "next/font/local";
import { ChakraProvider } from '@chakra-ui/react'

export const metadata = {
  title: "Todo Task App",
  description: "Todo Management App",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const Montserrat = localFont({
  src: "../styles/fonts/Montserrat-SemiBold.ttf",
  display:"swap",
  variable:"--font-montserrat",
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${Montserrat.variable}`}>
      <body>
        <ChakraProvider>
          <TRPCReactProvider>{children}</TRPCReactProvider>
        </ChakraProvider>
      </body>
    </html>
  );
}
