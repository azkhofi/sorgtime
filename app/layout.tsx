import type { Metadata } from "next";
import {
  Caveat,
  Fraunces,
  Inter,
  JetBrains_Mono,
} from "next/font/google";
import "./globals.css";

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://azkhofi.github.io/sorgtime/"),
  title: "Sorgtime — Your Go To Gluten Free Cold Brew Coffee",
  description:
    "Cold brew kopi gluten free dari biji sorgum lokal. Rendah gula, bebas laktosa, ramah vegan, dan mendukung gaya hidup sehat.",
  keywords: [
    "SORGTIME",
    "cold brew",
    "gluten free",
    "kopi sorgum",
    "low sugar",
    "lactose free",
    "kopi sehat",
    "kopi Indonesia",
  ],
  openGraph: {
    title: "Sorgtime — Your Go To Gluten Free Cold Brew Coffee",
    description:
      "Cold brew kopi gluten free dari biji sorgum lokal untuk gaya hidup sehat.",
    url: "https://azkhofi.github.io/sorgtime/",
    siteName: "Sorgtime",
    images: [{ url: "/sorgtime/coverweb.png", width: 1920, height: 1080 }],
    locale: "id_ID",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="id"
      className={`${caveat.variable} ${fraunces.variable} ${inter.variable} ${jetbrainsMono.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col">{children}</body>
    </html>
  );
}
