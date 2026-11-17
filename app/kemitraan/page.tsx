import type { Metadata } from "next";
import Image from "next/image";

import { FooterTuku } from "@/components/marketing/FooterTuku";
import { MotionObserver } from "@/components/marketing/MotionObserver";
import { Navbar } from "@/components/marketing/Navbar";
import { assetPath } from "@/lib/asset-path";

export const metadata: Metadata = {
  title: "Informasi Kemitraan | Sorgtime",
  description:
    "Kenali peluang kemitraan Sorgtime, pilihan paket usaha, dukungan operasional, dan fasilitas yang didapatkan mitra.",
  openGraph: {
    title: "Informasi Kemitraan Sorgtime",
    description:
      "Tumbuh bersama Sorgtime melalui usaha minuman berbasis sorgum dengan sistem kemitraan yang praktis.",
    url: "https://sorgtime.com/kemitraan",
    type: "website",
  },
};

const WHATSAPP_URL =
  "https://wa.me/6281259015626?text=Halo%20Sorgtime%2C%20saya%20tertarik%20mendapatkan%20informasi%20lebih%20lanjut%20tentang%20kemitraan%20Sorgtime.";

const REASONS = [
  { number: "01", title: "Produk Unggul", text: "Olahan sorgum memberi identitas produk yang kuat dan memiliki keunggulan menyehatkan (diet-friendly) di pasar minuman." },
  { number: "02", title: "Modal lebih terjangkau", text: "Pilihan model usaha yang ringkas membantu mitra memulai sesuai kebutuhan dan area." },
  { number: "03", title: "Tanpa bagi hasil", text: "Keuntungan operasional tetap menjadi milik mitra tanpa skema royalty fee bulanan." },
  { number: "04", title: "Semi-auto pilot system", text: "Tim membantu persiapan pekerja dan operasional agar mitra dapat fokus pada pertumbuhan." },
  { number: "05", title: "Garansi Buyback", text: "Unit akan dibeli-kembali apabila Mitra tidak memeroleh balik modal dalam waktu s.d. 1 tahun" },
  { number: "06", title: "Dukungan pemasaran", text: "Materi komunikasi dan promosi disiapkan untuk membantu memperkenalkan outlet Anda." },
];

const SUPPORT = [
  { mark: "A", title: "Pemilihan area", text: "Pengecekan ketersediaan dan potensi wilayah." },
  { mark: "B", title: "Lisensi merek", text: "Identitas brand dan materi outlet Sorgtime." },
  { mark: "C", title: "Setup unit", text: "Persiapan booth atau sepeda listrik." },
  { mark: "D", title: "Peralatan & SOP", text: "Peralatan awal dan panduan kerja operasional." },
  { mark: "E", title: "Bahan baku", text: "Paket bahan awal untuk memulai penjualan." },
  { mark: "F", title: "Rekrutmen", text: "Tim membantu pencarian pekerja outlet." },
  { mark: "G", title: "Perawatan", text: "Dukungan perbaikan unit sesuai ketentuan." },
  { mark: "H", title: "Pemasaran", text: "Materi promosi untuk mendukung pembukaan." },
  { mark: "I", title: "Pendampingan", text: "Komunikasi dengan tim selama usaha berjalan." },
];

const BUSINESS_ASSETS = [
  "Booth atau unit sepeda listrik",
  "Payung booth ukuran 220 cm",
  "2 cooler box dan 6 cold brew maker 2,2 L",
  "4 dispenser air 12 L dan 2 timbangan",
  "1.000 cup PP 12 oz tanpa sedotan",
  "Gelas ukur dan 1.000 plastik takeaway",
];

const STARTER_MATERIALS = [
  "House blend coffee 10 kg",
  "Gula sorgum 10 kg",
  "Matcha 3 kg dan swiss choco 3 kg",
  "Creamer 3 kg dan susu UHT 12 L",
  "Sirup caramel & hazelnut 6 L",
  "3 kaus polos untuk tim operasional",
];

