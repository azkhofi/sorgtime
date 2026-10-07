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
      className={`relative h-[calc(100vh-57px)] scroll-mt-14 overflow-hidden transition-colors duration-500 ease-out ${
        activeStory === null ? "text-ink" : "text-white"
      }`}
      style={{ backgroundColor: activeStory === null ? "#c3ad97" : STORIES[activeStory].background }}
      onPointerLeave={() => setActiveStory(null)}
    >
      {/* Heading */}
      <div className="pl-5 pt-[60px] font-hand text-3xl lg:pl-16 lg:pt-16" data-reveal>
        <h3 className="uppercase">
          SORGTEAM
        </h3>
      </div>

      {/* Swipe hint */}
      <div className={`mt-[7px] text-center text-xs uppercase transition-colors duration-500 ${activeStory === null ? "text-brown-rust" : "text-janna"}`}>
        <p className="text-2xl">
          {"<<"}
          <span className="font-hand text-base">
            {" "}
            Geser untuk lihat lainnya
          </span>
          {">>"}
        </p>
      </div>

      {/* Horizontal scrollable gallery */}
      <div
        id="galeri"
        ref={galleryRef}
        onPointerDown={startDrag}
        onPointerMove={moveDrag}
        onPointerUp={() => setDragging(false)}
        onPointerCancel={() => setDragging(false)}
        className={`no-scrollbar absolute inset-x-0 bottom-0 flex h-[calc(100vh-300px)] w-fit min-w-full flex-shrink-0 scroll-mt-14 select-none overflow-x-auto overflow-y-hidden max-lg:w-fit lg:h-[calc(100vh-304px)] ${dragging ? "cursor-grabbing" : "cursor-grab"}`}
      >
        {STORIES.map((s, i) => (
          <div
            key={s.src}
            className="group relative w-fit flex-shrink-0 overflow-hidden max-lg:inline-block max-lg:w-auto lg:w-auto"
            style={{ right: OFFSETS[i] }}
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
              className="pointer-events-none flex h-full w-auto translate-y-12 flex-shrink-0 object-contain object-bottom transition-transform duration-500 ease-out group-hover:translate-y-14 group-hover:scale-[1.012] lg:translate-y-16 lg:group-hover:translate-y-[4.5rem]"
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
