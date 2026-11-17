"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type PointerEvent } from "react";
import { assetPath } from "@/lib/asset-path";

type BaristaPose = "front" | "left" | "right";

const BARISTA_POSES: Record<BaristaPose, string> = {
  front: assetPath("/sorgtime/01_barista_pose_front.webp"),
  left: assetPath("/sorgtime/02_barista_pose_left.webp"),
  right: assetPath("/sorgtime/03_barista_pose_right.webp"),
};

const HERO_OUTLINES = [
  {
    src: assetPath("/sorgtime/outline_pesansini.webp"),
    label: "Pesan di sini — lihat lini produk",
    href: "#lini-produk",
    style: { left: "11.73%", top: "0%", width: "10.49%", height: "26.59%" },
  },
  {
    src: assetPath("/sorgtime/outline_menu.webp"),
    label: "Lihat menu Sorgtime",
    href: "#lini-produk",
    style: { left: "34.78%", top: "15.93%", width: "30.5%", height: "19.61%" },
  },
  {
    src: assetPath("/sorgtime/outline_crack.png"),
    label: "Lihat menu C'rack — roti dan kue Sorgtime",
    href: "#lini-produk",
    event: "crack",
    style: { left: "11.7%", top: "42.5%", width: "22.4%", height: "29.4%" },
    foreground: true,
  },
  {
    src: assetPath("/sorgtime/outline_franchise.webp"),
    label: "Informasi franchise dan lokasi Sorgtime",
    href: assetPath("/kemitraan"),
    style: { left: "77.78%", top: "50.25%", width: "15.39%", height: "49.75%" },
    foreground: true,
  },
] as const;

type HeroOutline = (typeof HERO_OUTLINES)[number];

function OutlineLink({ outline }: { outline: HeroOutline }) {
  const [pressed, setPressed] = useState(false);

  return (
    <a
      href={outline.href}
      aria-label={outline.label}
      data-hero-outline={outline.label}
      style={outline.style}
      onPointerDown={() => setPressed(true)}
      onPointerUp={() => window.setTimeout(() => setPressed(false), 180)}
      onPointerCancel={() => setPressed(false)}
      onBlur={() => setPressed(false)}
      onClick={() => {
        if ("event" in outline) {
          window.dispatchEvent(
            new CustomEvent("sorgtime:select-category", { detail: outline.event }),
          );
        }
      }}
      className="group pointer-events-auto absolute cursor-pointer focus-visible:outline-none"
    >
      <Image
        src={outline.src}
        alt=""
        fill
        sizes="(min-width: 1024px) 31vw, 55vw"
        className={`object-fill transition-opacity duration-200 group-hover:opacity-100 group-focus:opacity-100 ${
          pressed ? "opacity-100" : "opacity-0"
        }`}
      />
    </a>
  );
}

