"use client";

import Image from "next/image";
import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { assetPath } from "@/lib/asset-path";
import {
  CRACK_GROUPS,
  CRACK_PRODUCTS,
  getCrackProduct,
  groupLabel,
  type CrackGroup,
} from "@/lib/crack-products";
import { formatRupiah, waUrl } from "@/lib/wa";

type CartLine = { slug: string; qty: number };

const CART_KEY = "sorgtime-crack-cart";
const EMPTY_CART: CartLine[] = [];
const cartListeners = new Set<() => void>();

let cachedRaw: string | null = null;
let cachedCart: CartLine[] = EMPTY_CART;

function parseCart(raw: string | null): CartLine[] {
  try {
    const parsed = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(parsed)) return EMPTY_CART;
    return parsed.filter(
      (line): line is CartLine =>
        typeof line?.slug === "string" &&
        getCrackProduct(line.slug) !== null &&
        Number.isInteger(line?.qty) &&
        line.qty > 0,
    );
  } catch {
    return EMPTY_CART;
  }
}

function subscribeCart(onChange: () => void) {
  cartListeners.add(onChange);
  return () => {
    cartListeners.delete(onChange);
  };
}

function getCartSnapshot(): CartLine[] {
  const raw = window.localStorage.getItem(CART_KEY);
  if (raw !== cachedRaw) {
    cachedRaw = raw;
    cachedCart = parseCart(raw);
  }
  return cachedCart;
}

function getServerCartSnapshot(): CartLine[] {
  return EMPTY_CART;
}

function setStoredCart(lines: CartLine[]) {
  try {
    window.localStorage.setItem(CART_KEY, JSON.stringify(lines));
  } catch {
    // penyimpanan tidak tersedia — keranjang tetap hidup di memori
  }
  cartListeners.forEach((notify) => notify());
}

function updateCartQty(slug: string, delta: number) {
  setStoredCart(
    getCartSnapshot()
      .map((line) => (line.slug === slug ? { ...line, qty: line.qty + delta } : line))
      .filter((line) => line.qty > 0),
  );
}

function addToStoredCart(slug: string, qty: number) {
  const existing = getCartSnapshot().find((line) => line.slug === slug);
  setStoredCart(
    existing
      ? getCartSnapshot().map((line) =>
          line.slug === slug ? { ...line, qty: line.qty + qty } : line,
        )
      : [...getCartSnapshot(), { slug, qty }],
  );
}

function buildCheckoutMessage(lines: CartLine[]) {
  const items = lines.map((line, i) => {
    const product = getCrackProduct(line.slug);
    return `${i + 1}. ${product?.name ?? line.slug} x${line.qty} — ${formatRupiah((product?.price ?? 0) * line.qty)}`;
  });
  const total = lines.reduce((sum, line) => {
    const product = getCrackProduct(line.slug);
    return product ? sum + product.price * line.qty : sum;
  }, 0);
  return [
    "Halo Sorgtime, saya ingin memesan C'rack:",
    ...items,
    `Total: ${formatRupiah(total)}`,
    "",
    "Terima kasih!",
  ].join("\n");
}

