"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { assetPath } from "@/lib/asset-path";

const STORES = [
  { name: "Sorgtime Situbondo", image: assetPath("/sorgtime/franchise/sketchbooth.webp") },
  { name: "Sorgtime Malang", image: assetPath("/sorgtime/franchise/sketchbooth.webp") },
  { name: "Sorgtime Surabaya", image: assetPath("/sorgtime/franchise/sketchsepeda.webp") },
  { name: "Sorgtime Sidoarjo", image: assetPath("/sorgtime/franchise/sketchsepeda.webp") },
  { name: "Sorgtime Batam", image: assetPath("/sorgtime/franchise/sketchbooth.webp") },
  { name: "Sorgtime Lombok", image: assetPath("/sorgtime/franchise/sketchsepeda.webp") },
  { name: "Sorgtime Gresik", image: assetPath("/sorgtime/franchise/sketchbooth.webp") },
  { name: "Sorgtime Depok", image: assetPath("/sorgtime/franchise/sketchbooth.webp") },
  { name: "Sorgtime Bekasi", image: assetPath("/sorgtime/franchise/sketchbooth.webp") },
  { name: "Sorgtime Jambi", image: assetPath("/sorgtime/franchise/sketchbooth.webp") },
  { name: "Sorgtime Semarang", image: assetPath("/sorgtime/franchise/sketchbooth.webp") },
  { name: "Sorgtime Tangerang", image: assetPath("/sorgtime/franchise/sketchbooth.webp") },
  { name: "Sorgtime Batam", image: assetPath("/sorgtime/franchise/sketchbooth.webp") },
  { name: "Sorgtime Kartasura", image: assetPath("/sorgtime/franchise/sketchsepeda.webp") },
  { name: "Sorgtime Solo", image: assetPath("/sorgtime/franchise/sketchsepeda.webp") },
  { name: "Sorgtime Kalibagor", image: assetPath("/sorgtime/franchise/sketchbooth.webp") },
  { name: "Sorgtime Probolinggo", image: assetPath("/sorgtime/franchise/sketchbooth.webp") },
  { name: "Sorgtime Jember", image: assetPath("/sorgtime/franchise/sketchbooth.webp") },
];

