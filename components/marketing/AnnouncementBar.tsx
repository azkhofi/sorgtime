import Image from "next/image";
import { assetPath } from "@/lib/asset-path";

export function AnnouncementBar() {
  return (
    <section
      id="10-tahun-langkah-bersama"
      className="flex w-full flex-col items-center justify-center bg-janna px-[18px] py-3 lg:flex-row lg:gap-10"
    >
      <Image
        src={assetPath("/logo.png")}
        alt="Sorgtime"
        width={104}
        height={104}
        className="h-[104px] w-[104px] object-contain lg:h-[186px] lg:w-[186px]"
      />
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="h-7 w-7 text-brown-rust max-lg:rotate-90 lg:h-12 lg:w-12"
      >
        <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M11 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <p className="text-center font-hand text-xl uppercase text-brown-rust max-lg:text-center lg:text-[28px] lg:leading-9">
        100% Gula Sorgum
        <br />
        Cold Brew Sehat
      </p>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="h-7 w-7 rotate-90 text-brown-rust lg:hidden"
      >
        <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </section>
  );
}