export function CrackShop() {
  const [activeSlug, setActiveSlug] = useState<string>(CRACK_PRODUCTS[0].slug);
  const [qty, setQty] = useState(1);
  const [cartOpen, setCartOpen] = useState(false);
  const cart = useSyncExternalStore(
    subscribeCart,
    getCartSnapshot,
    getServerCartSnapshot,
  );

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const slug = window.location.hash.replace(/^#/, "");
      if (getCrackProduct(slug)) setActiveSlug(slug);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const handler = () => {
      const slug = window.location.hash.replace(/^#/, "");
      if (getCrackProduct(slug)) {
        setActiveSlug(slug);
        setQty(1);
      }
    };
    window.addEventListener("hashchange", handler);
    return () => window.removeEventListener("hashchange", handler);
  }, []);

  const active = getCrackProduct(activeSlug) ?? CRACK_PRODUCTS[0];
  const grouped = useMemo(
    () =>
      CRACK_GROUPS.map((group) => ({
        ...group,
        products: CRACK_PRODUCTS.filter((p) => p.group === (group.key as CrackGroup)),
      })),
    [],
  );
  const cartCount = cart.reduce((sum, line) => sum + line.qty, 0);
  const cartTotal = cart.reduce(
    (sum, line) => sum + (getCrackProduct(line.slug)?.price ?? 0) * line.qty,
    0,
  );

  const selectProduct = (slug: string) => {
    setActiveSlug(slug);
    setQty(1);
    setCartOpen(false);
    if (window.location.hash !== `#${slug}`) {
      window.history.replaceState(null, "", `#${slug}`);
    }
  };

  return (
    <section className="relative">
      <div className="mx-auto grid max-w-[1240px] gap-8 px-4 pb-16 pt-10 lg:grid-cols-[300px_1fr] lg:gap-12 lg:px-6 lg:pt-14">
        {/* Sidebar produk */}
        <aside className="lg:sticky lg:top-[76px] lg:self-start">
          <div className="border-2 border-black bg-janna shadow-[5px_5px_0_#211e1e]">
            <p className="border-b border-black bg-brand px-4 py-2 font-hand text-xl uppercase text-white">
              Book Menu C&apos;rack
            </p>
            <div className="max-h-[420px] overflow-y-auto scroll-custom lg:max-h-[calc(100vh-220px)]">
              {grouped.map((group) => (
                <div key={group.key}>
                  <p className="border-b border-dotted border-black/60 px-4 pb-1 pt-3 text-[10px] uppercase tracking-[0.15em] text-tapa">
                    {group.label}
                  </p>
                  {group.note && (
                    <p className="px-4 pb-1 pt-1 text-[9px] uppercase tracking-wide text-tapa/80">
                      {group.note}
                    </p>
                  )}
                  <ul>
                    {group.products.map((product) => (
                      <li key={product.slug}>
                        <button
                          type="button"
                          onClick={() => selectProduct(product.slug)}
                          aria-current={activeSlug === product.slug ? "true" : undefined}
                          className={`flex w-full cursor-pointer items-center justify-between gap-2 border-b border-dotted border-black/40 px-4 py-2.5 text-left text-xs uppercase transition-colors duration-200 ${
                            activeSlug === product.slug
                              ? "bg-fire-bush/85 text-white"
                              : "hover:bg-janna/60"
                          }`}
                        >
                          <span className="font-medium">{product.name}</span>
                          <span
                            className={`font-mono text-[10px] ${
                              activeSlug === product.slug ? "text-white" : "text-brown-rust"
                            }`}
                          >
                            {product.price / 1000}k
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Panel detail produk */}
        <div className="min-w-0">
          <div
            key={active.slug}
            className="product-reveal grid gap-8 border-2 border-black bg-cream shadow-[8px_8px_0_#211e1e] sm:grid-cols-2 lg:grid-cols-[1fr_1fr]"
          >
            <div className="relative min-h-[300px] overflow-hidden border-b-2 border-black bg-janna sm:min-h-[420px] sm:border-b-0 sm:border-r-2">
              <Image
                src={assetPath(active.image)}
                alt={active.name}
                fill
                sizes="(min-width: 640px) 45vw, 100vw"
                className="object-contain p-6 drop-shadow-[0_18px_18px_rgba(0,0,0,0.18)]"
                priority
              />
            </div>

            <div className="flex flex-col gap-5 p-6 lg:p-8">
              <div>
                <span className="inline-block -rotate-2 border-2 border-black bg-gold px-3 py-1 font-hand text-sm uppercase shadow-[3px_3px_0_#211e1e]">
                  {groupLabel(active.group)}
                </span>
                <h1 className="mt-4 font-serif text-4xl font-semibold leading-none tracking-[-0.04em] lg:text-5xl">
                  {active.name}
                </h1>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-tapa">
                  Gluten Free · Gula Sorgum Lokal
                </p>
              </div>

              <p className="text-sm leading-6 text-tundora">
                Roti dan kue bebas gluten dari dapur C&apos;rack by Sorgtime, dianyam
                dengan dominasi tepung sorgum daripada tepung terigu dan memakai
                gula sorgum lokal. Nikmati inovasi pertama di Surabaya dari
                Sorgtime!
              </p>

              <div className="mt-auto flex flex-col gap-4">
                <div className="flex items-end justify-between border-t border-dotted border-black pt-4">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-tapa">
                      Harga
                    </p>
                    <p className="font-hand text-3xl lg:text-4xl">
                      {formatRupiah(active.price)}
                    </p>
                  </div>
                  <div className="flex items-center border-2 border-black bg-janna shadow-[3px_3px_0_#211e1e]">
                    <button
                      type="button"
                      onClick={() => setQty((q) => Math.max(1, q - 1))}
                      aria-label="Kurangi jumlah"
                      className="cursor-pointer px-4 py-2 font-hand text-2xl leading-none hover:bg-fire-bush/80"
                    >
                      −
                    </button>
                    <span className="min-w-[44px] text-center font-mono text-base" aria-live="polite">
                      {qty}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQty((q) => Math.min(99, q + 1))}
                      aria-label="Tambah jumlah"
                      className="cursor-pointer px-4 py-2 font-hand text-2xl leading-none hover:bg-fire-bush/80"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between font-mono text-xs uppercase text-tapa">
                  <span>Subtotal</span>
                  <span className="text-base text-ink">{formatRupiah(active.price * qty)}</span>
                </div>

                <button
                  type="button"
                  onClick={() => addToStoredCart(active.slug, qty)}
                  className="group flex cursor-pointer items-center justify-center gap-3 border-2 border-black bg-fire-bush px-6 py-3.5 font-hand text-2xl uppercase text-ink shadow-[5px_5px_0_#211e1e] transition-transform hover:-translate-y-1"
                >
                  + Tambah ke Keranjang
                </button>
              </div>
            </div>
          </div>

          {/* Keranjang mini */}
          <div className="mt-8 border-2 border-black bg-khaki shadow-[8px_8px_0_#211e1e]">
            <button
              type="button"
              onClick={() => setCartOpen((open) => !open)}
              aria-expanded={cartOpen}
              className="flex w-full cursor-pointer items-center justify-between border-b border-black bg-ink px-5 py-3 font-hand text-xl uppercase text-janna"
            >
              <span>
                Keranjang{" "}
                <span className="ml-1 border border-janna px-2 font-mono text-xs">
                  {cartCount}
                </span>
              </span>
              <span className="font-mono text-sm normal-case tracking-wide text-janna/80">
                {formatRupiah(cartTotal)} <span aria-hidden="true">{cartOpen ? "▲" : "▼"}</span>
              </span>
            </button>

            {cartOpen && (
              <div className="p-5">
                {cart.length === 0 ? (
                  <p className="text-center text-xs uppercase tracking-wide text-tundora">
                    Keranjang masih kosong — pilih roti dulu di atas.
                  </p>
                ) : (
                  <>
                    <ul className="divide-y divide-dotted divide-black/60">
                      {cart.map((line) => {
                        const product = getCrackProduct(line.slug);
                        if (!product) return null;
                        return (
                          <li key={line.slug} className="flex items-center gap-3 py-3">
                            <span className="relative h-12 w-12 flex-none overflow-hidden rounded-full border border-black/70 bg-janna">
                              <Image
                                src={assetPath(product.image)}
                                alt=""
                                fill
                                sizes="48px"
                                className="object-contain p-1"
                              />
                            </span>
                            <span className="flex-1 text-xs uppercase">
                              <span className="font-medium">{product.name}</span>
                              <span className="ml-2 font-mono text-[10px] text-tapa">
                                {formatRupiah(product.price)}
                              </span>
                            </span>
                            <span className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() => updateCartQty(line.slug, -1)}
                                aria-label={`Kurangi ${product.name}`}
                                className="h-7 w-7 cursor-pointer border border-black bg-janna font-hand text-lg leading-none hover:bg-fire-bush/80"
                              >
                                −
                              </button>
                              <span className="min-w-[24px] text-center font-mono text-xs">
                                {line.qty}
                              </span>
                              <button
                                type="button"
                                onClick={() => updateCartQty(line.slug, +1)}
                                aria-label={`Tambah ${product.name}`}
                                className="h-7 w-7 cursor-pointer border border-black bg-janna font-hand text-lg leading-none hover:bg-fire-bush/80"
                              >
                                +
                              </button>
                            </span>
                            <span className="w-20 text-right font-mono text-xs">
                              {formatRupiah(product.price * line.qty)}
                            </span>
                          </li>
                        );
                      })}
                    </ul>

                    <div className="mt-4 flex flex-col gap-4 border-t-2 border-black pt-4 sm:flex-row sm:items-center sm:justify-between">
                      <p className="font-hand text-2xl uppercase">
                        Total: {formatRupiah(cartTotal)}
                      </p>
                      <a
                        href={waUrl(buildCheckoutMessage(cart))}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center justify-center gap-3 border-2 border-black bg-brand px-6 py-3 font-hand text-2xl uppercase text-white shadow-[5px_5px_0_#211e1e] transition-transform hover:-translate-y-1"
                      >
                        Proceed to Checkout
                        <span aria-hidden="true" className="transition-transform duration-300 group-hover:rotate-[-20deg]">
                          ↗
                        </span>
                      </a>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          <p className="mt-6 text-center text-[10px] uppercase tracking-[0.2em] text-tapa">
            Find us (at)crackbysorgtime · Pesanan diproses via WhatsApp
          </p>
        </div>
      </div>
    </section>
  );
}
