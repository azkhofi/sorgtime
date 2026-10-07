"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type MouseEvent } from "react";
import { assetPath } from "@/lib/asset-path";

const NAV_LINKS = [
  { href: "/#tentang", label: "Tentang", sectionId: "tentang" },
  { href: "/#lini-produk", label: "Lini Produk", sectionId: "lini-produk" },
  { href: "/#sorgteam", label: "Sorgteam", sectionId: "sorgteam" },
  { href: "/#toserba", label: "Toserba", sectionId: "toserba" },
  { href: "/kemitraan", label: "Kemitraan" },
  { href: "/#lokasi", label: "Lokasi", sectionId: "lokasi" },
  { href: "/#surat-kabar", label: "Surat Kabar", sectionId: "surat-kabar" },
];

function Brand({ dark = false }: { dark?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <span className="relative h-[38px] w-[30px] overflow-hidden rounded-sm">
        <Image src={assetPath("/logo.png")} alt="" fill sizes="30px" className="object-cover" />
      </span>
      <span
        className={`text-lg font-medium tracking-[0.12em] ${dark ? "text-forest" : "text-white"}`}
      >
        SORGTIME
      </span>
    </span>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState(
    pathname === "/kemitraan" ? "/kemitraan" : "/#tentang",
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 36);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (pathname !== "/") return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActiveSection(`/#${visible.target.id}`);
      },
      { rootMargin: "-30% 0px -55%", threshold: [0, 0.1, 0.3] },
    );

    NAV_LINKS.forEach(({ sectionId }) => {
      const section = sectionId ? document.getElementById(sectionId) : null;
      if (section) observer.observe(section);
    });
    return () => observer.disconnect();
  }, [pathname]);

  const currentActiveSection = pathname === "/" ? activeSection : pathname;

  const handleNavigation = (
    event: MouseEvent<HTMLAnchorElement>,
    link: (typeof NAV_LINKS)[number],
  ) => {
    setSidebarOpen(false);

    if (pathname !== "/" || !link.sectionId) return;

    const target = document.getElementById(link.sectionId);
    if (!target) return;

    event.preventDefault();
    window.history.pushState(null, "", `#${link.sectionId}`);
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveSection(link.href);
  };

  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [sidebarOpen]);

  return (
    <>
      <header
        id="header"
        className={`fixed top-0 z-50 w-full px-5 transition-all duration-300 ease-out ${
          scrolled
            ? "border-b border-white/15 bg-tundora/95 shadow-sm backdrop-blur-md"
            : "bg-gradient-to-b from-black/45 to-transparent"
        }`}
      >
        <div
          className={`mx-auto flex max-w-[1240px] items-center justify-between transition-all ${
            scrolled ? "py-2" : "py-[10px]"
          }`}
        >
          <Link href="/#tentang" aria-label="Sorgtime — beranda" className="lg:w-[210px] xl:w-[230px]">
            <Brand />
          </Link>

          <nav className="flex flex-1 shrink-0 items-center justify-end gap-5 xl:gap-[26px] max-lg:hidden">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={(event) => handleNavigation(event, link)}
                className="group relative py-2 text-[11px] uppercase tracking-[0.04em] text-white"
              >
                {link.label}
                <span className={`absolute inset-x-0 bottom-0 h-px bg-white transition-transform duration-300 ${currentActiveSection === link.href ? "scale-x-100" : "origin-right scale-x-0 group-hover:origin-left group-hover:scale-x-100"}`} />
              </Link>
            ))}
            <span className="border-l border-white/40 pl-5 text-[11px] text-white">ID</span>
          </nav>

          <button
            type="button"
            aria-label="Buka menu"
            aria-expanded={sidebarOpen}
            onClick={() => setSidebarOpen(true)}
            className="grid h-10 w-10 place-items-center text-white lg:hidden"
          >
            <svg viewBox="0 0 30 18" className="h-[18px] w-[30px]" aria-hidden="true">
              <path d="M0 1h30M0 9h30M0 17h30" fill="none" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </button>
        </div>
      </header>

      <div
        aria-hidden={!sidebarOpen}
        className={`fixed inset-0 z-[60] flex flex-col justify-between bg-janna text-black transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] ${
          sidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex w-full items-center justify-between border-b border-black/15 p-5">
          <Brand dark />
          <button
            type="button"
            aria-label="Tutup menu"
            onClick={() => setSidebarOpen(false)}
            className="grid h-11 w-11 place-items-center border border-black"
          >
            <span className="text-2xl font-light">×</span>
          </button>
        </div>

        <nav className="flex flex-1 flex-col justify-center px-5 py-8 font-hand text-[34px] uppercase leading-none">
          {NAV_LINKS.map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={(event) => handleNavigation(event, link)}
              className={`border-b border-black/20 py-3 transition-all duration-500 ${
                sidebarOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
              style={{ transitionDelay: sidebarOpen ? `${80 + index * 45}ms` : "0ms" }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-end justify-between p-5">
          <p className="max-w-[170px] text-[10px] uppercase leading-relaxed tracking-[0.12em]">
            Your go to gluten free cold brew coffee
          </p>
          <Image
            src={assetPath("/tuku/buka.webp")}
            alt="Kami buka"
            width={137}
            height={155}
            className="h-[120px] w-auto object-contain"
          />
        </div>
      </div>
    </>
  );
}
