"use client";

import Image from "next/image";
import { useRef, useState, type PointerEvent } from "react";
import { assetPath } from "@/lib/asset-path";

const STORIES = [
  { src: assetPath("/sorgtime/sorgtim.png"), name: "Keluarga Sorgtime", background: "#2f4a26" },
  // { src: "/tuku/galeri/tetangga-2.webp", name: "Juru Parkir Karang Tengah" },
  // { src: "/tuku/galeri/tetangga-3.webp", name: "Ibu-ibu Tetangga BSD" },
  // { src: "/tuku/galeri/tetangga-4.webp", name: "Tetangga Kecil Cipete" },
  // { src: "/tuku/galeri/tetangga-5.webp", name: "Tetangga Petani Garut" },
  // { src: "/tuku/galeri/tetangga-6.webp", name: "Tetangga Bintaro" },
];

const OFFSETS = ["0%", "9%", "12%", "17%", "18%", "18%"];

export function CeritaCarousel() {
  const galleryRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);
  const [activeStory, setActiveStory] = useState<number | null>(null);
  const drag = useRef({ x: 0, scrollLeft: 0 });

  const startDrag = (event: PointerEvent<HTMLDivElement>) => {
    if (!galleryRef.current) return;
    drag.current = { x: event.clientX, scrollLeft: galleryRef.current.scrollLeft };
    setDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const moveDrag = (event: PointerEvent<HTMLDivElement>) => {
    if (!dragging || !galleryRef.current) return;
    galleryRef.current.scrollLeft = drag.current.scrollLeft - (event.clientX - drag.current.x);
  };

  return (
    <section
      id="sorgteam"
      className={`relative flex h-[calc(100svh-57px)] min-h-[560px] flex-col scroll-mt-14 overflow-hidden transition-colors duration-500 ease-out lg:h-[calc(100dvh-57px)] lg:min-h-[620px] ${
        activeStory === null ? "text-ink" : "text-white"
      }`}
      style={{ backgroundColor: activeStory === null ? "#c3ad97" : STORIES[activeStory].background }}
      onPointerLeave={() => setActiveStory(null)}
    >
      {/* Heading */}
      <div className="shrink-0 pl-5 pt-10 font-hand text-3xl sm:pt-12 lg:pl-16 lg:pt-14" data-reveal>
        <h3 className="uppercase">
          SORGTEAM
        </h3>
      </div>

      {/* Horizontal scrollable gallery */}
      <div
        id="galeri"
        ref={galleryRef}
        onPointerDown={startDrag}
        onPointerMove={moveDrag}
        onPointerUp={() => setDragging(false)}
        onPointerCancel={() => setDragging(false)}
        className={`no-scrollbar mt-5 flex min-h-0 w-full flex-1 items-end scroll-mt-14 select-none overflow-x-auto overflow-y-hidden lg:mt-3 lg:justify-center ${dragging ? "cursor-grabbing" : "cursor-grab"}`}
      >
        {STORIES.map((s, i) => (
          <div
            key={s.src}
            className="group relative h-full w-max flex-shrink-0 overflow-hidden lg:mx-auto lg:h-auto lg:w-[min(100vw,calc((100dvh-200px)*2.9365))]"
            style={i === 0 ? undefined : { right: OFFSETS[i] }}
            onPointerEnter={() => setActiveStory(i)}
            onPointerLeave={() => setActiveStory(null)}
            onPointerDown={() => setActiveStory(i)}
            onPointerUp={(event) => {
              if (event.pointerType === "touch") setActiveStory(null);
            }}
          >
            <Image
              src={s.src}
              alt={s.name}
              width={2267}
              height={772}
              sizes="(min-width: 1024px) 128vw, 220vw"
              quality={100}
              className="pointer-events-none h-full w-auto max-w-none translate-y-[11%] object-contain object-bottom transition-transform duration-500 ease-out group-hover:translate-y-[12%] group-hover:scale-[1.012] lg:block lg:h-auto lg:w-full lg:max-w-none"
              style={{ zIndex: 1 }}
            />
            <div className="absolute bottom-0 left-1/2 z-10 -translate-x-1/2 translate-y-5 whitespace-nowrap border-2 border-black bg-janna px-3 pb-1 pt-3 font-hand text-2xl text-ink opacity-0 shadow-[4px_4px_0_#211e1e] transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
              {s.name}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
