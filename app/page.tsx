import { Navbar } from "@/components/marketing/Navbar";
import { HeroWarung } from "@/components/marketing/HeroWarung";
import { LiniProduk } from "@/components/marketing/LiniProduk";
import { CeritaCarousel } from "@/components/marketing/CeritaCarousel";
import { Toserba } from "@/components/marketing/Toserba";
import { SuratKabar } from "@/components/marketing/SuratKabar";
import { FooterTuku } from "@/components/marketing/FooterTuku";
import { MotionObserver } from "@/components/marketing/MotionObserver";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-janna text-ink">
      <MotionObserver />
      <Navbar />
      <main className="divide-y-[3px] divide-black">
        <HeroWarung />
        <LiniProduk />
        <CeritaCarousel />
        <Toserba />
        <SuratKabar />
      </main>
      <FooterTuku />
    </div>
  );
}