const STEPS = [
  { number: "01", title: "Hubungi tim", text: "Sampaikan kota tujuan dan model usaha yang Anda minati melalui WhatsApp." },
  { number: "02", title: "Konsultasi", text: "Tim menjelaskan paket, kesiapan modal, kebutuhan area, dan sistem operasional." },
  { number: "03", title: "Persiapan", text: "Finalisasi kerja sama, unit usaha, bahan awal, dan kebutuhan pekerja." },
  { number: "04", title: "Mulai berjualan", text: "Unit siap beroperasi dengan dukungan dan pendampingan tim Sorgtime." },
];

function ArrowIcon() {
  return (
    <svg viewBox="0 0 32 18" className="h-5 w-8" aria-hidden="true">
      <path d="M1 9h28M22 2l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function WhatsAppButton({ inverse = false }: { inverse?: boolean }) {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-4 border-2 border-black px-6 py-4 font-hand text-base uppercase text-black transition-transform hover:-translate-y-1 ${
        inverse ? "bg-fire-bush shadow-[7px_7px_0_#fcf5e6]" : "bg-janna shadow-[7px_7px_0_#f1644b]"
      }`}
    >
      Konsultasi kemitraan <ArrowIcon />
    </a>
  );
}

export default function KemitraanPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-janna text-ink">
      <Navbar />
      <MotionObserver />

      <section className="relative overflow-hidden border-b-[3px] border-black bg-conifer px-5 pb-14 pt-28 text-janna lg:min-h-[900px] lg:pb-10 lg:pt-24">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.45) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.45) 1px, transparent 1px)",
            backgroundSize: "42px 42px",
          }}
        />
        <div className="pointer-events-none absolute left-1/2 top-[41%] h-[410px] w-[410px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/25 blur-[1px] lg:h-[570px] lg:w-[570px]" />

        {/* Mobile composition */}
        <div className="relative mx-auto max-w-[560px] lg:hidden">
          <div className="hero-rise text-center">
            <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-janna/65">Peluang usaha bersama</span>
            <h1 className="mt-4 font-serif text-[62px] font-semibold leading-[0.82] tracking-[-0.065em]">
              Kopi Diet
              <span className="mt-3 block whitespace-nowrap font-hand text-[clamp(28px,7.2vw,36px)] font-normal tracking-[0.01em] text-fire-bush">No. 1 di Indonesia</span>
            </h1>
          </div>

          <div className="hero-pop relative mx-auto mt-6 h-[350px] w-full">
            <div className="absolute left-1/2 top-1/2 h-[285px] w-[285px] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-black bg-janna shadow-[9px_9px_0_#f1644b]" />
            <Image
              src={assetPath("/sorgtime/infofranchise/assets/kemitraan-hero-v2.webp")}
              alt="Cup minuman Sorgtime"
              fill
              priority
              sizes="94vw"
              className="translate-y-1 scale-[1.34] object-contain drop-shadow-[0_24px_20px_rgba(0,0,0,.32)]"
            />
            <div className="absolute left-0 top-5 -rotate-6 border-2 border-black bg-gold px-3 py-2 text-black shadow-[4px_4px_0_#211e1e]">
              <strong className="font-hand text-2xl">Mulai 6 jt</strong>
            </div>
            <div className="absolute bottom-5 right-0 rotate-5 border-2 border-black bg-fire-bush px-3 py-2 text-black shadow-[4px_4px_0_#211e1e]">
              <strong className="font-hand text-2xl">0% bagi hasil</strong>
            </div>
          </div>

          <p className="hero-rise mx-auto mt-5 max-w-[440px] text-center text-sm leading-7 text-janna/75">
            Mulai usaha minuman berbasis olahan sorgum dengan sistem kemitraan yang fleksibel dan menjanjikan.
          </p>
          <div className="hero-rise mt-7 flex justify-center"><WhatsAppButton /></div>
        </div>

        {/* Desktop editorial poster */}
        <div className="relative mx-auto hidden h-[790px] w-full max-w-[1240px] lg:block">
          <div className="hero-rise absolute left-0 top-14 z-20 flex items-center gap-3">
            <span className="h-px w-12 bg-fire-bush" />
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-janna/65">Peluang usaha bersama Sorgtime</span>
          </div>

          <h1 className="hero-rise absolute inset-x-0 top-16 z-10 text-center">
            <span className="block font-serif text-[108px] font-semibold leading-none tracking-[-0.07em] text-janna">Kopi Diet</span>
            <span className="mt-1 block font-hand text-[88px] font-normal leading-[0.9] tracking-[0.01em] text-fire-bush">No. 1 di Indonesia</span>
          </h1>

          <div className="hero-pop absolute left-1/2 top-[190px] z-20 h-[500px] w-[780px] -translate-x-1/2">
            <div className="absolute left-1/2 top-1/2 h-[440px] w-[440px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-black bg-janna shadow-[13px_13px_0_#f1644b]" />
            <div className="absolute left-1/2 top-1/2 h-[390px] w-[390px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-black/20 bg-gold/35" />
            <Image
              src={assetPath("/sorgtime/infofranchise/assets/kemitraan-hero-v2.webp")}
              alt="Cup minuman Sorgtime"
              fill
              priority
              sizes="780px"
              className="translate-y-2 scale-[1.56] object-contain drop-shadow-[0_30px_24px_rgba(0,0,0,.36)]"
            />
          </div>

          <div className="hero-pop absolute left-0 top-[355px] z-30 -rotate-5 border-2 border-black bg-gold px-5 py-4 text-black shadow-[6px_6px_0_#211e1e]">
            <span className="block font-mono text-[8px] uppercase tracking-[0.18em]">Investasi mulai</span>
            <strong className="mt-1 block font-hand text-4xl leading-none">Rp6 juta</strong>
          </div>
          <div className="hero-pop absolute right-0 top-[390px] z-30 rotate-5 rounded-full border-2 border-black bg-fire-bush px-7 py-7 text-center text-black shadow-[6px_6px_0_#fcf5e6]">
            <strong className="block font-hand text-4xl leading-none">65+</strong>
            <span className="font-mono text-[8px] uppercase tracking-[0.16em]">Mitra aktif</span>
          </div>

          <div className="hero-rise absolute bottom-7 left-0 z-30 max-w-[350px] border-t border-janna/35 pt-5">
            <p className="text-sm leading-7 text-janna/70">Mulai usaha minuman berbasis olahan sorgum dengan sistem kemitraan yang fleksibel dan menjanjikan.</p>
          </div>
          <div className="hero-rise absolute bottom-8 right-0 z-30"><WhatsAppButton /></div>

          <div className="absolute bottom-9 left-1/2 z-30 -translate-x-1/2 text-center">
            <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-janna/45">Diet coffee · Sorgum lokal · 0% bagi hasil</span>
          </div>
        </div>
      </section>

      <div className="overflow-hidden border-b-[3px] border-black bg-fire-bush py-3 font-hand text-xl uppercase text-black">
        <div className="flex min-w-max gap-8">
          <span>Minuman berbasis sorgum ✦ Kopi diet ✦ Usaha menjanjikan ✦ No royalty fee ✦</span>
          <span aria-hidden="true">Minuman berbasis sorgum ✦ Kopi diet ✦ Usaha menjanjikan ✦ No royalty fee ✦</span>
        </div>
      </div>

      <section className="border-b-[3px] border-black bg-janna px-5 py-20 md:py-28">
        <div className="mx-auto max-w-[1140px] text-center">
          <p className="font-mono text-xs uppercase tracking-[0.2em]" data-reveal>Peluang usaha bersama Sorgtime</p>
          <h2 className="mx-auto mt-6 max-w-[900px] text-balance font-serif text-5xl font-semibold leading-[0.96] tracking-[-0.05em] md:text-8xl" data-reveal>
            Potensi Sorgtime
          </h2>
          <p className="mx-auto mt-7 max-w-[760px] text-base leading-8 text-black/65" data-reveal>
            Jumlah kemitraan Sorgtime meningkat pesat dalam satu tahun terakhir.
          </p>
          <div className="mt-14 grid border-2 border-black bg-black sm:grid-cols-3" data-reveal>
            {[
              { value: "65+", label: "Mitra aktif" },
              { value: "2", label: "Pilihan model usaha" },
              { value: "0%", label: "Bagi hasil keuntungan" },
            ].map((item, index) => (
              <div key={item.label} className={`bg-janna px-5 py-8 ${index > 0 ? "border-t-2 border-black sm:border-l-2 sm:border-t-0" : ""}`}>
                <p className="font-hand text-6xl text-brand md:text-7xl">{item.value}</p>
                <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em]">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b-[3px] border-black bg-khaki px-5 py-20 md:py-28">
        <div className="mx-auto max-w-[1240px]">
          <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div data-reveal="left">
              <p className="font-mono text-xs uppercase tracking-[0.18em]">Semi-Autopilot System</p>
              <h2 className="mt-5 max-w-[650px] font-serif text-5xl font-semibold leading-[0.95] tracking-[-0.05em] md:text-7xl">Kenapa harus Sorgtime?</h2>
            </div>
            <p className="max-w-[390px] text-sm leading-7" data-reveal="right">Model kemitraan yang ringkas, didukung produk unggul, aset usaha, dan pendampingan tim.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {REASONS.map((reason, index) => {
              const dark = index === 2 || index === 4;
              return (
                <article key={reason.title} className={`group min-h-[260px] border-2 border-black p-6 transition-transform hover:-translate-y-1 ${dark ? "bg-conifer text-janna" : "bg-janna"}`} data-reveal>
                  <div className="flex items-start justify-between gap-5">
                    <span className="font-mono text-xs tracking-[0.18em]">{reason.number}</span>
                    <span className={`grid h-12 w-12 place-items-center rounded-full border-2 ${dark ? "border-janna" : "border-black"}`}>↗</span>
                  </div>
                  <h3 className="mt-12 font-serif text-3xl font-semibold leading-none tracking-[-0.035em]">{reason.title}</h3>
                  <p className={`mt-4 text-sm leading-6 ${dark ? "text-janna/70" : "text-black/65"}`}>{reason.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-b-[3px] border-black bg-conifer px-5 py-20 text-janna md:py-28">
        <div className="mx-auto max-w-[1240px]">
          <div className="grid gap-10 lg:grid-cols-[0.68fr_1.32fr]">
            <div data-reveal="left">
              <p className="font-mono text-xs uppercase tracking-[0.18em]">Problem dan potensial</p>
              <h2 className="mt-5 font-serif text-5xl font-semibold leading-[0.95] tracking-[-0.05em] md:text-7xl">Peluang Sorgtime</h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-3" data-reveal="right">
              <article className="border-2 border-black bg-janna p-5 text-black shadow-[7px_7px_0_#f1644b]">
                <p className="font-hand text-5xl text-fire-bush">19,47 jt</p><p className="mt-4 text-sm leading-6">Orang dengan diabetes di Indonesia pada 2021.</p><p className="mt-8 font-mono text-[9px] uppercase tracking-wider">Diabetes Atlas</p>
              </article>
              <article className="border-2 border-black bg-gold p-5 text-black shadow-[7px_7px_0_#f1644b]">
                <p className="font-hand text-5xl">40.000 ha</p><p className="mt-4 text-sm leading-6">Target luas tanam sorgum nasional pada 2024.</p><p className="mt-8 font-mono text-[9px] uppercase tracking-wider">Kemenko Perekonomian</p>
              </article>
              <article className="border-2 border-black bg-fire-bush p-5 text-black shadow-[7px_7px_0_#fcf5e6]">
                <p className="font-hand text-5xl">6,3%</p><p className="mt-4 text-sm leading-6">Proyeksi pertumbuhan tahunan volume RTD pada 2025.</p><p className="mt-8 font-mono text-[9px] uppercase tracking-wider">Statista</p>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b-[3px] border-black bg-janna px-5 py-20 md:py-28">
        <div className="mx-auto max-w-[1240px]">
          <div className="mx-auto max-w-[800px] text-center" data-reveal>
            <p className="font-mono text-xs uppercase tracking-[0.18em]">Dukungan yang kami berikan</p>
            <h2 className="mt-5 font-serif text-5xl font-semibold leading-none tracking-[-0.05em] md:text-7xl">Dari persiapan hingga jualan.</h2>
          </div>
          <div className="mt-14 grid gap-px border-2 border-black bg-black sm:grid-cols-2 lg:grid-cols-3">
            {SUPPORT.map((item) => (
              <article key={item.title} className="group min-h-[210px] bg-janna p-6 transition-colors hover:bg-gold" data-reveal>
                <span className="grid h-11 w-11 place-items-center rounded-full border-2 border-black font-hand text-lg group-hover:bg-conifer group-hover:text-janna">{item.mark}</span>
                <h3 className="mt-8 font-serif text-2xl font-semibold tracking-[-0.025em]">{item.title}</h3>
                <p className="mt-3 max-w-[280px] text-sm leading-6 text-black/60">{item.text}</p>
              </article>
            ))}
          </div>
          <div className="mt-10 text-center" data-reveal><WhatsAppButton /></div>
        </div>
      </section>

      <section className="border-b-[3px] border-black bg-fire-bush px-5 py-20 md:py-28">
        <div className="mx-auto max-w-[1240px]">
          <div className="mb-12 text-center" data-reveal>
            <p className="font-mono text-xs uppercase tracking-[0.18em]">Kategori franchise</p>
            <h2 className="mt-5 font-serif text-5xl font-semibold tracking-[-0.05em] md:text-7xl">Pilihan Paket Franchise</h2>
          </div>
          <div className="grid gap-7 lg:grid-cols-2">
            <article className="relative border-[3px] border-black bg-janna p-5 shadow-[10px_10px_0_#211e1e] md:p-8" data-reveal="left">
              <span className="absolute right-4 top-4 z-10 rotate-3 border border-black bg-gold px-3 py-1 font-hand text-xs uppercase">Ringkas & lincah</span>
              <div className="relative h-[330px] sm:h-[430px]"><Image src={assetPath("/sorgtime/infofranchise/assets/booth.webp")} alt="Paket booth Sorgtime" fill sizes="(min-width: 1024px) 48vw, 90vw" className="object-contain" /></div>
              <div className="border-t-2 border-black pt-6">
                <p className="font-mono text-xs uppercase tracking-widest">Paket Booth</p>
                <div className="mt-2 flex flex-wrap items-end justify-between gap-3"><h3 className="font-hand text-5xl uppercase md:text-6xl">Rp6 juta</h3><span className="text-xs uppercase">Investasi awal</span></div>
              </div>
            </article>
            <article className="relative border-[3px] border-black bg-white p-5 shadow-[10px_10px_0_#211e1e] md:p-8" data-reveal="right">
              <span className="absolute right-4 top-4 z-10 -rotate-3 border border-black bg-conifer px-3 py-1 font-hand text-xs uppercase text-janna">Mobilitas tinggi</span>
              <div className="relative h-[330px] sm:h-[430px]"><Image src={assetPath("/sorgtime/infofranchise/assets/paket-electric-trike.webp")} alt="Paket sepeda listrik Sorgtime" fill sizes="(min-width: 1024px) 48vw, 90vw" className="object-contain" /></div>
              <div className="border-t-2 border-black pt-6">
                <p className="font-mono text-xs uppercase tracking-widest">Paket Sepeda Listrik</p>
                <div className="mt-2 flex flex-wrap items-end justify-between gap-3"><h3 className="font-hand text-5xl uppercase md:text-6xl">Rp25 juta</h3><span className="text-xs uppercase">Investasi awal</span></div>
                <div className="mt-6 grid grid-cols-2 gap-3 border-t border-black/25 pt-5 text-xs leading-5 sm:grid-cols-4">
                  <p><strong className="block">48V 12AH</strong>Baterai</p><p><strong className="block">350W</strong>Motor</p><p><strong className="block">±45 km</strong>Jarak</p><p><strong className="block">4–6 jam</strong>Pengisian</p>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="border-b-[3px] border-black bg-janna px-5 py-20 md:py-28">
        <div className="mx-auto grid max-w-[1240px] gap-12 lg:grid-cols-2 lg:gap-20">
          {[
            { eyebrow: "Alat apa saja yang diperoleh?", title: "Peralatan Usaha", items: BUSINESS_ASSETS },
            { eyebrow: "Bagaimana dengan bahannya?", title: "Bahan Baku Awal", items: STARTER_MATERIALS },
          ].map((group) => (
            <article key={group.title} data-reveal>
              <p className="font-mono text-xs uppercase tracking-[0.18em]">{group.eyebrow}</p>
              <h2 className="mt-4 font-serif text-4xl font-semibold tracking-[-0.04em] md:text-6xl">{group.title}</h2>
              <ul className="mt-8 border-t-2 border-black">
                {group.items.map((item, index) => (
                  <li key={item} className="flex gap-4 border-b border-black/35 py-4 text-sm leading-6"><span className="font-mono text-xs">{String(index + 1).padStart(2, "0")}</span>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="border-b-[3px] border-black bg-khaki px-5 py-20 md:py-28">
        <div className="mx-auto max-w-[1240px]">
          <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div data-reveal="left"><p className="font-mono text-xs uppercase tracking-[0.18em]">Legalitas</p><h2 className="mt-5 font-serif text-5xl font-semibold tracking-[-0.05em] md:text-7xl">Legalitas Sorgtime</h2></div>
            <p className="max-w-[420px] text-sm leading-7" data-reveal="right">Legalitas dan perlindungan merek menjadi bagian dari fondasi bisnis Sorgtime.</p>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {[
              { image: assetPath("/sorgtime/infofranchise/assets/legalitas-nib.jpg"), title: "Nomor Induk Berusaha", note: "NIB terbit melalui sistem OSS" },
              { image: assetPath("/sorgtime/infofranchise/assets/legalitas-halal.png"), title: "Sertifikat Halal", note: "Produk minuman Sorgtime tercantum pada sertifikat" },
              { image: assetPath("/sorgtime/infofranchise/assets/legalitas-hki.webp"), title: "Merek Terdaftar", note: "Perlindungan merek Sorgtime" },
            ].map((item) => (
              <article key={item.title} className="border-2 border-black bg-white p-3 shadow-[7px_7px_0_#211e1e]" data-reveal>
                <div className="relative aspect-[4/3] overflow-hidden border border-black bg-horizon"><Image src={item.image} alt={item.title} fill sizes="(min-width: 768px) 33vw, 90vw" className="object-contain p-3" /></div>
                <div className="px-2 pb-2 pt-5"><h3 className="font-hand text-2xl uppercase">{item.title}</h3><p className="mt-2 text-xs leading-5 text-black/65">{item.note}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b-[3px] border-black bg-conifer px-5 py-20 text-janna md:py-28">
        <div className="mx-auto max-w-[1240px]">
          <div className="mx-auto max-w-[800px] text-center" data-reveal>
            <p className="font-mono text-xs uppercase tracking-[0.18em]">Cara menjadi mitra</p>
            <h2 className="mt-5 font-serif text-5xl font-semibold leading-none tracking-[-0.05em] md:text-7xl">Tahapan menjadi Mitra</h2>
          </div>
          <div className="relative mt-14 grid gap-5 lg:grid-cols-4">
            <div className="absolute left-[12%] right-[12%] top-9 hidden border-t border-dashed border-janna/45 lg:block" />
            {STEPS.map((step, index) => (
              <article key={step.number} className="relative border border-janna/35 bg-janna/5 p-6" data-reveal>
                <span className="relative z-10 grid h-[72px] w-[72px] place-items-center rounded-full border-2 border-black bg-fire-bush font-hand text-3xl text-black shadow-[4px_4px_0_#fcf5e6]">{step.number}</span>
                <h3 className="mt-8 font-serif text-2xl font-semibold">{step.title}</h3>
                <p className="mt-3 text-sm leading-6 text-janna/65">{step.text}</p>
                {index < STEPS.length - 1 && <span className="absolute -bottom-4 left-1/2 lg:hidden">↓</span>}
              </article>
            ))}
          </div>
          <div className="mt-10 text-center" data-reveal><WhatsAppButton inverse /></div>
        </div>
      </section>

      <section className="border-b-[3px] border-black bg-gold px-5 py-20 md:py-24">
        <div className="mx-auto grid max-w-[1240px] gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div data-reveal="left"><span className="inline-block -rotate-2 border-2 border-black bg-janna px-4 py-2 font-hand uppercase shadow-[5px_5px_0_#211e1e]">Program khusus</span><h2 className="mt-8 font-serif text-5xl font-semibold leading-none tracking-[-0.05em] md:text-7xl">Sharing kitchen.</h2></div>
          <div className="border-2 border-black bg-janna p-6 shadow-[8px_8px_0_#211e1e] md:p-9" data-reveal="right">
            <p className="text-lg leading-8">Khusus area Surabaya dan Sidoarjo untuk distribusi unit sepeda listrik.</p>
            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              <p className="border-t border-black pt-3 text-sm"><strong className="block font-hand text-3xl">Hemat Rp3 juta</strong>Potongan dari harga investasi berjalan</p>
              <p className="border-t border-black pt-3 text-sm"><strong className="block font-hand text-3xl">Rp1.500/cup</strong>Biaya penanganan operasional</p>
              <p className="border-t border-black pt-3 text-sm"><strong className="block font-hand text-3xl">Rp200 ribu</strong>Air dan listrik per bulan</p>
              <p className="border-t border-black pt-3 text-sm"><strong className="block font-hand text-3xl">0%</strong>Bagi hasil keuntungan</p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-b-[3px] border-black bg-conifer px-5 py-24 text-center text-janna md:py-36">
        <div className="pointer-events-none absolute -left-16 top-1/2 h-48 w-48 -translate-y-1/2 rounded-full border-[30px] border-fire-bush/70" />
        <div className="pointer-events-none absolute -right-20 top-10 h-56 w-56 rotate-12 border-[24px] border-gold/70" />
        <div className="relative mx-auto max-w-[900px]" data-reveal>
          <p className="font-mono text-xs uppercase tracking-[0.2em]">Mari menjadi mitra</p>
          <h2 className="mt-6 text-balance font-serif text-5xl font-semibold leading-[0.95] tracking-[-0.05em] md:text-8xl">Tunggu apalagi?</h2>
          <p className="mx-auto mt-6 max-w-[550px] text-sm leading-7 text-janna/75">Hubungi tim kami untuk mengecek ketersediaan area, detail paket, dan tahapan memulai kemitraan.</p>
          <div className="mt-9"><WhatsAppButton inverse /></div>
        </div>
      </section>

      <FooterTuku />
    </main>
  );
}
