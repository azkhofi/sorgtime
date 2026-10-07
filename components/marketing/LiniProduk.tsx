"use client";

import Image from "next/image";
import { useState } from "react";
import { assetPath } from "@/lib/asset-path";

const CATEGORIES = [
  {
    key: "variant",
    label: "Variant Diet Coffee",
    products: [
      { name: "Caramel", image: assetPath("/sorgtime/menu/soft.png"), position: "42% center" },
      { name: "Hazelnut", image: assetPath("/sorgtime/menu/strong.png"), position: "42% center" },
      { name: "Cold Brew", image: assetPath("/sorgtime/menu/montblanc.png"), position: "42% center" },
      { name: "Montblanc", image: assetPath("/sorgtime/menu/montblanc.png"), position: "42% center" },
    ],
  },
  {
    key: "classic",
    label: "Classic Diet Coffee",
    products: [
      { name: "Original Soft", image: assetPath("/sorgtime/menu/soft.png"), position: "42% center" },
      { name: "Original Strong", image: assetPath("/sorgtime/menu/strong.png"), position: "42% center" },
    ],
  },
  {
    key: "nonkopi",
    label: "Non-Coffee",
    products: [
      { name: "Blue Cloud Matcha", image: assetPath("/sorgtime/menu/bluecloud.png"), position: "42% center" },
      { name: "Matcha", image: assetPath("/sorgtime/menu/matcha.png"), position: "42% center" },
      { name: "Swiss Chocolate", image: assetPath("/sorgtime/menu/chocolate.png"), position: "42% center" },
    ],
  },
];

type Product = (typeof CATEGORIES)[number]["products"][number];

const INGREDIENTS = [
  { src: assetPath("/tuku/ingredients/ing-1.svg"), name: "Espresso" },
  { src: assetPath("/tuku/ingredients/ing-2.svg"), name: "Milk Foam" },
  { src: assetPath("/tuku/ingredients/ing-3.svg"), name: "Cold Brew" },
  { src: assetPath("/tuku/ingredients/ing-4.svg"), name: "Chocolate" },
  { src: assetPath("/tuku/ingredients/ing-5.svg"), name: "Caramel Sauce" },
  { src: assetPath("/tuku/ingredients/ing-6.svg"), name: "Creamer" },
  { src: assetPath("/tuku/ingredients/ing-7.svg"), name: "Milk" },
  { src: assetPath("/tuku/ingredients/ing-8.svg"), name: "Sorgum Sugar" },
  { src: assetPath("/tuku/ingredients/ing-9.svg"), name: "Matcha" },
  { src: assetPath("/tuku/ingredients/ing-10.svg"), name: "Honey" },
];

const STORES = ["Gojek", "Grab", "Shopee", "Tokopedia"];

