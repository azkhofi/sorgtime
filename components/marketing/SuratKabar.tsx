import Image from "next/image";
import { assetPath } from "@/lib/asset-path";

const POSTERS = [
  {
    src: assetPath("/sorgtime/flyer2.webp"),
    alt: "Poster pertama",
    href: "https://www.google.com/search?sca_esv=fa8fc3aacbaacd94&sxsrf=APpeQnuU_dvdXjgFZCG_jc860fPxoP4hOA:1791136193730&q=sorgtime&tbm=nws&source=lnms&fbs=ABfTbFWhXuTwsLiip5v2SuoCb-WKvw96U4GFC393wb6LJGbqj6GE25jrEVrisT6WmhnNaqj8gUxeTO4_jppYczpGHh1PV1unmh0LGjvNOfb2E5qOd1BANrZIo0JkUXyygjndB854XdKdi5K_fEf2kyO_t6IEUo0l_QPuzVicxUm9QgAIs9-a9oDWwkU1YNQC0kOYy1r2tu8X3XVVo0__5ma6Ql6eLPVE1Q&sa=X&ved=2ahUKEwj37Mik9qCXAxUZaHADHZsfMXwQ0pQJegQIDhAB&biw=1792&bih=998&dpr=2",
    position: "left-[26%]",
    rotation: "rotate-6",
  },
  {
    src: assetPath("/sorgtime/flyer1.webp"),
    alt: "Poster kedua",
    href: assetPath("/kemitraan"),
    position: "left-[44%]",
    rotation: "",
  },
  {
    src: assetPath("/sorgtime/flyer3.webp"),
    alt: "Poster ketiga",
    href: "https://www.instagram.com/sorgtime/",
    position: "left-[61%]",
    rotation: "-rotate-6",
  },
];

export function SuratKabar() {
  return (
    <section
      id="surat-kabar"
      className="no-scrollbar relative snap-x snap-mandatory scroll-mt-14 overflow-hidden overflow-x-auto whitespace-nowrap lg:overflow-visible"
    >
      <div className="relative h-[calc(100svh-57px)] w-[1512px] snap-start lg:h-[calc(100vh-57px)] lg:w-full">
        <Image
          src={assetPath("/sorgtime/suratkabar.webp")}
          alt="Background Sorgtime"
          width={1512}
          height={775}
          className="h-full w-full object-fill"
          priority={false}
        />

        {/* Poster cards */}
        {POSTERS.map((p) => (
          <div
            key={p.src}
            className={`absolute top-[30%] w-[16%] ${p.position} ${p.rotation} transition-all duration-500 ease-out hover:!rotate-0 hover:-translate-y-3 hover:scale-[1.025]`}
            data-reveal
          >
            <a
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Buka ${p.alt}`}
            >
              <Image
                src={p.src}
                alt={p.alt}
                width={242}
                height={340}
                className="h-auto w-full whitespace-normal drop-shadow-[0_12px_12px_rgba(0,0,0,.2)]"
              />
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