export function HeroWarung() {
  const [ready, setReady] = useState(false);
  const [baristaPose, setBaristaPose] = useState<BaristaPose>("front");
  const heroRef = useRef<HTMLElement>(null);
  const backgroundStageRef = useRef<HTMLDivElement>(null);
  const tableStageRef = useRef<HTMLDivElement>(null);
  const mobileBackOutlinesRef = useRef<HTMLDivElement>(null);
  const mobileFrontOutlinesRef = useRef<HTMLDivElement>(null);
  const baristaRef = useRef<HTMLDivElement>(null);
  const mobileBaristaRef = useRef<HTMLDivElement>(null);
  const pointerTarget = useRef({ x: 0, y: 0 });
  const pointerCurrent = useRef({ x: 0, y: 0 });
  const sceneTargetX = useRef(0);
  const sceneCurrentX = useRef(0);
  const animationFrame = useRef<number | null>(null);
  const lastBaristaPointerX = useRef<number | null>(null);
  const baristaIdleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touchGesture = useRef({
    active: false,
    startX: 0,
    startY: 0,
    originSceneX: 0,
    axis: null as "horizontal" | "vertical" | null,
  });

  useEffect(() => {
    const frame = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    return () => {
      if (animationFrame.current) cancelAnimationFrame(animationFrame.current);
      if (baristaIdleTimer.current) clearTimeout(baristaIdleTimer.current);
    };
  }, []);

  const resetBaristaPose = () => {
    lastBaristaPointerX.current = null;
    if (baristaIdleTimer.current) clearTimeout(baristaIdleTimer.current);
    setBaristaPose("front");
  };

  const updateBaristaPose = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType === "touch") return;
    const previousX = lastBaristaPointerX.current;
    lastBaristaPointerX.current = event.clientX;

    if (previousX !== null) {
      const movementX = event.clientX - previousX;
      if (movementX < -1) setBaristaPose("left");
      if (movementX > 1) setBaristaPose("right");
    }

    if (baristaIdleTimer.current) clearTimeout(baristaIdleTimer.current);
    baristaIdleTimer.current = setTimeout(() => setBaristaPose("front"), 140);
  };

  const applySceneTransforms = () => {
    const current = pointerCurrent.current;
    const turn = Math.max(-1.4, Math.min(1.4, current.x / 280));
    const transform = `translate3d(${current.x}px, ${current.y}px, 0) rotate(${turn}deg)`;
    if (baristaRef.current) baristaRef.current.style.transform = transform;
    if (mobileBaristaRef.current) mobileBaristaRef.current.style.transform = transform;
    const centeredSceneTranslate = `calc(-50% + ${sceneCurrentX.current}px) -50%`;
    [
      backgroundStageRef.current,
      tableStageRef.current,
      mobileBackOutlinesRef.current,
      mobileFrontOutlinesRef.current,
    ].forEach((layer) => {
      if (layer) layer.style.translate = centeredSceneTranslate;
    });
  };

  const animateCharacters = () => {
    const current = pointerCurrent.current;
    const target = pointerTarget.current;
    current.x += (target.x - current.x) * 0.09;
    current.y += (target.y - current.y) * 0.09;
    sceneCurrentX.current += (sceneTargetX.current - sceneCurrentX.current) * 0.09;
    applySceneTransforms();

    if (
      Math.abs(target.x - current.x) > 0.002 ||
      Math.abs(target.y - current.y) > 0.002 ||
      Math.abs(sceneTargetX.current - sceneCurrentX.current) > 0.002
    ) {
      animationFrame.current = requestAnimationFrame(animateCharacters);
    } else {
      animationFrame.current = null;
    }
  };

  const setPointerTarget = (x: number, y: number) => {
    pointerTarget.current = { x, y };
    if (animationFrame.current === null) {
      animationFrame.current = requestAnimationFrame(animateCharacters);
    }
  };

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    if (!heroRef.current) return;

    if (event.pointerType === "touch") {
      if (!touchGesture.current.active) return;

      const bounds = heroRef.current.getBoundingClientRect();
      const deltaX = event.clientX - touchGesture.current.startX;
      const deltaY = event.clientY - touchGesture.current.startY;

      if (touchGesture.current.axis === null) {
        if (Math.max(Math.abs(deltaX), Math.abs(deltaY)) < 6) return;
        touchGesture.current.axis =
          Math.abs(deltaX) > Math.abs(deltaY) ? "horizontal" : "vertical";
      }

      if (touchGesture.current.axis === "vertical") return;

      if (!event.currentTarget.hasPointerCapture(event.pointerId)) {
        event.currentTarget.setPointerCapture(event.pointerId);
      }

      const stageWidth = backgroundStageRef.current?.getBoundingClientRect().width ?? bounds.width;
      const sceneLimit = Math.max(0, (stageWidth - bounds.width) / 2);
      const nextSceneX = Math.max(
        -sceneLimit,
        Math.min(
          sceneLimit,
          touchGesture.current.originSceneX + deltaX * 1.6,
        ),
      );
      const nextBaristaX = Math.max(
        -bounds.width * 0.24,
        Math.min(bounds.width * 0.24, -nextSceneX * 0.35),
      );
      const movementX = nextBaristaX - pointerTarget.current.x;

      if (movementX < -1) setBaristaPose("left");
      if (movementX > 1) setBaristaPose("right");

      if (animationFrame.current !== null) {
        cancelAnimationFrame(animationFrame.current);
        animationFrame.current = null;
      }
      sceneTargetX.current = nextSceneX;
      sceneCurrentX.current = nextSceneX;
      pointerTarget.current = { x: nextBaristaX, y: 0 };
      pointerCurrent.current = { x: nextBaristaX, y: 0 };
      applySceneTransforms();

      if (baristaIdleTimer.current) clearTimeout(baristaIdleTimer.current);
      baristaIdleTimer.current = setTimeout(() => setBaristaPose("front"), 140);
      return;
    }

    updateBaristaPose(event);
    const bounds = heroRef.current.getBoundingClientRect();
    const centerX = bounds.left + bounds.width / 2;
    const x = Math.max(-bounds.width * 0.34, Math.min(bounds.width * 0.34, event.clientX - centerX));
    setPointerTarget(x, 0);
  };

  const handlePointerDown = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType !== "touch") return;
    touchGesture.current = {
      active: true,
      startX: event.clientX,
      startY: event.clientY,
      originSceneX: sceneTargetX.current,
      axis: null,
    };
  };

  const finishTouchGesture = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType !== "touch") return;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    touchGesture.current.active = false;
    touchGesture.current.axis = null;
    if (baristaIdleTimer.current) clearTimeout(baristaIdleTimer.current);
    baristaIdleTimer.current = setTimeout(() => setBaristaPose("front"), 140);
  };

  return (
    <section
      id="tentang"
      ref={heroRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={finishTouchGesture}
      onPointerCancel={finishTouchGesture}
      onPointerLeave={(event) => {
        if (event.pointerType === "touch") return;
        setPointerTarget(0, 0);
        resetBaristaPose();
      }}
      aria-label="Selamat datang di Sorgtime"
      className="relative h-[100svh] min-h-[540px] touch-pan-y overflow-hidden bg-[#d8d0c4] sm:min-h-[600px] lg:h-screen lg:min-h-[680px]"
    >
      <div
        ref={backgroundStageRef}
        className={`absolute left-1/2 top-1/2 h-[max(100%,56.315vw)] w-[max(100%,177.574svh)] -translate-x-1/2 -translate-y-1/2 transition-[opacity,transform] duration-[1400ms] ease-out lg:hidden ${
          ready ? "scale-100 opacity-100" : "scale-[1.04] opacity-0"
        }`}
      >
        <Image
          src={assetPath("/sorgtime/bg_desktop.png")}
          alt="Suasana kedai Sorgtime"
          fill
          priority
          sizes="100vw"
          className="object-fill"
        />
      </div>

      <div
        className={`absolute left-1/2 top-1/2 hidden h-[max(100%,56.315vw)] w-[max(100%,177.574vh)] -translate-x-1/2 -translate-y-1/2 transition-[opacity,transform] duration-[1400ms] ease-out lg:block ${
          ready ? "scale-100 opacity-100" : "scale-[1.04] opacity-0"
        }`}
      >
        <Image
          src={assetPath("/sorgtime/bg_desktop.png")}
          alt="Suasana kedai Sorgtime"
          fill
          priority
          sizes="100vw"
          className="object-fill"
        />
      </div>

      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/40 via-black/0 to-black/20" />

      <div
        ref={tableStageRef}
        className={`pointer-events-none absolute left-1/2 top-1/2 z-[24] h-[max(100%,56.315vw)] w-[max(100%,177.574svh)] -translate-x-1/2 -translate-y-1/2 transition-opacity delay-150 duration-1000 ease-out lg:hidden ${
          ready ? "opacity-100" : "opacity-0"
        }`}
      >
        <Image
          src={assetPath("/sorgtime/table_desktop.png")}
          alt="Meja bar Sorgtime"
          width={1449}
          height={574}
          priority
          sizes="100vw"
          className="absolute bottom-0 left-0 h-auto w-full"
        />
      </div>

      <div
        className={`pointer-events-none absolute left-1/2 top-1/2 z-[24] hidden h-[max(100%,56.315vw)] w-[max(100%,177.574vh)] -translate-x-1/2 -translate-y-1/2 transition-opacity delay-150 duration-1000 ease-out lg:block ${
          ready ? "opacity-100" : "opacity-0"
        }`}
      >
        <Image
          src={assetPath("/sorgtime/table_desktop.png")}
          alt="Meja bar Sorgtime"
          width={1449}
          height={574}
          priority
          sizes="100vw"
          className="absolute bottom-0 left-0 h-auto w-full"
        />
      </div>

      <div className="pointer-events-none absolute left-1/2 top-1/2 z-[15] hidden h-[max(100%,56.315vw)] w-[max(100%,177.574vh)] -translate-x-1/2 -translate-y-1/2 lg:block">
        {HERO_OUTLINES.filter((outline) => !("foreground" in outline)).map((outline) => (
          <OutlineLink key={outline.src} outline={outline} />
        ))}
      </div>

      <div
        ref={mobileBackOutlinesRef}
        className="pointer-events-none absolute left-1/2 top-1/2 z-[15] h-[max(100%,56.315vw)] w-[max(100%,177.574svh)] -translate-x-1/2 -translate-y-1/2 lg:hidden"
      >
        {HERO_OUTLINES.filter((outline) => !("foreground" in outline)).map((outline) => (
          <OutlineLink key={outline.src} outline={outline} />
        ))}
      </div>

      <div className="pointer-events-none absolute inset-0 z-20 hidden lg:block">
        <div className="absolute bottom-[23%] left-1/2 z-[14] w-[24%] min-w-[250px] max-w-[380px] -translate-x-1/2">
          <div className="hero-rise" style={{ animationDelay: "360ms" }}>
            <div ref={baristaRef} className="hero-character-motion relative">
              <div className="relative aspect-[1884/2606] w-full">
                {(Object.entries(BARISTA_POSES) as [BaristaPose, string][]).map(([pose, src]) => (
                  <Image
                    key={pose}
                    src={src}
                    alt={pose === "front" ? "Barista Sorgtime mengikuti arah kursor" : ""}
                    fill
                    priority
                    sizes="24vw"
                    className={`object-contain object-bottom drop-shadow-[0_18px_18px_rgba(0,0,0,.18)] transition-opacity duration-100 ${
                      baristaPose === pose ? "opacity-100" : "opacity-0"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute left-1/2 top-1/2 z-30 hidden h-[max(100%,56.315vw)] w-[max(100%,177.574vh)] -translate-x-1/2 -translate-y-1/2 lg:block">
        {HERO_OUTLINES.filter((outline) => "foreground" in outline).map((outline) => (
          <OutlineLink key={outline.src} outline={outline} />
        ))}
      </div>

      <div
        ref={mobileFrontOutlinesRef}
        className="pointer-events-none absolute left-1/2 top-1/2 z-30 h-[max(100%,56.315vw)] w-[max(100%,177.574svh)] -translate-x-1/2 -translate-y-1/2 lg:hidden"
      >
        {HERO_OUTLINES.filter((outline) => "foreground" in outline).map((outline) => (
          <OutlineLink key={outline.src} outline={outline} />
        ))}
      </div>

      <div className="hero-rise pointer-events-none absolute bottom-[27%] left-1/2 z-20 w-[clamp(250px,76vw,310px)] -translate-x-1/2 sm:bottom-[23%] lg:hidden">
        <div ref={mobileBaristaRef} className="hero-character-motion relative aspect-[1884/2511] w-full">
          {(Object.entries(BARISTA_POSES) as [BaristaPose, string][]).map(([pose, src]) => (
            <Image
              key={pose}
              src={src}
              alt={pose === "front" ? "Barista Sorgtime dapat digeser secara horizontal" : ""}
              fill
              priority
              sizes="72vw"
              className={`object-contain object-bottom drop-shadow-[0_12px_14px_rgba(0,0,0,.2)] transition-opacity duration-100 ${
                baristaPose === pose ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
