import type { Metadata } from "next";
import Image from "next/image";

import { CrackShop } from "@/components/marketing/CrackShop";
import { FooterTuku } from "@/components/marketing/FooterTuku";
import { MotionObserver } from "@/components/marketing/MotionObserver";
import { Navbar } from "@/components/marketing/Navbar";
import { assetPath } from "@/lib/asset-path";

export const metadata: Metadata = {
  title: "C'rack — Roti & Kue Gluten Free | Sorgtime",
  description:
    "Book menu C'rack by Sorgtime: roti, pastry, dan cookies gluten free dengan gula sorgum lokal. Pilih menu, atur jumlah, dan pesan langsung via WhatsApp.",
  openGraph: {
    title: "C'rack by Sorgtime — Your Go-To Gluten Free Bakes",
    description:
      "Pilih roti dan kue gluten free favoritmu, atur jumlahnya, lalu checkout langsung via WhatsApp.",
    url: "https://sorgtime.com/crack",
    type: "website",
  },
};

export default function CrackPage() {
  return (
    <main className="min-h-screen bg-khaki pt-[57px]">
      <Navbar />
      <MotionObserver />

      <section
        className="relative overflow-hidden border-b-[3px] border-black px-5 pb-12 pt-24 text-center text-janna lg:pb-16"
        style={{
          backgroundImage: `url(${assetPath("/sorgtime/bg_crack.webp")})`,
          backgroundRepeat: "repeat",
          backgroundSize: "min(480px, 60vw) auto",
        }}
      >
        <div className="pointer-events-none absolute inset-0 bg-forest/55" aria-hidden="true" />
        <div className="relative mx-auto max-w-[760px]" data-reveal>
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-janna/70">
            by Sorgtime — Stay Healthy With Us!
          </p>
          <h1 className="mx-auto mt-5 w-full max-w-[420px] md:max-w-[640px]">
            <Image
              src={assetPath("/sorgtime/logo_crack.webp")}
              alt="C'rack"
              width={15358}
              height={1922}
              priority
              sizes="(min-width: 768px) 640px, 90vw"
              className="h-auto w-full drop-shadow-[0_10px_14px_rgba(0,0,0,0.35)]"
            />
          </h1>
          <p className="mt-4 font-hand text-2xl text-fire-bush md:text-3xl">
            Your Go-To Gluten Free Bakes
          </p>
          <p className="mx-auto mt-5 max-w-[520px] text-sm leading-7 text-janna/85">
            Pilih roti, pastry, dan cookies bebas gluten dari book menu kami. Atur
            jumlahnya, tumpuk ke keranjang, lalu checkout langsung ke WhatsApp.
          </p>
        </div>
      </section>

      <CrackShop />

      <FooterTuku />
    </main>
  );
}