export function FooterTuku() {
  const [index, setIndex] = useState(0);
  const store = STORES[index];
  const mapHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(store.name)}`;

  return (
    <footer
      id="lokasi"
      className="relative scroll-mt-14 border-t-[3px] border-black bg-white px-5 text-black max-sm:text-lg max-sm:leading-7"
    >
      <div className="mx-auto flex max-w-[1240px] items-center gap-10 py-10 max-md:flex-col md:items-stretch md:gap-24 lg:py-[68px]">
        {/* Left: store locator */}
        <div className="flex min-w-[300px] max-w-[440px] flex-col gap-5" data-reveal="left">
          {/* Heading */}
          <p className="text-center font-hand text-base uppercase">
            Cek Lokasi Sorgtime Terdekat
          </p>

          {/* Store illustration */}
          <div className="relative h-[240px] overflow-hidden border border-black bg-conifer px-5">
            <Image
              key={`${store.name}-${index}`}
              src={store.image}
              alt={`Ilustrasi ${store.name}`}
              fill
              sizes="(min-width: 768px) 440px, 90vw"
              className="product-reveal object-contain"
            />
          </div>

          {/* Prev/Next */}
          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 font-hand text-sm uppercase">
            <button
              type="button"
              onClick={() => setIndex((i) => (i - 1 + STORES.length) % STORES.length)}
              className="flex flex-row items-center gap-1 uppercase"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
                <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
              </svg>
              <p className="mt-3 whitespace-nowrap">Sebelumnya</p>
            </button>
            <span className="mt-2 whitespace-nowrap text-[11px] tabular-nums">
              {String(index + 1).padStart(2, "0")} / {String(STORES.length).padStart(2, "0")}
            </span>
            <button
              type="button"
              onClick={() => setIndex((i) => (i + 1) % STORES.length)}
              className="flex flex-row-reverse items-center justify-self-end gap-1 uppercase"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 rotate-180">
                <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
              </svg>
              <p className="mt-3 whitespace-nowrap">Selanjutnya</p>
            </button>
          </div>

          {/* Store info card */}
          <div className="flex w-auto flex-col">
            <div className="whitespace-nowrap border border-black px-[15px] py-2 text-center font-medium uppercase">
              <p className="text-sm">{store.name}</p>
              <p className="text-[10px] font-normal tracking-[0.12em]">Cabang Mitra Sorgtime</p>
            </div>
            <div className="flex flex-row justify-between gap-5 whitespace-nowrap border border-black bg-black px-[30px] py-2 text-[10px] text-white">
              <a
                href={mapHref}
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer border-b border-dotted"
              >
                Petunjuk arah
              </a>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Sorgtime"
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer border-b border-dotted"
              >
                Sorgtime terdekat
              </a>
            </div>
          </div>
        </div>

        {/* Right: links */}
        <div className="flex w-full flex-col justify-between gap-[30px]" data-reveal="right">
          {/* Link columns */}
          <div className="grid grid-cols-2 items-start justify-between gap-5 text-lg md:gap-14 md:text-base xl:flex">
            {/* Column 1: Sorgtime Group */}
            <div className="flex flex-col">
              <div className="min-w-max mb-5 font-medium uppercase">
                Sorgtime Group
              </div>
              <div className="flex min-w-max flex-col gap-[10px] md:gap-3">
                <a href="#" className="whitespace-pre-line text-sm leading-[23px] transition-colors md:leading-normal hover:text-fire-bush">
                  Instagram
                </a>
                <a href="#" className="whitespace-pre-line text-sm leading-[23px] transition-colors md:leading-normal hover:text-fire-bush">
                  Email
                </a>
              </div>
            </div>

            {/* Column 2: Info Sorgtime */}
            <div className="flex flex-col">
              <div className="min-w-max mb-5 font-medium uppercase">
                Info Sorgtime
              </div>
              <div className="flex min-w-max flex-col gap-[10px] md:gap-3">
                <Link href="/#tentang" className="whitespace-pre-line text-sm leading-[23px] transition-colors md:leading-normal hover:text-fire-bush">
                  Tentang
                </Link>
                <Link href="/#lini-produk" className="whitespace-pre-line text-sm leading-[23px] transition-colors md:leading-normal hover:text-fire-bush">
                  Menu
                </Link>
                <Link href="/kemitraan" className="whitespace-pre-line text-sm leading-[23px] transition-colors md:leading-normal hover:text-fire-bush">
                  Kemitraan
                </Link>
                <Link href="/#lokasi" className="whitespace-pre-line text-sm leading-[23px] transition-colors md:leading-normal hover:text-fire-bush">
                  Lokasi Toko
                </Link>
                <Link href="/#surat-kabar" className="whitespace-pre-line text-sm leading-[23px] transition-colors md:leading-normal hover:text-fire-bush">
                  Surat Kabar
                </Link>
                <Link href="/#galeri" className="whitespace-pre-line text-sm leading-[23px] transition-colors md:leading-normal hover:text-fire-bush">
                  Galeri
                </Link>
              </div>
            </div>

            {/* Column 3: tagline */}
            <div className="col-span-full flex flex-col justify-self-center md:min-w-max">
              <div className="min-w-max mb-5 font-medium uppercase">
                Jaga kehangatan seduhan kita!
              </div>
              <div className="flex flex-row flex-wrap gap-4">
                <a
                  href="https://www.instagram.com/sorgtime/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-black px-3 py-1 text-xs font-bold uppercase hover:bg-fire-bush hover:text-white transition-colors"
                >
                  Instagram
                </a>
                <a
                  href="mailto:hello@sorgtime.id"
                  className="border border-black px-3 py-1 text-xs font-bold uppercase hover:bg-fire-bush hover:text-white transition-colors"
                >
                  Email
                </a>
                <a
                  href="https://wa.me/6281259015626"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-black px-3 py-1 text-xs font-bold uppercase hover:bg-fire-bush hover:text-white transition-colors"
                >
                  +62 Informasi Layanan
                </a>
                <a
                  href="https://wa.me/6281259015626?text=Halo%20Sorgtime%2C%20saya%20tertarik%20mendapatkan%20informasi%20lebih%20lanjut%20tentang%20kemitraan%20Sorgtime."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-black px-3 py-1 text-xs font-bold uppercase hover:bg-fire-bush hover:text-white transition-colors"
                >
                  +62 Kemitraan & Event
                </a>
              </div>
            </div>
          </div>

          {/* Legal bar */}
          <div className="flex flex-row justify-between text-[8px] uppercase sm:justify-start sm:gap-[30px]">
            <a href="#" className="hover:text-fire-bush">
              syarat dan ketentuan
            </a>
            <a href="#" className="hover:text-fire-bush">
              kebijakan privasi
            </a>
            <p>© 2026 Sorgtime.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