export function LiniProduk() {
  const [active, setActive] = useState(CATEGORIES[0].key);
  const [selectedProduct, setSelectedProduct] = useState<Product>(
    CATEGORIES[0].products[0],
  );
  const current = CATEGORIES.find((c) => c.key === active) ?? CATEGORIES[0];

  const selectCategory = (category: (typeof CATEGORIES)[number]) => {
    setActive(category.key);
    setSelectedProduct(category.products[0]);
  };

  return (
    <section id="lini-produk" className="scroll-mt-[57px]">
      <div className="grid grid-cols-1 lg:h-[calc(100vh-57px)] lg:min-h-[720px] lg:grid-cols-2">
        {/* Left: product image */}
        <div className="relative h-[68svh] min-h-[460px] max-h-[620px] overflow-hidden bg-[#d9d0c3] lg:h-auto lg:min-h-0 lg:max-h-none" data-reveal="left">
          <div className="absolute left-0 top-0 z-20 pl-4 pt-6 font-hand text-xl lg:pl-16 lg:pt-16 lg:text-3xl">
            <h2 className="uppercase">
              Lini Produk
              <br />
              Sorgtime
            </h2>
          </div>

          <div
            key={`${active}-${selectedProduct.name}`}
            className="product-reveal absolute inset-0 z-10"
            aria-live="polite"
          >
            <Image
              src={selectedProduct.image}
              alt={selectedProduct.name}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="scale-[1.03] object-cover transition-transform duration-700"
              style={{ objectPosition: selectedProduct.position }}
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-janna/25 via-transparent to-black/35" />
            <p className="absolute bottom-10 right-5 border border-black bg-janna px-5 pb-2 pt-3 font-hand text-xl uppercase shadow-[5px_5px_0_#211e1e] lg:bottom-14 lg:right-14 lg:text-2xl">
              {selectedProduct.name}
            </p>
          </div>

          <p className="absolute bottom-5 left-5 z-20 text-[9px] uppercase tracking-[0.15em] text-white drop-shadow lg:bottom-8 lg:left-16">
            Klik menu untuk melihat produk
          </p>
        </div>

        {/* Right: product selector */}
        <div className="flex flex-col justify-center bg-khaki p-5 lg:px-[100px]" data-reveal="right">
          {/* Category tabs */}
          <div
            role="tablist"
            aria-label="Kategori produk Sorgtime"
            className="no-scrollbar mb-5 flex w-full snap-x snap-mandatory overflow-x-auto text-center lg:mb-10"
          >
            {CATEGORIES.map((c) => (
              <button
                key={c.key}
                type="button"
                role="tab"
                onClick={() => selectCategory(c)}
                aria-selected={active === c.key}
                className={`min-w-[132px] flex-1 snap-start cursor-pointer whitespace-nowrap border border-black p-3 pb-2 pt-4 font-hand text-xs uppercase text-black transition-colors duration-300 lg:min-w-0 lg:text-sm ${
                  active === c.key ? "bg-fire-bush" : "bg-transparent hover:bg-janna/45"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          {/* Product list */}
          <div className="scroll-custom max-h-[260px] overflow-x-hidden overflow-y-auto lg:h-[190px]">
            <div className="grid grid-cols-1 gap-x-[19px] lg:grid-cols-2">
              {current.products.map((p) => {
                const isSelected = selectedProduct.name === p.name;

                return (
                  <button
                    key={p.name}
                    type="button"
                    onClick={() => setSelectedProduct(p)}
                    onPointerEnter={(event) => {
                      if (event.pointerType !== "touch") setSelectedProduct(p);
                    }}
                    onFocus={() => setSelectedProduct(p)}
                    aria-pressed={isSelected}
                    className={`group flex w-full cursor-pointer flex-row items-center justify-start gap-3 border-b border-dotted border-black px-3 py-2.5 text-left text-xs uppercase transition-colors duration-300 sm:max-lg:justify-center lg:px-4 ${
                      isSelected ? "bg-janna/75" : "hover:bg-janna/35"
                    }`}
                  >
                    <span className="relative h-11 w-11 flex-none overflow-hidden rounded-full border border-black/70 bg-janna">
                      <Image
                        src={p.image}
                        alt=""
                        fill
                        sizes="44px"
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                        style={{ objectPosition: p.position }}
                      />
                    </span>
                    <span className="flex flex-1 items-center justify-between gap-2">
                      {p.name}
                      <span aria-hidden="true" className={`text-base transition-transform duration-300 ${isSelected ? "rotate-[-45deg]" : "group-hover:rotate-[-20deg]"}`}>
                        ↗
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 100% label */}
          <div className="mt-5 flex w-full justify-center text-[10px] lg:mt-5">
            100% Gula Sorgum Lokal
          </div>

          {/* Ingredient grid */}
          <div
            aria-label="ingredients"
            className="mt-5 grid grid-cols-5 divide-x divide-y divide-black border-b border-r border-black lg:mt-5"
          >
            {INGREDIENTS.map((ing, i) => (
              <div
                key={ing.name}
                className={`flex cursor-pointer flex-col items-center justify-center gap-[5px] py-2 uppercase transition-colors duration-300 hover:bg-fire-bush focus-within:bg-fire-bush ${
                  i === 0 ? "border-l border-t border-black" : ""
                }`}
              >
                <Image
                  src={ing.src}
                  alt={ing.name}
                  width={20}
                  height={20}
                  className="h-[20px] w-[20px]"
                />
                <p className="text-[8px] lg:text-[10px]">{ing.name}</p>
              </div>
            ))}
          </div>

          {/* Online ordering - Desktop */}
          <div className="mt-14 hidden w-full flex-col gap-[19px] text-center text-[10px] lg:flex">
            <p>Pembelian online melalui:</p>
            <div className="flex flex-row justify-center gap-[30px]">
              {STORES.map((s) => (
                <a
                  key={s}
                  href="#"
                  className="border-b border-dotted border-tapa py-[6px]"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Online ordering - Mobile (full-width strip) */}
      <div className="flex w-full flex-col items-center justify-center gap-2 bg-tapa px-5 py-[14px] text-center text-[10px] text-white lg:hidden">
        <p>Pembelian online melalui:</p>
        <div className="flex w-full flex-row justify-center gap-4 overflow-x-auto">
          {STORES.map((s) => (
            <a
              key={s}
              href="#"
              className="border-b border-dotted border-white py-[6px]"
            >
              {s}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
